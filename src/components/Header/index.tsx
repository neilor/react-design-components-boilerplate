import * as React from 'react';

import Link from 'components/Link';

import * as s from './index.scss';

const Header = () => {
  return (
    <div className={s.container}>
      <div className={s.iconsGroup}>
        <Link className={s.leftIcon} to="/">
          Home
        </Link>
        <Link className={s.leftIcon} to="/wishlist">
          Wishlist
        </Link>
      </div>
      <div className={s.iconsGroup}>
        <Link className={s.rightIcon} to="/login">
          Logout
        </Link>
      </div>
    </div>
  );
};

export default Header;
