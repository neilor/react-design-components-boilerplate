import * as React from 'react';

export interface SampleButtonProps {
  label: string;
  onClick?: Function;
}

export interface SampleButtonState {
  status: string;
}

class SampleButton extends React.Component<SampleButtonProps, SampleButtonState> {
  state = {
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
