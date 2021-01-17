import React from 'react';

require('../../styles/Timetable.css');

class TimetableRow extends React.Component {
    render() {
    console.log('All Props', this.props);
    const inverseEntityType = this.props.entityType === 'Class' ? 'Teacher' : 'Class';
    return (
        <div>
            {
                Object.keys(this.props.row).map((period, index) => {
                    return (
                        <div>
                            <span>
                                {
                                    this.props.row[period] && this.props.row[period].entityId ?
                                        this.props.row[period].entityId === ' ' ? 
                                        '  ' :
                                        `${inverseEntityType} No. - ${this.props.row[period].entityId}`
                                        :
                                        this.props.row[index] === ' ' ? ' ': this.props.row[index]
                                } &nbsp;
                            </span>
                        </div>
                    )
                  })
            }
        </div>
    );
    }
}

export default TimetableRow;