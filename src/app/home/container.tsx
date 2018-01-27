import * as React from 'react';
import { connect } from 'react-redux';
import { Dispatch, bindActionCreators } from 'redux';

import { IRootState } from 'app';

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
        />
        <div>
          {home.results.map(result => (
            <div key={result.id}>
              {result.title ||
                result.name ||
                result.original_name ||
                result.original_title}
            </div>
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
