// tslint:disable:no-implicit-dependencies
import { getLogger } from '@whitetrefoil/debug-log'
import * as API      from '../../api/types/api'
import Storage       from '../../services/storage'


export interface ILoginState {
  token: API.IToken|undefined
  user: API.IUser|undefined
}


const { debug } = getLogger(`/src/${__filename.split('?')[0]}`)

const existingToken = Storage.get('cache')


debug(`Existing auth info: ${existingToken}`)


export const state: ILoginState = {
  token: undefined,
  user : undefined,
}

if (existingToken != null
    && existingToken.k != null
    && existingToken.t != null
    && existingToken.s != null
    && existingToken.u != null
) {
  state.token = {
    key   : `${existingToken.k}-${existingToken.t}`,
    secret: existingToken.s,
  }
  state.user  = existingToken.u
}
