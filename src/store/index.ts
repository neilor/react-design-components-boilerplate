import { applyMiddleware, createStore, Store } from 'redux';
import { createEpicMiddleware } from 'redux-observable';
import { composeWithDevTools } from 'redux-devtools-extension';

import { logger } from '../middleware';
import { rootReducer, rootEpic, IRootState } from '../app';

export function configureStore(initialState?: IRootState) {
  const epicMiddleware = createEpicMiddleware(rootEpic);

  let middleware = applyMiddleware(logger as any, epicMiddleware);

  if (process.env.NODE_ENV === 'development') {
    middleware = composeWithDevTools(middleware);
  }

  const store = createStore(rootReducer, initialState, middleware) as Store<
    IRootState
  >;

  if (module.hot) {
    module.hot.accept('../app', () => {
      const nextReducer = require('../app');
      store.replaceReducer(nextReducer);
    });
  }

  return store;
}
