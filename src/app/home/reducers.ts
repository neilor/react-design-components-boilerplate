import { handleActions, Action } from 'redux-actions';
import { combineEpics, Epic } from 'redux-observable';
import { Observable } from 'rxjs/Observable';
import { routerActions } from 'react-router-redux';

import { IRootState } from 'app';
import { IResultRow, multiSearch } from 'services/moviedb';

import * as c from './constants';
import * as actions from './actions';

export interface IReducerState {
  searchTerm: string;
  results: IResultRow[];
}

const INITIAL_STATE: IReducerState = {
  searchTerm: '',
  results: []
};

export default handleActions<IReducerState, never>(
  {
    [c.TERM_SEARCH_UPDATE]: (state, action: Action<string>) => ({
      ...state,
      searchTerm: action.payload as string
    }),
    [c.RESULTS_UPDATE]: (state, action: Action<IResultRow[]>) => ({
      ...state,
      results: action.payload as IResultRow[]
    })
  },
  INITIAL_STATE
);

const checkLoginEpic: Epic<Action<any>, IRootState> = (action$, store) =>
  action$.ofType(c.EPIC_LOGIN_CHECK).mergeMap(() => {
    const loginState = store.getState().login;

    if (loginState.status !== 'success') {
      return Observable.of(routerActions.push('/login'));
    }

    return Observable.empty<never>();
  });

const searchTermApiEpic: Epic<Action<any>, IRootState> = action$ =>
  action$
    .ofType(c.TERM_SEARCH_UPDATE)
    .map((action: Action<string>) => (action.payload as string).trim())
    .distinctUntilChanged()
    .debounceTime(250)
    .mergeMap(query => {
      if (query) {
        return Observable.of(query)
          .switchMap(multiSearch)
          .map(result => actions.updateResults(result.results));
      } else {
        return Observable.of(actions.updateResults([]));
      }
    });

export const epics = combineEpics(checkLoginEpic, searchTermApiEpic);
