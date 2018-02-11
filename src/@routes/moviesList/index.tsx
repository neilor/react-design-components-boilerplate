import * as React from 'react';
import { connect } from 'react-redux';
import { match as RouterMatch } from 'react-router';
import { Dispatch, bindActionCreators } from 'redux';

import startCase = require('lodash/startCase');
import * as InfiniteScroll from 'react-infinite-scroller';

import Center from '@components/Center';
import Loader from '@components/Loader';
import MovieCard from '@components/MovieCard';
import MovieList from '@components/MovieList';

import { IRootState } from '@reducers';
import * as moviesActions from '@reducers/movies/actions';
import { IMovieListType } from '@services/moviedb';

interface IProps {
  match: RouterMatch<{}>;
  actions: typeof moviesActions;
  data: IRootState;
}

const getMovieListType = (match: RouterMatch<{}>) =>
  match.path.split('/').slice(-1)[0] as IMovieListType;

class Movies extends React.Component<IProps, any> {
  public render() {
    const { data: { movies }, match, actions } = this.props;

    const movieListType = getMovieListType(match);

    const moviesData = movies[movieListType];

    return (
      <>
        <h1 style={{ textAlign: 'center' }}>{startCase(movieListType)}</h1>
        <InfiniteScroll
          hasMore={
            (moviesData && moviesData.total_pages > moviesData.page) || true
          }
          loadMore={() => {
            actions.epicGetOnScrollMovieList(movieListType);
          }}
          loader={<Loader />}
        >
          <Center>
            <MovieList>
              {moviesData
                ? moviesData.results.map(result => (
                    <MovieCard
                      data={result}
                      actions={{
                        onAddToWatchlistclick: actions.epicWishlistAdd
                      }}
                      key={result.id}
                    />
                  ))
                : []}
            </MovieList>
          </Center>
        </InfiniteScroll>
      </>
    );
  }
}

function mapStateToProps(state: IRootState) {
  return {
    data: state
  };
}

function mapDispatchToProps(dispatch: Dispatch<IRootState>) {
  return {
    actions: bindActionCreators(moviesActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Movies);
