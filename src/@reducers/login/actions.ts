import { createAction } from 'redux-actions';

import { IResultRow } from '@services/moviedb';

import c from './constants';
import { ILoginStatus } from './reducers';

export interface IEditFieldPayload {
  key: 'id' | 'password';
  value: string;
}

export default {
  editField: createAction<IEditFieldPayload>(c.LOGIN_EDIT_FIELD),
  checkLoginCredentials: createAction(c.CHECK_CREDENTIALS),
  updateLoginStatus: createAction<ILoginStatus>(c.UPDATE_LOGIN_STATUS),
  epicWishlistAdd: createAction<IResultRow>(c.EPIC_ADD_TO_WISHLIST),
  epicWishlistGet: createAction(c.EPIC_GET_WISHLIST),
  wishListUpdate: createAction<IResultRow[]>(c.WISH_LIST_UPDATE)
};
