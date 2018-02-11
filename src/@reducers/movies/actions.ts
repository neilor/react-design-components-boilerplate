import { createAction } from 'typesafe-actions';

import { $call } from 'utility-types';

import c from './constants';

import loginActions from '@reducers/login/actions';
import { IMovieListType, IMultiSearchResult } from '@services/moviedb';

export interface IUpdateMovieListPayload {
  type: IMovieListType;
  data: IMultiSearchResult;
}

const actions = {
  epicGetOnScrollMovieList: createAction(
    c.MOVIE_LIST_MORE_UPDATE,
    (s: IMovieListType) => ({
      type: c.MOVIE_LIST_UPDATE,
      payload: s
    })
  ),
  updateMovieList: createAction(
    c.MOVIE_LIST_UPDATE,
    (s: IUpdateMovieListPayload) => ({
      type: c.MOVIE_LIST_UPDATE,
      payload: s
    })
  ),
  epicWishlistAdd: loginActions.epicWishlistAdd
};

export default actions;

const returnsOfActions = Object.values(actions).map($call);

export type IActions = typeof returnsOfActions[number];
