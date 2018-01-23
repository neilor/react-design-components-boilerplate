import * as React from "react";
import * as classNames from "classnames";
import * as style from "./style.css";

export namespace TodoTextInput {
  export interface IProps {
    text?: string;
    placeholder?: string;
    newTodo?: boolean;
    editing?: boolean;
    onSave: (text: string) => void;
  }

  export interface IState {
    text: string;
  }
}

export class TodoTextInput extends React.Component<
  TodoTextInput.IProps,
  TodoTextInput.IState
> {
  constructor(props: TodoTextInput.IProps, context?: any) {
    super(props, context);
    this.state = {
      text: this.props.text || ""
    };
    this.handleBlur = this.handleBlur.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  private handleSubmit(e: React.KeyboardEvent<HTMLInputElement>) {
    const target = e.target as HTMLInputElement;
    const text = target.value.trim();
    if (e.which === 13) {
      this.props.onSave(text);
      if (this.props.newTodo) {
        this.setState({ text: "" });
      }
    }
  }

  private handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    this.setState({ text: e.target.value });
  }

  private handleBlur(e: React.FocusEvent<HTMLInputElement>) {
    const target = e.target as HTMLInputElement;
    const text = target.value.trim();
    if (!this.props.newTodo) {
      this.props.onSave(text);
    }
  }

  public render() {
    const classes = classNames(
      {
        [style.edit]: this.props.editing,
        [style.new]: this.props.newTodo
      },
      style.normal
    );

    return (
      <input
        className={classes}
        type="text"
        autoFocus
        placeholder={this.props.placeholder}
        value={this.state.text}
        onBlur={this.handleBlur}
        onChange={this.handleChange}
        onKeyDown={this.handleSubmit}
      />
    );
  }
}
