import Vue                        from 'vue'
import * as t                     from '../types'
import { ILoginState } from './state'
import * as API                   from '../../api/types/api'
import { getLogger }              from '../../services/log'
import Storage                    from '../../services/storage'

const { debug } = getLogger('/store/login/mutations.ts')

export const mutations = {

  [t.LOGIN__SET_LOGIN_TOKEN](state: ILoginState, token: API.IToken) {
    state.token = token
    debug('Set token into state:', token)

    Storage.set('token', token)
    debug('Set token into storage:', token)
  },

  // [t.LOGIN__SET_USER_INFO](state: ILoginState, user: IUserInfo) {
  //   state.user = user
  //   log.debug('Set userinfo into state.')
  // },

  [t.LOGIN__LOGOUT](state: ILoginState) {
    Vue.delete(state, 'token')
    Storage.remove('token')
    Vue.delete(state, 'user')
  },
}
