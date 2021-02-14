/* eslint-disable no-nested-ternary */
import React from 'react';

class TimetableRow extends React.Component {
  render() {
    return (
      Object.keys(this.props.row).map((period) => (
        <div
          onClick={() => console.log('index', this.props.row[period])}
          className={`timetable-cell ${this.props.row[period] ? 'pointer' : ''}`}
          style={{ backgroundColor: this.props.row[period] && this.props.row[period].color }}
        >
          <div className="timetable-cell-text">
            {this.props.row[period] && this.props.row[period].cell}
          </div>
        </div>
      ))
    );
  }
}

export default TimetableRow;
