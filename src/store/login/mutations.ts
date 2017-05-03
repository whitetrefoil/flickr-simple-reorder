import * as Vue                   from 'vue'
import * as t                     from '../types'
import { ILoginState, IUserInfo } from './state'
import { getLogger }              from '../../services/log'
import Storage                    from '../../services/storage'

const log = getLogger('/store/login/mutations.ts')

export const mutations = {
  [t.LOGIN__SET_TOKEN](state: ILoginState, token: string) {
    state.token = token
    log.debug('Set token into state.')
    Storage.set('token', token)
    log.debug('Set token into storage.')
  },

  [t.LOGIN__SET_USER_INFO](state: ILoginState, user: IUserInfo) {
    state.user = user
    log.debug('Set userinfo into state.')
  },

  [t.LOGIN__LOGOUT](state: ILoginState) {
    Vue.delete(state, 'token')
    Storage.remove('token')
    Vue.delete(state, 'user')
  },
}
