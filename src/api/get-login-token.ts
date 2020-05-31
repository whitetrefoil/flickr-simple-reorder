import type { GetLoginTokenResponse } from '~/interfaces/api';
import { get }                        from './base';


export const getLoginToken = async(): Promise<GetLoginTokenResponse> => get('auth/loginToken');
