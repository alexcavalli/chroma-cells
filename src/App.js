import React, { Component } from 'react';
import Cell from './Cell.js';
import './App.css';

class App extends Component {
  state = {
    colors: [
      [
        ['white', 'white', 'white'],
        ['white', 'white', 'white'],
        ['white', 'white', 'white']
      ],
      [
        ['white', 'white', 'white'],
        ['white', 'white', 'white'],
        ['white', 'white', 'white']
      ],
      [
        ['white', 'white', 'white'],
        ['white', 'white', 'white'],
        ['white', 'white', 'white']
      ]
    ],
    settings: {
      width: 3,
      height: 3,
      depth: 3
    }
  };

  playCell = (cellX, cellY, cellZ) => {
    const { colors } = this.state;
    const { width, height, depth } = this.state.settings;

    let newColors = Array(depth).fill().map((_, z) => {
      return Array(height).fill().map((_, y) => {
        return Array(width).fill().map((_, x) => {
          if (this.isInLineWithCell(cellX, cellY, cellZ, x, y, z)) {
            return this.cycleColor(colors[z][y][x]);
          } else {
            return colors[z][y][x];
          }
        });
      });
    });

    this.setState({
      ...this.state,
      colors: newColors
    });
  };

  isInLineWithCell(cellX, cellY, cellZ, x, y, z) {
    return (
      (cellX === x && cellY === y) ||
      (cellX === x && cellZ === z) ||
      (cellY === y && cellZ === z)
    );
  }

  cycleColor(currentColor) {
    if (currentColor === 'white') {
      return 'black';
    } else {
      return 'white';
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
    const { colors } = this.state;

    return (
      <Cell
        onClickCell={() => {
          this.playCell(x, y, z);
        }}
        color={colors[z][y][x]}
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
