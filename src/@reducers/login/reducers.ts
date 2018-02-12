import { reducerWithInitialState } from 'typescript-fsa-reducers';

import { IResultRow } from '@services/moviedb';

import actions from './actions';

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

const reducer = reducerWithInitialState(INITIAL_STATE)
  .case(actions.editField, (state, payload) => {
    const newState = {
      ...state,
      [payload.key]: payload.value
    };

    if (state.status !== 'pristine') {
      Object.assign(newState, { status: 'pristine' });
    }

    return newState;
  })
  .case(actions.updateLoginStatus, (state, payload) => {
    const newState = {
      ...state,
      status: payload
    };

    if (payload === 'success') {
      // clear password
      Object.assign(newState, { password: '' });
    }

    return newState;
  })
  .case(actions.wishListUpdate, (state, payload) => ({
    ...state,
    wishlist: payload
  }))
  .build();

export default reducer;
