import * as fetchJsonp from 'fetch-jsonp';
import { Observable } from 'rxjs/Observable';

const API_KEY = '2c94dbb2066350b2136311320000f21c';
const BASE_URL = 'https://api.themoviedb.org/3';
const BASE_IMG_URL = 'https://image.tmdb.org/t/p/w370_and_h556_bestv2';

export interface IMultiSearchResult {
  page: number;
  total_results: number;
  total_pages: number;
  results: IResultRow[];
}

export interface IResultRow {
  original_name?: string | null;
  id: number;
  media_type?: ISearchType;
  name?: string | null;
  vote_count: number;
  vote_average: number;
  poster_path: string;
  popularity: number;
  genre_ids?: number[] | null;
  original_language: string;
  backdrop_path: string;
  overview: string;
  video?: boolean | null;
  title?: string | null;
  original_title?: string | null;
  adult?: boolean | null;
  release_date?: string | null;
}

export type ISearchType =
  | 'multi'
  | 'tv'
  | 'person'
  | 'movie'
  | 'company'
  | 'collection'
  | 'keyword';

export const search = (type: ISearchType = 'multi') => (
  query: string
): Observable<IMultiSearchResult> =>
  Observable.from(
    fetchJsonp(
      `${BASE_URL}/search/${type}?api_key=${API_KEY}&query=${query}`
    ).then(response => response.json())
  );

export type IMovieListType = 'now_playing' | 'top_rated';

export const movieList = (
  type: IMovieListType,
  page: number = 1
): Observable<IMultiSearchResult> =>
  Observable.from(
    fetchJsonp(
      `${BASE_URL}/movie/${type}?api_key=${API_KEY}&page=${page}`
    ).then(response => response.json())
  );

export const getImageSrc = (path: string) => `${BASE_IMG_URL}${path}`;
