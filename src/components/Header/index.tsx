import * as React from 'react';

import Link from 'components/Link';

import * as s from './index.scss';

const Header = () => {
  return (
    <div className={s.container}>
      <div>
        <Link to="/">Home</Link>
        <Link to="/wishlist">Wishlist</Link>
      </div>
      <Link to="/login">logout</Link>
    </div>
  );
};

export default Header;
