import * as Vue  from 'vue'
import * as Vuex from 'vuex'
import { login } from './login'

Vue.use(Vuex)

export const store = new Vuex.Store({
  modules: {
    login,
  },
})
