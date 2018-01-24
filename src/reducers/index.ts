import { combineReducers } from 'redux';
import { IRootState } from 'types/redux';
import todos, { todoEpics } from './todos';
import { combineEpics } from 'redux-observable';

export const rootEpic = combineEpics(todoEpics);

export default combineReducers<IRootState>({
  todos
});
