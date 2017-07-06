import React, { Component } from 'react';
import './Cell.css';

class Cell extends Component {
  color() {
    if (this.props.value === 0) {
      return 'white';
    } else {
      return 'black';
    }
  }

  render() {
    const { onClickCell } = this.props;

    return (
      <div
        className="Cell"
        onClick={onClickCell}
        style={{ backgroundColor: this.color() }}
      />
    );
  }
}

export default Cell;
