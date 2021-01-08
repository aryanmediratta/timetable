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
                                Period No - {this.props.row[period].periodNo} &nbsp;&nbsp;&nbsp;
                                LABEL - {this.props.row[period].label} &nbsp;&nbsp;&nbsp;
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