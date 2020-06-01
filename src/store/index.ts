import createSagaMiddleware, { Saga }                    from '@redux-saga/core';
import { applyMiddleware, combineReducers, createStore } from 'redux';
import { composeWithDevTools }                           from 'redux-devtools-extension';
import { fork }                                          from 'redux-saga/effects';
import inStorage                                         from '~/utils/in-storage';
// import list                                              from '~/features/list/reducer';
// import * as listSagas                                    from '~/features/list/sagas';
import session                                           from './session/reducer';
import * as sessionSagas                                 from './session/sagas';


export const rootReducer = combineReducers({
  session,
});

function *runSagas(sagas: Record<string, Saga>) {
  for (const key of Object.keys(sagas)) {
    yield fork(sagas[key]);
  }
}

function *rootWatch() {
  yield *runSagas(sessionSagas);
}


const defaultSession = (): RootState['session'] => {
  const cache = inStorage.get('cache');
  if (cache == null) {
    return {};
  }
  const { k, t, s, u } = cache;
  if (k == null || t == null || s == null) {
    return {};
  }
  const token = {
    key   : `${k}-${t}`,
    secret: s,
  };
  if (u == null) {
    return {
      token,
    };
  }
  const user = u;
  return {
    token,
    user,
  };
};

const createDefaultState = (): Partial<RootState> => ({
  session: defaultSession(),
});


export function configureStore(initialState: Partial<RootState> = createDefaultState()) {
  const composeEnhancers = composeWithDevTools({
    // Specify name here, actionsBlacklist, actionsCreators and other options if needed
  });

  const sagaMiddleware = createSagaMiddleware();

  const store = createStore(rootReducer, initialState, composeEnhancers(
    applyMiddleware(sagaMiddleware),
  ));

  sagaMiddleware.run(rootWatch);

  return store;
}


export const rootStore = configureStore();

export default rootStore;
