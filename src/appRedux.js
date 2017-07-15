// in large part the structure of this file is based on the todoListRedux.js here:
// http://www.react.express/react_redux

import CellActions from './CellActions';

export const types = {
  START_GAME: 'START_GAME',
  PLAY_CELL: 'PLAY_CELL',
  REVERSE_PLAY_CELL: 'REVERSE_PLAY_CELL'
};

export const actionCreators = {
  startGame: settings => {
    return { type: types.START_GAME, payload: settings };
  },
  playCell: cellCoords => {
    return { type: types.PLAY_CELL, payload: cellCoords };
  },
  reversePlayCell: cellCoords => {
    return { type: types.REVERSE_PLAY_CELL, payload: cellCoords };
  }
};

const initialSettings = {
  width: 5,
  height: 5,
  depth: 1,
  cycles: 2
};
const initialCells = CellActions.generateDefaultCells(
  initialSettings.width,
  initialSettings.height,
  initialSettings.depth
);
const initialState = {
  settings: initialSettings,
  cells: initialCells
};

export const reducer = (state = initialState, action) => {
  const { cells, settings } = state;
  const { type } = action;

  switch (type) {
    case types.START_GAME: {
      const settings = action.payload;
      const { width, height, depth } = settings;

      let cells = CellActions.generateDefaultCells(width, height, depth);
      cells = CellActions.playRandomReverseCells(cells, settings);

      return {
        cells: cells,
        settings: settings
      };
    }
    case types.PLAY_CELL: {
      // TODO: refactor play cell and reverse play cell, too similar
      const cellCoords = action.payload;
      const [x, y, z] = cellCoords;

      let newCells = CellActions.playCell(
        cells,
        settings,
        x,
        y,
        z,
        CellActions.cycleValue
      );
      return {
        ...state,
        cells: newCells
      };
    }
    case types.REVERSE_PLAY_CELL: {
      const cellCoords = action.payload;
      const [x, y, z] = cellCoords;

      let newCells = CellActions.playCell(
        cells,
        settings,
        x,
        y,
        z,
        CellActions.reverseCycleValue
      );
      return {
        ...state,
        cells: newCells
      };
    }
    default: {
      return state;
    }
  }
};
