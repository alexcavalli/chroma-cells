import React, { Component } from 'react';
import Cell from './Cell.js';
import './App.css';

class App extends Component {
  state = {
    values: [
      [[0, 0, 0], [0, 0, 0], [0, 0, 0]],
      [[0, 0, 0], [0, 0, 0], [0, 0, 0]],
      [[0, 0, 0], [0, 0, 0], [0, 0, 0]]
    ],
    settings: {
      width: 3,
      height: 3,
      depth: 3
    }
  };

  playCell = (cellX, cellY, cellZ) => {
    const { values } = this.state;
    const { width, height, depth } = this.state.settings;

    let newColors = Array(depth).fill().map((_, z) => {
      return Array(height).fill().map((_, y) => {
        return Array(width).fill().map((_, x) => {
          if (this.isInLineWithCell(cellX, cellY, cellZ, x, y, z)) {
            return this.cycleValue(values[z][y][x]);
          } else {
            return values[z][y][x];
          }
        });
      });
    });

    this.setState({
      ...this.state,
      values: newColors
    });
  };

  isInLineWithCell(cellX, cellY, cellZ, x, y, z) {
    return (
      (cellX === x && cellY === y) ||
      (cellX === x && cellZ === z) ||
      (cellY === y && cellZ === z)
    );
  }

  cycleValue(currentValue) {
    if (currentValue === 0) {
      return 1;
    } else {
      return 0;
    }
  }

  renderCellGrids() {
    const { depth } = this.state.settings;

    return Array(depth).fill().map((_, z) => {
      return (
        <div className="Cell-grid">
          {this.renderCellGrid(z)}
        </div>
      );
    });
  }

  renderCellGrid(z) {
    const { height } = this.state.settings;

    return Array(height).fill().map((_, y) => {
      return (
        <div className="Cell-row">
          {this.renderCellRow(y, z)}
        </div>
      );
    });
  }

  renderCellRow(y, z) {
    const { width } = this.state.settings;

    return Array(width).fill().map((_, x) => {
      return this.renderCell(x, y, z);
    });
  }

  renderCell(x, y, z) {
    const { values } = this.state;

    return (
      <Cell
        onClickCell={() => {
          this.playCell(x, y, z);
        }}
        value={values[z][y][x]}
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
          {this.renderCellGrids()}
        </div>
      </div>
    );
  }
}

export default App;
