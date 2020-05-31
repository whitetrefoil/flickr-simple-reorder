import { createSelector }  from 'reselect';
import { RS }              from '~/hooks/use-root-selector';
import { KeySecret, User } from '~/interfaces/api';


const createLoginUrl = (token: string) => `https://www.flickr.com/services/oauth/authorize?oauth_token=${token}&perms=write`;


export const $token: RS<KeySecret|nil> = s => s.session.token;
export const $verifier: RS<string|nil> = s => s.session.verifier;
export const $user: RS<User|nil> = s => s.session.user;
export const $loading: RS<boolean> = s => s.session.loading === true;
export const $error: RS<Error|nil> = s => s.session.error;

export const $loginUrl: RS<string|nil> = createSelector($token, token =>
  token == null ? null : createLoginUrl(token.key),
);

export const $hasLogin: RS<boolean> = createSelector($token, $user, (t, u) =>
  t?.key != null && t.secret != null && u != null,
);
