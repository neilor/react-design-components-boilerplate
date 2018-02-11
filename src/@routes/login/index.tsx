import * as React from 'react';
import { connect } from 'react-redux';
import { Dispatch, bindActionCreators } from 'redux';

import Loader from '@components/Loader';
import { IRootState } from '@reducers';
import { actions as LoginActions } from '@reducers/login';

import * as s from './index.scss';

interface IProps {
  data: IRootState;
  actions: typeof LoginActions;
}

class Login extends React.Component<IProps> {
  public render() {
    const { data: { login }, actions } = this.props;

    return (
      <div className={s.container}>
        <div className={s.form}>
          <h1>Login</h1>
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
                actions.editField({ value: target.value, key: 'id' });
              }}
            />
            <input
              value={login.password}
              placeholder="password"
              type="password"
              onChange={e => {
                const target = e.target as HTMLInputElement;
                actions.editField({ value: target.value, key: 'password' });
              }}
            />
            <button type="submit">Login</button>
          </form>
        </div>
        <div className={s.status}>
          {(() => {
            switch (login.status) {
              case 'checking':
                return <Loader />;
              case 'failure':
                return <div className={s.error}>wrong id or password</div>;
            }
          })()}
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
    actions: bindActionCreators(LoginActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);
