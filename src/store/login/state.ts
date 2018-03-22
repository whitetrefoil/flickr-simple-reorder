// tslint:disable:no-implicit-dependencies
import { getLogger } from '@whitetrefoil/debug-log'
import * as API      from '../../api/types/api'
import Storage       from '../../services/storage'

export interface ILoginState {
  token?: API.IToken
  user?: API.IUser
}

const log = getLogger('/store/login/state.ts')

const existingToken = Storage.get('cache')

log.debug(`Existing auth info: ${existingToken}`)

export const state: ILoginState = {
  token: undefined,
  user : undefined,
}

if (existingToken != null && existingToken.s != null && existingToken.t != null) {
  state.token = {
    key   : `${existingToken.k}-${existingToken.t}`,
    secret: existingToken.s,
  }
  state.user  = existingToken.u
}
