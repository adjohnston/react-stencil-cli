import uppercase from 'src/helpers/uppercase'

test('should return an array of words with each first letter having been uppercased', () => {
  expect(uppercase(['hello', 'world'])).toEqual(['Hello', 'World'])
})

test('should return an empty array if given an empty array', () => {
  expect(uppercase([])).toEqual([])
})

test('should throw an error of type TypeError when not given an array', () => {
  expect(() => uppercase()).toThrow(TypeError)
  expect(() => uppercase('')).toThrow(TypeError)
  expect(() => uppercase(1)).toThrow(TypeError)
  expect(() => uppercase({})).toThrow(TypeError)
  expect(() => uppercase(() => {})).toThrow(TypeError)
  expect(() => uppercase(true)).toThrow(TypeError)
})
