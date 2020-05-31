import log              from 'fancy-log';
import gulp             from 'gulp';
import webpack          from 'webpack';
import WebpackDevServer from 'webpack-dev-server';
import config           from '../config';
import devConfig        from '../webpack/dev';
import prodConfig       from '../webpack/prod';


gulp.task('devServer', async done => {

  const webpackConfig = process.env.NODE_ENV === 'development'
    ? devConfig
    : prodConfig;

  const devServerOptions: WebpackDevServer.Configuration = {
    host              : '0.0.0.0',
    port              : config.serverPort,
    publicPath        : `${config.baseUrl}/`,
    contentBase       : [
      config.absOutputByEnv(''),
      config.absRoot('stubapi/static'),
      config.absRoot(''),
    ],
    hot               : true,
    noInfo            : false,
    index             : 'index.html',
    injectClient      : true,
    injectHot         : true,
    // Base on 'errors-only' + filter ts-loader transpileOnly related warnings.
    // See https://github.com/webpack/webpack/blob/30882ca548625e6d1e54323ff5c61795c6ab4bda/lib/Stats.js#L1405
    stats             : {
      all           : false,
      errors        : true,
      moduleTrace   : true,
      warningsFilter: /export .* was not found in/,
    },
    https             : true,
    proxy             : [
      {
        context: config.apiPrefixes.map((p: string): string => `${p}**`),
        target : `http://0.0.0.0:${config.serverPort + 1}`,
        secure : false,
      },
    ],
    historyApiFallback: {
      index  : `${config.baseUrl}/index.html`,
      verbose: true,
    },
    disableHostCheck  : true,
    compress          : process.env.NODE_ENV !== 'development',
  };

  WebpackDevServer.addDevServerEntrypoints(webpackConfig, devServerOptions);

  const webpackCompiler = webpack(webpackConfig);

  const server = new WebpackDevServer(webpackCompiler, devServerOptions);

  server.listen(config.serverPort, '0.0.0.0', error => {
    if (error != null) {
      log.error('Webpack Dev Server startup failed!  Detail:');
      log.error(error);
    } else {
      log(`Webpack Dev Server started at port ${config.serverPort}`);
    }

    done();
  });
});
