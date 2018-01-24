import { combineReducers } from 'redux';
import todos from './todos';

export interface IRootState {
  todos: ITodoStoreState;
}

export interface IAction<Payload> {
  type: string;
  payload: Payload;
  error?: boolean;
}

export default combineReducers<IRootState>({
  todos
});
