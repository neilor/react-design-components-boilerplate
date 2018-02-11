import { createAction } from 'redux-actions';

import { $call } from 'utility-types';

import c from './constants';

import loginActions from '@reducers/login/actions';
import { IMovieListType, IMultiSearchResult } from '@services/moviedb';

export interface IUpdateMovieListPayload {
  type: IMovieListType;
  data: IMultiSearchResult;
}

const actions = {
  epicGetOnScrollMovieList: createAction<IMovieListType>(
    c.MOVIE_LIST_MORE_UPDATE
  ),
  updateMovieList: createAction<IUpdateMovieListPayload>(c.MOVIE_LIST_UPDATE),
  epicWishlistAdd: loginActions.epicWishlistAdd
};

export default actions;

const returnsOfActions = Object.values(actions).map($call);

export type IActions = typeof returnsOfActions[number];
