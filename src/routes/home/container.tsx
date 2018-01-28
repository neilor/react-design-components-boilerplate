import * as React from 'react';
import { connect } from 'react-redux';
import { Dispatch, bindActionCreators } from 'redux';

import ClickOutside from 'components/ClickOutside';
import Link from 'components/Link';

import { IRootState } from 'routes';
import { getMovieName } from 'selectors';

import * as HomeActions from './actions';

import * as s from './styles.scss';

interface IProps {
  data: IRootState;
  actions: typeof HomeActions;
}

class Home extends React.Component<IProps, any> {
  public componentDidMount() {
    const { data: { movies }, actions } = this.props;

    if (!movies.now_playing && !movies.top_rated) {
      actions.epicUpdateMoviesList();
    }
  }

  public render() {
    const { data: { home, movies }, actions } = this.props;

    return (
      <div className={s.container}>
        <div>
          <Link to="/movies/now_playing">
            <h3>Now Playing</h3>
          </Link>
          {movies.now_playing &&
            movies.now_playing.results
              .slice(0, 10)
              .map(movie => <div key={movie.id}>{getMovieName(movie)}</div>)}
        </div>
        <ClickOutside
          onClickOutside={() => {
            if (home.results.length) {
              actions.updateResults([]);
            }
          }}
        >
          <input
            value={home.searchTerm}
            onChange={e => {
              const target = e.target as HTMLInputElement;

              actions.updateSearchTerm(target.value);
            }}
            onFocus={() => {
              actions.epicSearchOnFocus();
            }}
          />
          <select
            value={home.searchType}
            onChange={e => {
              const target = e.target as HTMLSelectElement;

              actions.updateSearchType(target.value);
            }}
          >
            <option value="multi">All</option>
            <option value="person">Person</option>
            <option value="tv">TV</option>
            <option value="movie">Movie</option>
          </select>
          <div>
            {home.results.map(result => (
              <div key={result.id}>{getMovieName(result)}</div>
            ))}
          </div>
        </ClickOutside>
        <div>
          <Link to="/movies/top_rated">
            <h3>Top Rated</h3>
          </Link>
          {movies.top_rated &&
            movies.top_rated.results
              .slice(0, 10)
              .map(movie => <div key={movie.id}>{getMovieName(movie)}</div>)}
        </div>
      </div>
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
    actions: bindActionCreators(HomeActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
