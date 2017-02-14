import * as Vue  from 'vue'
import * as Vuex from 'vuex'
import { login } from './login'
import * as t    from './types'

Vue.use(Vuex)

export const store = new Vuex.Store({
  modules: {
    login,
  },
})

export const types = t
