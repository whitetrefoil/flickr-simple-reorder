import Vue       from 'vue'
import VueRouter from 'vue-router'
import LoginPage from '../modules/login/page'

Vue.use(VueRouter)

// TODO: Handle the error of fail loading...

// TODO: `as any` until https://github.com/vuejs/vue-router/pull/1685 merged
const AboutPage  = () => import('../modules/about/page').then((m) => m.default)
const FaqPage    = () => import('../modules/faq/page').then((m) => m.default)
const IndexPage  = () => import('../modules/index/page').then((m) => m.default)
const LogoutPage = () => import('../modules/logout/page').then((m) => m.default)

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
