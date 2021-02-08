/* eslint-disable no-nested-ternary */
import React from 'react';

class TimetableRow extends React.Component {
  render() {
    return (
      <div>
        {
          Object.keys(this.props.row).map((period) => (
            <div
              onClick={() => console.log('index', this.props.row[period])}
              className={`${this.props.row[period] ? 'pointer' : ''}`}
              style={{ backgroundColor: this.props.row[period] && this.props.row[period].color }}
            >
              <span>
                {this.props.row[period] && this.props.row[period].cell ? this.props.row[period].cell : this.props.row[period]}
              </span>
            </div>
          ))
        }
      </div>
    );
  }
}

export default TimetableRow;
