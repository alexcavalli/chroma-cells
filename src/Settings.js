import React, { Component } from 'react';
import './Settings.css';

class Settings extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ...props.settings
    };
  }

  updateSetting = (setting, value) => {
    this.setState({
      ...this.state,
      [setting]: parseInt(value, 10)
    });
  };

  renderDropdown(id, label, options, currentValue) {
    return (
      <div>
        <label name={id}>
          {label}
        </label>
        <select
          id={id}
          value={currentValue}
          onChange={e => this.updateSetting(id, e.target.value)}
        >
          {options.map(opt => {
            return (
              <option key={opt} value={opt}>
                {opt}
              </option>
            );
          })}
        </select>
      </div>
    );
  }

  render() {
    const { width, height, depth, cycles } = this.state;
    return (
      <div className="Settings">
        {this.renderDropdown('width', 'Width', [2, 3, 4, 5], width)}
        {this.renderDropdown('height', 'Height', [2, 3, 4, 5], height)}
        {this.renderDropdown('depth', 'Depth', [1, 2, 3], depth)}
        {this.renderDropdown('cycles', 'Colors', [2, 3], cycles)}
        <button
          onClick={() => {
            this.props.onUpdateSettings(this.state);
          }}
        >
          Go
        </button>
      </div>
    );
  }
}

export default Settings;
