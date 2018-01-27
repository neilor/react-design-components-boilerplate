import { createAction } from 'redux-actions';

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
