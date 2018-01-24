import { combineReducers } from 'redux';
import { combineEpics } from 'redux-observable';

import todos, { todoEpics } from 'reducers/todos';
import login, { IReducerState as ILoginState } from 'reducers/login';

export const rootEpic = combineEpics(todoEpics);

export interface IRootState {
  todos: ITodoStoreState;
  login: ILoginState;
}

export default combineReducers<IRootState>({
  todos,
  login
});
