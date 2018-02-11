import { handleActions, Action } from 'redux-actions';

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

export default handleActions<IReducerState, never>(
  {
    [actions.updateSearchTerm.toString()]: (state, action: Action<string>) => ({
      ...state,
      searchTerm: action.payload as string
    }),
    [actions.updateResults.toString()]: (
      state,
      action: Action<IResultRow[]>
    ) => ({
      ...state,
      results: action.payload as IResultRow[]
    }),
    [actions.updateSearchType.toString()]: (
      state,
      action: Action<ISearchType>
    ) => ({
      ...state,
      searchType: action.payload as ISearchType,
      results: []
    })
  },
  INITIAL_STATE
);
