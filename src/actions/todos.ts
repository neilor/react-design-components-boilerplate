import { createAction } from "redux-actions";
import * as Actions from "constants/actions";

export const addTodo = createAction<ITodoItemData>(Actions.ADD_TODO);
export const editTodo = createAction<ITodoItemData>(Actions.EDIT_TODO);
export const deleteTodo = createAction<ITodoItemId>(Actions.DELETE_TODO);
export const completeTodo = createAction<ITodoItemId>(Actions.COMPLETE_TODO);
export const completeAll = createAction(Actions.COMPLETE_ALL);
export const clearCompleted = createAction(Actions.CLEAR_COMPLETED);
