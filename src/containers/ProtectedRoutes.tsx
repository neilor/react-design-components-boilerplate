import * as React from 'react';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router';

import { isLoggedIn } from 'selectors';
import { IRootState } from 'app';

import Home from 'app/home/container';
import Movies from 'app/movies/container';

interface IProps {
  data: IRootState;
}

const ProtectedRoutes = (props: IProps) => {
  const { data: { login } } = props;

  if (isLoggedIn(login)) {
    return (
      <>
        <Route exact path="/" component={Home} />
        <Route exact path="/movies/now_playing" component={Movies} />
        <Route exact path="/movies/top_rated" component={Movies} />
      </>
    );
  } else {
    return <Redirect to="/login" />;
  }
};

function mapStateToProps(state: IRootState) {
  return {
    data: state
  };
}

export default connect(mapStateToProps)(ProtectedRoutes);