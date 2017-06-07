require('ts-node').register({
  project: './dev/tsconfig.json',
  fast   : true,
  cache  : false,
})

const { initialize } = require('./dev/config')
initialize()

require('./dev/gulp/backend')
require('./dev/gulp/build')
// require('./dev/gulp/dev-server')
// require('./dev/gulp/e2e')
// require('./dev/gulp/eslint')
require('./dev/gulp/it')
require('./dev/gulp/proxy')
// require('./dev/gulp/selenium')
require('./dev/gulp/serve')
require('./dev/gulp/watch')
// require('./dev/gulp/webpack')

// Something wrong within Karma lib...
// After this require all .ts file will fail...
require('./dev/gulp/ut')
