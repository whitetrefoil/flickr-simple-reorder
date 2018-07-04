import { getLogger }    from '@whitetrefoil/debug-log'
import * as request     from 'superagent'
import * as API         from './types/api'
import { IResponseXHR } from './types/response'


const { debug } = getLogger(`/src/${__filename.split('?')[0]}`)


export async function getPhotosetList(token: string, secret: string, nsid: string): IResponseXHR<API.IGetPhotosetListResponse> {
  debug('Get photoset list for user: ', nsid)

  let res: request.Response
  let data: API.IGetPhotosetListResponse
  try {
    res = await request.get('/api/photosets/list')
      .query({ token, secret, nsid })
      .timeout(process.env.NODE_ENV === 'development' ? 3000 : 10000)
    data = res.body.data
  } catch (e) {
    // TODO: Handle failed auth
    debug(e)
    throw e
  }

  return { res, data }
}
