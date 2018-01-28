import * as React from 'react';
import { match as RouterMatch } from 'react-router';
import { connect } from 'react-redux';
import { Dispatch, bindActionCreators } from 'redux';

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
  public componentDidMount() {
    const { match, actions } = this.props;

    const movieListType = getMovieListType(match);

    actions.epicGetMovieList(movieListType);
  }

  public render() {
    const { data: { movies }, match } = this.props;

    const movieListType = getMovieListType(match);

    const moviesData = movies[movieListType];

    if (!moviesData) {
      return null;
    }

    return (
      <div>
        {moviesData.results.map(result => (
          <div key={result.id}>{result.title || result.name}</div>
        ))}
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
    actions: bindActionCreators(moviesActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Movies);
