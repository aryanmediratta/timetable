import React from 'react';
import { Button } from '@material-ui/core';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Dropdown from '../common/Dropdown';
import TimetableRow from '../partials/TimetableRow';
import FullWidthGrid from '../common/TwoComponentGridSystem';
import Loader from '../common/Loader';

import { getSpecificTimetable, allEntityTypes } from '../utils';
import {
  generateNewTimetable, saveTimetable, getTimetable, setTimetable, setEntityType, setEntityId, toggleErrorPopup, populateEntityIdDropdown,
} from '../../actions/timetableActions';
import { getAllClasses } from '../../actions/classesActions';
import { getAllTeachers } from '../../actions/teacherActions';

import SimpleSnackbar from '../utils/Popup';

require('../../styles/Timetable.scss');

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

  componentDidMount() {
    this.getAllDataForDropdown();
  }

  componentDidUpdate(prevProps) {
    const { timetables: { entityId, entityType } } = this.props;
    if (prevProps.timetables.entityId.value !== entityId.value) {
      this.getAllDataForDropdown();
      this.updateTimetable();
    } else if (prevProps.timetables.entityType.value !== entityType.value) {
      this.getAllDataForDropdown();
      this.updateTimetable();
    }
    if (prevProps.teachers.teachersList !== this.props.teachers.teachersList) {
      this.getAllDataForDropdown();
    } else if (prevProps.classes.classesList !== this.props.classes.classesList) {
      this.getAllDataForDropdown();
    }
  }

  updateTimetable = () => {
    const {
      timetables: {
        numPeriods, schoolTimetable, entityId,
      },
    } = this.props;
    const timetable = getSpecificTimetable(schoolTimetable, entityId.value, numPeriods);
    this.props.setTimetable(timetable);
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
      this.props.setEntityType(option);
    }
  }

  updateEntityId = (option, action) => {
    if (action.action === 'select-option') {
      this.props.setEntityId(option);
    }
  }

  onClose = () => {
    this.props.toggleErrorPopup(null);
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
      } else if (entityType.value === 'teacher') {
        teachersList && teachersList.length > 0 && teachersList.forEach((teacher) => {
          const obj = {};
          obj.value = teacher._id;
          obj.label = teacher.teacherName;
          data.push(obj);
        });
      }
      this.props.populateEntityIdDropdown(data);
    }

    saveEntireTimetable = () => {
      const { timetables: { schoolTimetable, numPeriods }, email } = this.props;
      const timetableData = {
        schoolTimetable,
        email,
        numPeriods,
      };
      this.props.saveTimetable(timetableData);
    }

    render() {
      const {
        timetables: {
          entityType, entityId, timetable, loading, schoolTimetable, showPopup, errorMessage, success, filteredEntityIds,
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
                options={allEntityTypes}
                onChange={(option, action) => this.updateOptions(option, action)}
                value={entityType}
                isSearchable
                showAnimations
              />
            )}
            componentTwo={(
              <Dropdown
                isMulti={false}
                options={filteredEntityIds}
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
            {' '}
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

          { loading === true && <Loader /> }
          {
            showPopup && <SimpleSnackbar onClose={this.onClose} message={errorMessage} success={success} />
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
  setTimetable,
  setEntityType,
  setEntityId,
  toggleErrorPopup,
  populateEntityIdDropdown,
};

export default connect(mapStateToProps, mapDispatchToProps)(Timetable);
