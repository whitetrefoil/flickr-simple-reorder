import * as md5          from 'blueimp-md5'
import * as _            from 'lodash'
import { ActionContext } from 'vuex'
import { request }       from '../../services/api'
import * as t            from '../types'
import { ILoginState }   from './state'
import { getLogger }     from '../../services/log'

export type ILoginActionContext = ActionContext<ILoginState, any>

const log = getLogger('/store/login/actions.ts')

const authUrl   = 'http://flickr.com/services/auth/'
const methods   = {
  getToken     : 'flickr.auth.getToken',
  checkToken   : 'flickr.auth.checkToken',
  peopleGetInfo: 'flickr.people.getInfo',
}
const apiKey    = '5cdc0f5ec9c28202f1098f615edba5cd'
const apiSecret = 'e3b842e3b923b0fb'
const perms     = 'write'


const calculateSig = <T extends object>(
  params: T,
  secret: string = apiSecret,
): string => {
  let paramStr = secret
  const keys   = _.keys(params).sort()
  _.forOwn(keys, (k) => {
    paramStr += k + params[k]
  })
  return md5(paramStr)
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


const composeFormData = <T extends object>(
  params: T,
  secret: string = apiSecret,
): FormData => {
  const paramsWithJson = _.defaults(params, {
    format        : 'json',
    nojsoncallback: '1',
  })
  const apiSig         = calculateSig(paramsWithJson, secret)
  const formData       = new FormData()
  _.forOwn(paramsWithJson, (v, k) => {
    formData.append(k, v)
  })
  formData.append('api_sig', apiSig)
  return formData
}


export const actions = {

  async [t.LOGIN__REQUEST_TOKEN]({ commit, dispatch, state }: ILoginActionContext, frob: string): Promise<any> {
    log.debug('Request token.')

    const data = composeFormData({
      frob,
      api_key: apiKey,
      method : methods.getToken,
    })

    const res = await request(data)

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

    const res = await request(data)

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

    const data = composeFormData({
      api_key: apiKey,
      user_id: nsid,
      method : methods.peopleGetInfo,
    })
    const res = await request(data)
    const person = _.get(res, 'data.person')

    log.debug('Got person info:', person)
    if (_.isEmpty(person)) {
      return Promise.reject('Failed to get user info.')
    }

    log.debug('Committing person info into store.')
    commit(t.LOGIN__SET_USER_INFO, person)
  },
}
