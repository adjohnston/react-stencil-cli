const stringify = require('stringify-object')

module.exports = (name, description) => {
  return `export default ${stringify({
    name,
    description,
    notes: {},
    examples: []
  })}`
}
