import { getLogger }        from '@whitetrefoil/debug-log'
import * as API             from './types/api'
import { axios, IResponse } from './types/base'


const { debug } = getLogger(`/src/${__filename.split('?')[0]}`)


export async function getAccessToken(
  token: string,
  secret: string,
  verifier: string,
): Promise<API.IGetAccessTokenResponse> {
  debug('Get access token with: ', arguments)

  try {
    const res = await axios.get<IResponse<API.IGetAccessTokenResponse>>(
      'auth/accessToken',
      { params: { token, secret, verifier } },
    )
    return res.data.data
  } catch (e) {
    debug(e)
    throw e
  }
}
