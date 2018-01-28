import { createAction } from 'redux-actions';

import { IResultRow } from 'services/moviedb';

import * as c from './constants';
import { ILoginStatus } from './reducers';

export interface IEditFieldPayload {
  key: 'id' | 'password';
  value: string;
}

export const editField = createAction<IEditFieldPayload>(c.LOGIN_EDIT_FIELD);
export const checkLoginCredentials = createAction(c.CHECK_CREDENTIALS);
export const updateLoginStatus = createAction<ILoginStatus>(
  c.UPDATE_LOGIN_STATUS
);

export const epicWishlistAdd = createAction<IResultRow>(c.EPIC_ADD_TO_WISHLIST);
export const epicWishlistGet = createAction(c.EPIC_GET_WISHLIST);
export const wishListUpdate = createAction<IResultRow[]>(c.WISH_LIST_UPDATE);
