import * as Vue  from 'vue'
import * as Vuex from 'vuex'
import { login } from './login'
import * as t    from './types'

Vue.use(Vuex)

export const store = new Vuex.Store({
  strict : process.env.NODE_ENV === 'development',
  modules: {
    login,
  },
})

if (typeof store.state.login.token === 'string') {
  store.dispatch(t.LOGIN__CHECK_TOKEN)
}

export const types = t
