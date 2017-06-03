const pathHelpers = require('../src/helpers/paths')
const {
  appendExtensions,
  splitOnHyphen,
  componentCase,
  joinChars,
  getComponentPathName
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

describe('#joinChars', () => {
  test(`given ['hello', 'world'] expect 'helloworld'`, () => {
    expect(joinChars(['hello', 'world'])).toEqual('helloworld')
  })
})

describe('#getComponentPathName', () => {
  test('the name of the component from \'/components/atoms/button.jsx\' should be button', () => {
    const path = '/components/atoms/button.jsx'

    expect(getComponentPathName(path)).toBe('button')
  })

  test('the name of the component from \'/components/molecules/dialog.js\' should be button', () => {
    const path = '/components/molecules/dialog.jsx'

    expect(getComponentPathName(path)).toBe('dialog')
  })

  test('the name should throw without a file', () => {
    const path = '/components/molecules/'

    expect(() => getComponentPathName(path)).toThrowError('path /components/molecules/ must include component file')
  })
})
