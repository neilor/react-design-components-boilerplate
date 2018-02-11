import * as React from 'react';

import * as cx from 'classnames';

import * as s from './index.scss';
const Loader = () => {
  return (
    <div className={s['sk-circle']}>
      <div className={cx(s['sk-circle1'], s['sk-child'])} />
      <div className={cx(s['sk-circle2'], s['sk-child'])} />
      <div className={cx(s['sk-circle3'], s['sk-child'])} />
      <div className={cx(s['sk-circle4'], s['sk-child'])} />
      <div className={cx(s['sk-circle5'], s['sk-child'])} />
      <div className={cx(s['sk-circle6'], s['sk-child'])} />
      <div className={cx(s['sk-circle7'], s['sk-child'])} />
      <div className={cx(s['sk-circle8'], s['sk-child'])} />
      <div className={cx(s['sk-circle9'], s['sk-child'])} />
      <div className={cx(s['sk-circle10'], s['sk-child'])} />
      <div className={cx(s['sk-circle11'], s['sk-child'])} />
      <div className={cx(s['sk-circle12'], s['sk-child'])} />
    </div>
  );
};

export default Loader;
