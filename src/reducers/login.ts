import { handleActions, Action } from 'redux-actions';
import * as c from 'constants/login';
import * as actions from 'actions/login';
import { combineEpics, Epic } from 'redux-observable';
import { IRootState } from 'reducers';
import { Observable } from 'rxjs';

export type ILoginStatus = 'success' | 'pristine' | 'checking';

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

export default handleActions<IReducerState, never>(
  {
    [c.EDIT_ID]: (state, action: Action<string>) => ({
      ...state,
      id: action.payload as string
    }),
    [c.EDIT_PASSWORD]: (state, action: Action<string>) => ({
      ...state,
      password: action.payload as string
    }),
    [c.UPDATE_LOGIN_STATUS]: (state, action: Action<ILoginStatus>) => ({
      ...state,
      status: action.payload as ILoginStatus
    })
  },
  INITIAL_STATE
);

const checkCredentialsEpic: Epic<Action<any>, IRootState> = action$ =>
  action$
    .ofType(c.CHECK_CREDENTIALS)
    .mergeMap(() =>
      Observable.concat(
        Observable.of(actions.updateLoginStatus('checking')),
        Observable.of(actions.updateLoginStatus('success')).delay(1000)
      )
    );

export const epics = combineEpics(checkCredentialsEpic);
