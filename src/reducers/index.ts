import { combineReducers } from 'redux';
import { IRootState } from 'types/redux';
import todos, { deleteTodoEpic } from './todos';
import { combineEpics } from 'redux-observable';

export const rootEpic = combineEpics(deleteTodoEpic);

export default combineReducers<IRootState>({
  todos
});
