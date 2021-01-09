import React from 'react';

require('../../styles/Timetable.css');

class TimetableRow extends React.Component {
    render() {
    console.log('All Props', this.props);
    return (
        <div>
            {
                Object.keys(this.props.row).map((period) => {
                    return (
                        <div>
                            <span>
                                Teacher ID - {this.props.row[period].entityId} &nbsp;
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