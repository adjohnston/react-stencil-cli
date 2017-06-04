const pathHelpers = require('../src/helpers/paths')
const {
  appendExtensions,
  splitOnHyphen,
  componentCase
} = pathHelpers

describe('#appendExtensions', () => {
  test(`given 'components' expect 'components/**/*.?(js|jsx)'`, () => {
    expect(appendExtensions('components')).toEqual('components/**/*.?(js|jsx)')
  })
})

describe('#splitOnHyphen', () => {
  test(`given 'hello-world' expect ['hello', 'world']`, () => {
    expect(splitOnHyphen('hello-world')).toEqual(['hello', 'world'])
  })
})

describe('#componentCase', () => {
  test(`given ['hello', 'world'] expect ['Hello', 'World']`, () => {
    expect(componentCase(['hello', 'world'])).toEqual(['Hello', 'World'])
  })
})
