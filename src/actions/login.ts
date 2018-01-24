import { createAction } from 'redux-actions';
import * as Actions from 'constants/login';

export const editLoginId = createAction<string>(Actions.EDIT_ID);
export const editLoginPassword = createAction<string>(Actions.EDIT_PASSWORD);
