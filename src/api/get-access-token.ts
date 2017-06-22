import * as request     from 'superagent'
import { getLogger }    from '../services/log'
import * as API         from './types/api'
import { IResponseXHR } from './types/response'
import { Response }     from 'superagent'

const debugAccessToken = getLogger('/api/get-access-token.ts').debug
export async function getAccessToken(token: string, secret: string, verifier: string): IResponseXHR<API.IGetAccessTokenResponse> {
  debugAccessToken('Get access token with: ', arguments)

  let res: Response
  let data: API.IGetAccessTokenResponse
  try {
    res = await request.get('/api/auth/accessToken')
      .query({ token, secret, verifier })
      .timeout(process.env.NODE_ENV === 'development' ? 3000 : 10000)
    data = res.body.data
  } catch (e) {
    debugAccessToken(e)
    throw e
  }

  return { res, data }
}
