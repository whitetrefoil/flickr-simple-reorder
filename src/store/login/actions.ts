import * as md5          from 'blueimp-md5'
import * as _            from 'lodash'
import { ActionContext } from 'vuex'
import * as t            from '../types'
import { ILoginState }   from './state'

export type ILoginActionContext = ActionContext<ILoginState, any>

const authUrl   = 'http://flickr.com/services/auth/'
const endpoint  = 'https://api.flickr.com/services/rest/'
const methods   = {
  getToken  : 'flickr.auth.getToken',
  checkToken: 'flickr.auth.checkToken',
}
const apiKey    = '5cdc0f5ec9c28202f1098f615edba5cd'
const apiSecret = 'e3b842e3b923b0fb'
const perms     = 'write'


const calculateSig = <T extends Object>(
  params: T,
  secret: string = apiSecret,
): string => {
  let paramStr = secret
  const keys = _.keys(params).sort()
  _.forEach(keys, (k) => {
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


const composeGetUrl = <T extends Object>(
  params: T,
  secret: string = apiSecret,
  url: string = endpoint,
): string => {
  let fullUrl = url
  const apiSig = calculateSig(params, secret)
  const keys = _.keys(params).sort()
  _.forEach(keys, (k, i) => {
    fullUrl += `${(i === 0) ? '?' : '&'}${k}=${params[k]}`
  })
  fullUrl += (keys.length === 0) ? '?' : '&'
  fullUrl += `api_sig=${apiSig}`
  return fullUrl
}

export const loginUrl = composeLoginUrl()

export const actions = {
  [t.LOGIN__REQUEST_TOKEN]({ state, commit }: ILoginActionContext) {
    const url = composeGetUrl({
      api_key: apiKey,
      frob: state.frob,
      format: 'json',
      nojsoncallback: '1',
    })
    commit('setToken', url)
  },
}
