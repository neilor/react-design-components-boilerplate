import * as classNames from 'classnames';
import {
  FILTER_TYPES,
  SHOW_ACTIVE,
  SHOW_ALL,
  SHOW_COMPLETED
} from 'constants/filters';
import * as React from 'react';

import * as style from './style.css';

export const FILTER_TITLES = {
  [SHOW_ALL]: 'All',
  [SHOW_ACTIVE]: 'Active',
  [SHOW_COMPLETED]: 'Completed'
};

export interface IProps {
  filter: ITodoFilterType;
  activeCount: number;
  completedCount: number;
  onShow: (filter: ITodoFilterType) => any;
  onClearCompleted: () => any;
}

export class Footer extends React.Component<IProps, {}> {
  public renderTodoCount() {
    const { activeCount } = this.props;
    const itemWord = activeCount === 1 ? 'item' : 'items';

    return (
      <span className={style.count}>
        <strong>{activeCount || 'No'}</strong> {itemWord} left
      </span>
    );
  }

  private renderFilterLink(filter: ITodoFilterType) {
    const { filter: selectedFilter, onShow } = this.props;

    return (
      <a
        className={classNames({ [style.selected]: filter === selectedFilter })}
        style={{ cursor: 'pointer' }}
        onClick={() => onShow(filter)}
      >
        {FILTER_TITLES[filter]}
      </a>
    );
  }

  private renderClearButton() {
    const { completedCount, onClearCompleted } = this.props;
    if (completedCount > 0) {
      return (
        <button className={style.clearCompleted} onClick={onClearCompleted}>
          Clear completed
        </button>
      );
    }
  }

  public render() {
    return (
      <footer className={style.normal}>
        {this.renderTodoCount()}
        <ul className={style.filters}>
          {FILTER_TYPES.map(filter => (
            <li key={filter}>{this.renderFilterLink(filter)}</li>
          ))}
        </ul>
        {this.renderClearButton()}
      </footer>
    );
  }
}
