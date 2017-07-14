import React, { Component } from 'react';
import './Cell.css';

class Cell extends Component {
  color() {
    if (this.props.value === 1) {
      return 'white';
    } else if (this.props.value === 2) {
      return 'black';
    } else {
      return 'red';
    }
  }

  render() {
    const { onClickCell, cycle } = this.props;

    return (
      <div
        className="Cell"
        onClick={onClickCell}
        style={{ backgroundColor: this.color() }}
      >
        <p style={{ color: 'green' }}>
          {cycle}
        </p>
      </div>
    );
  }
}

export default Cell;
