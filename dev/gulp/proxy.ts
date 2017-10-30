// tslint:disable:no-import-side-effect no-implicit-dependencies

import * as gulp from 'gulp'
import * as httpProxy from 'http-proxy'
import config from '../config'
import { getLogger } from '../utils/log'

const { debug } = getLogger(__filename)

class DevServerProxy {
  server: NodeJS.EventEmitter = null

  startProxy(proxyConfig: any) {
    debug(`Building proxy to ${config.backendDest}`)
    this.server = httpProxy.createProxyServer(proxyConfig)
    this.server.on('error', console.warn)
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

gulp.task('proxy', () => {
  proxy.startProxy({
    target : config.backendDest,
    secure : config.backendDest.indexOf('https://') === 0,
    xfwd   : true,
    headers: {
      host  : config.backendDest.replace(/^https?:\/\//, ''),
      origin: config.backendDest,
    },
  })
})
