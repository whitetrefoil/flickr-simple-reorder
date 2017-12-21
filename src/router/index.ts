import Vue from 'vue'
import VueRouter from 'vue-router'
import LoginPage from '../modules/login/page'

Vue.use(VueRouter)

// TODO: Handle the error of fail loading...

// TODO: `as any` until https://github.com/vuejs/vue-router/pull/1685 merged
const AboutPage: any  = () => import(/* webpackChunkName: "about-page", webpackMode: "lazy" */'../modules/about/page')
const FaqPage: any    = () => import(/* webpackChunkName: "faq-page", webpackMode: "lazy" */'../modules/faq/page')
const IndexPage: any  = () => import(/* webpackChunkName: "index-page", webpackMode: "lazy" */'../modules/index/page')
const LogoutPage: any = () => import(/* webpackChunkName: "logout-page", webpackMode: "lazy" */'../modules/logout/page')

export const router = new VueRouter({
  // mode  : 'history',
  routes: [
    { path: '/', name: 'index', component: IndexPage },
    { path: '/faq', name: 'faq', component: FaqPage },
    { path: '/about', name: 'about', component: AboutPage },
    { path: '/login', name: 'login', component: LoginPage },
    { path: '/logout', name: 'logout', component: LogoutPage },
    { path: '*', redirect: { name: 'about' } },
  ],
})
