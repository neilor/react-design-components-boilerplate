import { handleActions, Action } from 'redux-actions';
import { combineEpics, Epic } from 'redux-observable';
import { routerActions } from 'react-router-redux';
import { IRootState } from 'routes';
import { Observable } from 'rxjs';

import { IResultRow } from 'services/moviedb';
import { verifyLogin, addToWishlist, getWishlist } from 'services/login';

import * as c from './constants';
import * as actions from './actions';

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
    [c.LOGIN_EDIT_FIELD]: (
      state,
      action: Action<actions.IEditFieldPayload>
    ) => {
      const payload = action.payload as actions.IEditFieldPayload;

      const newState = {
        ...state,
        [payload.key]: payload.value
      };

      if (state.status !== 'pristine') {
        Object.assign(newState, { status: 'pristine' });
      }

      return newState;
    },
    [c.UPDATE_LOGIN_STATUS]: (state, action: Action<ILoginStatus>) => {
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
    [c.WISH_LIST_UPDATE]: (state, action: Action<IResultRow[]>) => ({
      ...state,
      wishlist: action.payload as IResultRow[]
    })
  },
  INITIAL_STATE
);

const checkCredentialsEpic: Epic<Action<any>, IRootState> = (action$, store) =>
  action$.ofType(c.CHECK_CREDENTIALS).mergeMap(() => {
    const loginState = store.getState().login;

    return Observable.concat(
      Observable.of(actions.updateLoginStatus('checking')),
      verifyLogin(loginState).mergeMap(valid =>
        Observable.concat(
          Observable.of(
            actions.updateLoginStatus(valid ? 'success' : 'failure')
          ),
          valid
            ? Observable.of(routerActions.push('/'))
            : Observable.empty<never>()
        )
      )
    );
  });

const addToWishlistEpic: Epic<Action<any>, IRootState> = (action$, store) =>
  action$.ofType(c.EPIC_ADD_TO_WISHLIST).mergeMap(action => {
    const id = store.getState().login.id;

    addToWishlist(id, action.payload as IResultRow);

    return Observable.empty<never>();
  });

const getWishlistEpic: Epic<Action<any>, IRootState> = (action$, store) =>
  action$.ofType(c.EPIC_GET_WISHLIST).mergeMap(() => {
    const id = store.getState().login.id;

    const wishlist = getWishlist(id);

    return Observable.of(actions.wishListUpdate(wishlist));
  });

export const epics = combineEpics(
  checkCredentialsEpic,
  addToWishlistEpic,
  getWishlistEpic
);
