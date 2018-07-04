import { getLogger }    from '@whitetrefoil/debug-log'
import * as request     from 'superagent'
import * as API         from './types/api'
import { IResponseXHR } from './types/response'


const { debug } = getLogger(`/src/${__filename.split('?')[0]}`)


export async function getAccessToken(token: string, secret: string, verifier: string): IResponseXHR<API.IGetAccessTokenResponse> {
  debug('Get access token with: ', arguments)

  let res: request.Response
  let data: API.IGetAccessTokenResponse
  try {
    res = await request.get('/api/auth/accessToken')
      .query({ token, secret, verifier })
      .timeout(process.env.NODE_ENV === 'development' ? 3000 : 10000)
    data = res.body.data
  } catch (e) {
    debug(e)
    throw e
  }

  return { res, data }
}
