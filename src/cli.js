const resolve = require('path').resolve
const fs = require('fs-extra')
const log = require('single-line-log').stdout
const chalk = require('chalk')
const glob = require('globby')
const reactDocs = require('react-docgen')
const inquirer = require('inquirer')

const componentTemplate = require('./templates/component')
const mappingTemplate = require('./templates/mapping')

const {
  appendExtensions,
  getPathName,
  getComponentName
} = require('./helpers/paths')

const {
  handleError
} = require('./helpers/handlers')

let componentCount = 0
let mapping = ''

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

          fs.readFile(componentPath, 'utf8', (error, code) => {
            if (error) throw error

            let props
            try {
              props = reactDocs.parse(code).props

              componentCount++
              log(chalk.green('•').repeat(componentCount))
            } catch (e) { return }

            const propDefs = Object.keys(props).reduce((previous, prop) => {
              const {
                type: {name},
                required
              } = props[prop]

              previous[prop] = {props: [name, required]}
              return previous
            }, {})

            fs.ensureFile(resolve(outputPath, componentPathName, 'component-definitions.js'), handleError)

            const output = `export default ${JSON.stringify(propDefs, null, 2)}`
            fs.outputFile(resolve(outputPath, componentPathName, 'prop-definitions.js'), output, handleError)

            if (shouldMap) {
              const component = componentTemplate(resolve(componentPath))
              const output = resolve(outputPath, componentPathName, 'component.js')
              const componentName = getComponentName(componentPathName)

              mapping += mappingTemplate(componentName, componentPathName)

              fs.outputFile(output, component, handleError)
              fs.outputFile(resolve(outputPath, 'components.js'), mapping, handleError)
            }
          })
        })
      })
  })
