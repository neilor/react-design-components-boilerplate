import * as React from 'react';
import { connect } from 'react-redux';
import { Dispatch, bindActionCreators } from 'redux';

import MovieCard from 'components/MovieCard';

import * as loginActions from 'app/login/actions';

import { IRootState } from 'app';

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
    const { data: { login: { wishlist } }, actions } = this.props;

    if (!wishlist.length) {
      return null;
    }

    return (
      <div>
        {wishlist.map(movie => (
          <MovieCard
            key={movie.id}
            data={movie}
            actions={{ onAddToWatchlistclick: actions.epicWishlistAdd }}
          />
        ))}
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
