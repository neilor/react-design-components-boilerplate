import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Route, Switch } from 'react-router';
import { ConnectedRouter } from 'react-router-redux';
import 'rxjs';

import Login from 'app/login/container';
import Home from 'app/home/container';
import { configureStore, history } from 'store';

import './index.scss';

const store = configureStore();

ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/login" component={Login} />
      </Switch>
    </ConnectedRouter>
  </Provider>,
  document.getElementById('root')
);
