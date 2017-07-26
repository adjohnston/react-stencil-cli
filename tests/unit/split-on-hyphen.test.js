import splitOnHyphen from 'src/helpers/split-on-hyphen'

test('should return an array of words split on hypens', () => {
  expect(splitOnHyphen('hello-world')).toEqual(['hello', 'world'])
})

test('should return array containing string when string has no hyphens', () => {
  expect(splitOnHyphen('helloworld')).toEqual(['helloworld'])
})

test('should throw an error of type TypeError if not given a string', () => {
  expect(() => splitOnHyphen()).toThrow(TypeError)
  expect(() => splitOnHyphen(1)).toThrow(TypeError)
  expect(() => splitOnHyphen([])).toThrow(TypeError)
  expect(() => splitOnHyphen({})).toThrow(TypeError)
  expect(() => splitOnHyphen(() => {})).toThrow(TypeError)
  expect(() => splitOnHyphen(true)).toThrow(TypeError)
})
