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

export namespace rootState {
  export type login = ILoginState;
  export type home = IHomeState;
  export type movies = IMoviesState;
}

export interface IRootState {
  login: rootState.login;
  home: rootState.home;
  movies: rootState.movies;
}

export const rootReducer = combineReducers<IRootState>({
  login: loginReducers,
  home: homeReducers,
  movies: moviesReducers,
  router: routerReducer
});
