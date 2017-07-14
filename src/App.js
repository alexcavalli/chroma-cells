import React, { Component } from 'react';
import Cell from './Cell.js';
import Settings from './Settings.js';
import './App.css';

// TODO: Refactor this whole file, it's doing way too much.
class App extends Component {
  componentWillMount() {
    const settings = {
      width: 3,
      height: 3,
      depth: 3,
      cycles: 3
    };
    const { width, height, depth } = settings;

    this.state = {
      values: this.generateDefaultValues(width, height, depth),
      settings: settings
    };
  }

  generateDefaultValues(width, height, depth) {
    return Array(depth).fill().map(() => {
      return Array(height).fill().map(() => {
        return Array(width).fill(1);
      });
    });
  }

  startGame = settings => {
    const { width, height, depth } = settings;

    let values = this.generateDefaultValues(width, height, depth);
    values = this.playRandomReverseCells(values, settings);

    this.setState({
      values: values,
      settings: settings
    });
  };

  playRandomReverseCells(values, settings) {
    const { width, height, depth, cycles } = settings;
    let numReversePlays = Math.floor(width * height * depth * cycles / 2); // play roughly half the moves

    Array(numReversePlays).fill().forEach(_ => {
      let randomX = this.getRandomIntExclusiveMax(0, width);
      let randomY = this.getRandomIntExclusiveMax(0, height);
      let randomZ = this.getRandomIntExclusiveMax(0, depth);
      values = this.playCell(
        values,
        settings,
        randomX,
        randomY,
        randomZ,
        this.reverseCycleValue
      );
    });
    return values;
  }

  // Yanked directly from:
  // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
  // Move to a utils file, probably.
  getRandomIntExclusiveMax(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
  }

  playCell = (values, settings, cellX, cellY, cellZ, cycler) => {
    const { width, height, depth, cycles } = settings;

    let newValues = Array(depth).fill().map((_, z) => {
      return Array(height).fill().map((_, y) => {
        return Array(width).fill().map((_, x) => {
          if (this.isInLineWithCell(cellX, cellY, cellZ, x, y, z)) {
            return cycler(values[z][y][x], cycles);
          } else {
            return values[z][y][x];
          }
        });
      });
    });

    return newValues;
  };

  isInLineWithCell(cellX, cellY, cellZ, x, y, z) {
    return (
      (cellX === x && cellY === y) ||
      (cellX === x && cellZ === z) ||
      (cellY === y && cellZ === z)
    );
  }

  cycleValue = (currentValue, maxCycles) => {
    if (currentValue === maxCycles) {
      return 1;
    } else {
      return currentValue + 1;
    }
  };

  reverseCycleValue = (currentValue, maxCycles) => {
    if (currentValue === 1) {
      return maxCycles;
    } else {
      return currentValue - 1;
    }
  };

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
          const { values, settings } = this.state;
          let newValues = this.playCell(
            values,
            settings,
            x,
            y,
            z,
            this.cycleValue
          );
          this.setState({
            ...this.state,
            values: newValues
          });
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
        <div className="App-settings">
          <Settings onUpdateSettings={this.startGame} />
        </div>
        <div className="App-container">
          {this.renderCellGrids()}
        </div>
      </div>
    );
  }
}

export default App;
