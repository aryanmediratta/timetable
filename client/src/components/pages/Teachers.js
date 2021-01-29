import React from 'react';
import { Link } from 'react-router-dom';
import { Button, TextField } from '@material-ui/core';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Dropdown from '../partials/Dropdown';
import CollapsibleSections from '../partials/CollapsibleSections';
import Modal from '../partials/Modal';
import Table from '../partials/Table';
import FullWidthGrid from '../partials/TwoComponentGridSystem';

import SimpleSnackbar from '../utils/Popup';

import { addNewTeacher, getAllTeachers, getAllClasses } from '../../actions/teacherActions';

require('../../styles/Login.css');

class Teachers extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
      newTeacher: {},
      showPopup: false,
      errorMessage: '',
    };
  }

  componentDidMount() {
    const { email } = this.props;
    // If user refreshes page, the store is empty thus these values are false. so we fetch them again.
    if ((this.props.teachersList === false) || (this.props.classesList === false)) {
      this.props.getAllTeachers(email);
      this.props.getAllClasses(email);
    }
  }

  UNSAFE_componentWillReceiveProps(nextProps, nextState) {
    if (nextProps.errors) {
      this.setState({
        errorMessage: nextProps.errors,
      });
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps.errors !== this.props.errors) {
      this.setState({
        errorMessage: this.props.errors && this.props.errors.message,
        showPopup: true,
      });
    }
  }

  onClose = () => {
    this.setState({
      showPopup: false,
    });
  };

    submitHandler = (e) => {
      e.preventDefault();
      const data = {
        newTeacher: this.state.newTeacher,
        email: this.props.email,
      };
      this.props.addNewTeacher(data);
    }

    toggleModal = () => {
      const { showModal } = this.state;
      this.setState({
        showModal: !showModal,
      });
    }

    addTeacher = () => {
      const { showModal } = this.state;
      this.setState({
        newTeacher: { name: '', subject: '', classesList: [] },
        showModal: !showModal,
      });
    }

    updateOptions = (_, action) => {
      const { newTeacher } = this.state;
      let selectedOption = {};
      if (action.action === 'select-option') {
        selectedOption = action.option;
        selectedOption = { ...selectedOption, _id: selectedOption.value };
        // delete selectedOption.value;
        newTeacher.classesList.push(selectedOption);
      } else if (action.action === 'remove-value') {
        newTeacher.classesList = newTeacher.classesList.filter((item) => item._id !== action.removedValue.value);
      }
      this.setState({ newTeacher });
    }

    modalBody = () => {
      let { newTeacher } = this.state;
      return (
        <div>
          <CollapsibleSections title={newTeacher.name || 'Teacher'} show>
            <div>
              <TextField
                className="text-field"
                label="Enter Teacher Name"
                variant="outlined"
                value={newTeacher.name || ''}
                onChange={(element) => {
                  newTeacher = { ...newTeacher, name: element.target.value };
                  this.setState({ newTeacher });
                }}
                size="small"
              />
            </div>
            <br />
            <div>
              <TextField
                className="text-field"
                label="Enter Subject Taught"
                variant="outlined"
                value={newTeacher.subject || ''}
                onChange={(element) => {
                  newTeacher = { ...newTeacher, subject: element.target.value };
                  this.setState({ newTeacher });
                }}
                size="small"
              />
            </div>
            <br />
            <FullWidthGrid
              componentOneSize={3}
              componentTwoSize={9}
              spacing={2}
              componentOne={(<span>Classes taught by teacher</span>)}
              componentTwo={(
                <Dropdown
                  className="classes-dropdown"
                  isMulti
                  options={this.props.classesList && this.props.classesList.length > 0
                    && this.props.classesList.map((myClass) => ({ value: myClass._id, label: myClass.label }))}
                  onChange={(option, action) => this.updateOptions(option, action)}
                  value={newTeacher.classesList && newTeacher.classesList.length > 0
                    && newTeacher.classesList.map((myClass) => ({ value: myClass._id, label: myClass.label }))}
                  isSearchable
                  showAnimations
                />
              )}
            />
            {newTeacher.classesList && newTeacher.classesList.length > 0 && newTeacher.classesList.map((teacher, index) => (
              <div>
                <br />
                <TextField
                  className="text-field"
                  label={`Enter periods per week for ${teacher.label}`}
                  variant="outlined"
                  value={teacher.periodsPerWeek || ''}
                  onChange={(element) => {
                    const { classesList } = newTeacher;
                    classesList[index] = { ...classesList[index], periodsPerWeek: element.target.value };
                    this.setState({ newTeacher });
                  }}
                  size="small"
                />
              </div>
            ))}
            <br />
            <br />
            <Button
              color="primary"
              variant="contained"
              type="submit"
              onClick={this.submitHandler}
            >
              Save
            </Button>
          </CollapsibleSections>
        </div>
      );
    }

    updateDataForTable = () => {
      const data = [];
      const confirmClass = [{ label: '11-Z' }];
      this.props.teachersList && this.props.teachersList.length > 0 && this.props.teachersList.forEach((teacher) => {
        const obj = {};
        obj.name = teacher.teacherName;
        obj.subject = teacher.teacherSubject;
        obj._id = teacher._id;
        obj.classesList = teacher.classesTaught;
        const classesForTeacher = [];
        let totalClasses = 0;
        teacher.classesTaught.forEach((classObject, index) => {
          classesForTeacher.push(classObject.label);
          // confirmClass && confirmClass.forEach((section) => {
          const found = confirmClass.findIndex((e) => e.label === classObject.label);
          if (found !== -1) {
            const totalPeriods = confirmClass[found].periodsPerWeek + classObject.periodsPerWeek;
            confirmClass[found] = { ...confirmClass[found], periodsPerWeek: totalPeriods };
          } else {
            // confirmClass.push({ label: classObject.label, periods: classObject.periodsPerWeek });
            confirmClass.push({ ...classObject })
          }
          // });
          // classesForTeacher.push(': ');
          // classesForTeacher.push(classObject.periodsPerWeek);
          if (teacher.classesTaught.length > index + 1) {
            classesForTeacher.push(', ');
          }
          totalClasses += parseInt(classObject.periodsPerWeek, 10);
        });
        obj.allClassesTaught = classesForTeacher;
        obj.classesPerWeek = totalClasses;
        data.push(obj);
      });
      console.log(confirmClass);
      return data;
    }

    editTeacherInfo = (id) => {
      const selectedTeacher = this.updateDataForTable().filter((teacher) => teacher._id === id);
      console.log('selectedTeacher', selectedTeacher);
      if (selectedTeacher && selectedTeacher.length > 0) {
        const { showModal } = this.state;
        this.setState({
          newTeacher: selectedTeacher[0],
          showModal: !showModal,
        });
      }
    }

    render() {
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
            this.props.teachersList && this.props.teachersList.length > 0
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
          <Modal
            displayModal={this.state.showModal}
            closeModal={this.toggleModal}
            body={this.modalBody()}
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
            this.state.showPopup
                    && <SimpleSnackbar onClose={this.onClose} message={this.state.errorMessage} />
          }
        </div>
      );
    }
}

// export default Teachers;

Teachers.propTypes = {
  email: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  errors: state.errors,
  email: state.auth && state.auth.user && state.auth.user.email,
  teachersList: state.teachers && state.teachers.teachersList && state.teachers.teachersList.length > 0 && state.teachers.teachersList,
  classesList: state.teachers && state.teachers.classesList && state.teachers.classesList.length > 0 && state.teachers.classesList,
});

const mapDispatchToProps = {
  addNewTeacher,
  getAllTeachers,
  getAllClasses,
};

export default connect(mapStateToProps, mapDispatchToProps)(Teachers);
