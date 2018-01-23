import { combineReducers } from 'redux';
import todos from './todos';

export interface IRootState {
  todos: ITodoStoreState;
}

export default combineReducers<IRootState>({
  todos
});
