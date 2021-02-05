import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@material-ui/core';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Table from '../common/Table';
import FullWidthGrid from '../common/TwoComponentGridSystem';
import ModifyTeacherModal from '../partials/ModifyTeacherModal';
import SimpleSnackbar from '../utils/Popup';

import { getAllTeachers, toggleErrorPopup, toggleTeacherModal } from '../../actions/teacherActions';
import { getAllClasses } from '../../actions/classesActions';

require('../../styles/Login.scss');

class Teachers extends React.Component {
  constructor(props) {
    super(props);
    const { email } = this.props;
    // Always load latest data on page load.
    this.props.getAllTeachers(email);
    this.props.getAllClasses(email);
  }

  onClose = () => {
    this.props.toggleErrorPopup(null);
  };

  toggleModal = () => {
    this.props.toggleTeacherModal({});
  }

  addTeacher = () => {
    this.props.toggleTeacherModal({ name: '', subject: '', classesList: [] });
  }

  updateDataForTable = () => {
    const data = [];
    const { teachers: { teachersList } } = this.props;
    teachersList && teachersList.length > 0 && teachersList.forEach((teacher) => {
      const obj = {};
      obj.name = teacher.teacherName;
      obj.subject = teacher.teacherSubject;
      obj._id = teacher._id;
      obj.classesList = teacher.classesTaught;
      const classesForTeacher = [];
      let totalClasses = 0;
      teacher.classesTaught.forEach((classObject, index) => {
        classesForTeacher.push(classObject.label);
        // classesForTeacher.push(': ');
        // classesForTeacher.push(classObject.periodsPerWeek);
        if (teacher.classesTaught.length > index + 1) {
          classesForTeacher.push(', ');
        }
        totalClasses += classObject.periodsPerWeek && parseInt(classObject.periodsPerWeek, 10);
      });
      obj.allClassesTaught = classesForTeacher;
      obj.classesPerWeek = totalClasses;
      data.push(obj);
    });
    return data;
  }

  editTeacherInfo = (id) => {
    const selectedTeacher = this.updateDataForTable().filter((teacher) => teacher._id === id);
    if (selectedTeacher && selectedTeacher.length > 0) {
      this.props.toggleTeacherModal(selectedTeacher[0]);
    }
  }

  render() {
    const {
      teachers: {
        showModal, newTeacher, errorMessage, showPopup, success,
      },
      classes: { classesList },
    } = this.props;

    const data = this.updateDataForTable();

    const columns = [{
      Header: 'Name',
      accessor: 'name',
      Cell: ({ original }) => <span className="pointer link" onClick={() => this.editTeacherInfo(original._id)}>{original.name}</span>,
    }, {
      Header: 'Subject',
      accessor: 'subject',
      Cell: (props) => <span className="number">{props.value}</span>,
    }, {
      Header: 'Classes Taught',
      accessor: 'allClassesTaught',
    }, {
      Header: 'Classes Per Week',
      accessor: 'classesPerWeek',
    }];

    return (
      <div className="container">
        <h2> Manage Teachers </h2>
        <br />
        <Link to="/" className="link"> Main </Link>
        <br />
        <Link to="/home" className="link"> Home </Link>
        <br />
        <Link to="/classes" className="link"> Manage Classes </Link>
        <br />
        <br />
        <FullWidthGrid
          componentOneSize={9}
          componentTwoSize={3}
          spacing={2}
          componentOne={(
            <Table
              data={data}
              columns={columns}
              defaultPageSize={6}
              title="Teachers"
            />
          )}
          componentTwo={(
            <div />
          )}
        />
        <ModifyTeacherModal
          showModal={showModal}
          toggleModal={this.toggleModal}
          teacherData={newTeacher}
          classesList={classesList}
        />
        <br />
        <br />
        <Button
          color="primary"
          variant="contained"
          type="submit"
          onClick={this.addTeacher}
        >
          + Add Teacher
        </Button>
        <br />
        {
          showPopup && <SimpleSnackbar onClose={this.onClose} message={errorMessage} success={success} />
        }
      </div>
    );
  }
}

Teachers.propTypes = {
  email: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  email: state.auth && state.auth.user && state.auth.user.email,
  teachers: state.teachers,
  classes: state.classes,
});

const mapDispatchToProps = {
  getAllTeachers,
  getAllClasses,
  toggleErrorPopup,
  toggleTeacherModal,
};

export default connect(mapStateToProps, mapDispatchToProps)(Teachers);
