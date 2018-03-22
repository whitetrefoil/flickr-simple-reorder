import { getLogger }      from '@whitetrefoil/debug-log'
import { ActionContext }  from 'vuex'
import { getAccessToken } from '../../api/get-access-token'
import { getLoginToken }  from '../../api/get-login-token'
import * as API           from '../../api/types/api'
import * as t             from '../types'
import { ILoginState }    from './state'

export type ILoginActionContext = ActionContext<ILoginState, any>

interface IOfficialUserInfoResponse {
  id: string
  nsid: string
  username: {
    _content: string,
  }
  iconfarm: number,
  iconserver: string,
  photosurl: {
    _content: string,
  }
  profileurl: {
    _content: string,
  }
}

const debug = getLogger('/store/login/actions.ts').debug

export const actions = {

  async [t.LOGIN__REQUEST_LOGIN_TOKEN]({ commit, state }: ILoginActionContext): Promise<API.IToken> {
    debug('Request login token.')

    const res = await getLoginToken()
    debug('Got login token response:', res)

    commit(t.LOGIN__SET_TEMP_TOKEN, res.data.token)

    return res.data.token
  },

  async [t.LOGIN__REQUEST_ACCESS_TOKEN]({ commit, state }: ILoginActionContext, verifier: string): Promise<API.IUser> {
    debug('Request access token.')

    if (state.token == null || state.token.key == null || state.token.secret == null) {
      throw new Error('No token exists.')
    }

    const res = await getAccessToken(state.token.key, state.token.secret, verifier)
    debug('Got access token response:', res)

    commit(t.LOGIN__SET_AUTH_INFO, {
      token: res.data.token,
      user : res.data.user,
    })

    return res.data.user
  },
}
