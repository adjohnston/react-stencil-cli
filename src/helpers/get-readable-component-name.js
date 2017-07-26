import R from 'ramda'
import splitOnHyphen from 'src/helpers/split-on-hyphen'
import uppercase from 'src/helpers/uppercase'
import joinCharactersWithSpace from 'src/helpers/join-characters-with-space'

//    getReadableComponentName : string -> string
const getReadableComponentName = componentPathName => (
  R.pipe(
    splitOnHyphen,
    uppercase,
    joinCharactersWithSpace
  )(componentPathName)
)

module.exports = getReadableComponentName
