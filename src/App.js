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
      cells: this.generateDefaultCells(width, height, depth),
      settings: settings
    };
  }

  generateDefaultCells(width, height, depth) {
    return Array(depth).fill().map(() => {
      return Array(height).fill().map(() => {
        return Array(width).fill().map(() => {
          return {
            value: 1,
            cycle: 1
          };
        });
      });
    });
  }

  startGame = settings => {
    const { width, height, depth } = settings;

    let cells = this.generateDefaultCells(width, height, depth);
    cells = this.playRandomReverseCells(cells, settings);

    this.setState({
      cells: cells,
      settings: settings
    });
  };

  playRandomReverseCells(cells, settings) {
    const { width, height, depth, cycles } = settings;
    let numReversePlays = Math.floor(width * height * depth * cycles / 2); // play roughly half the moves

    Array(numReversePlays).fill().forEach(() => {
      let randomX = this.getRandomIntExclusiveMax(0, width);
      let randomY = this.getRandomIntExclusiveMax(0, height);
      let randomZ = this.getRandomIntExclusiveMax(0, depth);
      cells = this.playCell(
        cells,
        settings,
        randomX,
        randomY,
        randomZ,
        this.reverseCycleValue
      );
    });
    return cells;
  }

  // Yanked directly from:
  // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
  // Move to a utils file, probably.
  getRandomIntExclusiveMax(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
  }

  playCell = (cells, settings, cellX, cellY, cellZ, cycler) => {
    const { width, height, depth, cycles } = settings;

    // Update all cells' values in line with the played cell (including played cell)
    let newCells = Array(depth).fill().map((_, z) => {
      return Array(height).fill().map((_, y) => {
        return Array(width).fill().map((_, x) => {
          if (this.isInLineWithCell(cellX, cellY, cellZ, x, y, z)) {
            let newValue = cycler(cells[z][y][x].value, cycles);
            return {
              ...cells[z][y][x],
              value: newValue
            };
          } else {
            // adjacent board states will share these object refs. This is probably ok.
            return cells[z][y][x];
          }
        });
      });
    });

    // Update played cell cycles
    let playedCell = cells[cellZ][cellY][cellX];
    playedCell.cycle = cycler(playedCell.cycle, cycles); // mutate is ok/intentional here, we already cloned this object

    return newCells;
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
    const { cells } = this.state;

    return (
      <Cell
        onClickCell={() => {
          const { cells, settings } = this.state;
          let newCells = this.playCell(
            cells,
            settings,
            x,
            y,
            z,
            this.cycleValue
          );
          this.setState({
            ...this.state,
            cells: newCells
          });
        }}
        value={cells[z][y][x].value}
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
