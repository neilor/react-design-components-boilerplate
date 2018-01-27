import { createAction } from 'redux-actions';

import * as Actions from './constants';
import { ILoginStatus } from './reducers';

export interface IEditFieldPayload {
  key: 'id' | 'password';
  value: string;
}

export const editField = createAction<IEditFieldPayload>(
  Actions.LOGIN_EDIT_FIELD
);
export const checkLoginCredentials = createAction(Actions.CHECK_CREDENTIALS);
export const updateLoginStatus = createAction<ILoginStatus>(
  Actions.UPDATE_LOGIN_STATUS
);
