import actionCreatorFactory from 'typescript-fsa';

import { $call } from 'utility-types';

import { IResultRow, ISearchType } from '@services/moviedb';

const actionCreator = actionCreatorFactory('HOME');

const actions = {
  epicSearchTerm: actionCreator<string>('EPIC_TERM_SEARCH'),
  updateSearchTerm: actionCreator<string>('TERM_SEARCH_UPDATE'),
  updateResults: actionCreator<IResultRow[]>('RESULTS_UPDATE'),
  updateSearchType: actionCreator<ISearchType>('SEARCH_TYPE_UPDATE'),
  epicSearchOnFocus: actionCreator('EPIC_ON_FOCUS_SEARCH'),
  epicUpdateMoviesList: actionCreator('EPIC_MOVIES_LISTS_UPDATE')
};

export default actions;

const returnsOfActions = Object.values(actions).map($call);

export type IActions = typeof returnsOfActions[number];
