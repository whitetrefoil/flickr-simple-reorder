import Vue        from 'vue'
import { sync }   from 'vuex-router-sync'
import WtApp      from './components/wt-app'
import { router } from './router'
import { store }  from './store'

sync(store, router)

if (process.env.NODE_ENV === 'development') {
  localStorage.debug = '/*'
}

new Vue({
  router,
  store,
  render: (h) => h(WtApp),
}).$mount('#app')
