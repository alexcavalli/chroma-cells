import React, { Component } from 'react';
import { CSSTransitionGroup } from 'react-transition-group';
import './Cell.css';

class Cell extends Component {
  constructor(props) {
    super(props);
    this.colors = [{ h: 191, s: 65 }, { h: 132, s: 55 }, { h: 0, s: 65 }];
  }

  color() {
    let baseColor = this.colors[this.props.value - 1];
    let baseColorHsl = { ...baseColor, l: 50 };
    let finalColorHsl = { ...baseColor, l: 70 };
    return `linear-gradient(to right top, ${this.serializeHsl(
      baseColorHsl
    )}, ${this.serializeHsl(finalColorHsl)})`;
  }

  serializeHsl(hslProps) {
    return `hsl(${hslProps.h}, ${hslProps.s}%, ${hslProps.l}%)`;
  }

  render() {
    const { onClickCell, value, cycle } = this.props;

    return (
      <CSSTransitionGroup
        component="div"
        className="Cell"
        onClick={onClickCell}
        transitionName="Cell-flip"
        transitionEnterTimeout={300}
        transitionLeaveTimeout={300}
      >
        <div className="Cell-flipper" key={value}>
          <div className="Cell-panel" style={{ backgroundImage: this.color() }}>
            <p style={{ color: 'white' }}>
              {cycle}
            </p>
          </div>
        </div>
      </CSSTransitionGroup>
    );
  }
}

export default Cell;
