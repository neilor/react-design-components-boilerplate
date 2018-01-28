import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Route, Switch } from 'react-router';
import { ConnectedRouter } from 'react-router-redux';
import 'rxjs';

import Login from 'app/login/container';
import Home from 'app/home/container';
import Movies from 'app/movies/container';
import { configureStore, history } from 'store';

import './index.scss';

const store = configureStore();

ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/movies/now_playing" component={Movies} />
        <Route exact path="/movies/top_rated" component={Movies} />
      </Switch>
    </ConnectedRouter>
  </Provider>,
  document.getElementById('root')
);
