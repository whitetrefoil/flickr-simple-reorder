import { createProxyMiddleware } from '@whitetrefoil/koa-http-proxy';
import { Koa, LogLevel, MSM }    from '@whitetrefoil/msm';
import log                       from 'fancy-log';
import gulp                      from 'gulp';
import koaBodyparser             from 'koa-bodyparser';
import { URL }                   from 'url';
import config                    from '../config';


gulp.task('backend:stubapi', done => {
  const app = new Koa();

  log('Will use StubAPI mode.');

  const msm = new MSM({
    apiPrefixes: config.apiPrefixes,
    apiDir     : 'stubapi/',
    lowerCase  : true,
    nonChar    : '-',
    logLevel   : LogLevel.DEBUG,
  });

  app.use(koaBodyparser());
  app.use(msm.middleware());

  app.listen(config.serverPort + 1, () => {
    log(`Backend server listening at port ${config.serverPort + 1}`);
    done();
  });
});

gulp.task('backend:proxy', done => {
  const app = new Koa();

  log('Will use proxy mode.');

  const url = new URL(config.backendDest);

  app.use(createProxyMiddleware(config.apiPrefixes, {
    target : url.href,
    secure : false,
    xfwd   : true,
    headers: {
      host   : url.host,
      origin : url.host,
      referer: url.href,
    },
  }));

  app.listen(config.serverPort + 1, () => {
    log(`Backend server listening at port ${config.serverPort + 1}`);
    done();
  });
});

gulp.task('backend:recorder', done => {
  const app = new Koa();

  log('Will use recorder mode.');

  const msm = new MSM({
    apiPrefixes: config.apiPrefixes,
    apiDir     : 'stubapi/',
    lowerCase  : true,
    nonChar    : '-',
    logLevel   : LogLevel.INFO,
  });

  app.use(msm.recorder());
  app.use(createProxyMiddleware(config.apiPrefixes, {
    target : config.backendDest,
    secure : false,
    xfwd   : true,
    headers: {
      host   : config.backendDest.replace(/^https?:\/\//, ''),
      origin : config.backendDest,
      referer: `${config.backendDest}/`,
    },
  }));

  app.listen(config.serverPort + 1, () => {
    log(`Backend server listening at port ${config.serverPort + 1}`);
    done();
  });
});
