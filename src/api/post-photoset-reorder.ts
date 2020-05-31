import type { OrderByOption, PostPhotosetReorderResponse } from '~/interfaces/api';
import { post }                                            from './base';


export interface PostPhotosetReorderReqParams {
  nsid: string;
  setId: string;
  orderBy: OrderByOption;
  isDesc: boolean;
  token: string;
  secret: string;
}


export const postPhotosetReorder = async({
  nsid,
  setId,
  orderBy,
  isDesc,
  token,
  secret,
}: PostPhotosetReorderReqParams): Promise<PostPhotosetReorderResponse> => post('photosets/reorder', {
  json: { nsid, setId, orderBy, isDesc, token, secret },
});
