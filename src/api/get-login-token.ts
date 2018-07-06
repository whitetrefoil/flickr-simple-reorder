import { getLogger }        from '@whitetrefoil/debug-log'
import * as API             from './types/api'
import { axios, IResponse } from './types/base'


const { debug } = getLogger(`/src/${__filename.split('?')[0]}`)


export async function getLoginToken(): Promise<API.IGetLoginTokenResponse> {
  try {
    const res = await axios.get<IResponse<API.IGetLoginTokenResponse>>('auth/loginToken')
    return res.data.data
  } catch (e) {
    debug(e)
    throw e
  }
}
