import React, { Component } from "react";
import Cell from "./Cell.js";
import "./App.css";

class App extends Component {
  state = {
    colors: [
      ["white", "white", "white"],
      ["white", "white", "white"],
      ["white", "white", "white"]
    ],
    settings: {
      width: 3,
      height: 3 // no depth for now
    }
  };

  toggleColor = (x, y) => {
    const { colors } = this.state;
    let newColors = [...colors];
    let nextColor = "";

    if (colors[x][y] === "white") {
      nextColor = "black";
    } else {
      nextColor = "white";
    }
    newColors[x][y] = nextColor;

    this.setState({
      ...this.state,
      colors: newColors
    });
  };

  renderCellGrid() {
    const { height } = this.state.settings;

    return Array(height).fill().map((_, y) => {
      return (
        <div className="Cell-row">
          {this.renderCellRow(y)}
        </div>
      );
    });
  }

  renderCellRow(y) {
    const { width } = this.state.settings;

    return Array(width).fill().map((_, x) => {
      return this.renderCell(x, y);
    });
  }

  renderCell(x, y) {
    const { colors } = this.state;

    return (
      <Cell
        onClickCell={() => {
          this.toggleColor(x, y);
        }}
        color={colors[x][y]}
      />
    );
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h2>Chroma Cells</h2>
        </div>
        <div className="App-container">
          {this.renderCellGrid()}
        </div>
      </div>
    );
  }
}

export default App;
