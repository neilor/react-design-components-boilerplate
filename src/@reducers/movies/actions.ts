import actionCreatorFactory from 'typescript-fsa';
import { $call } from 'utility-types';

import loginActions from '@reducers/login/actions';
import { IMovieListType, IMultiSearchResult } from '@services/moviedb';

export interface IUpdateMovieListPayload {
  type: IMovieListType;
  data: IMultiSearchResult;
}

const actionCreator = actionCreatorFactory('MOVIES');

const actions = {
  epicGetOnScrollMovieList: actionCreator<IMovieListType>(
    'MOVIE_LIST_MORE_UPDATE'
  ),
  updateMovieList: actionCreator<IUpdateMovieListPayload>('MOVIE_LIST_UPDATE'),
  epicWishlistAdd: loginActions.epicWishlistAdd
};

export default actions;

const returnsOfActions = Object.values(actions).map($call);

export type IActions = typeof returnsOfActions[number];
