const stringify = require('stringify-object')

module.exports = props => (
  `export default ${stringify(props)}`
)
