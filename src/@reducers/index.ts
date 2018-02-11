import { routerReducer } from 'react-router-redux';
import { combineReducers } from 'redux';
import { combineEpics } from 'redux-observable';

import {
  reducers as loginReducers,
  epics as loginEpics,
  IReducerState as ILoginState
} from './login';

import {
  reducers as homeReducers,
  epics as homeEpics,
  IReducerState as IHomeState
} from './home';

import {
  reducers as moviesReducers,
  epics as moviesEpics,
  IReducerState as IMoviesState
} from './movies';

export const rootEpic = combineEpics(loginEpics, homeEpics, moviesEpics);

export interface IRootState {
  login: ILoginState;
  home: IHomeState;
  movies: IMoviesState;
}

export const rootReducer = combineReducers<IRootState>({
  login: loginReducers,
  home: homeReducers,
  movies: moviesReducers,
  router: routerReducer
});
