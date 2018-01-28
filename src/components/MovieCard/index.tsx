import * as React from 'react';
import { IResultRow } from 'services/moviedb';
import { getMovieName } from 'selectors';

type IProps = IResultRow;

const MovieCard = (props: IProps) => <div>{getMovieName(props)}</div>;

export default MovieCard;
