import * as React from 'react';
import { IResultRow } from 'services/moviedb';
import { getMovieName } from 'selectors';

interface IProps {
  data: IResultRow;
}

const MovieCard = (props: IProps) => <div>{getMovieName(props.data)}</div>;

export default MovieCard;
