import { handleActions, Action } from 'redux-actions';

import { IResultRow } from '@services/moviedb';

import actions, { IEditFieldPayload } from './actions';

export type ILoginStatus = 'success' | 'pristine' | 'checking' | 'failure';

export interface IReducerState {
  id: string;
  password: string;
  status: ILoginStatus;
  wishlist: IResultRow[];
}

const INITIAL_STATE: IReducerState = {
  id: '',
  password: '',
  status: 'pristine',
  wishlist: []
};

export default handleActions<IReducerState, never>(
  {
    [actions.editField.toString()]: (
      state,
      action: Action<IEditFieldPayload>
    ) => {
      const payload = action.payload as IEditFieldPayload;

      const newState = {
        ...state,
        [payload.key]: payload.value
      };

      if (state.status !== 'pristine') {
        Object.assign(newState, { status: 'pristine' });
      }

      return newState;
    },
    [actions.updateLoginStatus.toString()]: (
      state,
      action: Action<ILoginStatus>
    ) => {
      const newState = {
        ...state,
        status: action.payload as ILoginStatus
      };

      if (action.payload === 'success') {
        // clear password
        Object.assign(newState, { password: '' });
      }

      return newState;
    },
    [actions.wishListUpdate.toString()]: (
      state,
      action: Action<IResultRow[]>
    ) => ({
      ...state,
      wishlist: action.payload as IResultRow[]
    })
  },
  INITIAL_STATE
);
