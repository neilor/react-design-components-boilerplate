import { createBrowserHistory } from 'history';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Route, Switch } from 'react-router';
import { ConnectedRouter } from 'react-router-redux';
import 'rxjs';

import Login from 'app/login/container';
import { configureStore } from 'store';

import './index.scss';

const store = configureStore();
const history = createBrowserHistory();

ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <Switch>
        <Route path="/" component={Login} />
        <Route path="/foo" component={Login} />
      </Switch>
    </ConnectedRouter>
  </Provider>,
  document.getElementById('root')
);
