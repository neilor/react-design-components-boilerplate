import { applyMiddleware, createStore, Store } from 'redux';
import { createEpicMiddleware } from 'redux-observable';
import { composeWithDevTools } from 'redux-devtools-extension';

import createHistory from 'history/createBrowserHistory';
import { routerMiddleware } from 'react-router-redux';

import { rootReducer, rootEpic, IRootState } from '@reducers';
import { logger } from '@middleware';

export const history = createHistory();

export function configureStore(initialState?: IRootState) {
  const routeMiddleware = routerMiddleware(history);

  const epicMiddleware = createEpicMiddleware(rootEpic);

  let middleware = applyMiddleware(
    logger as any,
    epicMiddleware,
    routeMiddleware
  );

  if (process.env.NODE_ENV === 'development') {
    middleware = composeWithDevTools(middleware);
  }

  const store = createStore(rootReducer, initialState, middleware) as Store<
    IRootState
  >;

  if (module.hot) {
    module.hot.accept('@reducers', () => {
      const {
        rootReducer: nextRootReducer,
        rootEpic: nextRootEpic
      } = require('@reducers');
      store.replaceReducer(nextRootReducer);
      epicMiddleware.replaceEpic(nextRootEpic);
    });
  }

  return store;
}

export default configureStore();
