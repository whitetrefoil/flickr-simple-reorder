// tslint:disable:no-import-side-effect
import 'babel-polyfill'

if (process.env.ENV === 'production') {
  // Production
} else {
  // Development
  Error['stackTraceLimit'] = Infinity
}
