import { ActionType, createReducer } from 'typesafe-actions';
import { KeySecret, User }           from '~/interfaces/api';
import * as A                        from './actions';


export interface State {
  token?: KeySecret;
  user?: User;
  verifier?: string;
  loading?: true;
  error?: Error;
}

export default createReducer<State, ActionType<typeof A>>({})

  .handleAction(A.FETCH_TOKEN.request, s => ({
    loading: true,
  }))

  .handleAction(A.FETCH_TOKEN.success, (s, { payload: token }) => ({
    token,
  }))

  .handleAction(A.FETCH_TOKEN.failure, (s, { payload: error }) => ({
    error,
  }))

  .handleAction(A.VERIFY_TOKEN.request, (s, { payload: { verifier } }) => ({
    token  : s.token,
    verifier,
    loading: true,
  }))

  .handleAction(A.VERIFY_TOKEN.success, (s, { payload: { token, user } }) => ({
    token, user,
  }))

  .handleAction(A.VERIFY_TOKEN.failure, (s, { payload: loadError }) => ({
    ...s,
    access: { loadError },
  }))

  .handleAction(A.AUTH_ERROR, () => ({}))
;
