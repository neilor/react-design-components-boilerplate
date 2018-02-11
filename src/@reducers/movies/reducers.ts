import { handleActions, Action } from 'redux-actions';

import { IMultiSearchResult } from '@services/moviedb';

import { IUpdateMovieListPayload } from './actions';
import c from './constants';

export interface IReducerState {
  top_rated?: IMultiSearchResult;
  now_playing?: IMultiSearchResult;
}

const INITIAL_STATE: IReducerState = {};

export default handleActions<IReducerState, never>(
  {
    [c.MOVIE_LIST_UPDATE]: (state, action: Action<IUpdateMovieListPayload>) => {
      const payload = action.payload as IUpdateMovieListPayload;

      return {
        ...state,
        [payload.type]: payload.data
      };
    }
  },
  INITIAL_STATE
);
