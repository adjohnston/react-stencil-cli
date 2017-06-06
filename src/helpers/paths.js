const globby = require('globby')
const R = require('ramda')
const basename = require('path').basename

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
  return string.split('-')
}

//    componentCase : array -> array
const componentCase = words => {
  return R.map(word => word.replace(/^./, letter => letter.toUpperCase()), words)
}

//    joinCharactersWithSpace : array -> string
const joinCharactersWithSpace = characters => {
  return characters.join(' ')
}

//    getComponentPathName : string -> string
const getComponentPathName = componentPath => {
  const pathName = basename(componentPath).split('.')

  if (pathName.length > 1) return pathName[0]
  throw new Error(`path ${componentPath} must include component file`)
}

//    getReadableComponentName : string -> string
const getReadableComponentName = componentPathName => (
  R.pipe(
    splitOnHyphen,
    componentCase,
    joinCharactersWithSpace
  )(componentPathName)
)

module.exports = {
  appendExtensions,
  getPaths,
  splitOnHyphen,
  componentCase,
  joinCharactersWithSpace,
  getComponentPathName,
  getReadableComponentName
}
