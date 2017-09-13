import React, { Component } from 'react';
import { connect } from 'react-redux';

import { actionCreators } from './appRedux';
import Cell from './Cell.js';
import Settings from './Settings.js';
import Instructions from './Instructions.js';
import './App.css';

const mapStateToProps = state => ({
  settings: state.settings,
  cells: state.cells,
  win: state.win,
  movesMade: state.movesMade,
  cheatMode: state.cheatMode,
  showInstructions: state.showInstructions
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

  onShowInstructions = () => {
    const { dispatch } = this.props;

    dispatch(actionCreators.showInstructions());
  };

  onCloseInstructions = () => {
    const { dispatch } = this.props;

    dispatch(actionCreators.closeInstructions());
  };

  renderCellGrids() {
    const { depth } = this.props.settings;

    return Array(depth).fill().map((_, z) => {
      return (
        <div key={['grid', z].join('-')} className="App-cell-grid">
          {depth > 1 &&
            <h5 className="App-cell-grid-title">
              Layer {z + 1}
            </h5>}
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
    const { cells, cheatMode, win } = this.props;
    const thisCell = cells[z][y][x];
    const cycle = cheatMode && thisCell.cycle;

    return (
      <Cell
        onClickCell={() => {
          this.onPlayCell([x, y, z]);
        }}
        value={thisCell.value}
        cycle={cycle}
        win={win}
        key={[x, y, z].join('-')}
      />
    );
  }

  render() {
    const { settings, win, movesMade, showInstructions } = this.props;
    return (
      <div className="App">
        <div className="App-header">
          <h2>
            {win ? `You Win! (${movesMade} moves)` : 'Chroma Tiles'}
          </h2>
        </div>
        <div className="App-settings">
          <Settings
            settings={settings}
            onUpdateSettings={this.onStartGame}
            displayCheatMode={movesMade > 50}
            onClickCheatMode={this.onToggleCheatMode}
          />
        </div>
        <div className="App-container">
          {this.renderCellGrids()}
        </div>
        <div className="App-footer">
          <div>
            <a href="#" onClick={this.onShowInstructions}>
              Instructions
            </a>
          </div>
          <div>
            <a href="https://github.com/alexcavalli/chroma-tiles">
              Code on GitHub
            </a>
          </div>
        </div>
        {showInstructions &&
          <Instructions onCloseInstructions={this.onCloseInstructions} />}
      </div>
    );
  }
}

export default connect(mapStateToProps)(App);
