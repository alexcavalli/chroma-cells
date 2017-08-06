import React, { Component } from 'react';
import { CSSTransitionGroup } from 'react-transition-group';
import './Cell.css';

class Cell extends Component {
  color() {
    if (this.props.value === 1) {
      return 'blue';
    } else if (this.props.value === 2) {
      return 'black';
    } else {
      return 'red';
    }
  }

  render() {
    const { onClickCell, value, cycle } = this.props;

    return (
      <CSSTransitionGroup
        component="div"
        className="Cell"
        onClick={onClickCell}
        transitionName="Cell-flip"
        transitionEnterTimeout={500}
        transitionLeaveTimeout={500}
      >
        <div className="Cell-flipper" key={value}>
          <div
            className="Cell-panel"
            style={{ backgroundColor: this.color() }}
          />
        </div>
      </CSSTransitionGroup>
    );
  }
}

export default Cell;

// <p style={{ color: 'green' }}>
//   {cycle}
// </p>
