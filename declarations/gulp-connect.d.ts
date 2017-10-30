// tslint:disable:no-import-side-effect no-implicit-dependencies

declare module 'gulp-connect' {
  import { ConnectAppOptions } from 'gulp-connect'
  import { Server } from 'http'

  export interface ConnectApp extends ConnectAppOptions {
    server?: Server
  }

  export function server(options?: ConnectAppOptions): ConnectApp
}
