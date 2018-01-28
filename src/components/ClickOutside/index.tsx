import * as React from 'react';

interface IProps {
  onClickOutside: (e: any) => void;
}

class ClickOutside extends React.Component<IProps, any> {
  private isTouch: boolean;
  private container: HTMLDivElement | null;

  public constructor(props: IProps) {
    super(props);
    this.getContainer = this.getContainer.bind(this);
    this.isTouch = false;
  }

  private getContainer(ref: HTMLDivElement) {
    this.container = ref;
  }

  public render() {
    const { children, onClickOutside, ...props } = this.props;
    return (
      <div {...props} ref={this.getContainer}>
        {children}
      </div>
    );
  }

  public componentDidMount() {
    document.addEventListener('touchend', this.handle, true);
    document.addEventListener('click', this.handle, true);
  }

  public componentWillUnmount() {
    document.removeEventListener('touchend', this.handle, true);
    document.removeEventListener('click', this.handle, true);
  }

  private handle = (e: TouchEvent) => {
    if (e.type === 'touchend') {
      this.isTouch = true;
    }
    if (e.type === 'click' && this.isTouch) {
      return;
    }
    const { onClickOutside } = this.props;
    const el = this.container;
    if (el && !el.contains(e.target as any)) {
      onClickOutside(e);
    }
  };
}

export default ClickOutside;
