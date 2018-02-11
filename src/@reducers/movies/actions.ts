import { createAction } from 'redux-actions';

import * as c from './constants';
import * as loginActions from '@reducers/login/actions';
import { IMovieListType, IMultiSearchResult } from '@services/moviedb';

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

export const epicWishlistAdd = loginActions.epicWishlistAdd;
