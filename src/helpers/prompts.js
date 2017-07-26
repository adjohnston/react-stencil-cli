module.exports = [
  {
    name: 'directory',
    message: 'Where can I find your components? 🤔',
    validate: (answer) => answer !== ''
  },
  {
    name: 'outputPath',
    message: 'Where should I put the generated specs? 🤔',
    validate: (answer) => answer !== ''
  }
]
