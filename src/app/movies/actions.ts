import { createAction } from 'redux-actions';

import * as c from './constants';
import { IMovieListType, IMultiSearchResult } from 'services/moviedb';

export const epicGetMovieList = createAction<IMovieListType>(
  c.EPIC_MOVIE_LIST_GET
);

export const epicGetOnScrollMovieList = createAction<IMovieListType>(
  c.MOVIE_LIST_MORE_UPDATE
);

export interface IUpdateMovieListPayload {
  type: IMovieListType;
  data: IMultiSearchResult;
}

export const updateMovieList = createAction<IUpdateMovieListPayload>(
  c.MOVIE_LIST_UPDATE
);
