import * as API      from 'flickr-simple-reorder-server/src/api'
import { getLogger } from '../../services/log'
import Storage       from '../../services/storage'

export interface ILoginState {
  token: API.IToken
  user: API.IUser
}

const log = getLogger('/store/login/state.ts')

const existingToken = Storage.get('token')

log.debug(`Existing token: ${existingToken}`)

export const state: ILoginState = {
  token: Storage.get('token'),
  user : null,
}
