require('ts-node').register({
  project: './dev/tsconfig.json',
  files  : true,
  fast   : true,
  cache  : false,
})

require('./dev/gulp/backend')
require('./dev/gulp/build')
require('./dev/gulp/dev-server')
require('./dev/gulp/help')
require('./dev/gulp/integration')
require('./dev/gulp/pre-check')
require('./dev/gulp/proxy')
require('./dev/gulp/serve')
