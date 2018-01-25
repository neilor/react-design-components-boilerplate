import { combineReducers } from 'redux';
import { combineEpics } from 'redux-observable';

import login, {
  epics as loginEpics,
  IReducerState as ILoginState
} from 'reducers/login';

export const rootEpic = combineEpics(loginEpics);

export interface IRootState {
  login: ILoginState;
}

export default combineReducers<IRootState>({
  login
});
