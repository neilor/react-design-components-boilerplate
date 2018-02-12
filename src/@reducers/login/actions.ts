import actionCreatorFactory from 'typescript-fsa';
import { $call } from 'utility-types';

import { IResultRow } from '@services/moviedb';

import { ILoginStatus } from './reducers';

export interface IEditFieldPayload {
  key: 'id' | 'password';
  value: string;
}

const actionCreator = actionCreatorFactory('LOGIN');

const actions = {
  editField: actionCreator<IEditFieldPayload>('LOGIN_EDIT_FIELD'),
  checkLoginCredentials: actionCreator('CHECK_CREDENTIALS'),
  updateLoginStatus: actionCreator<ILoginStatus>('UPDATE_LOGIN_STATUS'),
  epicWishlistAdd: actionCreator<IResultRow>('EPIC_ADD_TO_WISHLIST'),
  epicWishlistGet: actionCreator('EPIC_GET_WISHLIST'),
  wishListUpdate: actionCreator<IResultRow[]>('WISH_LIST_UPDATE')
};

export default actions;

const returnsOfActions = Object.values(actions).map($call);

export type IActions = typeof returnsOfActions[number];
