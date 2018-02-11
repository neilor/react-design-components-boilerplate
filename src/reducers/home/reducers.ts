import { handleActions, Action } from 'redux-actions';
import { combineEpics, Epic } from 'redux-observable';
import { Observable } from 'rxjs/Observable';

import { IRootState } from 'reducers';
import { IResultRow, search, ISearchType } from 'services/moviedb';

import * as c from './constants';
import * as actions from './actions';
import * as moviesActions from 'reducers/movies/actions';

export interface IReducerState {
  searchTerm: string;
  searchType: ISearchType;
  results: IResultRow[];
}

const INITIAL_STATE: IReducerState = {
  searchTerm: '',
  results: [],
  searchType: 'multi'
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
    }),
    [c.SEARCH_TYPE_UPDATE]: (state, action: Action<ISearchType>) => ({
      ...state,
      searchType: action.payload as ISearchType,
      results: []
    })
  },
  INITIAL_STATE
);

const searchTermApiEpic: Epic<Action<any>, IRootState> = (action$, store) =>
  action$
    .ofType(c.TERM_SEARCH_UPDATE)
    .map((action: Action<string>) => (action.payload as string).trim())
    .debounceTime(250)
    .mergeMap(query => {
      if (query) {
        const searchType = store.getState().home.searchType;

        return Observable.of(query)
          .switchMap(search(searchType))
          .map(result => actions.updateResults(result.results));
      } else {
        return Observable.of(actions.updateResults([]));
      }
    });

const onFocusSearchEpic: Epic<Action<any>, IRootState> = (action$, store) =>
  action$.ofType(c.EPIC_ON_FOCUS_SEARCH).mergeMap(() => {
    const home = store.getState().home;

    if (home.results.length === 0) {
      return Observable.of(actions.updateSearchTerm(home.searchTerm));
    } else {
      return Observable.empty<never>();
    }
  });

const updateMoviesListsEpic: Epic<Action<any>, IRootState> = action$ =>
  action$
    .ofType(c.EPIC_MOVIES_LISTS_UPDATE)
    .mergeMap(() =>
      Observable.concat(
        Observable.of(moviesActions.epicGetOnScrollMovieList('top_rated')),
        Observable.of(moviesActions.epicGetOnScrollMovieList('now_playing'))
      )
    );

export const epics = combineEpics(
  searchTermApiEpic,
  onFocusSearchEpic,
  updateMoviesListsEpic
);
