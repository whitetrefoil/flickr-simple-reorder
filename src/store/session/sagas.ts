import { call, fork, put, select, take, takeLatest } from 'redux-saga/effects';
import { ActionType }                                from 'typesafe-actions';
import { getAccessToken }                            from '~/api/get-access-token';
import { getLoginToken }                             from '~/api/get-login-token';
import { RootSelected }                              from '~/hooks/use-root-selector';
import { KeySecret, User }                           from '~/interfaces/api';
import inStorage                                     from '~/utils/in-storage';
import * as A                                        from './actions';
import { $token }                                    from './selectors';


function *doFetchToken() {
  try {
    const { token }: AsyncReturnValue<typeof getLoginToken> = yield call(getLoginToken);
    yield put(A.FETCH_TOKEN.success(token));
  } catch (e) {
    yield put(A.FETCH_TOKEN.failure(e));
  }
}


function *doVerifyToken(action: ActionType<typeof A.VERIFY_TOKEN.request>) {
  const { key, verifier } = action.payload;
  const token: RootSelected<typeof $token> = yield select($token);
  if (token?.secret == null) {
    yield put(A.VERIFY_TOKEN.failure(new Error('token does not exist')));
    return;
  }
  try {
    const res: AsyncReturnValue<typeof getAccessToken> = yield call(getAccessToken, {
      token : key,
      secret: token.secret,
      verifier,
    });
    yield put(A.VERIFY_TOKEN.success(res));
  } catch (e) {
    yield put(A.VERIFY_TOKEN.failure(e));
  }
}

function *doSaveAuth(token?: KeySecret, user?: User) {
  if (token == null) {
    yield call(inStorage.remove, 'cache');
  } else {
    const [k, t] = token.key.split('-');
    yield call(inStorage.set, 'cache', {
      k,
      t,
      s: token.secret,
      u: user,
    });
  }
}

export function *watch() {
  yield takeLatest(A.FETCH_TOKEN.request, doFetchToken);
  yield takeLatest(A.VERIFY_TOKEN.request, doVerifyToken);
  yield fork(function *() {
    // eslint-disable-next-line no-constant-condition
    while (true) {
      const action: ActionType<typeof A.VERIFY_TOKEN.success|typeof A.VERIFY_TOKEN.failure|typeof A.AUTH_ERROR> = yield take(
        [
          A.FETCH_TOKEN.success,
          A.FETCH_TOKEN.failure,
          A.VERIFY_TOKEN.success,
          A.VERIFY_TOKEN.failure,
          A.AUTH_ERROR,
        ]);
      yield fork(doSaveAuth, (action.payload as ActionType<typeof A.VERIFY_TOKEN.success>['payload'])?.token);
    }
  });
}
