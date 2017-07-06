import React, { Component } from 'react';
import Cell from './Cell.js';
import './App.css';

class App extends Component {
  state = {
    colors: [
      ['white', 'white', 'white'],
      ['white', 'white', 'white'],
      ['white', 'white', 'white']
    ],
    settings: {
      width: 3,
      height: 3 // no depth for now
    }
  };

  playCell = (cellX, cellY) => {
    const { colors } = this.state;
    const { width, height } = this.state.settings;

    let newColors = Array(height).fill().map((_, y) => {
      return Array(width).fill().map((_, x) => {
        if (cellX === x || cellY === y) {
          return this.cycleColor(colors[y][x]);
        } else {
          return colors[y][x];
        }
      });
    });

    this.setState({
      ...this.state,
      colors: newColors
    });
  };

  cycleColor(currentColor) {
    if (currentColor === 'white') {
      return 'black';
    } else {
      return 'white';
    }
  }

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
          this.playCell(x, y);
        }}
        color={colors[y][x]}
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
