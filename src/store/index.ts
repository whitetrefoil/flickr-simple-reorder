import Vue                              from 'vue'
import Vuex                             from 'vuex'
import { ILoginPayload, login }         from './login'
import { IModalPayload, modal }         from './modal'
import { IPhotosetsPayload, photosets } from './photosets'
import { IRootState }                   from './state'
import * as t                           from './types'


export type IPayload =
  |ILoginPayload
  |IModalPayload
  |IPhotosetsPayload


Vue.use(Vuex)


export const store = new Vuex.Store<IRootState>({
  strict : process.env.NODE_ENV === 'development',
  modules: {
    login,
    modal,
    photosets,
  },
})


export const types = t
