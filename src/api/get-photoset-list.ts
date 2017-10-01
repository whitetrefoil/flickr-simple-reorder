import * as request     from 'superagent'
import { getLogger }    from '../services/log'
import * as API         from './types/api'
import { IResponseXHR } from './types/response'

const debugGetPhotosetList = getLogger('/api/get-photoset-list.ts').debug
export async function getPhotosetList(token: string, secret: string, nsid: string): IResponseXHR<API.IGetPhotosetListResponse> {
  debugGetPhotosetList('Get photoset list for user: ', nsid)

  let res: request.Response
  let data: API.IGetPhotosetListResponse
  try {
    res = await request.get('/api/photosets/list')
      .query({ token, secret, nsid })
      .timeout(process.env.NODE_ENV === 'development' ? 3000 : 10000)
    data = res.body.data
  } catch (e) {
    // TODO: Handle failed auth
    debugGetPhotosetList(e)
    throw e
  }

  return { res, data }
}
