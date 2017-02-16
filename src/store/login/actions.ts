import * as md5          from 'blueimp-md5'
import * as _            from 'lodash'
import { ActionContext } from 'vuex'
import { request }       from '../../services/api'
import * as t            from '../types'
import { ILoginState }   from './state'

export type ILoginActionContext = ActionContext<ILoginState, any>

const authUrl   = 'http://flickr.com/services/auth/'
const methods   = {
  getToken     : 'flickr.auth.getToken',
  checkToken   : 'flickr.auth.checkToken',
  peopleGetInfo: 'flickr.people.getInfo',
}
const apiKey    = '5cdc0f5ec9c28202f1098f615edba5cd'
const apiSecret = 'e3b842e3b923b0fb'
const perms     = 'write'


const calculateSig = <T extends Object>(
  params: T,
  secret: string = apiSecret,
): string => {
  let paramStr = secret
  const keys   = _.keys(params).sort()
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


const composeFormData = <T extends Object>(
  params: T,
  secret: string = apiSecret,
): FormData => {
  const apiSig   = calculateSig(params, secret)
  const formData = new FormData()
  _.forEach(params, (v, k) => {
    formData.append(k, v)
  })
  formData.append('api_sig', apiSig)
  return formData
}

export const loginUrl = composeLoginUrl()

export const actions = {

  [t.LOGIN__REQUEST_TOKEN](
    { commit, dispatch, state }: ILoginActionContext,
    frob: string,
  ): Promise<any> {
    const data = composeFormData({
      api_key       : apiKey,
      frob,
      format        : 'json',
      method        : methods.getToken,
      nojsoncallback: '1',
    })

    return request(data)
      .then((res) => {
        if (_.isEmpty(_.get(res, 'data.auth.user'))
          || _.isEmpty(_.get(res, 'data.auth.token._content'))
        ) {
          return Promise.reject(res)
        }
        commit(t.LOGIN__SET_TOKEN, res.data.auth.token._content)
        commit(t.LOGIN__SET_USER_INFO, res.data.auth.user)
      })
      .then(() => {
        return dispatch(t.LOGIN__REQUEST_USER_INFO)
      }) as Promise<any>
  },

  [t.LOGIN__REQUEST_USER_INFO]({ state, commit }: ILoginActionContext): Promise<any> {
    if (_.isEmpty(_.get(state, 'user.nsid'))) {
      return Promise.reject('No NSID!')
    }
    const data = composeFormData({
      api_key       : apiKey,
      user_id       : state.user.nsid,
      format        : 'json',
      method        : methods.peopleGetInfo,
      nojsoncallback: '1',
    })

    return request(data)
      .then((res) => {
        const person = _.get(res, 'data.person')
        if (_.isEmpty(person)) {
          return Promise.reject('Failed to get user info.')
        }
        commit(t.LOGIN__SET_USER_INFO, person)
      }) as Promise<any>
  },
}
