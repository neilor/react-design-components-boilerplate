import { combineEpics, Epic } from 'redux-observable';

import { IRootState, IRootAction } from '@reducers';
import { movieList } from '@services/moviedb';

import actions from './actions';

const getMoreMovieListEpic: Epic<IRootAction, IRootState> = (action$, store) =>
  action$.ofAction(actions.epicGetOnScrollMovieList).mergeMap(action => {
    const type = action.payload;

    const movieListData = store.getState().movies[type];

    const page = (movieListData && movieListData.page) || 0;

    const oldResults = (movieListData && movieListData.results) || [];

    return movieList(type, page + 1).map(result =>
      actions.updateMovieList({
        type,
        data: { ...result, results: [...oldResults, ...result.results] }
      })
    );
  });

export default combineEpics(getMoreMovieListEpic);
