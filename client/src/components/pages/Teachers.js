import React from 'react';
import { Button } from '@material-ui/core';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Table from '../common/Table';
import FullWidthGrid from '../common/TwoComponentGridSystem';
import ModifyTeacherModal from '../partials/ModifyTeacherModal';

import {
  getAllTeachers, toggleTeacherModal,
} from '../../actions/teacherActions';
import { getAllClasses } from '../../actions/classesActions';

require('../../styles/Login.scss');

class Teachers extends React.Component {
  constructor(props) {
    super(props);
    const { email, classes: { classesForDropdown }, teachers: { teachersList } } = this.props;
    if (classesForDropdown.length === 0) {
      this.props.getAllClasses(email);
    }
    if (teachersList.length === 0) {
      this.props.getAllTeachers(email);
    }
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

  editTeacherInfo = (id) => {
    const { teachers: { allTeachersForTable } } = this.props;
    const selectedTeacher = allTeachersForTable.filter((teacher) => teacher._id === id);
    if (selectedTeacher && selectedTeacher.length > 0) {
      this.props.toggleTeacherModal(selectedTeacher[0]);
    }
  }

  render() {
    const {
      teachers: {
        showModal, newTeacher, allTeachersForTable,
      },
    } = this.props;

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
        <FullWidthGrid
          componentOneSize={9}
          componentTwoSize={3}
          spacing={2}
          componentOne={(
            <Table
              data={allTeachersForTable}
              columns={columns}
              searchable
              showPageCounter
              defaultPageSize={6}
              title="Teachers"
            />
          )}
          componentTwo={(
            <div id="clean" />
          )}
        />
        <ModifyTeacherModal
          showModal={showModal}
          toggleModal={this.toggleModal}
          teacherData={newTeacher}
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
  classes: state.classes,
});

const mapDispatchToProps = {
  getAllTeachers,
  getAllClasses,
  toggleTeacherModal,
};

export default connect(mapStateToProps, mapDispatchToProps)(Teachers);
