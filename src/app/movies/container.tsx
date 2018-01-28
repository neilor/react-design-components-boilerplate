import * as React from 'react';
import { match as RouterMatch } from 'react-router';
import { connect } from 'react-redux';
import { Dispatch, bindActionCreators } from 'redux';
import * as InfiniteScroll from 'react-infinite-scroller';

import MovieCard from 'components/MovieCard';

import { IRootState } from 'app';
import { IMovieListType } from 'services/moviedb';

import * as moviesActions from './actions';

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
      <InfiniteScroll
        hasMore={
          (moviesData && moviesData.total_pages > moviesData.page) || true
        }
        loadMore={() => {
          actions.epicGetOnScrollMovieList(movieListType);
        }}
        loader={<div key="loading">loading...</div>}
      >
        {moviesData
          ? moviesData.results.map(result => (
              <MovieCard
                data={result}
                actions={{ onAddToWatchlistclick: actions.epicWishlistAdd }}
                key={result.id}
              />
            ))
          : []}
      </InfiniteScroll>
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
