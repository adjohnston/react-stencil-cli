import joinCharactersWithSpace from 'src/helpers/join-characters-with-space'

test('should return a string given an array', () => {
  expect(joinCharactersWithSpace(['hello', 'world'])).toBe('hello world')
})

test('should throw error of type TypeError when not given an array', () => {
  expect(() => joinCharactersWithSpace('')).toThrow(TypeError)
  expect(() => joinCharactersWithSpace(1)).toThrow(TypeError)
  expect(() => joinCharactersWithSpace(true)).toThrow(TypeError)
  expect(() => joinCharactersWithSpace({})).toThrow(TypeError)
  expect(() => joinCharactersWithSpace()).toThrow(TypeError)
  expect(() => joinCharactersWithSpace(() => {})).toThrow(TypeError)
})
