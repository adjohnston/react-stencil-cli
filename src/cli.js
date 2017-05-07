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

let componentCount = 0
let mapping = ''

const {
  getPathName,
  getComponentName
} = helpers

const throwErr = (err) => {
  if (err) throw err
}

inquirer
  .prompt(require('./helpers/prompts'))
  .then(answers => {
    const {
      c,
      d,
      m
    } = answers

    glob(Array.isArray(c) ? c.map(appendExtensions) : appendExtensions(c))
      .then((componentPaths) => {
        fs.ensureFile(resolve(d, 'global-definitions.js'), throwErr)

        componentPaths.map(componentPath => {
          const componentPathName = getPathName(componentPath)

          fs.readFile(componentPath, 'utf8', (err, code) => {
            if (err) throw err

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

            fs.ensureFile(resolve(d, componentPathName, 'definitions.js'), throwErr)

            const typesExport = `export default ${JSON.stringify(types, null, 2)}`
            fs.outputFile(resolve(d, componentPathName, 'types.js'), typesExport, throwErr)

            if (m) {
              const component = componentTemplate(resolve(componentPath))
              const path = resolve(d, componentPathName, 'component.js')
              const componentName = getComponentName(componentPathName)

              mapping += mappingTemplate(componentName, resolve(d, componentPathName, 'component'))

              fs.outputFile(path, component, throwErr)
              fs.outputFile(resolve(d, 'components.js'), mapping, throwErr)
            }
          })
        })
      })
  })
