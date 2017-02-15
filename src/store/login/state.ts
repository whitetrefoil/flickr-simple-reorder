import { loginUrl } from './actions'

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

export const state: ILoginState = {
  loginUrl,
  token: null,
  user : null,
}
