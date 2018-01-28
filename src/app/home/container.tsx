import * as React from 'react';
import { connect } from 'react-redux';
import { Dispatch, bindActionCreators } from 'redux';

import Link from 'components/Link';

import { IRootState } from 'app';
import { getMovieName } from 'selectors';

import * as HomeActions from './actions';

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
    const { data: { login, home, movies }, actions } = this.props;

    if (login.status !== 'success') {
      return null;
    }

    return (
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <div>
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
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-around' }}>
          <div>
            <Link to="/movies/now_playing">
              <h3>Now Playing</h3>
            </Link>
            {movies.now_playing &&
              movies.now_playing.results
                .slice(0, 10)
                .map(movie => <div key={movie.id}>{getMovieName(movie)}</div>)}
          </div>
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
