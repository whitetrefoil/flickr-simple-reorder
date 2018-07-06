import { getLogger }    from '@whitetrefoil/debug-log'
import { AxiosPromise } from 'axios'
import * as API         from './types/api'
import { axios }        from './types/base'


const { debug } = getLogger(`/src/${__filename.split('?')[0]}`)


export function postPhotosetBulkReorder(
  nsid: string,
  setIds: string[],
  orderBy: API.IOrderByOption,
  isDesc: boolean,
  token: string,
  secret: string,
  onProgress: (ev: ProgressEvent) => void,
): AxiosPromise<string> {

  debug(`Bulk reorder photosets: ${setIds}`)

  return axios.post<string>(
    'photosets/bulk_reorder',
    { nsid, setIds, orderBy, isDesc, token, secret },
    {
      onDownloadProgress: onProgress,
      timeout           : 60000,
    },
  )
}
