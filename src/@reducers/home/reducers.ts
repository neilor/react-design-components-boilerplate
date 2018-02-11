import { handleActions, Action } from 'redux-actions';

import { IResultRow, ISearchType } from '@services/moviedb';

import c from './constants';

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
