import { reducerWithInitialState } from 'typescript-fsa-reducers';

import { IResultRow, ISearchType } from '@services/moviedb';

import actions from './actions';

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

const reducer = reducerWithInitialState(INITIAL_STATE)
  .case(actions.updateSearchTerm, (state, payload) => ({
    ...state,
    searchTerm: payload
  }))
  .case(actions.updateResults, (state, payload) => ({
    ...state,
    results: payload
  }))
  .case(actions.updateSearchType, (state, payload) => ({
    ...state,
    searchType: payload,
    results: []
  }))
  .build();

export default reducer;
