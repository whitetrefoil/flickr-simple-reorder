require('ts-node').register({
  project: './dev/tsconfig.json',
  fast   : true,
  cache  : false,
})

const { initialize } = require('./dev/config')
initialize()

require('./dev/gulp/backend')
require('./dev/gulp/build')
require('./dev/gulp/dev-server')
require('./dev/gulp/it')
require('./dev/gulp/proxy')
require('./dev/gulp/serve')
require('./dev/gulp/watch')
