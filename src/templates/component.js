const stringify = require('stringify-object')

module.exports = (name, description, propDefs) => {
  return `export default ${stringify({
    name,
    description,
    propDefs
  })}`
}
