// tslint:disable:no-implicit-dependencies
import * as API      from 'flickr-simple-reorder-server/src/api'
import { getLogger } from '../../services/log'
import Storage       from '../../services/storage'

export interface ILoginState {
  token: API.IToken
  user: API.IUser
}

const log = getLogger('/store/login/state.ts')

const existingToken = Storage.get('cache')

log.debug(`Existing auth info: ${existingToken}`)

export const state: ILoginState = {
  token: {
    key   : null,
    secret: null,
  },
  user : null,
}

if (existingToken != null) {
  state.token.key    = `${existingToken.k}-${existingToken.t}`
  state.token.secret = existingToken.s
  state.user         = existingToken.u
}
