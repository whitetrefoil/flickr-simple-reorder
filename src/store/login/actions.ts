import { getLogger }           from '@whitetrefoil/debug-log'
import { ActionTree, Payload } from 'vuex'
import { getAccessToken }      from '../../api/get-access-token'
import { getLoginToken }       from '../../api/get-login-token'
import * as API                from '../../api/types/api'
import { IRootState }          from '../state'
import * as t                  from '../types'
import { ILoginCommitPayload } from './mutations'
import { ILoginState }         from './state'


interface IRequestLoginTokenPayload extends Payload {
  type: typeof t.LOGIN__REQUEST_LOGIN_TOKEN
}

interface IRequestAccessTokenPayload extends Payload {
  type: typeof t.LOGIN__REQUEST_ACCESS_TOKEN
  verifier: string
}

export type ILoginDispatchPayload =
  |IRequestLoginTokenPayload
  |IRequestAccessTokenPayload


const { debug } = getLogger(`/src/${__filename.split('?')[0]}`)


export const actions: ActionTree<ILoginState, IRootState> = {

  async [t.LOGIN__REQUEST_LOGIN_TOKEN]({ commit }): Promise<API.IToken> {
    debug('Request login token.')

    const res = await getLoginToken()
    debug('Got login token response:', res)

    commit<ILoginCommitPayload>({
      type : t.LOGIN__SET_TEMP_TOKEN,
      token: res.token,
    })

    return res.token
  },

  async [t.LOGIN__REQUEST_ACCESS_TOKEN]({ commit, state }, payload: IRequestAccessTokenPayload): Promise<API.IUser> {
    debug('Request access token.')

    if (state.token == null) { throw new Error('No token found!') }

    const res = await getAccessToken(state.token.key, state.token.secret, payload.verifier)
    debug('Got access token response:', res)

    commit<ILoginCommitPayload>({
      type : t.LOGIN__SET_AUTH_INFO,
      token: res.token,
      user : res.user,
    })

    return res.user
  },
}
