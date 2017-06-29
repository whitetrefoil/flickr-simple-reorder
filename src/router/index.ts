import Vue       from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

// TODO: Handle the error of fail loading...

const AboutPage: Vue.AsyncComponent = (resolve) => {
  require.ensure([], () => {
    resolve(require('../modules/about/page'))
  }, 'about-page')
}

const FaqPage: Vue.AsyncComponent = (resolve) => {
  require.ensure([], () => {
    resolve(require('../modules/faq/page'))
  }, 'faq-page')
}

const IndexPage: Vue.AsyncComponent = (resolve) => {
  require.ensure([], () => {
    resolve(require('../modules/index/page'))
  }, 'index-page')
}

const LoginPage: typeof Vue = require('../modules/login/page')

const LogoutPage: Vue.AsyncComponent = (resolve) => {
  require.ensure([], () => {
    resolve(require('../modules/logout/page'))
  }, 'logout-page')
}

export const router = new VueRouter({
  // mode  : 'history',
  routes: [
    { path: '/', name: 'index', component: IndexPage },
    { path: '/faq', name: 'faq', component: FaqPage },
    { path: '/about', name: 'about', component: AboutPage },
    { path: '/login', name: 'login', component: LoginPage },
    { path: '/logout', name: 'logout', component: LogoutPage },
    { path: '*', redirect: { name: 'about' }},
  ],
})
