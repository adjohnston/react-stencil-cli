const globby = require('globby')
const R = require('ramda')
const path = require('path')

//    appendExtensions : string -> string
const appendExtensions = patterns => {
  return `${patterns}/**/*.?(js|jsx)`
}

//    getPaths : string -> array
const getPaths = patterns => {
  return globby.sync(appendExtensions(patterns))
}

//    splitOnHyphen : string -> array
const splitOnHyphen = string => {
  return R.split('-', string)
}

//    upperCaseWords : array -> array
const upperCaseWords = (words) => {
  return R.map(word => word.replace(/^./, letter => letter.toUpperCase()), words)
}

//    joinChars : array -> string
const joinChars = characters => {
  return R.join('', characters)
}

//    getPathName : string -> string
const getPathName = (componentPath) => {
  const pathName = path.basename(componentPath).split('.')

  if (pathName.length > 1) return pathName[0]
  throw new Error(`path ${componentPath} must include component file`)
}

//    getComponentName : string -> string
const getComponentName = (componentPathName) => (
  R.pipe(
    splitOnHyphen,
    upperCaseWords,
    joinChars
  )(componentPathName)
)

module.exports = {
  appendExtensions,
  getPaths,
  splitOnHyphen,
  upperCaseWords,
  joinChars,
  getPathName,
  getComponentName
}
