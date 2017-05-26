import { loginUrl }  from './actions'
import { getLogger } from '../../services/log'
import Storage       from '../../services/storage'

export interface IUserInfo {
  fullname: string
  nsid: string
  username: string
}

export interface ILoginState {
  loginUrl: string
  token: string
  user: IUserInfo
}

const log = getLogger('/store/login/state.ts')

const existingToken = Storage.get('token')

log.debug(`Existing token: ${existingToken}`)

export const state: ILoginState = {
  loginUrl,
  token: Storage.get('token'),
  user : null,
}
