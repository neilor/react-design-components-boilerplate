import * as React from 'react';
import { connect } from 'react-redux';
import { Dispatch, bindActionCreators } from 'redux';
import { routerActions } from 'react-router-redux';
import * as cx from 'classnames';

import { IRootState } from 'routes';

import * as s from './index.scss';

interface IProps extends React.HTMLAttributes<HTMLAnchorElement> {
  actions: typeof routerActions;
  to: string;
}

const Link = (props: IProps) => {
  const { actions, to, className, ...rest } = props;

  return (
    <a
      className={cx(className, s.container)}
      {...rest}
      onClick={() => {
        actions.push(to);
      }}
    />
  );
};

function mapDispatchToProps(dispatch: Dispatch<IRootState>) {
  return {
    actions: bindActionCreators(routerActions, dispatch)
  };
}

export default connect(null, mapDispatchToProps)(Link);
