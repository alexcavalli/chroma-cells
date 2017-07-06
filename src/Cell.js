import React, { Component } from "react";
import "./Cell.css";

class Cell extends Component {
  render() {
    const { onClickCell, color } = this.props;

    return (
      <div
        className="Cell"
        onClick={onClickCell}
        style={{ backgroundColor: color }}
      />
    );
  }
}

export default Cell;
