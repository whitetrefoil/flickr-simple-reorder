import { getLogger }        from '@whitetrefoil/debug-log'
import * as API             from './types/api'
import { axios, IResponse } from './types/base'


const { debug } = getLogger(`/src/${__filename.split('?')[0]}`)


export async function getPhotosetList(
  token: string,
  secret: string,
  nsid: string,
): Promise<API.IGetPhotosetListResponse> {
  debug('Get photoset list for user: ', nsid)

  try {
    const res = await axios.get<IResponse<API.IGetPhotosetListResponse>>(
      'photosets/list',
      { params: { token, secret, nsid } },
    )
    return res.data.data
  } catch (e) {
    // TODO: Handle failed auth
    debug(e)
    throw e
  }
}
