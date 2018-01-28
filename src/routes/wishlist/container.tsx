import * as React from 'react';
import { connect } from 'react-redux';
import { Dispatch, bindActionCreators } from 'redux';

import Center from 'components/Center';
import MovieList from 'components/MovieList';
import MovieCard from 'components/MovieCard';

import * as loginActions from 'routes/login/actions';

import { IRootState } from 'routes';

interface IProps {
  data: IRootState;
  actions: typeof loginActions;
}

class Wishlist extends React.Component<IProps, any> {
  public componentDidMount() {
    const { actions } = this.props;

    actions.epicWishlistGet();
  }

  public render() {
    const { data: { login: { wishlist } } } = this.props;

    if (!wishlist.length) {
      return (
        <Center>
          <h2>There are no items in your wishlist</h2>
        </Center>
      );
    }

    return (
      <>
        <h1 style={{ textAlign: 'center' }}>Wishlist</h1>
        <Center>
          <MovieList>
            {wishlist.map(movie => <MovieCard key={movie.id} data={movie} />)}
          </MovieList>
        </Center>
      </>
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
    actions: bindActionCreators(loginActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Wishlist);
