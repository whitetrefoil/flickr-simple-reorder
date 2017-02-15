import * as t                     from '../types'
import { ILoginState, IUserInfo } from './state'

export const mutations = {
  [t.LOGIN__SET_TOKEN](state: ILoginState, token: string) {
    state.token = token
  },

  [t.LOGIN__SET_USER_INFO](state: ILoginState, user: IUserInfo) {
    state.user = user
  },
}
