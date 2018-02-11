import { createAction } from 'typesafe-actions';

import { $call } from 'utility-types';

import { IResultRow } from '@services/moviedb';

import c from './constants';

const actions = {
  epicSearchTerm: createAction(c.EPIC_TERM_SEARCH, (s: string) => ({
    type: c.EPIC_TERM_SEARCH,
    payload: s
  })),
  updateSearchTerm: createAction(c.TERM_SEARCH_UPDATE, (s: string) => ({
    type: c.TERM_SEARCH_UPDATE,
    payload: s
  })),
  updateResults: createAction(c.RESULTS_UPDATE, (rows: IResultRow[]) => ({
    type: c.RESULTS_UPDATE,
    payload: rows
  })),
  updateSearchType: createAction(c.SEARCH_TYPE_UPDATE, (s: string) => ({
    type: c.SEARCH_TYPE_UPDATE,
    payload: s
  })),
  epicSearchOnFocus: createAction(c.EPIC_ON_FOCUS_SEARCH),
  epicUpdateMoviesList: createAction(c.EPIC_MOVIES_LISTS_UPDATE)
};

export default actions;

const returnsOfActions = Object.values(actions).map($call);

export type IActions = typeof returnsOfActions[number];
