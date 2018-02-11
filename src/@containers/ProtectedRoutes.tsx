import * as React from 'react';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router';
import { ToastContainer } from 'react-toastify';

import { IRootState } from '@reducers';
import { isLoggedIn } from '@selectors';

import Home from '@routes/home';
import MoviesList from '@routes/moviesList';
import Wishlist from '@routes/wishlist';

import Header from '@components/Header';

interface IProps {
  data: IRootState;
}

const ProtectedRoutes = (props: IProps) => {
  const { data: { login } } = props;

  if (isLoggedIn(login)) {
    return (
      <>
        <Header />
        <ToastContainer />
        <Route exact path="/" component={Home} />
        <Route exact path="/movies/now_playing" component={MoviesList} />
        <Route exact path="/movies/top_rated" component={MoviesList} />
        <Route exact path="/wishlist" component={Wishlist} />
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
