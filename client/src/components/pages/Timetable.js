import React from 'react';
import { Button, Grid } from '@material-ui/core';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Dropdown from '../common/Dropdown';
import TimetableRow from '../partials/TimetableRow';
import EditTimetableModal from '../partials/EditTimetableModal';
import FullWidthGrid from '../common/TwoComponentGridSystem';
import Loader from '../common/Loader';

import { getSpecificTimetable, allEntityTypes } from '../utils';
import {
  // eslint-disable-next-line max-len
  generateNewTimetable, saveTimetable, getTimetable, setTimetable, setEntityType, setEntityId, populateEntityIdDropdown, toggleEditTimetableModal,
} from '../../actions/timetableActions';
import { getAllClasses } from '../../actions/classesActions';
import { getAllTeachers } from '../../actions/teacherActions';

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
    this.updateTimetable();
  }

  componentDidUpdate(prevProps) {
    const { timetables: { entityId, entityType, schoolTimetable } } = this.props;
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
    if (prevProps.timetables.schoolTimetable.length === 0 && schoolTimetable.length !== 0) {
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

    // Fix Logic to handle all cases.
    getAllDataForDropdown = () => {
      const {
        classes: { classesList }, teachers: { teachersList }, timetables: { entityType },
      } = this.props;
      const data = [];
      if (entityType.value === 'Class') {
        classesList && classesList.length > 0 && classesList.forEach((myClass) => {
          const obj = {};
          obj.value = myClass._id;
          obj.label = myClass.label;
          data.push(obj);
        });
      } else if (entityType.value === 'Teacher') {
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

    toggleModal = (selectedEntityId, label, periodNumber, entityNumber) => {
      if (selectedEntityId && selectedEntityId.id) {
        const data = {
          entityNumber,
          periodNumber,
          entityId: selectedEntityId.id,
          label,
        };
        this.props.toggleEditTimetableModal(data);
      } else {
        this.props.toggleEditTimetableModal();
      }
    };

    exportToCsv = () => {
      const { timetables: { timetable, entityType, entityId } } = this.props;
      const finalObj = [];
      timetable.forEach((period) => {
        let row = {};
        period.forEach((element, id) => {
          row[`${id}`] = element.cell;
        });
        finalObj.push(row);
        row = {};
      });
      const csvStr = finalObj.map((it) => Object.values(it).toString()).join('\n');
      const blob = new Blob([csvStr], { type: 'text/csv' });
      const filename = `Timetable_for_${entityId.label}_${entityType.label}.csv`;
      this.downloadBlobToFile(blob, filename);
    }

    downloadBlobToFile = (blob, filename) => {
      const URL = window.URL || window.webkitURL;
      const downloadUrl = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = downloadUrl;
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    };

    render() {
      const {
        timetables: {
          // eslint-disable-next-line max-len
          entityType, entityId, timetable, loading, schoolTimetable, filteredEntityIds, showEditTimetableModal, selectedEntityId,
        },
      } = this.props;
      return (
        <div>
          <h2>Timetable </h2>
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
          {' '}
          <br />
          {
            schoolTimetable && schoolTimetable.length > 0
                    && (
                      <div>
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
                          timetable && timetable.length > 0 && timetable.map((period, periodNumber) => (
                            <Grid container style={{ flexGrow: 1 }} spacing={0}>
                              <TimetableRow
                                row={period}
                                periodNumber={periodNumber}
                                toggleModal={this.toggleModal}
                              />
                            </Grid>
                          ))
                        }
                      </div>
                    )
          }
          <br />
          {schoolTimetable && schoolTimetable.length > 0
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
              &nbsp;&nbsp;&nbsp;
          {schoolTimetable && schoolTimetable.length > 0
            && (
              <Button
                color="primary"
                variant="contained"
                type="submit"
                onClick={() => this.exportToCsv()}
              >
                Export to Excel
              </Button>
            )}

          { loading === true && <Loader /> }
          {
            showEditTimetableModal && (
              <EditTimetableModal
                showEditTimetableModal={showEditTimetableModal}
                toggleModal={this.toggleModal}
                selectedEntityId={selectedEntityId}
              />
            )
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
  populateEntityIdDropdown,
  toggleEditTimetableModal,
};

export default connect(mapStateToProps, mapDispatchToProps)(Timetable);
