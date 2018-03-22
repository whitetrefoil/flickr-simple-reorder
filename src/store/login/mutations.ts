import { getLogger }   from '@whitetrefoil/debug-log'
import Vue             from 'vue'
import * as API        from '../../api/types/api'
import Storage         from '../../services/storage'
import * as t          from '../types'
import { ILoginState } from './state'

const { debug } = getLogger('/store/login/mutations.ts')

export const mutations = {

  [t.LOGIN__SET_TEMP_TOKEN](state: ILoginState, token: API.IToken) {
    state.token = token
    debug('Set temp token into state:', token)
    state.user = undefined
    debug('Unset user info.')
    const splitToken = state.token.key.split('-')
    Storage.set('cache', {
      u: state.user,
      k: splitToken[0],
      t: splitToken[1],
      s: state.token.secret,
    })
    debug('Save temp token to storage.')
  },

  [t.LOGIN__SET_AUTH_INFO](state: ILoginState, { token, user }: { token: API.IToken, user: API.IUser }) {
    state.token = token
    debug('Set token into state:', token)
    state.user = user
    debug('Set userinfo into state.')
    const splitToken = state.token.key.split('-')
    Storage.set('cache', {
      u: state.user,
      k: splitToken[0],
      t: splitToken[1],
      s: state.token.secret,
    })
    debug('Save full auth info to storage.')
  },

  [t.LOGIN__UNSET_AUTH_INFO](state: ILoginState) {
    Vue.delete(state, 'token')
    Vue.delete(state, 'user')
    Storage.remove('cache')
  },
}
