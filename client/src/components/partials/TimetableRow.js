import React from 'react';

require('../../styles/Timetable.css');

class TimetableRow extends React.Component {
    render() {
    console.log('All Props', this.props);
    return (
        <div id="timetable-row">
            {
                this.props.period.map((period) =>
                <div>
                    <span>
                        Teacher Number -
                        {period[0].teacher}
                        &nbsp;&nbsp;
                    </span>
                    <span>
                        {period[0].class}
                    </span>
                </div>
                )
            }
        </div>
    );
    }
}

export default TimetableRow;