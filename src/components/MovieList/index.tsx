import * as React from 'react';
import * as cx from 'classnames';
import * as s from './index.scss';

interface IProps {
  children: React.ReactNode;
  className?: string;
}

const MovieList = (props: IProps) => {
  return (
    <div className={cx(s.container, props.className)}>
      {React.Children.map(props.children, child => {
        if (React.isValidElement(child)) {
          return React.cloneElement(child as any, { className: s.child });
        }
      })}
    </div>
  );
};

export default MovieList;
