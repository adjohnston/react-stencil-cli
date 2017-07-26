const R = require('ramda')

//    uppercase : array -> array
const uppercase = words => {
  if (!Array.isArray(words)) throw new TypeError()

  return R.map(word => word.replace(/^./, letter => letter.toUpperCase()), words)
}

export default uppercase
