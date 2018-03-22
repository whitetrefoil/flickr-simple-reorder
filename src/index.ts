// tslint:disable:no-import-side-effect

import { getLogger } from '@whitetrefoil/debug-log'
import Vue           from 'vue'
import WtApp         from './components/wt-app'
import { router }    from './router'
import { store }     from './store'

const { debug } = getLogger(__filename)

new Vue({
  router,
  store,
  render: (h) => h(WtApp),
}).$mount('#app')

debug('Vue is initialized!')

const loadingErrorDiv = document.getElementById('loading-error')
if (loadingErrorDiv != null) {
  loadingErrorDiv.remove()
}
