import * as React from 'react';
import { connect } from 'react-redux';
import { Dispatch, bindActionCreators } from 'redux';

import { IRootState } from 'app';
import { getMovieName } from 'selectors';

import * as HomeActions from './actions';

interface IProps {
  data: IRootState;
  actions: typeof HomeActions;
}

class Home extends React.Component<IProps, any> {
  public componentDidMount() {
    const { actions } = this.props;

    actions.epicCheckLogin();
  }

  public render() {
    const { data: { login, home }, actions } = this.props;

    if (login.status !== 'success') {
      return null;
    }

    return (
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
