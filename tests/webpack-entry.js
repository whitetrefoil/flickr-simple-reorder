// See [https://github.com/webpack/karma-webpack]()
// See [https://www.npmjs.com/package/istanbul-instrumenter-loader]()

require('../src/polyfills.ts')
require('../src/vendor.ts')
require('../src/theme.ts')
// require('../src/index.ts')

// require all tests
const testsContext = require.context('.', true, /-spec$/)
testsContext.keys().forEach(testsContext)
