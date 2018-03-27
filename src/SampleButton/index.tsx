import * as React from 'react';

export interface IProps {
  label: string;
  onClick?: () => void;
}

export interface IState {
  status: string;
}

class SampleButton extends React.Component<IProps, IState> {
  public state = {
    status: 'waiting click',
  }

  private onClick = () => {
    if (this.props.onClick) {
      this.props.onClick();
    }
    this.setState({
      status: 'clicked',
    });
  }

  public render() {
    return (
      <button type="submit" onClick={this.onClick}>
        {this.props.label} ({this.state.status}!)
      </button>
    );
  }
}

export default SampleButton;
