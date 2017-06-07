import Vue                from 'vue'
import Vuex               from 'vuex'
import { login }          from './login'
import { mutations }      from './mutations'
import { photosets }      from './photosets'
import { getters, state } from './state'
import * as t             from './types'

Vue.use(Vuex)

export const store = new Vuex.Store({
  strict : process.env.NODE_ENV === 'development',
  modules: {
    login,
    photosets,
  },
  mutations,
  state,
  getters,
})

if (typeof store.state.login.token === 'string') {
  store.dispatch(t.LOGIN__CHECK_TOKEN)
}

export const types = t
