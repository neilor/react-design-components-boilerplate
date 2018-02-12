import { reducerWithInitialState } from 'typescript-fsa-reducers';

import { IMultiSearchResult } from '@services/moviedb';

import actions from './actions';

export interface IReducerState {
  top_rated?: IMultiSearchResult;
  now_playing?: IMultiSearchResult;
}

const INITIAL_STATE: IReducerState = {};

const reducer = reducerWithInitialState(INITIAL_STATE)
  .case(actions.updateMovieList, (state, payload) => ({
    ...state,
    [payload.type]: payload.data
  }))
  .build();

export default reducer;
