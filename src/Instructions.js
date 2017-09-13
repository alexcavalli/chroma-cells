import React, { Component } from 'react';
import './Instructions.css';

class Instructions extends Component {
  render() {
    const { onCloseInstructions } = this.props;

    return (
      <div className="Instructions">
        <div className="Instructions-modal">
          <div className="Instructions-body">
            <p>Welcome to Chroma Tiles!</p>
            <p>
              The goal is to get all the tiles to be the same color. Clicking on
              a tile will flip that tile, as well as any tiles in the same row
              and column, to a new color. When playing a 3-dimensional game,
              flipping a tile will also flip all other tiles in the same stack
              (imagine a line through a Rubik's Cube). The color changes happen
              in a cycle - for instance, if there are three colors, flipping a
              blue tile three times will cause it go to green, to red, and then
              back to blue.
            </p>
            <p>
              The game parameters are set for a 2-dimensional game with only two
              colors to start with (blue and green). If you find that too easy,
              feel free to increase the size, dimensions, or number of colors.
              If you find your settings too hard, decrease the size, dimensions,
              or number of colors.
            </p>
            <p>Have fun!</p>
            <div>
              <button
                className="Instructions-button"
                onClick={onCloseInstructions}
              >
                Got It!
              </button>
            </div>
          </div>
        </div>
        <div className="Instructions-overlay" />
      </div>
    );
  }
}

export default Instructions;
