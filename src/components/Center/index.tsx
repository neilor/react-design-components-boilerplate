import * as React from 'react';

import * as s from './index.scss';

interface IProps {
  children: React.ReactNode;
}

const Center = (props: IProps) => {
  return <div className={s.container}>{props.children}</div>;
};

export default Center;
