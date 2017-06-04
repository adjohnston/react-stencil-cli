const stringify = require('stringify-object')
const getReadableComponentName = require('../helpers/paths').getReadableComponentName

module.exports = (name, description) => {
  name = getReadableComponentName(name)

  return `export default ${stringify({
    name,
    description,
    notes: {},
    examples: []
  })}`
}
