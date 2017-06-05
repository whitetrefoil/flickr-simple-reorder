import { config }       from '../config'
const del             = require('del')
const gulp            = require('gulp')
const gutil           = require('gulp-util')
const { Server }      = require('karma')
const merge           = require('merge-stream')
const webpack         = require('webpack')
const webpackStream   = require('webpack-stream')
const { karmaConfig } = require('../karma/ut-conf')
const webpackUtConfig = require('../webpack/ut')

gulp.task('ut', (done: Noop) => {
  new Server(karmaConfig, (exitCode: number) => {
    if (exitCode === 0) {
      // tslint:disable-next-line:no-console
      console.log('Karma tests all passed.')
      done()
    } else {
      // tslint:disable-next-line:no-console
      throw new gutil.PluginError({
        plugin   : 'ut',
        message  : `Karma has exited with code: ${exitCode}`,
        showStack: false,
      })
    }
  }).start()
})

// This is for debug purpose, to build test codes using webpack.
gulp.task('ut:build', (): PromiseLike<any> => {

  return del([config.building('')])
    .then((): NodeJS.ReadWriteStream => {
      return merge(
        gulp.src(config.source('*.[jt]s'))
          .pipe(webpackStream(webpackUtConfig, webpack)),
        gulp.src(config.source('*.html')),
      ).pipe(gulp.dest(config.building('')))
    })

})
