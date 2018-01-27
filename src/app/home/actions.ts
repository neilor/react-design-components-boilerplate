import { createAction } from 'redux-actions';

import { IResultRow } from 'services/moviedb';

import * as c from './constants';

export const epicCheckLogin = createAction(c.EPIC_LOGIN_CHECK);
export const epicSearchTerm = createAction<string>(c.EPIC_TERM_SEARCH);
export const updateSearchTerm = createAction<string>(c.TERM_SEARCH_UPDATE);
export const updateResults = createAction<IResultRow[]>(c.RESULTS_UPDATE);
export const updateSearchType = createAction<string>(c.SEARCH_TYPE_UPDATE);
export const epicSearchOnFocus = createAction(c.EPIC_ON_FOCUS_SEARCH);
