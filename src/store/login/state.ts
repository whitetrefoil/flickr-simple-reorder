import { loginUrl } from './actions'

interface ILoginState {
  loginUrl: string
  token: string
}

const state: ILoginState = {
  loginUrl,
  token: null,
}

export { ILoginState, state }
