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

    actions.checkLogin();
  }

  public render() {
    const { data: { login } } = this.props;

    if (login.status !== 'success') {
      return null;
    }

    return <div>Home</div>;
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
