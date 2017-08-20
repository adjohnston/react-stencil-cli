const fs = require('fs-extra')
const globby = require('globby')

//    getPaths : string -> string : array
const getPaths = pattern => {
  if (typeof pattern !== 'string') throw new TypeError()

  if (fs.existsSync(pattern)) {
    return pattern
  }

  return globby.sync(pattern)
}

module.exports = getPaths
