import * as React from 'react';

import * as cx from 'classnames';

import { getMovieName } from '@selectors';
import { IResultRow, getImageSrc } from '@services/moviedb';

import * as s from './index.scss';

interface IProps {
  className?: string;
  data: IResultRow;
  actions?: {
    onAddToWatchlistclick?: (x: IResultRow) => void;
  };
}

const MovieCard = (props: IProps) => (
  <div className={cx(s.container, props.className)}>
    <div className={s.imageContainer}>
      <img className={s.image} src={getImageSrc(props.data.poster_path)} />
    </div>

    <div className={s.rightContent}>
      <div className={s.title}>{getMovieName(props.data)}</div>
      <div className={s.overview}>
        {props.data.overview.slice(0, 400)}{' '}
        {props.data.overview.length > 400 && '...'}
      </div>
      <div>Release: {props.data.release_date}</div>
      <div>Rating: {props.data.vote_average}</div>
      {props.actions &&
        props.actions.onAddToWatchlistclick && (
          <div
            className={s.addToWatchList}
            onClick={() => {
              if (props.actions && props.actions.onAddToWatchlistclick) {
                props.actions.onAddToWatchlistclick(props.data);
              }
            }}
          >
            Add to Watchlist
          </div>
        )}
    </div>
  </div>
);

export default MovieCard;
