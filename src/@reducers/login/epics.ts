import { routerActions } from 'react-router-redux';
import { Action } from 'redux-actions';
import { combineEpics, Epic } from 'redux-observable';
import { Observable } from 'rxjs';

import { toast } from 'react-toastify';

import { IRootState } from '@reducers';
import { verifyLogin, addToWishlist, getWishlist } from '@services/login';
import { IResultRow } from '@services/moviedb';

import actions from './actions';
import c from './constants';

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

    toast.success('Added to watchlist!', { autoClose: 2000 });

    return Observable.empty<never>();
  });

const getWishlistEpic: Epic<Action<any>, IRootState> = (action$, store) =>
  action$.ofType(c.EPIC_GET_WISHLIST).mergeMap(() => {
    const id = store.getState().login.id;

    const wishlist = getWishlist(id);

    return Observable.of(actions.wishListUpdate(wishlist));
  });

export default combineEpics(
  checkCredentialsEpic,
  addToWishlistEpic,
  getWishlistEpic
);