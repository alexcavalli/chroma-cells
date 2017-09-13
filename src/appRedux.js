// in large part the structure of this file is based on the todoListRedux.js here:
// http://www.react.express/react_redux

import CellActions from './CellActions';

export const types = {
  START_GAME: 'START_GAME',
  PLAY_CELL: 'PLAY_CELL',
  REVERSE_PLAY_CELL: 'REVERSE_PLAY_CELL',
  TOGGLE_CHEAT_MODE: 'TOGGLE_CHEAT_MODE',
  CLOSE_INSTRUCTIONS: 'CLOSE_INSTRUCTIONS'
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
  },
  toggleCheatMode: () => {
    return { type: types.TOGGLE_CHEAT_MODE };
  },
  closeInstructions: () => {
    return { type: types.CLOSE_INSTRUCTIONS };
  }
};

const initialSettings = {
  width: 5,
  height: 5,
  depth: 1,
  cycles: 2
};
let initialCells = CellActions.generateDefaultCells(
  initialSettings.width,
  initialSettings.height,
  initialSettings.depth
);
initialCells = CellActions.playRandomReverseCells(
  initialCells,
  initialSettings
);
const initialState = {
  settings: initialSettings,
  cells: initialCells,
  win: false,
  movesMade: 0,
  cheatMode: false,
  showInstructions: true
};

export const reducer = (state = initialState, action) => {
  const { cells, settings, movesMade } = state;
  const { type } = action;

  switch (type) {
    case types.START_GAME: {
      const settings = action.payload;
      const { width, height, depth } = settings;

      let cells = CellActions.generateDefaultCells(width, height, depth);
      cells = CellActions.playRandomReverseCells(cells, settings);

      return {
        cells: cells,
        settings: settings,
        win: false, // there's an edge case that the generated board could be a win.
        movesMade: 0,
        cheatMode: false,
        showInstructions: false
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
      let isWin = CellActions.allSameValue(newCells);
      return {
        ...state,
        cells: newCells,
        win: isWin,
        movesMade: movesMade + 1
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
      let isWin = CellActions.allSameValue(newCells);
      return {
        ...state,
        cells: newCells,
        win: isWin,
        movesMade: movesMade + 1
      };
    }
    case types.TOGGLE_CHEAT_MODE: {
      return {
        ...state,
        cheatMode: !state.cheatMode
      };
    }
    case types.CLOSE_INSTRUCTIONS: {
      return {
        ...state,
        showInstructions: false
      };
    }
    default: {
      return state;
    }
  }
};
