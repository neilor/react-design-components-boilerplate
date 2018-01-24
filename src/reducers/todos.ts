import { Epic, combineEpics } from 'redux-observable';
import { handleActions, Action } from 'redux-actions';
import * as Actions from 'constants/actions';
import { IRootState } from 'reducers';

const initialState: ITodoStoreState = [
  {
    id: 0,
    text: 'Use Redux',
    completed: false
  }
];

export default handleActions<ITodoStoreState, any>(
  {
    [Actions.ADD_TODO]: (state, action: Action<ITodoItemData>) => {
      return [
        {
          id: state.reduce((maxId, todo) => Math.max(todo.id, maxId), -1) + 1,
          completed: false,
          ...(action.payload as ITodoItemData)
        },
        ...state
      ];
    },

    [Actions.DELETE_TODO_ACTUAL]: (state, action: Action<ITodoItemId>) => {
      return state.filter(todo => todo.id !== action.payload);
    },

    [Actions.EDIT_TODO]: (state, action: Action<ITodoItemData>) => {
      const payload = action.payload as ITodoItemData;

      return state.map(todo => {
        return todo.id === payload.id ? { ...todo, text: payload.text } : todo;
      });
    },

    [Actions.COMPLETE_TODO]: (state, action: Action<ITodoItemId>) => {
      return state.map(todo => {
        return todo.id === action.payload
          ? { ...todo, completed: !todo.completed }
          : todo;
      });
    },

    [Actions.COMPLETE_ALL]: state => {
      const areAllMarked = state.every(todo => todo.completed);
      return state.map(todo => {
        return {
          ...todo,
          completed: !areAllMarked
        };
      });
    },

    [Actions.CLEAR_COMPLETED]: state => {
      return state.filter(todo => todo.completed === false);
    }
  },
  initialState
);

const deleteTodoEpic: Epic<Action<ITodoItemId>, IRootState> = action$ =>
  action$
    .ofType(Actions.DELETE_TODO)
    .delay(1000)
    .map(action => {
      return {
        type: Actions.DELETE_TODO_ACTUAL,
        payload: action.payload
      };
    });

export const todoEpics = combineEpics(deleteTodoEpic);
