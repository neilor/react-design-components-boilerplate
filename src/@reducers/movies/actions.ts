import { createAction } from 'redux-actions';

import c from './constants';

import loginActions from '@reducers/login/actions';
import { IMovieListType, IMultiSearchResult } from '@services/moviedb';

export interface IUpdateMovieListPayload {
  type: IMovieListType;
  data: IMultiSearchResult;
}

export default {
  epicGetOnScrollMovieList: createAction<IMovieListType>(
    c.MOVIE_LIST_MORE_UPDATE
  ),
  updateMovieList: createAction<IUpdateMovieListPayload>(c.MOVIE_LIST_UPDATE),
  epicWishlistAdd: loginActions.epicWishlistAdd
};
