import R from 'ramda'
import getReadableComponentName from 'src/helpers/get-readable-component-name'

test('basename should be called', () => {
  const spy = jest.spyOn(R, 'pipe')

  getReadableComponentName('amazing-component')
  expect(spy).toHaveBeenCalled()
})

test('should return a formatted name of a component from a filename', () => {
  expect(getReadableComponentName('amazing-component')).toBe('Amazing Component')
})
