// tslint:disable:no-import-side-effect no-implicit-dependencies

import del        from 'del'
import log        from 'fancy-log'
import gulp       from 'gulp'
import webpack    from 'webpack'
import config     from '../config'
import devConfig  from '../webpack/dev'
import prodConfig from '../webpack/prod'
import './pre-check'

gulp.task('build', (done: () => void) => {

  const webpackConfig = process.env.NODE_ENV === 'development'
    ? devConfig
    : prodConfig

  del([config.outputByEnv('')])
    .then(() => {
      webpack(webpackConfig, (err: Error, stats: any) => {
        if (err != null) {
          throw err
        }
        log('[webpack]:\n', stats.toString('minimal'))
        done()
      })
    })
})
