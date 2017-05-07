module.exports = [
  {
    name: 'directory',
    message: 'Where are your components?',
    validate: (answer) => answer !== ''
  },
  {
    name: 'outputPath',
    message: 'Where do you want generated specs to live?',
    validate: (answer) => answer !== ''
  },
  {
    type: 'confirm',
    name: 'shouldMap',
    message: 'Do you want to automatically generate component mappings?',
    default: true
  }
]
