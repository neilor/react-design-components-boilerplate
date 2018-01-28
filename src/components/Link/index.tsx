import * as React from 'react';
import { connect } from 'react-redux';
import { Dispatch, bindActionCreators } from 'redux';
import { routerActions } from 'react-router-redux';

import { IRootState } from 'app';

interface IProps extends React.HTMLAttributes<HTMLAnchorElement> {
  actions: typeof routerActions;
  to: string;
}

const Link = (props: IProps) => {
  const { actions, to, ...rest } = props;

  return (
    <a
      {...rest}
      onClick={() => {
        // e.preventDefault();

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
