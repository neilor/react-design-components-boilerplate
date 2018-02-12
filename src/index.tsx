import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Route, Switch } from 'react-router';
import { ConnectedRouter } from 'react-router-redux';
import 'rxjs';
import 'typescript-fsa-redux-observable'; // for adding ofType function in action$

import ProtectedRoutes from '@containers/ProtectedRoutes';

import Login from '@routes/login';
import store, { history } from '@store';

import './index.scss';

ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <Switch>
        <Route exact path="/login" component={Login} />
        <Route component={ProtectedRoutes} />
      </Switch>
    </ConnectedRouter>
  </Provider>,
  document.getElementById('root')
);

if (module.hot) {
  module.hot.accept();
}
