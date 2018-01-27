import * as React from 'react';

import * as s from './styles.scss';

import { connect } from 'react-redux';
import { IRootState } from 'app';
import { Dispatch, bindActionCreators } from 'redux';

import * as LoginActions from './actions';

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
            autoFocus={login.status === 'failure'}
            onChange={e => {
              const target = e.target as HTMLInputElement;
              actions.editLoginId(target.value);
            }}
          />
          <input
            value={login.password}
            placeholder="password"
            type="password"
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
            case 'failure':
              return <div>wrong id or password</div>;
            case 'success':
              return <div>login successful !!!</div>;
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
