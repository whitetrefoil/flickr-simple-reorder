import * as request  from 'superagent'
import { getLogger } from '../services/log'
import * as API      from './types/api'

const debugPostPhotosetBulkReorder = getLogger('/api/post-photoset-bulk-reorder.ts').debug

export function postPhotosetBulkReorder(
  nsid: string,
  setIds: string[],
  orderBy: API.IOrderByOption,
  isDesc: boolean,
  token: string,
  secret: string,
): request.SuperAgentRequest {

  debugPostPhotosetBulkReorder(`Bulk reorder photosets: ${setIds}`)

  return request.post('/api/photosets/bulk_reorder')
    .send({ nsid, setIds, orderBy, isDesc, token, secret })
}
