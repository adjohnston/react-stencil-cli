const stringify = require('stringify-object')

const stringifyOptions = {
  indent: '  ',
  inlineCharacterLimit: 80
}

module.exports = (name, description, props) => {
  return `export default ${stringify({
    name,
    description,
    status: '',
    notes: {},
    swatches: [],
    examples: {},
    props
  }, stringifyOptions)}`
}
