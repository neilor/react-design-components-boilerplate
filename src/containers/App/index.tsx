import * as React from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import { IRootState } from 'types/redux';
import { bindActionCreators, Dispatch } from 'redux';

import * as TodoActions from 'actions/todos';
import { Header, MainSection } from 'components';

import * as style from './style.css';

export namespace App {
  export interface IProps extends RouteComponentProps<void> {
    todos: ITodoItemData[];
    actions: typeof TodoActions;
  }
}

@connect(mapStateToProps, mapDispatchToProps)
export class App extends React.Component<App.IProps, {}> {
  public render() {
    const { todos, actions, children } = this.props;
    return (
      <div className={style.normal}>
        <Header addTodo={actions.addTodo} />
        <MainSection todos={todos} actions={actions} />
        {children}
      </div>
    );
  }
}

function mapStateToProps(state: IRootState) {
  return {
    todos: state.todos
  };
}

function mapDispatchToProps(dispatch: Dispatch<IRootState>) {
  return {
    actions: bindActionCreators(TodoActions, dispatch)
  };
}
