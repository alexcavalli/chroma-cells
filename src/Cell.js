import React, { Component } from 'react';
import { CSSTransitionGroup } from 'react-transition-group';
import './Cell.css';

class Cell extends Component {
  constructor(props) {
    super(props);
    this.colorClasses = ['Cell-blue', 'Cell-green', 'Cell-red'];
  }

  colorClass() {
    return this.colorClasses[this.props.value - 1];
  }

  render() {
    const { onClickCell, value, cycle } = this.props;

    return (
      <CSSTransitionGroup
        component="div"
        className="Cell"
        onClick={onClickCell}
        transitionName="Cell-flip"
        transitionEnterTimeout={300}
        transitionLeaveTimeout={300}
      >
        <div className="Cell-flipper" key={value}>
          <div className={`Cell-panel ${this.colorClass()}`}>
            <p style={{ color: 'white' }}>
              {cycle}
            </p>
          </div>
        </div>
      </CSSTransitionGroup>
    );
  }
}

export default Cell;
