import { DownloadProgress }   from 'ky';
import type { OrderByOption } from '~/interfaces/api';
import { post }               from './base';


export interface PostPhotosetBulkReorderReqParams {
  nsid: string;
  setIds: string[];
  orderBy: OrderByOption;
  isDesc: boolean;
  token: string;
  secret: string;
}


export const postPhotosetBulkReorder = (
  {
    nsid,
    setIds,
    orderBy,
    isDesc,
    token,
    secret,
  }: PostPhotosetBulkReorderReqParams,
  onDownloadProgress: (progress: DownloadProgress, chunk: Uint8Array) => void,
): Promise<void> => post('photosets/bulk_reorder', {
  json: { nsid, setIds, orderBy, isDesc, token, secret },
  onDownloadProgress,
});
