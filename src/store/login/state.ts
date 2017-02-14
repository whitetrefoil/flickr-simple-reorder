import { loginUrl } from './actions'

interface ILoginState {
  loginUrl: string
  frob: string
  token: string
}

const state: ILoginState = {
  loginUrl,
  frob: null,
  token: null,
}

export { ILoginState, state }
