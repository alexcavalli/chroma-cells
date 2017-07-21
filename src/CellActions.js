// This is just a bag of functions, but keeping the namespace
export default class CellActions {
  static generateDefaultCells(width, height, depth) {
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

  static playRandomReverseCells(cells, settings) {
    const { width, height, depth, cycles } = settings;
    let numReversePlays = Math.floor(width * height * depth * cycles / 2); // play roughly half the moves

    Array(numReversePlays).fill().forEach(() => {
      let randomX = CellActions.getRandomIntExclusiveMax(0, width);
      let randomY = CellActions.getRandomIntExclusiveMax(0, height);
      let randomZ = CellActions.getRandomIntExclusiveMax(0, depth);
      cells = CellActions.playCell(
        cells,
        settings,
        randomX,
        randomY,
        randomZ,
        CellActions.reverseCycleValue
      );
    });
    return cells;
  }

  // Yanked directly from:
  // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
  // Move to a utils file, probably.
  static getRandomIntExclusiveMax(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
  }

  static playCell(cells, settings, cellX, cellY, cellZ, cycler) {
    const { width, height, depth, cycles } = settings;

    // Update all cells' values in line with the played cell (including played cell)
    let newCells = Array(depth).fill().map((_, z) => {
      return Array(height).fill().map((_, y) => {
        return Array(width).fill().map((_, x) => {
          if (CellActions.isInLineWithCell(cellX, cellY, cellZ, x, y, z)) {
            let newValue = cycler(cells[z][y][x].value, cycles);
            return {
              ...cells[z][y][x],
              value: newValue
            };
          } else {
            // lots of object state cloning - hopefully not terrible for perf
            return {
              ...cells[z][y][x]
            };
          }
        });
      });
    });

    // Update played cell cycles
    let playedCell = newCells[cellZ][cellY][cellX];
    playedCell.cycle = cycler(playedCell.cycle, cycles); // mutate is ok/intentional here, we already cloned this object

    return newCells;
  }

  static isInLineWithCell(cellX, cellY, cellZ, x, y, z) {
    return (
      (cellX === x && cellY === y) ||
      (cellX === x && cellZ === z) ||
      (cellY === y && cellZ === z)
    );
  }

  static cycleValue(currentValue, maxCycles) {
    if (currentValue === maxCycles) {
      return 1;
    } else {
      return currentValue + 1;
    }
  }

  static reverseCycleValue(currentValue, maxCycles) {
    if (currentValue === 1) {
      return maxCycles;
    } else {
      return currentValue - 1;
    }
  }

  static allSameValue(cells) {
    const checkValue = cells[0][0][0].value;
    return cells.every(level => {
      return level.every(row => {
        return row.every(cell => {
          return cell.value == checkValue;
        });
      });
    });
  }
}
