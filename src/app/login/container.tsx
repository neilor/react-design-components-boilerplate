import * as React from 'react';

import * as s from './styles.scss';

import { connect } from 'react-redux';
import { routerActions } from 'react-router-redux';
import { IRootState } from 'app';
import { Dispatch, bindActionCreators } from 'redux';

import * as LoginActions from './actions';

interface IProps {
  data: IRootState;
  actions: typeof LoginActions;
  router: typeof routerActions;
}

class Login extends React.Component<IProps> {
  public render() {
    const { data: { login }, actions, router } = this.props;

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
        <button
          onClick={() => {
            router.push('foo');
          }}
        >
          foo
        </button>
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
    actions: bindActionCreators(LoginActions, dispatch),
    router: bindActionCreators(routerActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);
