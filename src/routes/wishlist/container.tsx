import * as React from 'react';
import { connect } from 'react-redux';
import { Dispatch, bindActionCreators } from 'redux';

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
      return <h2>There are no items in your wishlist</h2>;
    }

    return (
      <div>
        {wishlist.map(movie => <MovieCard key={movie.id} data={movie} />)}
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
    actions: bindActionCreators(loginActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Wishlist);
