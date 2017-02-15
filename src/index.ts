import * as Vue    from 'vue'
import { sync }    from 'vuex-router-sync'
import WtApp       from './components/wt-app'
import { router }  from './router'
import { store }   from './store'

sync(store, router)

new Vue({
  router,
  store,
  render: (h) => h(WtApp),
}).$mount('#app')
