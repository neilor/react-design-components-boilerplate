import { handleActions, Action } from 'redux-actions';
import * as c from 'constants/login';

export interface IReducerState {
  id: string;
  password: string;
}

const INITIAL_STATE: IReducerState = {
  id: '',
  password: ''
};

export default handleActions<IReducerState, any>(
  {
    [c.EDIT_ID]: (state, action: Action<string>) => ({
      ...state,
      id: action.payload as string
    }),
    [c.EDIT_PASSWORD]: (state, action: Action<string>) => ({
      ...state,
      password: action.payload as string
    })
  },
  INITIAL_STATE
);
