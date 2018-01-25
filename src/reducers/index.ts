import { combineReducers } from 'redux';
import { combineEpics } from 'redux-observable';

import todos, { epics as todoEpics } from 'reducers/todos';
import login, {
  epics as loginEpics,
  IReducerState as ILoginState
} from 'reducers/login';

export const rootEpic = combineEpics(todoEpics, loginEpics);

export interface IRootState {
  todos: ITodoStoreState;
  login: ILoginState;
}

export default combineReducers<IRootState>({
  todos,
  login
});
