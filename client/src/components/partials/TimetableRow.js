/* eslint-disable no-nested-ternary */
import React from 'react';

require('../../styles/Timetable.css');

class TimetableRow extends React.Component {
  render() {
    // const inverseEntityType = this.props.entityType === 'Class' ? 'Teacher' : 'Class';
    return (
      <div>
        {
          Object.keys(this.props.row).map((period) => (
            <div onClick={() => console.log('index', this.props.row[period])} className={`${this.props.row[period].cell ? 'pointer' : ''}`}>
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
