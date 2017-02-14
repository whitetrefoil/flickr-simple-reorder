import * as t          from '../types'
import { ILoginState } from './state'

export const mutations = {
  [t.LOGIN__SET_FROB](state: ILoginState, frob: string) {
    state.frob = frob
  },

  [t.LOGIN__SET_TOKEN](state: ILoginState, token: string) {
    state.token = token
  },
}
