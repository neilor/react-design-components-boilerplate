import { combineReducers } from 'redux';
import { combineEpics } from 'redux-observable';
import { routerReducer } from 'react-router-redux';

import login, {
  epics as loginEpics,
  IReducerState as ILoginState
} from './login/reducers';

export const rootEpic = combineEpics(loginEpics);

export interface IRootState {
  login: ILoginState;
}

export const rootReducer = combineReducers<IRootState>({
  login,
  router: routerReducer
});
