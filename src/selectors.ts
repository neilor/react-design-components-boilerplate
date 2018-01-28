import { IResultRow } from 'services/moviedb';

export const getMovieName = (movie: IResultRow) =>
  movie.title || movie.name || movie.original_name || movie.original_title;
