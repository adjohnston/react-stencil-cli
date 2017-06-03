module.exports = (componentName, componentPathName) => (
  `export ${componentName} from './${componentPathName}/component'\n`
)
