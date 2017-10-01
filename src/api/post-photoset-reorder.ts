import * as request     from 'superagent'
import { getLogger }    from '../services/log'
import * as API         from './types/api'
import { IResponseXHR } from './types/response'

const debugPostPhotosetReorder = getLogger('/api/post-photoset-reorder.ts').debug
export async function postPhotosetReorder(
  nsid: string,
  setId: string,
  orderBy: API.IOrderByOption,
  isDesc: boolean,
  token: string,
  secret: string,
): IResponseXHR<API.IPostPhotosetReorderResponse> {
  debugPostPhotosetReorder('Get photoset list for user: ', nsid)

  let res: request.Response
  let data: API.IPostPhotosetReorderResponse
  try {
    res  = await request.post('/api/photosets/reorder')
      .send({ nsid, setId, orderBy, isDesc, token, secret })
    data = res.body.data
  } catch (e) {
    // TODO: Handle failed auth
    debugPostPhotosetReorder(e)
    throw e
  }

  return { res, data }
}
