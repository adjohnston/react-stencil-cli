import fs from 'fs-extra'
import globby from 'globby'
import getPaths from 'src/helpers/get-paths'

test('should call fs.pathExistsSync when called', () => {
  const spy = jest.spyOn(fs, 'existsSync')

  getPaths('**/*.js')
  expect(spy).toHaveBeenCalled()
})

test('should call globby.sync when called', () => {
  const spy = jest.spyOn(globby, 'sync')

  getPaths('**/*.js')
  expect(spy).toHaveBeenCalled()
})

test('should throw an error of type TypeError when no string is given', () => {
  expect(() => getPaths()).toThrow(TypeError)
  expect(() => getPaths([])).toThrow(TypeError)
  expect(() => getPaths({})).toThrow(TypeError)
  expect(() => getPaths(1)).toThrow(TypeError)
  expect(() => getPaths(true)).toThrow(TypeError)
  expect(() => getPaths(() => {})).toThrow(TypeError)
})
