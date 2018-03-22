import Vue            from 'vue'
import Vuex           from 'vuex'
import { app }        from './app'
import { login }      from './login'
import { photosets }  from './photosets'
import { IRootState } from './state'
import * as t         from './types'

Vue.use(Vuex)

export const store = new Vuex.Store<IRootState>({
  strict : process.env.NODE_ENV === 'development',
  modules: {
    app,
    login,
    photosets,
  },
})

export const types = t
