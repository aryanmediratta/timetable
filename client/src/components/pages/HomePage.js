import React from 'react';
import { Link } from 'react-router-dom';
import { Grid } from '@material-ui/core';
import { connect } from 'react-redux';

import MyCard from '../common/Card';

import { getAllClasses } from '../../actions/classesActions';
import { getAllTeachers, toggleTeacherModal } from '../../actions/teacherActions';

import ModifyTeacherModal from '../partials/ModifyTeacherModal';
import { setEntityId, setEntityType } from '../../actions/timetableActions';

class HomePage extends React.Component {
  constructor(props) {
    super(props);
    const { auth: { user: { email } }, classes: { classesForDropdown }, teachers: { teachersList } } = this.props;
    if (classesForDropdown.length === 0) {
      this.props.getAllClasses(email);
    }
    if (teachersList.length === 0) {
      this.props.getAllTeachers(email);
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
    const option = { label: name, value: id };
    this.props.setEntityId(option);
    const otherOption = { label: type, value: type };
    this.props.setEntityType(otherOption);
    this.props.history.push('/');
  }

  toggleModal = () => {
    this.props.toggleTeacherModal({});
  }

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
        <Link to="/" className="link"> Manage Timetable </Link>
        <br />
        <Link to="/classes" className="link"> Manage Classes </Link>
        <br />
        <Link to="/teachers" className="link"> Manage Teachers </Link>
        <br />
        <br />
        <h2> Classes </h2>
        <div className="class-container">
          <Grid container style={{ flexGrow: 1 }} spacing={2}>
            {
              classesForDropdown && classesForDropdown.map((classObj) => (
                <MyCard
                  heading={`Class: ${classObj.label}`}
                  content={`Number of Sections: ${classObj.numberOfSections}`}
                />
              ))
            }
          </Grid>
        </div>
        <br />
        <br />
        <h2> Teachers </h2>
        <div className="class-container">
          <Grid container style={{ flexGrow: 1 }} spacing={2}>
            {
              allTeachersForTable && allTeachersForTable.length > 0 && allTeachersForTable.map((teacher) => (
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
});

const mapDispatchToProps = {
  getAllClasses,
  getAllTeachers,
  toggleTeacherModal,
  setEntityId,
  setEntityType,
};

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
