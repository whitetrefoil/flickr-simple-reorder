// tslint:disable:no-implicit-dependencies

import log       from 'fancy-log'
import gulp      from 'gulp'
import httpProxy from 'http-proxy'
import config    from '../config'

class DevServerProxy {
  server!: NodeJS.EventEmitter

  startProxy(proxyConfig: any) {
    log(`Building proxy to ${config.backendDest}`)
    this.server = httpProxy.createProxyServer(proxyConfig)
    this.server.on('error', log.warn)
    // See https://github.com/nodejitsu/node-http-proxy/issues/180#issuecomment-310550385
    this.server.on('proxyReq', (proxyReq, req) => {
      if (req.body == null) { return }
      const bodyData = JSON.stringify(req.body)
      proxyReq.setHeader('Content-Length', Buffer.byteLength(bodyData))
      proxyReq.write(bodyData)
    })
  }
}

export const proxy = new DevServerProxy()

gulp.task('proxy', (done) => {
  proxy.startProxy({
    target : config.backendDest,
    secure : false,
    xfwd   : true,
    headers: {
      host   : config.backendDest.replace(/^https?:\/\//, ''),
      origin : config.backendDest,
      referer: `${config.backendDest}/`,
    },
  })
  done()
})
