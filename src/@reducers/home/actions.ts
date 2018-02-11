import { createAction } from 'redux-actions';

import { $call } from 'utility-types';

import { IResultRow } from '@services/moviedb';

import c from './constants';

const actions = {
  epicSearchTerm: createAction<string>(c.EPIC_TERM_SEARCH),
  updateSearchTerm: createAction<string>(c.TERM_SEARCH_UPDATE),
  updateResults: createAction<IResultRow[]>(c.RESULTS_UPDATE),
  updateSearchType: createAction<string>(c.SEARCH_TYPE_UPDATE),
  epicSearchOnFocus: createAction(c.EPIC_ON_FOCUS_SEARCH),
  epicUpdateMoviesList: createAction(c.EPIC_MOVIES_LISTS_UPDATE)
};

export default actions;

const returnsOfActions = Object.values(actions).map($call);

export type IActions = typeof returnsOfActions[number];
