import { createAction } from 'redux-actions';

import { $call } from 'utility-types';

import { IResultRow } from '@services/moviedb';

import c from './constants';
import { ILoginStatus } from './reducers';

export interface IEditFieldPayload {
  key: 'id' | 'password';
  value: string;
}

const actions = {
  editField: createAction<IEditFieldPayload>(c.LOGIN_EDIT_FIELD),
  checkLoginCredentials: createAction(c.CHECK_CREDENTIALS),
  updateLoginStatus: createAction<ILoginStatus>(c.UPDATE_LOGIN_STATUS),
  epicWishlistAdd: createAction<IResultRow>(c.EPIC_ADD_TO_WISHLIST),
  epicWishlistGet: createAction(c.EPIC_GET_WISHLIST),
  wishListUpdate: createAction<IResultRow[]>(c.WISH_LIST_UPDATE)
};

export default actions;

const returnsOfActions = Object.values(actions).map($call);

export type IActions = typeof returnsOfActions[number];
