import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Route, Switch } from 'react-router';
import { ConnectedRouter } from 'react-router-redux';
import 'rxjs';

import ProtectedRoutes from 'containers/ProtectedRoutes';

import Login from 'app/login/container';
import { configureStore, history } from 'store';

import './index.scss';

const store = configureStore();

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
