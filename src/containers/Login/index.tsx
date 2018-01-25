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
        <form
          onSubmit={e => {
            e.preventDefault();

            actions.checkLoginCredentials();
          }}
        >
          <input
            value={login.id}
            placeholder="id"
            onChange={e => {
              const target = e.target as HTMLInputElement;
              actions.editLoginId(target.value);
            }}
          />
          <input
            value={login.password}
            placeholder="password"
            onChange={e => {
              const target = e.target as HTMLInputElement;
              actions.editLoginPassword(target.value);
            }}
          />
          <button type="submit">Login</button>
        </form>
        {(() => {
          switch (login.status) {
            case 'checking':
              return <div>checking login credentials ...</div>;
            case 'success':
              return <div>login success !!!</div>;
          }
        })()}
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
