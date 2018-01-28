import { IResultRow } from 'services/moviedb';
import { IReducerState as ILoginState } from 'routes/login/reducers';

export const getMovieName = (movie: IResultRow) =>
  movie.title || movie.name || movie.original_name || movie.original_title;

export const isLoggedIn = (login: ILoginState) => login.status === 'success';
