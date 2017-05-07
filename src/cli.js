const resolve = require('path').resolve
const fs = require('fs-extra')
const log = require('single-line-log').stdout
const chalk = require('chalk')
const glob = require('globby')
const reactDocs = require('react-docgen')
const inquirer = require('inquirer')

const helpers = require('./helpers')
const componentTemplate = require('./templates/component')
const mappingTemplate = require('./templates/mapping')

const {
  appendExtensions
} = require('./helpers/paths')

const {
  handleError
} = require('./helpers/handlers')

let componentCount = 0
let mapping = ''

const {
  getPathName,
  getComponentName
} = helpers

inquirer
  .prompt(require('./helpers/prompts'))
  .then(answers => {
    const {
      directory,
      outputPath,
      shouldMap
    } = answers

    glob((directory.map && directory.map(appendExtensions)) || appendExtensions(directory))
      .then((componentPaths) => {
        fs.ensureFile(resolve(outputPath, 'global-definitions.js'), handleError)

        componentPaths.map(componentPath => {
          const componentPathName = getPathName(componentPath)

          fs.readFile(componentPath, 'utf8', (handleError, code) => {
            let props
            try {
              props = reactDocs.parse(code).props

              componentCount++
              log(chalk.green('•').repeat(componentCount))
            } catch (e) { return }

            const types = Object.keys(props).reduce((prev, prop) => {
              const {
                type: {name},
                required
              } = props[prop]

              prev[prop] = {props: [name, required]}
              return prev
            }, {})

            fs.ensureFile(resolve(outputPath, componentPathName, 'definitions.js'), handleError)

            const typesExport = `export default ${JSON.stringify(types, null, 2)}`
            fs.outputFile(resolve(outputPath, componentPathName, 'types.js'), typesExport, handleError)

            if (shouldMap) {
              const component = componentTemplate(resolve(componentPath))
              const path = resolve(outputPath, componentPathName, 'component.js')
              const componentName = getComponentName(componentPathName)

              mapping += mappingTemplate(componentName, resolve(outputPath, componentPathName, 'component'))

              fs.outputFile(path, component, handleError)
              fs.outputFile(resolve(outputPath, 'components.js'), mapping, handleError)
            }
          })
        })
      })
  })
