const resolve = require('path').resolve
const fs = require('fs-extra')
const log = require('single-line-log').stdout
const chalk = require('chalk')
const reactDocs = require('react-docgen')
const inquirer = require('inquirer')

const {
  getPaths,
  getComponentPathName,
  getReadableComponentName
} = require('./helpers/paths')

let counter = 0

inquirer
  .prompt(require('./helpers/prompts'))
  .then(answers => {
    const {
      directory,
      outputPath
    } = answers

    const paths = getPaths(directory)

    paths.map(path => {
      let props
      let description
      let template
      let file
      let data

      const pathName = getComponentPathName(path)
      const name = getReadableComponentName(pathName)
      const componentOutputPath = resolve(outputPath, pathName)
      const src = fs.readFileSync(path, 'utf8')

      try {
        const parsed = reactDocs.parse(src)
        props = parsed.props
        description = parsed.description
        counter++
      } catch (e) { return }

      //  write component definitions
      template = require('./templates/component')
      file = resolve(componentOutputPath, 'component.js')
      data = template(name, description)

      if (!fs.existsSync(file)) {
        fs.ensureFileSync(file)
        fs.writeFileSync(file, data)
      }

      //  write prop definitions
      template = require('./templates/props')
      file = resolve(componentOutputPath, 'props.js')
      data = template(Object.keys(props).reduce((propDefs, prop) => {
        const {
          type: {name},
          required
        } = props[prop]

        const def = {
          props: [name, required],
          description: props[prop].description
        }

        if (props[prop].defaultValue) {
          def.default = props[prop].defaultValue.value
        }

        propDefs[prop] = def
        return propDefs
      }, {}))
      fs.writeFileSync(file, data)

      file = resolve(outputPath, 'globals.js')
      data = require('./templates/globals')
      if (!fs.existsSync(file)) {
        fs.ensureFileSync(file)
        fs.writeFileSync(file, data)
      }

      log(chalk.green('•').repeat(counter))
    })

    log(chalk.green(`${counter} components were specced 😎\n`))
  })
