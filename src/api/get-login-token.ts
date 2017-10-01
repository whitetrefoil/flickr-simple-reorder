import * as request     from 'superagent'
import { getLogger }    from '../services/log'
import * as API         from './types/api'
import { IResponseXHR } from './types/response'

const debugLoginToken = getLogger('/api/get-login-token.ts').debug
export async function getLoginToken(): IResponseXHR<API.IGetLoginTokenResponse> {
  let res: request.Response
  let data: API.IGetLoginTokenResponse
  try {
    res = await request.get('/api/auth/loginToken')
      .timeout(process.env.NODE_ENV === 'development' ? 3000 : 10000)
    data = res.body.data
  } catch (e) {
    debugLoginToken(e)
    throw e
  }

  return { res, data }
}
