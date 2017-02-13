interface String {
  toString(encoding: any): string
}

declare namespace NodeJS {
  export interface Process {
    env: any | {
      API_PREFIX     : string,
      BABEL_ENV      : string,
      NODE_ENV       : string,
      VUE_ROUTER_BASE: string,
    },
  }
}

declare interface NodeRequire {
  ensure: (paths: string[], callback: (require: <T>(path: string) => T) => void, name?: string) => void
}
