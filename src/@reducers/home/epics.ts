import { Action } from 'redux-actions';
import { combineEpics, Epic } from 'redux-observable';
import { Observable } from 'rxjs/Observable';

import { IRootState, IRootAction } from '@reducers';
import { actions as moviesActions } from '@reducers/movies';
import { search } from '@services/moviedb';

import actions from './actions';
import c from './constants';

const searchTermApiEpic: Epic<IRootAction, IRootState> = (action$, store) =>
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

const onFocusSearchEpic: Epic<IRootAction, IRootState> = (action$, store) =>
  action$.ofType(c.EPIC_ON_FOCUS_SEARCH).mergeMap(() => {
    const home = store.getState().home;

    if (home.results.length === 0) {
      return Observable.of(actions.updateSearchTerm(home.searchTerm));
    } else {
      return Observable.empty<never>();
    }
  });

const updateMoviesListsEpic: Epic<IRootAction, IRootState> = action$ =>
  action$
    .ofType(c.EPIC_MOVIES_LISTS_UPDATE)
    .mergeMap(() =>
      Observable.concat(
        Observable.of(moviesActions.epicGetOnScrollMovieList('top_rated')),
        Observable.of(moviesActions.epicGetOnScrollMovieList('now_playing'))
      )
    );

export default combineEpics(
  searchTermApiEpic,
  onFocusSearchEpic,
  updateMoviesListsEpic
);
