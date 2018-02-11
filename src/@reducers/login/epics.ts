import { routerActions } from 'react-router-redux';
import { combineEpics, Epic } from 'redux-observable';
import { Observable } from 'rxjs';

import { toast } from 'react-toastify';

import { isActionOf } from 'typesafe-actions';

import { IRootState, IRootAction } from '@reducers';
import { verifyLogin, addToWishlist, getWishlist } from '@services/login';
import { IResultRow } from '@services/moviedb';

import actions from './actions';

const checkCredentialsEpic: Epic<IRootAction, IRootState> = (action$, store) =>
  action$.filter(isActionOf(actions.checkLoginCredentials)).mergeMap(() => {
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

const addToWishlistEpic: Epic<IRootAction, IRootState> = (action$, store) =>
  action$.filter(isActionOf(actions.epicWishlistAdd)).mergeMap(action => {
    const id = store.getState().login.id;

    addToWishlist(id, action.payload as IResultRow);

    toast.success('Added to watchlist!', { autoClose: 2000 });

    return Observable.empty<never>();
  });

const getWishlistEpic: Epic<IRootAction, IRootState> = (action$, store) =>
  action$.filter(isActionOf(actions.epicWishlistGet)).mergeMap(() => {
    const id = store.getState().login.id;

    const wishlist = getWishlist(id);

    return Observable.of(actions.wishListUpdate(wishlist));
  });

export default combineEpics(
  checkCredentialsEpic,
  addToWishlistEpic,
  getWishlistEpic
);
