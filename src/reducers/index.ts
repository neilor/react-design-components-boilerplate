import { combineReducers } from 'redux';
import { IRootState } from 'types/redux';
import todos from './todos';

export default combineReducers<IRootState>({
  todos
});
