const stringify = require('stringify-object')

module.exports = (name, description, props) => {
  return `export default ${stringify({
    name,
    description,
    status: '',
    notes: {},
    swatches: [],
    examples: [],
    props
  })}`
}
