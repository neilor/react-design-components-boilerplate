import { IReducerState as ILoginState } from '@reducers/login/reducers';
import { IResultRow } from '@services/moviedb';

export const getMovieName = (movie: IResultRow) =>
  movie.title || movie.name || movie.original_name || movie.original_title;

export const isLoggedIn = (login: ILoginState) => login.status === 'success';
