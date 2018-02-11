import { createAction } from 'typesafe-actions';

import { $call } from 'utility-types';

import { IResultRow } from '@services/moviedb';

import c from './constants';
import { ILoginStatus } from './reducers';

export interface IEditFieldPayload {
  key: 'id' | 'password';
  value: string;
}

const actions = {
  editField: createAction(c.LOGIN_EDIT_FIELD, (s: IEditFieldPayload) => ({
    type: c.LOGIN_EDIT_FIELD,
    payload: s
  })),
  checkLoginCredentials: createAction(c.CHECK_CREDENTIALS),
  updateLoginStatus: createAction(c.UPDATE_LOGIN_STATUS, (s: ILoginStatus) => ({
    type: c.UPDATE_LOGIN_STATUS,
    payload: s
  })),
  epicWishlistAdd: createAction(c.EPIC_ADD_TO_WISHLIST, (s: IResultRow) => ({
    type: c.EPIC_ADD_TO_WISHLIST,
    payload: s
  })),
  epicWishlistGet: createAction(c.EPIC_GET_WISHLIST),
  wishListUpdate: createAction(c.WISH_LIST_UPDATE, (rows: IResultRow[]) => ({
    type: c.WISH_LIST_UPDATE,
    payload: rows
  }))
};

export default actions;

const returnsOfActions = Object.values(actions).map($call);

export type IActions = typeof returnsOfActions[number];
