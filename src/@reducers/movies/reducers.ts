import { handleActions, Action } from 'redux-actions';
import { combineEpics, Epic } from 'redux-observable';

import { IRootState } from '@reducers';
import {
  IMultiSearchResult,
  IMovieListType,
  movieList
} from '@services/moviedb';

import * as actions from './actions';
import * as c from './constants';

export interface IReducerState {
  top_rated?: IMultiSearchResult;
  now_playing?: IMultiSearchResult;
}

const INITIAL_STATE: IReducerState = {};

export default handleActions<IReducerState, never>(
  {
    [c.MOVIE_LIST_UPDATE]: (
      state,
      action: Action<actions.IUpdateMovieListPayload>
    ) => {
      const payload = action.payload as actions.IUpdateMovieListPayload;

      return {
        ...state,
        [payload.type]: payload.data
      };
    }
  },
  INITIAL_STATE
);

const getMoreMovieListEpic: Epic<Action<any>, IRootState> = (action$, store) =>
  action$
    .ofType(c.MOVIE_LIST_MORE_UPDATE)
    .mergeMap((action: Action<IMovieListType>) => {
      const type = action.payload as IMovieListType;

      const movieListData = store.getState().movies[type];

      const page = (movieListData && movieListData.page) || 0;

      const oldResults = (movieListData && movieListData.results) || [];

      return movieList(type, page + 1).map(result =>
        actions.updateMovieList({
          type,
          data: { ...result, results: [...oldResults, ...result.results] }
        })
      );
    });

export const epics = combineEpics(getMoreMovieListEpic);
