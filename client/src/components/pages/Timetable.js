import React from 'react';
import { get } from '../utils';
import { extraction } from '../utils';

import TimetableRow from '../partials/TimetableRow';

require('../../styles/Timetable.css');

class Timetable extends React.Component {
    state = {
        timetable : [],
        numPeriods: 0,
    };

    componentDidMount() {
        console.log('mounting')
        get('/api/fetch_static_timetable')
        .then((res) => {
            console.log('res', res);
            const timetable = extraction(res.timetable, 'class', 1);
            this.setState({
                timetable: timetable,
                numPeriods: res.numPeriods/5,
            });
        });
    }

    render() {
        return (
            <div>
                <h2>TimeTable :)</h2>
                {
                    this.state.timetable && this.state.timetable.length > 0 &&
                    <div>
                        <div id="timetable-row">
                            <div>One</div>
                            <div>Two</div>
                            <div>Three</div>
                            <div>Four</div>
                            <div>Five</div>
                            <div>Six</div>
                        </div>
                        {
                            this.state.timetable.map((period) =>
                            <TimetableRow period={period} />
                            )
                        }
                    </div>
                }
            </div>
        );
    }
}

export default Timetable;
