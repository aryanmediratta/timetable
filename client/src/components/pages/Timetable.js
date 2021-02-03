import React from 'react';
import { Button } from '@material-ui/core';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { getSpecificTimetable } from '../utils';
import store from '../../store';
import Dropdown from '../common/Dropdown';
import TimetableRow from '../partials/TimetableRow';
import { TIMETABLE_TYPES } from '../../actions/timetable.actions';
import FullWidthGrid from '../common/TwoComponentGridSystem';
import { generateNewTimetable, saveTimetable, getTimetable } from '../../actions/timetableActions';
import { getAllClasses } from '../../actions/classesActions';
import { getAllTeachers } from '../../actions/teacherActions';

require('../../styles/Timetable.css');

const options = [
  { value: 'teacher', label: 'Teacher' },
  { value: 'class', label: 'Class' },
];

class Timetable extends React.Component {
  constructor(props) {
    super(props);
    const {
      teachers: { teachersList }, classes: { classesList }, email, timetables: { schoolTimetable },
    } = this.props;
    if (schoolTimetable.length === 0) {
      this.props.getTimetable(email);
    }
    if (classesList.length === 0) {
      this.props.getAllClasses(email);
    }
    if (teachersList.length === 0) {
      this.props.getAllTeachers(email);
    }
  }

  componentDidUpdate(prevProps) {
    const { timetables: { entityId, entityType } } = this.props;
    if (prevProps.timetables.entityId.value !== entityId.value) {
      this.updateTimetable();
    }
    if (prevProps.timetables.entityType.value !== entityType.value) {
      this.updateTimetable();
    }
  }

  updateTimetable = () => {
    const {
      timetables: {
        numPeriods, schoolTimetable, entityId,
      },
    } = this.props;
    const timetable = getSpecificTimetable(schoolTimetable, entityId.value, numPeriods);
    store.dispatch({
      type: TIMETABLE_TYPES.SET_TIMETABLE,
      payload: timetable,
    });
  }

  fetchTimetable = () => {
    const {
      email, classes: { classesList }, teachers: { teachersList }, timetables: { numPeriods, entityId },
    } = this.props;
    const timetableData = {
      email,
      classesList,
      teachersList,
      numPeriods,
      entityId,
    };
    this.props.generateNewTimetable(timetableData);
  }

  updateOptions = (option, action) => {
    if (action.action === 'select-option') {
      store.dispatch({
        type: TIMETABLE_TYPES.SET_ENTITY_TYPE,
        payload: option,
      });
    }
  }

    updateEntityId = (option, action) => {
      if (action.action === 'select-option') {
        store.dispatch({
          type: TIMETABLE_TYPES.SET_ENTITY_ID,
          payload: option,
        });
      }
    }

    // Fix Logic to handle all cases.
    getAllDataForDropdown = () => {
      const {
        classes: { classesList }, teachers: { teachersList }, timetables: { entityType },
      } = this.props;
      const data = [];
      if (entityType.value === 'class') {
        classesList && classesList.length > 0 && classesList.forEach((myClass) => {
          const obj = {};
          obj.value = myClass._id;
          obj.label = myClass.label;
          data.push(obj);
        });
      } else {
        teachersList && teachersList.length > 0 && teachersList.forEach((teacher) => {
          const obj = {};
          obj.value = teacher._id;
          obj.label = teacher.teacherName;
          data.push(obj);
        });
      }
      return data;
    }

    saveEntireTimetable = () => {
      const { timetables: { schoolTimetable }, email } = this.props;
      const timetableData = {
        schoolTimetable,
        email,
      };
      this.props.saveTimetable(timetableData);
    }

    render() {
      const data = this.getAllDataForDropdown();
      const {
        timetables: {
          entityType, entityId, timetable, loading, schoolTimetable,
        },
      } = this.props;
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
                value={entityType}
                isSearchable
                showAnimations
              />
            )}
            componentTwo={(
              <Dropdown
                isMulti={false}
                options={data}
                onChange={(option, action) => this.updateEntityId(option, action)}
                value={entityId}
                isSearchable
                showAnimations
              />
            )}
          />
          <br />
          <FullWidthGrid
            componentOneSize={6}
            componentTwoSize={6}
            spacing={4}
            componentOne={(
              <Button
                color="primary"
                variant="contained"
                type="submit"
                onClick={() => this.fetchTimetable()}
              >
                Generate New TimeTable
              </Button>
            )}
            componentTwo={schoolTimetable && schoolTimetable.length > 0
              && (
                <Button
                  color="primary"
                  variant="contained"
                  type="submit"
                  onClick={() => this.saveEntireTimetable()}
                >
                  Save timetable
                </Button>
              )}
          />
          <br />
          {' '}
          <br />
          <h2>
            Timetable for
            {' '}
            {entityType.label}
            {' '}
            -
            {entityId.label}
          </h2>
          {
            schoolTimetable && schoolTimetable.length > 0
                    && (
                      <div>
                        {
                          timetable && timetable.length > 0 && timetable.map((period) => (
                            <div id="timetable-row">
                              <TimetableRow row={period} entityType={entityType.label} />
                            </div>
                          ))
                        }
                      </div>
                    )
          }

          {
            loading === true
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
  email: state.auth && state.auth.user && state.auth.user.email,
  timetables: state.timetables,
  teachers: state.teachers,
  classes: state.classes,
});

const mapDispatchToProps = {
  generateNewTimetable,
  getAllTeachers,
  getAllClasses,
  saveTimetable,
  getTimetable,
};

export default connect(mapStateToProps, mapDispatchToProps)(Timetable);
