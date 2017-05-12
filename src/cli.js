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

            const propDefs = Object.keys(props).reduce((prev, prop) => {
              const {
                type: {name},
                required
              } = props[prop]

              prev[prop] = {props: [name, required]}
              return prev
            }, {})

            fs.ensureFile(resolve(outputPath, componentPathName, 'definitions.js'), handleError)

            const propDefsExport = `export default ${JSON.stringify(propDefs, null, 2)}`
            fs.outputFile(resolve(outputPath, componentPathName, 'propDefs.js'), propDefsExport, handleError)

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
