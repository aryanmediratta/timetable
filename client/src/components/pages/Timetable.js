import React from 'react';
import { get } from '../utils';
import { getTimetableForEntity, createTimetableForRendering } from '../utils';
import { Button, TextField } from '@material-ui/core';

import TimetableRow from '../partials/TimetableRow';

require('../../styles/Timetable.css');

class Timetable extends React.Component {
    state = {
        timetable : [],
        numPeriods: 6,
        entityId: 1,
    };

    updateTimetable = () => {
        const timetable = getTimetableForEntity(this.state.allData, 'class', parseInt(this.state.entityId || 1, 10));
        const chunks = createTimetableForRendering(timetable, this.state.numPeriods);
        this.setState({
            timetable: chunks,
        });
    }

    fetchTimetable = () => {
        this.setState({
            timetable: [],
        });
        get('/api/fetch_static_timetable')
        .then((res) => {
            const timetable = getTimetableForEntity(res.timetable, 'class', parseInt(this.state.entityId || 1, 10));
            const chunks = createTimetableForRendering(timetable, this.state.numPeriods);
            this.setState({
                allData: res.timetable,
                timetable: chunks,
                numPeriods: res.numPeriods/5,
            });
        });
    }

    render() {
        return (
            <div>
                <h2>TimeTable :)</h2>
                <TextField
                  id="post"
                  label="Enter ID of class"
                  variant="outlined"
                  onChange={e => {
                      this.setState({ entityId: e.target.value }, () => {
                        this.updateTimetable();
                      });
                    }}
                  size="small"
                />
                <p>By default, it shows timetable of 1st class</p>
                <Button
                    color="primary"
                    variant="contained"
                    type="submit"
                    onClick={() => this.fetchTimetable()}
                >
                    Generate New TimeTable
                </Button>
                <br/> <br/>
                <h2>Timetable for Class - {this.state.entityId || 1}</h2>
                {
                    this.state.timetable && this.state.timetable.length > 0 ?
                    <div>
                        {
                            this.state.timetable.map((period) =>
                                <div id="timetable-row">
                                    <TimetableRow row={period} />
                                </div>
                            )
                        }
                    </div>
                    :
                    <h3>Loading, Please wait</h3>
                }
            </div>
        );
    }
}

export default Timetable;
