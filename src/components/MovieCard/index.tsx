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
    <img className={s.image} src={getImageSrc(props.data.poster_path)} />
    <div className={s.rightContent}>
      <div>{getMovieName(props.data)}</div>
      <div>{props.data.overview}</div>
      <div>{props.data.release_date}</div>
      <div>{props.data.vote_average}</div>
      <div onClick={props.actions.onAddToWatchlistclick}>Add to Watchlist</div>
    </div>
  </div>
);

export default MovieCard;
