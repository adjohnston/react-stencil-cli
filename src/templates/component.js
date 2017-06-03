module.exports = (componentPath) => (
  `import Stencil, {specify} from 'react-stencil'
  import c from '${componentPath}'
  import gD from '../global-definitions'
  import p from './prop-definitions'
  import d from './component-definitions'
  const s = specify(gD || {}, p || {}, d || {})
  export default Stencil(s)(c)`
)
