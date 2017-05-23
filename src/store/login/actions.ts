import * as _            from 'lodash'
import { ActionContext } from 'vuex'
import { request }       from '../../services/api'
import * as t            from '../types'
import { ILoginState }   from './state'
import { getLogger }     from '../../services/log'
import {
  apiKey,
  apiSecret,
  perms,
  calculateSig,
  composeFormData,
} from '../helpers'

export type ILoginActionContext = ActionContext<ILoginState, any>

const log = getLogger('/store/login/actions.ts')

const authUrl = 'https://flickr.com/services/auth/'
const methods = {
  getToken     : 'flickr.auth.getToken',
  checkToken   : 'flickr.auth.checkToken',
  peopleGetInfo: 'flickr.people.getInfo',
}


const composeLoginUrl = (): string => {
  const params = {
    api_key: apiKey,
    perms,
  }
  const apiSig = calculateSig(params, apiSecret)
  return `${authUrl}?api_key=${apiKey}&perms=${perms}&api_sig=${apiSig}`
}

export const loginUrl = composeLoginUrl()


export const actions = {

  async [t.LOGIN__REQUEST_TOKEN]({ commit, dispatch, state }: ILoginActionContext, frob: string): Promise<any> {
    log.debug('Request token.')

    const data = composeFormData({
      frob,
      api_key: apiKey,
      method : methods.getToken,
    })

    const res = await request(data)

    log.debug('Response of "getToken":', res)

    if (_.isEmpty(_.get(res, 'data.auth.user'))
      || _.isEmpty(_.get(res, 'data.auth.token._content'))
    ) {
      throw res
    }
    commit(t.LOGIN__SET_TOKEN, res.data.auth.token._content)
    commit(t.LOGIN__SET_USER_INFO, res.data.auth.user)
    return await dispatch(t.LOGIN__REQUEST_USER_INFO, res.data.auth.user.nsid)
  },


  async [t.LOGIN__CHECK_TOKEN]({ state, commit, dispatch }: ILoginActionContext): Promise<any> {
    log.debug('Check token.')

    const data = composeFormData({
      api_key   : apiKey,
      method    : methods.checkToken,
      auth_token: state.token,
    })

    let res: any
    try {
      res = await request(data)
    } catch (e) {
      // Token is invalid, nothing to do.
      // TODO: Cleanup existing token.
      return
    }

    if (_.isEmpty(_.get(res, 'data.auth.user'))
      || _.isEmpty(_.get(res, 'data.auth.token._content'))
    ) {
      throw res
    }
    commit(t.LOGIN__SET_TOKEN, res.data.auth.token._content)
    commit(t.LOGIN__SET_USER_INFO, res.data.auth.user)
    return await dispatch(t.LOGIN__REQUEST_USER_INFO, res.data.auth.user.nsid)
  },

  async [t.LOGIN__REQUEST_USER_INFO]({ state, commit, dispatch }: ILoginActionContext): Promise<any> {
    log.debug('Request user info.')

    const nsid = _.get(state, 'user.nsid')
    log.debug(`Got nsid: ${nsid}`)

    if (!_.isString(nsid)) {
      throw new Error('Invalid NSID!')
    }

    const data   = composeFormData({
      api_key: apiKey,
      user_id: nsid,
      method : methods.peopleGetInfo,
    })
    const res    = await request(data)
    const person = _.get(res, 'data.person')

    log.debug('Got person info:', person)
    if (_.isEmpty(person)) {
      return Promise.reject('Failed to get user info.')
    }

    log.debug('Committing person info into store.')
    commit(t.LOGIN__SET_USER_INFO, person)
  },
}
