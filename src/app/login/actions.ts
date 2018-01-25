import { createAction } from 'redux-actions';

import * as Actions from './constants';
import { ILoginStatus } from './reducers';

export const editLoginId = createAction<string>(Actions.EDIT_ID);
export const editLoginPassword = createAction<string>(Actions.EDIT_PASSWORD);
export const checkLoginCredentials = createAction(Actions.CHECK_CREDENTIALS);
export const updateLoginStatus = createAction<ILoginStatus>(
  Actions.UPDATE_LOGIN_STATUS
);
