const path = require('path')

//    getComponentPathName : string -> string
const getComponentPathName = componentPath => {
  const pathName = path.basename(componentPath).split('.')

  if (pathName.length > 1) return pathName[0]
  throw new Error(`path ${componentPath} must include component file`)
}

export default getComponentPathName
