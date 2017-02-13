const gulp = require('gulp')
const run  = require('run-sequence')

import './backend'
import './dev-server'
import './proxy'

gulp.task('it', (cb: Noop) => {
  run('proxy', ['devServer', 'backend'], cb)
})
