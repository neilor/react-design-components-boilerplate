import { handleActions } from 'redux-actions';
import * as Actions from 'constants/actions';

const initialState: ITodoStoreState = [
  {
    id: 0,
    text: 'Use Redux',
    completed: false
  }
];

export default handleActions<ITodoStoreState, ITodoItemData | ITodoItemId>(
  {
    [Actions.ADD_TODO]: (state, action) => {
      const payload = action.payload as ITodoItemData;

      return [
        {
          id: state.reduce((maxId, todo) => Math.max(todo.id, maxId), -1) + 1,
          completed: false,
          ...payload
        },
        ...state
      ];
    },

    [Actions.DELETE_TODO]: (state, action) => {
      return state.filter(todo => todo.id !== action.payload);
    },

    [Actions.EDIT_TODO]: (state, action) => {
      const payload = action.payload as ITodoItemData;

      return state.map(todo => {
        return todo.id === payload.id ? { ...todo, text: payload.text } : todo;
      });
    },

    [Actions.COMPLETE_TODO]: (state, action) => {
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
