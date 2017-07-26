import path from 'path'
import getComponentPathName from 'src/helpers/get-component-path-name'

test('basename should be called', () => {
  const spy = jest.spyOn(path, 'basename')

  getComponentPathName('filename.js')
  expect(spy).toHaveBeenCalled()
})

test('should return the name of a component from a filename', () => {
  expect(getComponentPathName('filename.js')).toBe('filename')
})

test('should throw error if no string given', () => {
  expect(() => getComponentPathName()).toThrow()
  expect(() => getComponentPathName(1)).toThrow()
  expect(() => getComponentPathName([])).toThrow()
  expect(() => getComponentPathName({})).toThrow()
  expect(() => getComponentPathName(() => {})).toThrow()
  expect(() => getComponentPathName(true)).toThrow()
})
