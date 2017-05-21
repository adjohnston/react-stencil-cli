module.exports = (componentName, componentPathName) => (
`import ${componentName} from './${componentPathName}/component'
export {${componentName}}`)
