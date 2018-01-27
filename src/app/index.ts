import { combineReducers } from 'redux';
import { combineEpics } from 'redux-observable';
import { routerReducer } from 'react-router-redux';

import login, {
  epics as loginEpics,
  IReducerState as ILoginState
} from './login/reducers';

import home, {
  epics as homeEpics,
  IReducerState as IHomeState
} from './home/reducers';

export const rootEpic = combineEpics(loginEpics, homeEpics);

export interface IRootState {
  login: ILoginState;
  home: IHomeState;
}

export const rootReducer = combineReducers<IRootState>({
  login,
  home,
  router: routerReducer
});
