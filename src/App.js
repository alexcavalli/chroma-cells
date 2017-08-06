import React, { Component } from 'react';
import { connect } from 'react-redux';

import { actionCreators } from './appRedux';
import Cell from './Cell.js';
import Settings from './Settings.js';
import './App.css';

const mapStateToProps = state => ({
  settings: state.settings,
  cells: state.cells,
  win: state.win,
  cheatMode: state.cheatMode
});

class App extends Component {
  onPlayCell(cellCoords) {
    const { dispatch } = this.props;

    dispatch(actionCreators.playCell(cellCoords));
  }

  onStartGame = settings => {
    const { dispatch } = this.props;

    dispatch(actionCreators.startGame(settings));
  };

  onToggleCheatMode = () => {
    const { dispatch } = this.props;

    dispatch(actionCreators.toggleCheatMode());
  };

  renderCellGrids() {
    const { depth } = this.props.settings;

    return Array(depth).fill().map((_, z) => {
      return (
        <div key={['grid', z].join('-')} className="App-cell-grid">
          {this.renderCellGrid(z)}
        </div>
      );
    });
  }

  renderCellGrid(z) {
    const { height } = this.props.settings;

    return Array(height).fill().map((_, y) => {
      return (
        <div key={['row', y, z].join('-')} className="App-cell-row">
          {this.renderCellRow(y, z)}
        </div>
      );
    });
  }

  renderCellRow(y, z) {
    const { width } = this.props.settings;

    return Array(width).fill().map((_, x) => {
      return this.renderCell(x, y, z);
    });
  }

  renderCell(x, y, z) {
    const { cells, cheatMode } = this.props;
    const thisCell = cells[z][y][x];
    const cycle = cheatMode && thisCell.cycle;

    return (
      <Cell
        onClickCell={() => {
          this.onPlayCell([x, y, z]);
        }}
        value={thisCell.value}
        cycle={cycle}
        key={[x, y, z].join('-')}
      />
    );
  }

  render() {
    const { settings, win } = this.props;
    return (
      <div className="App">
        <div className="App-header">
          <h2>Chroma Cells</h2>
          {win && <h2>You win.</h2>}
        </div>
        <div className="App-settings">
          <Settings settings={settings} onUpdateSettings={this.onStartGame} />
          <button onClick={this.onToggleCheatMode}>Cheat Mode</button>
        </div>
        <div className="App-container">
          {this.renderCellGrids()}
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps)(App);
