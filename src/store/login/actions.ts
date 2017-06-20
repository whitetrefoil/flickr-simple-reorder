import * as _            from 'lodash'
import { ActionContext } from 'vuex'
import * as API          from '../../api/types/api'
import { getLoginToken } from '../../api/get-login-token'
import { getLogger }     from '../../services/log'
import * as t            from '../types'
import { ILoginState }   from './state'

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

const log = getLogger('/store/login/actions.ts')

export const actions = {

  async [t.LOGIN__REQUEST_LOGIN_TOKEN]({ commit, dispatch, state }: ILoginActionContext): Promise<API.IToken> {
    log.debug('Request login token.')

    const res = await getLoginToken()

    commit(t.LOGIN__SET_LOGIN_TOKEN, res.data.token)

    return res.data.token
  },
  //
  // async [t.LOGIN__REQUEST_TOKEN]({ commit, dispatch, state }: ILoginActionContext, frob: string): Promise<any> {
  //   log.debug('Request token.')
  //
  //   const data = composeFormData({
  //     frob,
  //     api_key: apiKey,
  //     method : methods.getToken,
  //   })
  //
  //   const res = await request(data)
  //
  //   log.debug('Response of "getToken":', res)
  //
  //   if (_.isEmpty(_.get(res, 'data.auth.user'))
  //     || _.isEmpty(_.get(res, 'data.auth.token._content'))
  //   ) {
  //     throw res
  //   }
  //   commit(t.LOGIN__SET_TOKEN, res.data.auth.token._content)
  //   commit(t.LOGIN__SET_USER_INFO, res.data.auth.user)
  //   return await dispatch(t.LOGIN__REQUEST_USER_INFO, res.data.auth.user.nsid)
  // },
  //
  //
  // async [t.LOGIN__CHECK_TOKEN]({ state, commit, dispatch }: ILoginActionContext): Promise<any> {
  //   log.debug('Check token.')
  //
  //   const data = composeFormData({
  //     api_key   : apiKey,
  //     method    : methods.checkToken,
  //     auth_token: state.token,
  //   })
  //
  //   let res: any
  //   try {
  //     res = await request(data)
  //   } catch (e) {
  //     // Token is invalid, nothing to do.
  //     // TODO: Cleanup existing token.
  //     return
  //   }
  //
  //   if (_.isEmpty(_.get(res, 'data.auth.user'))
  //     || _.isEmpty(_.get(res, 'data.auth.token._content'))
  //   ) {
  //     throw res
  //   }
  //   commit(t.LOGIN__SET_TOKEN, res.data.auth.token._content)
  //   commit(t.LOGIN__SET_USER_INFO, res.data.auth.user)
  //   return await dispatch(t.LOGIN__REQUEST_USER_INFO, res.data.auth.user.nsid)
  // },
  //
  // async [t.LOGIN__REQUEST_USER_INFO]({ state, commit, dispatch }: ILoginActionContext): Promise<any> {
  //   log.debug('Request user info.')
  //
  //   const nsid = _.get(state, 'user.nsid')
  //   log.debug(`Got nsid: ${nsid}`)
  //
  //   if (!_.isString(nsid)) {
  //     throw new Error('Invalid NSID!')
  //   }
  //
  //   const data = composeFormData({
  //     api_key: apiKey,
  //     user_id: nsid,
  //     method : methods.peopleGetInfo,
  //   })
  //
  //   const res            = await request(data)
  //   const officialPerson = _.get(res, 'data.person') as IOfficialUserInfoResponse
  //
  //   log.debug('Got person info:', officialPerson)
  //   if (_.isEmpty(officialPerson)) {
  //     return Promise.reject('Failed to get user info.')
  //   }
  //
  //   const person: IUserInfo = {
  //     fullname  : state.user.fullname,
  //     username  : officialPerson.username._content,
  //     nsid      : officialPerson.nsid,
  //     iconfarm  : officialPerson.iconfarm,
  //     iconserver: officialPerson.iconserver,
  //     photosurl : officialPerson.photosurl._content,
  //     profileurl: officialPerson.photosurl._content,
  //   }
  //
  //   log.debug('Converted person info:', person)
  //   log.debug('Committing person info into store.')
  //   commit(t.LOGIN__SET_USER_INFO, person)
  // },
}
