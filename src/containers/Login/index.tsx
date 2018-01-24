import * as React from 'react';

import * as s from './index.scss';
import { connect } from 'react-redux';
import { IRootState } from 'reducers';
import { Dispatch, bindActionCreators } from 'redux';

import * as LoginActions from 'actions/login';

interface IProps {
  data: IRootState;
  actions: typeof LoginActions;
}

class Login extends React.Component<IProps> {
  public render() {
    const { data: { login }, actions } = this.props;

    return (
      <div className={s.container}>
        <div>Login</div>
        <input
          value={login.id}
          onChange={e => {
            const target = e.target as HTMLInputElement;
            actions.editLoginId(target.value);
          }}
        />
        <input
          value={login.password}
          onChange={e => {
            const target = e.target as HTMLInputElement;
            actions.editLoginPassword(target.value);
          }}
        />
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
    actions: bindActionCreators(LoginActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);
