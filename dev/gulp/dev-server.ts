// tslint:disable:no-import-side-effect no-implicit-dependencies

import * as gulp from 'gulp'
import * as http from 'http'
import * as _ from 'lodash'
import * as webpack from 'webpack'
import * as WebpackDevServer from 'webpack-dev-server'
import config from '../config'
import { getLogger } from '../utils/log'
import devConfig from '../webpack/dev'

const WAIT_FOR_STARTUP_IN_MS = 30000

const { debug } = getLogger(__filename)

gulp.task('devServer', (done: () => void) => {

  devConfig.plugins = devConfig.plugins || []
  devConfig.plugins.push(new webpack.HotModuleReplacementPlugin())
  devConfig.output.path = config.absOutput('')

  devConfig.entry['polyfills']
    .unshift(`webpack-dev-server/client?http://${config.livereloadHost}:${config.serverPort}`, 'webpack/hot/dev-server')

  const webpackCompiler = webpack(devConfig)

  const webpackCompilerConfig = {
    publicPath        : '',
    contentBase       : config.absOutput(''),
    hot               : true,
    noInfo            : false,
    historyApiFallback: true,
    stats             : 'minimal' as 'minimal',
    proxy             : [{
      context: _.map(config.apiPrefixes, (p: string): string => `${p}**`),
      target : `http://${config.livereloadHost}:${config.serverPort + 1}`,
    }],
    disableHostCheck  : true,
  }

  const server = new WebpackDevServer(webpackCompiler, webpackCompilerConfig)

  server.listen(config.serverPort, '0.0.0.0', (error?: Error) => {
    if (error) {
      // tslint:disable-next-line:no-console
      console.error('Webpack Dev Server startup failed!  Detail:')
      // tslint:disable-next-line:no-console
      console.error(error)
      return
    }
    // tslint:disable-next-line no-console
    console.log(`Webpack Dev Server started at port ${config.serverPort}`)

    http.get({
      port   : config.serverPort,
      timeout: WAIT_FOR_STARTUP_IN_MS,
    }, (res: http.IncomingMessage) => {
      res.on('data', _.noop)
      res.on('end', done)
    })
      .on('error', (err?: Error) => {
        // tslint:disable-next-line:no-console
        console.warn('There must be something wrong with webpack dev server:')
        // tslint:disable-next-line:no-console
        console.warn(err)
        done()
      })
  })
})
