import React from 'react';
import { Grid, Button } from '@material-ui/core';
import { connect } from 'react-redux';

import { getAllClasses } from '../../actions/classesActions';
import { getAllTeachers, toggleTeacherModal } from '../../actions/teacherActions';
import { setEntityId, setEntityType, getTimetable } from '../../actions/timetableActions';

import ModifyTeacherModal from '../partials/ModifyTeacherModal';
import MyCard from '../common/Card';

class HomePage extends React.Component {
  constructor(props) {
    super(props);
    const {
      auth: { user: { email } }, classes: { classesForDropdown }, teachers: { teachersList }, timetables: { schoolTimetable },
    } = this.props;
    if (classesForDropdown.length === 0) {
      this.props.getAllClasses(email);
    }
    if (teachersList.length === 0) {
      this.props.getAllTeachers(email);
    }
    if (schoolTimetable.length === 0) {
      this.props.getTimetable(email);
    }
  }

  openTeacherModal = (id) => {
    const { teachers: { allTeachersForTable } } = this.props;
    const selectedTeacher = allTeachersForTable.filter((teacher) => teacher._id === id);
    if (selectedTeacher && selectedTeacher.length > 0) {
      this.props.toggleTeacherModal(selectedTeacher[0]);
    }
  }

  viewTimetable = (id, type) => {
    const { teachers: { allTeachersForTable } } = this.props;
    const selectedTeacher = allTeachersForTable.filter((teacher) => teacher._id === id);
    const { name } = selectedTeacher[0];
    const entityId = { label: name, value: id };
    this.props.setEntityId(entityId);
    const entityType = { label: type, value: type };
    this.props.setEntityType(entityType);
    this.props.history.push('/');
  }

  toggleModal = () => {
    this.props.toggleTeacherModal({});
  }

  redirectPage = (link) => {
    this.props.history.push(link);
  };

  render() {
    const {
      auth: { user: { email } }, classes: { classesForDropdown },
      teachers: { showModal, newTeacher, allTeachersForTable },
    } = this.props;
    return (
      <div className="container">
        <h2>
          Email
          - -
          {'  '}
          {email}
        </h2>
        <br />
        <h2> Classes </h2>
        <div className="class-container">
          <Grid container style={{ flexGrow: 1 }} spacing={6}>
            {
              classesForDropdown && allTeachersForTable.length > 0 ? classesForDropdown.map((classObj) => (
                <MyCard
                  heading={`Class: ${classObj.label}`}
                  content={`Number of Sections: ${classObj.numberOfSections}`}
                />
              ))
                : (
                  <Button
                    color="primary"
                    variant="contained"
                    type="submit"
                    onClick={() => this.redirectPage('/classes')}
                  >
                    Add Classes
                  </Button>
                )
            }
          </Grid>
        </div>
        <br />
        <br />
        <h2> Teachers </h2>
        <div className="class-container">
          <Grid container style={{ flexGrow: 1 }} spacing={6}>
            {
              allTeachersForTable && allTeachersForTable.length > 0 ? allTeachersForTable.map((teacher) => (
                <MyCard
                  type="Teacher"
                  id={teacher._id}
                  heading={`Teacher Name: ${teacher.name}`}
                  content={(
                    <div>
                      {`Subject: ${teacher.subject}`}
                      <br />
                      {`Classes Per Week: ${teacher.classesPerWeek}`}
                      <br />
                      {`Classes Taught: ${teacher.allClassesTaught}`}
                    </div>
                  )}
                  showTripleDotMenu
                  options={[
                    {
                      text: 'Edit data',
                      onClick: this.openTeacherModal,
                    },
                    {
                      text: 'View timetable',
                      onClick: this.viewTimetable,
                    },
                  ]}
                />
              ))
                : (
                  <Button
                    color="primary"
                    variant="contained"
                    type="submit"
                    onClick={() => this.redirectPage('/teachers')}
                  >
                    Add Teachers
                  </Button>
                )
            }
          </Grid>
        </div>
        <ModifyTeacherModal
          showModal={showModal}
          toggleModal={this.toggleModal}
          teacherData={newTeacher}
        />
        <br />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth,
  classes: state.classes,
  teachers: state.teachers,
  timetables: state.timetables,
});

const mapDispatchToProps = {
  getAllClasses,
  getAllTeachers,
  toggleTeacherModal,
  setEntityId,
  setEntityType,
  getTimetable,
};

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
