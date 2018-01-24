import { TodoTextInput } from 'components/TodoTextInput';
import * as React from 'react';
import { Action } from 'redux-actions';

export interface IProps {
  addTodo: (todo: Partial<ITodoItemData>) => Action<ITodoItemData>;
}

export class Header extends React.Component<IProps, {}> {
  constructor(props: IProps, context?: any) {
    super(props, context);
    this.handleSave = this.handleSave.bind(this);
  }

  private handleSave(text: string) {
    if (text.length) {
      this.props.addTodo({ text });
    }
  }

  public render() {
    return (
      <header>
        <h1>Todos</h1>
        <TodoTextInput
          newTodo
          onSave={this.handleSave}
          placeholder="What needs to be done?"
        />
      </header>
    );
  }
}
