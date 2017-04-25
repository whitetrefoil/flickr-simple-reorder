// tslint:disable

import 'debug'

declare module 'debug' {
  export interface IDebug {
    save: (namespace: string) => void
    load: () => string
  }

  export interface IDebugger {
    color: number
  }
}
