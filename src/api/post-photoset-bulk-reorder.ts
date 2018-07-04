import { getLogger } from '@whitetrefoil/debug-log'
import * as request  from 'superagent'
import * as API      from './types/api'


const { debug } = getLogger(`/src/${__filename.split('?')[0]}`)


export function postPhotosetBulkReorder(
  nsid: string,
  setIds: string[],
  orderBy: API.IOrderByOption,
  isDesc: boolean,
  token: string,
  secret: string,
): request.SuperAgentRequest {

  debug(`Bulk reorder photosets: ${setIds}`)

  return request.post('/api/photosets/bulk_reorder')
    .send({ nsid, setIds, orderBy, isDesc, token, secret })
}
