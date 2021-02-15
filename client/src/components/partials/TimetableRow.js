import React from 'react';

class TimetableRow extends React.Component {
  render() {
    const { row, periodNumber } = this.props;
    return (
      Object.keys(row).map((period, index) => (
        <div
          key={index}
          onClick={() => this.props.toggleModal(row[period], row[period].cell, periodNumber, index)}
          className={`timetable-cell ${row[period].id ? 'pointer' : ''}`}
          style={{ backgroundColor: row[period] && row[period].color }}
        >
          <div className="timetable-cell-text">
            {row[period] && row[period].cell}
          </div>
        </div>
      ))
    );
  }
}

export default TimetableRow;
