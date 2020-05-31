import type { GetPhotosetListResponse } from '~/interfaces/api';
import { get }                          from './base';


export interface GetPhotosetListReqParams {
  token: string;
  secret: string;
  nsid: string;
}

export const getPhotosetList = async({
  token,
  secret,
  nsid,
}: GetPhotosetListReqParams): Promise<GetPhotosetListResponse> => get('photosets/list', {
  searchParams: { token, secret, nsid },
});
