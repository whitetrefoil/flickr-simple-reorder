// tslint:disable:no-implicit-dependencies

import { NextHandleFunction } from 'connect'
import history                from 'connect-history-api-fallback'
import log                    from 'fancy-log'
import gulp                   from 'gulp'
import http                   from 'http'
import proxy                  from 'http-proxy-middleware'
import c2k                    from 'koa-connect'
import * as _                 from 'lodash'
import serve                  from 'webpack-serve'
import config                 from '../config'
import devConfig              from '../webpack/dev'

const WAIT_FOR_STARTUP_IN_MS = 30000

gulp.task('devServer', async(done) => {

  if (devConfig.output == null) {
    devConfig.output = {}
  }
  devConfig.output.path = config.absOutput('')

  try {
    const server = await serve({
      config : devConfig,
      host   : config.livereloadHost,
      // host  : '0.0.0.0',
      port   : config.serverPort,
      dev    : { publicPath: '', stats: 'minimal' },
      content: [],
      add    : (app, middleware) => {
        app.use(c2k(proxy(
          config.apiPrefixes,
          {
            target: `http://localhost:${config.serverPort + 1}`,
            secure: false,
          },
        ) as NextHandleFunction))

        app.use(c2k(history({
          index  : `${config.serverIndex}`,
          verbose: false,
        }) as NextHandleFunction))

        middleware.webpack()
        // middleware.content()
      },
    })

    server.on('listening', () => {
      log('Checking Dev Server status...')

      http.get({
        host   : config.livereloadHost,
        port   : config.serverPort,
        timeout: WAIT_FOR_STARTUP_IN_MS,
      }, (res: http.IncomingMessage) => {
        log(`Webpack Dev Server started at port ${config.serverPort}`)
        res.on('data', _.noop)
        res.on('end', done)
      })
        .on('error', (err?: Error) => {
          log.warn('There must be something wrong with webpack dev server:')
          log.warn(err)
          done()
        })
    })
  } catch (e) {
    log.error('Webpack Dev Server startup failed!  Detail:')
    log.error(e)
  }
})
