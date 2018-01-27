import * as fetchJsonp from 'fetch-jsonp';
import { Observable } from 'rxjs/Observable';

const API_KEY = '2c94dbb2066350b2136311320000f21c';
const BASE_URL = 'https://api.themoviedb.org/3';

export interface IMultiSearchResult {
  page: number;
  total_results: number;
  total_pages: number;
  results: IResultRow[];
}

export interface IResultRow {
  original_name?: string | null;
  id: number;
  media_type: string;
  name?: string | null;
  vote_count: number;
  vote_average: number;
  poster_path: string;
  first_air_date?: string | null;
  popularity: number;
  genre_ids?: number[] | null;
  original_language: string;
  backdrop_path: string;
  overview: string;
  origin_country?: string[] | null;
  video?: boolean | null;
  title?: string | null;
  original_title?: string | null;
  adult?: boolean | null;
  release_date?: string | null;
}

export const multiSearch = (query: string): Observable<IMultiSearchResult> =>
  Observable.from(
    fetchJsonp(
      `${BASE_URL}/search/multi?api_key=${API_KEY}&query=${query}`
    ).then(response => response.json())
  );
