import Vue from 'vue'
import VueRouter from 'vue-router'
import LoginPage from '../modules/login/page'

Vue.use(VueRouter)

// TODO: Handle the error of fail loading...

const AboutPage  = import(/* webpackChunkName: "about-page", webpackMode: "lazy" */'../modules/about/page')
const FaqPage    = import(/* webpackChunkName: "faq-page", webpackMode: "lazy" */'../modules/faq/page')
const IndexPage  = import(/* webpackChunkName: "index-page", webpackMode: "lazy" */'../modules/index/page')
const LogoutPage = import(/* webpackChunkName: "logout-page", webpackMode: "lazy" */'../modules/logout/page')

export const router = new VueRouter({
  // mode  : 'history',
  routes: [
    { path: '/', name: 'index', component: () => IndexPage },
    { path: '/faq', name: 'faq', component: () => FaqPage },
    { path: '/about', name: 'about', component: () => AboutPage },
    { path: '/login', name: 'login', component: LoginPage },
    { path: '/logout', name: 'logout', component: () => LogoutPage },
    { path: '*', redirect: { name: 'about' } },
  ],
})
