declare module '*.vue' {
  import Vue = require('vue')

  const component: typeof Vue

  export default component
}
