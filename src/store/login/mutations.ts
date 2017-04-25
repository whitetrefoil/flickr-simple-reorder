import Storage                    from '../../services/storage'
import * as t                     from '../types'
import { ILoginState, IUserInfo } from './state'
import { getLogger }              from '../../services/log'

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
}
