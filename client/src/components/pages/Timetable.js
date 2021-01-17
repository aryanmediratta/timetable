import React from 'react';
import { Button, TextField } from '@material-ui/core';
import { get, getTimetableForEntity, createTimetableForRendering } from '../utils';

import Dropdown from '../partials/Dropdown';

import TimetableRow from '../partials/TimetableRow';

require('../../styles/Timetable.css');

const options = [
  { value: 'teacher', label: 'Teacher' },
  { value: 'class', label: 'Class' },
];

class Timetable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      timetable: [],
      numPeriods: 6,
      entityId: 1,
      loading: false,
      entityType: options[0],
      allData: [],
    };
  }

  updateTimetable = () => {
    const { numPeriods } = this.state;
    const timetable = getTimetableForEntity(this.state.allData, this.state.entityType.value, parseInt(this.state.entityId || 1, 10));
    const chunks = createTimetableForRendering(timetable, numPeriods);
    this.setState({
      timetable: chunks,
    });
  }

  fetchTimetable = () => {
    this.setState({
      timetable: [],
      loading: true,
    });
    const { numPeriods } = this.state;
    get('/api/fetch_static_timetable')
      .then((res) => {
        const timetable = getTimetableForEntity(res.timetable, this.state.entityType.value, parseInt(this.state.entityId || 1, 10));
        const chunks = createTimetableForRendering(timetable, numPeriods);
        this.setState({
          allData: res.timetable,
          timetable: chunks,
          numPeriods: res.numPeriods / 5,
          loading: false,
        });
      });
  }

    updateOptions = (option, action) => {
      if (action.action === 'select-option') {
        this.setState({ entityType: option }, () => {
          this.updateTimetable();
        });
      }
    }

    render() {
      return (
        <div>
          <h2>TimeTable :)</h2>
          <Dropdown
            isMulti={false}
            options={options}
            onChange={(option, action) => this.updateOptions(option, action)}
            value={this.state.entityType}
            isSearchable
            showAnimations
          />
          <br />
          <TextField
            id="post"
            label={`Enter ID of ${this.state.entityType.label}`}
            variant="outlined"
            onChange={(e) => {
              this.setState({ entityId: e.target.value }, () => {
                this.updateTimetable();
              });
            }}
            size="small"
          />
          <p>
            By default, it shows timetable of 1st
            {this.state.entityType.label}
          </p>
          <Button
            color="primary"
            variant="contained"
            type="submit"
            onClick={() => this.fetchTimetable()}
          >
            Generate New TimeTable
          </Button>
          <br />
          {' '}
          <br />
          <h2>
            Timetable for
            {this.state.entityType.label}
            {' '}
            -
            {this.state.entityId || 1}
          </h2>
          {
            this.state.timetable && this.state.timetable.length > 0
                    && (
                      <div>
                        {
                          this.state.timetable.map((period) => (
                            <div id="timetable-row">
                              <TimetableRow row={period} entityType={this.state.entityType.label} />
                            </div>
                          ))
                        }
                      </div>
                    )
          }

          {
            this.state.loading === true
                    && <h3>Loading, Please wait</h3>
          }
        </div>
      );
    }
}

export default Timetable;
