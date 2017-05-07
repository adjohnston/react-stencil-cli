//    appendExtensions : string > string
const appendExtensions = path => {
  return `${path}/**/*.?(js|jsx)`
}

export {
  appendExtensions
}
