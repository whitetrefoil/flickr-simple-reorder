import { getLogger }             from '@whitetrefoil/debug-log'
import { MutationTree, Payload } from 'vuex'
import * as API                  from '../../api/types/api'
import Storage                   from '../../services/storage'
import * as t                    from '../types'
import { ILoginState }           from './state'


interface ISetTempTokenPayload extends Payload {
  type: typeof t.LOGIN__SET_TEMP_TOKEN
  token: API.IToken
}

interface ISetAuthInfoPayload extends Payload {
  type: typeof t.LOGIN__SET_AUTH_INFO
  token: API.IToken
  user: API.IUser
}

interface IUnsetAuthInfo extends Payload {
  type: typeof t.LOGIN__UNSET_AUTH_INFO
}

export type ILoginCommitPayload =
  |ISetTempTokenPayload
  |ISetAuthInfoPayload
  |IUnsetAuthInfo


const { debug } = getLogger(`/src/${__filename.split('?')[0]}`)


export const mutations: MutationTree<ILoginState> = {

  [t.LOGIN__SET_TEMP_TOKEN](state, payload: ISetTempTokenPayload) {
    state.token = payload.token
    debug('Set temp token into state:', payload.token)
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

  [t.LOGIN__SET_AUTH_INFO](state, payload: ISetAuthInfoPayload) {
    state.token = payload.token
    debug('Set token into state:', payload.token)
    state.user = payload.user
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
    state.token = undefined
    state.user  = undefined
    Storage.remove('cache')
  },
}
