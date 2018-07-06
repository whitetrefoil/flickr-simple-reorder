import { getLogger }        from '@whitetrefoil/debug-log'
import * as API             from './types/api'
import { axios, IResponse } from './types/base'


const { debug } = getLogger(`/src/${__filename.split('?')[0]}`)


export async function postPhotosetReorder(
  nsid: string,
  setId: string,
  orderBy: API.IOrderByOption,
  isDesc: boolean,
  token: string,
  secret: string,
  needLongTimeout = false,
): Promise<API.IPostPhotosetReorderResponse> {
  debug('Get photoset list for user: ', nsid)

  try {
    const config = needLongTimeout ? { timeout: 60000 } : undefined

    const res = await axios.post<IResponse<API.IPostPhotosetReorderResponse>>(
      'photosets/reorder',
      { nsid, setId, orderBy, isDesc, token, secret },
      config,
    )

    return res.data.data
  } catch (e) {
    // TODO: Handle failed auth
    debug(e)
    throw e
  }
}
