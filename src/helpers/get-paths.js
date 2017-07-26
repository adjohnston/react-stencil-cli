const globby = require('globby')

//    getPaths : string -> array
const getPaths = patterns => {
  if (typeof patterns !== 'string') throw new TypeError()

  return globby.sync(patterns)
}

module.exports = getPaths
