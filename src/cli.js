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
      } catch (e) { return }

      //  write component definitions
      file = resolve(componentOutputPath, 'component.js')
      if (!fs.existsSync(file)) {
        template = require('./templates/component')
        data = template(name, description, Object.keys(props).reduce((acc, prop) => {
          const {
            type: { name },
            description,
            defaultValue,
            required
          } = props[prop]

          acc[prop] = {
            type: name || '',
            description: description || '',
            default: (defaultValue && defaultValue.value) || '',
            required
          }

          return acc
        }, {}))
        fs.ensureFileSync(file)
        fs.writeFileSync(file, data)
        counter++
      }

      //  write global definitions
      file = resolve(outputPath, 'globals.js')
      if (!fs.existsSync(file)) {
        data = require('./templates/globals')
        fs.ensureFileSync(file)
        fs.writeFileSync(file, data)
      }

      log(chalk.green('•').repeat(counter))
    })

    log(chalk.green(`${counter} components were specced ${counter ? '😎' : '😭'}\n`))
  })
