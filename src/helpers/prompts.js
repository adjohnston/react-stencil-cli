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
  }
]
