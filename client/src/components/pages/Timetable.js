import React from 'react';
import { Button } from '@material-ui/core';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  get, getTimetableForEntity, createTimetableForRendering,
} from '../utils';
import { constructURL } from '../../utils';

import store from '../../store';

import Dropdown from '../partials/Dropdown';
import TimetableRow from '../partials/TimetableRow';
import { SET_TIMETABLE } from '../../actions/types';
import FullWidthGrid from '../partials/TwoComponentGridSystem';

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

  componentDidMount() {
    // If user refreshes page, the store is empty thus these values are false. so we fetch them again.
    if (this.props.timetable) {
      console.log('Wow Found timetable', this.props.timetable);
      this.setState({
        allData: this.props.timetable,
      });
    }
  }

  updateTimetable = () => {
    const { numPeriods } = this.state;
    const timetable = getTimetableForEntity(this.state.allData || this.props.timetable, this.state.entityType.value, this.state.entityId.value);
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
    const { email, teachersList, classesList } = this.props;
    const numClasses = classesList.length;
    const numTeachers = teachersList.length;
    const URL = constructURL('/api/generate_timetable', { email, numClasses, numTeachers });
    get(URL)
      .then((res) => {
        const timetable = getTimetableForEntity(res.timetable, this.state.entityType.value, this.state.entityId.value);
        const chunks = createTimetableForRendering(timetable, numPeriods);
        store.dispatch({
          type: SET_TIMETABLE,
          payload: res.timetable,
        });
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

    updateEntityId = (option, action) => {
      if (action.action === 'select-option') {
        this.setState({ entityId: option }, () => {
          this.updateTimetable();
        });
      }
    }

    getAllDataForDropdown = () => {
      const data = [];
      if (this.state.entityType.value === 'class') {
        if (this.props.classesList && this.props.classesList.length > 0) {
          this.props.classesList.forEach((myClass) => {
            const obj = {};
            obj.value = myClass._id;
            obj.label = myClass.label;
            data.push(obj);
          });
        }
      } else if (this.state.entityType.value === 'teacher') {
        if (this.props.teachersList && this.props.teachersList.length > 0) {
          this.props.teachersList.forEach((teacher) => {
            const obj = {};
            obj.value = teacher._id;
            obj.label = teacher.teacherName;
            data.push(obj);
          });
        }
      }
      return data;
    }

    render() {
      console.log('------------------------------------------------------------------------ RE RENDER');
      console.log('Entity', this.state.entityId);
      console.log('props', this.props);
      const data = this.getAllDataForDropdown();
      console.log('Nice', data);
      return (
        <div>
          <h2>TimeTable :)</h2>
          <br />
          <FullWidthGrid
            componentOneSize={6}
            componentTwoSize={6}
            spacing={4}
            componentOne={(
              <Dropdown
                isMulti={false}
                options={options}
                onChange={(option, action) => this.updateOptions(option, action)}
                value={this.state.entityType}
                isSearchable
                showAnimations
              />
            )}
            componentTwo={(
              <Dropdown
                isMulti={false}
                options={data}
                onChange={(option, action) => this.updateEntityId(option, action)}
                value={this.state.entityId || data[0]}
                isSearchable
                showAnimations
              />
            )}
          />
          <br />
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
            {' '}
            {this.state.entityType.label}
            {' '}
            -
            {this.state.entityId.label || 1}
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

Timetable.propTypes = {
  email: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  errors: state.errors,
  email: state.auth && state.auth.user && state.auth.user.email,
  timetable: state.teachers && state.teachers.timetable,
  teachersList: state.teachers && state.teachers.teachersList && state.teachers.teachersList.length > 0 && state.teachers.teachersList,
  classesList: state.teachers && state.teachers.classesList && state.teachers.classesList.length > 0 && state.teachers.classesList,
});

const mapDispatchToProps = {
};

export default connect(mapStateToProps, mapDispatchToProps)(Timetable);
