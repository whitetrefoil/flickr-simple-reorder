// tslint:disable

declare namespace NodeJS {
  export interface Process {
    env: {
      API_PREFIX?: string,
      BABEL_ENV?: string,
      ENV?: string,
      FLICKR_KEY?: string,
      FLICKR_SECRET?: string,
      NODE_ENV?: string,
      VUE_ROUTER_BASE?: string,
    },
  }
}

declare interface NodeRequire {
  ensure: (paths: string[], callback: (require: <T>(path: string) => T) => void, name?: string) => void
}

declare module 'blueimp-md5' {
  namespace MD5 {
    function MD5Function(value: string, key?: string, isRaw?: true): string
  }
  const md5 = MD5.MD5Function
  export = md5
}

