import * as React from 'react';
import { IResultRow, getImageSrc } from 'services/moviedb';
import { getMovieName } from 'selectors';

import * as s from './index.scss';

interface IProps {
  data: IResultRow;
  actions: {
    onAddToWatchlistclick: () => void;
  };
}

const MovieCard = (props: IProps) => (
  <div className={s.container}>
    <div>{getMovieName(props.data)}</div>
    <div style={{ display: 'flex' }}>
      <div>{props.data.overview}</div>
      <img src={getImageSrc(props.data.poster_path)} />
    </div>
    <div>{props.data.release_date}</div>
    <div>{props.data.vote_average}</div>
    <div onClick={props.actions.onAddToWatchlistclick}>Add to Watchlist</div>
  </div>
);

export default MovieCard;
