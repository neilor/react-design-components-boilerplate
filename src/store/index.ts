import { applyMiddleware, createStore, Store } from 'redux';
import { createEpicMiddleware } from 'redux-observable';
import { composeWithDevTools } from 'redux-devtools-extension';

import { IRootState } from 'reducers';
import { logger } from '../middleware';
import rootReducer, { rootEpic } from '../reducers';

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
    module.hot.accept('../reducers', () => {
      const nextReducer = require('../reducers');
      store.replaceReducer(nextReducer);
    });
  }

  return store;
}
