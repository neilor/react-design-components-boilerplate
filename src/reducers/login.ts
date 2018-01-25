import { handleActions, Action } from 'redux-actions';
import * as c from 'constants/login';
import { combineEpics, Epic } from 'redux-observable';
import { IRootState } from 'reducers';

type ILoginStatus = 'success' | 'pristine';

export interface IReducerState {
  id: string;
  password: string;
  status: ILoginStatus;
}

const INITIAL_STATE: IReducerState = {
  id: '',
  password: '',
  status: 'pristine'
};

export default handleActions<IReducerState, any>(
  {
    [c.EDIT_ID]: (state, action: Action<string>) => ({
      ...state,
      id: action.payload as string
    }),
    [c.EDIT_PASSWORD]: (state, action: Action<string>) => ({
      ...state,
      password: action.payload as string
    }),
    [c.LOGIN_SUCCESSFUL]: state => ({
      ...state,
      status: 'success'
    })
  },
  INITIAL_STATE
);

const checkCredentialsEpic: Epic<Action<any>, IRootState> = action$ =>
  action$
    .ofType(c.CHECK_CREDENTIALS)
    .delay(1000)
    .mapTo({
      type: c.LOGIN_SUCCESSFUL
    });

export const epics = combineEpics(checkCredentialsEpic);
