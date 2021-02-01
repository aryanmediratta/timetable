import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@material-ui/core';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Table from '../common/Table';
import FullWidthGrid from '../common/TwoComponentGridSystem';
import ModifyTeacherModal from '../partials/ModifyTeacherModal';

import { getAllTeachers, getAllClasses } from '../../actions/teacherActions';
import store from '../../store';
import { TEACHER_TYPES } from '../../actions/teacher.actions';

require('../../styles/Login.css');

class Teachers extends React.Component {
  constructor(props) {
    super(props);
    const { email, teachers: { teachersList } } = this.props;
    // If user refreshes page, the store is empty thus these values are false. so we fetch them again.
    if ((teachersList.length === 0) || (this.props.classesList === false)) {
      this.props.getAllTeachers(email);
      this.props.getAllClasses(email);
    }
  }

    toggleModal = () => {
      store.dispatch({ type: TEACHER_TYPES.TOGGLE_TEACHER_POPUP, payload: {} });
    }

    addTeacher = () => {
      store.dispatch({ type: TEACHER_TYPES.TOGGLE_TEACHER_POPUP, payload: { name: '', subject: '', classesList: [] } });
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
        store.dispatch({ type: TEACHER_TYPES.TOGGLE_TEACHER_POPUP, payload: selectedTeacher[0] });
      }
    }

    render() {
      const { teachers: { showModal, newTeacher, teachersList } } = this.props;
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
        <div>
          <br />
          <Link to="/"> Main </Link>
          <br />
          <Link to="/home"> Home </Link>
          <br />
          <Link to="/classes"> Add Classes </Link>
          <br />
          <br />
          {
            teachersList && teachersList.length > 0
                && (
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
                )
          }
          <ModifyTeacherModal
            showModal={showModal}
            toggleModal={this.toggleModal}
            teacherData={newTeacher}
            classesList={this.props.classesList}
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
  teachersList: state.teachers && state.teachers.teachersList && state.teachers.teachersList.length > 0 && state.teachers.teachersList,
  classesList: state.teachers && state.teachers.classesList && state.teachers.classesList.length > 0 && state.teachers.classesList,
});

const mapDispatchToProps = {
  getAllTeachers,
  getAllClasses,
};

export default connect(mapStateToProps, mapDispatchToProps)(Teachers);
