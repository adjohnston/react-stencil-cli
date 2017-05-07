import {
  appendExtensions
} from '../src/helpers/paths'

describe('#appendExtensions', () => {
  test(`given 'components' expect 'components/**/*.?(js|jsx)'`, () => {
    expect(appendExtensions('components')).toEqual('components/**/*.?(js|jsx)')
  })
})
