import type { GetAccessTokenResponse } from '~/interfaces/api';
import { get }                         from './base';


export interface GetAccessTokenReqParams {
  token: string;
  secret: string;
  verifier: string;
}

export const getAccessToken = async({
  token,
  secret,
  verifier,
}: GetAccessTokenReqParams): Promise<GetAccessTokenResponse> =>
  get('auth/accessToken', {
    searchParams: {
      token,
      secret,
      verifier,
    },
  });
