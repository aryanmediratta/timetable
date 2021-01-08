import React from 'react';
import { get } from '../utils';
import { getTimetableForEntity } from '../utils';
import { Button, TextField } from '@material-ui/core';

import TimetableRow from '../partials/TimetableRow';

require('../../styles/Timetable.css');

class Timetable extends React.Component {
    state = {
        timetable : [],
        numPeriods: 0,
        entityId: 1,
    };

    splitToChunks(array, parts) {
        let result = [];
        for (let i = parts; i > 0; i--) {
            result.push(array.splice(0, Math.ceil(array.length / i)));
        }
        return result;
    }

    updateTimetable = () => {
        const timetable = getTimetableForEntity(this.state.allData, 'class', parseInt(this.state.entityId || 1, 10));
        const chunks = this.splitToChunks(timetable, 5);
        console.log('chunks', chunks);
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
            console.log('res', res);
            const timetable = getTimetableForEntity(res.timetable, 'class', parseInt(this.state.entityId || 1, 10));
            const chunks = this.splitToChunks(timetable, 5);
            console.log('chunks', chunks);
            this.setState({
                allData: res.timetable,
                timetable: chunks,
                numPeriods: res.numPeriods/5,
            });
        });
    }

    componentDidMount() {
        console.log('mounting')
        this.fetchTimetable();
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
                    this.state.timetable && this.state.timetable.length > 0 &&
                    <div>
                        {
                            this.state.timetable.map((period) =>
                            <div id="timetable-row">
                            <TimetableRow row={period} />
                            </div>
                            )
                        }
                    </div>
                }
            </div>
        );
    }
}

export default Timetable;
