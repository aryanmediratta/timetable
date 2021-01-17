import React from 'react';
import { Link } from 'react-router-dom';
import { Button, TextField, IconButton } from '@material-ui/core';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import CloseIcon from '@material-ui/icons/Close';

import Dropdown from '../partials/Dropdown';
import CollapsibleSections from '../partials/CollapsibleSections';
import Modal from '../partials/Modal';
import Table from '../partials/Table';
import FullWidthGrid from '../partials/TwoComponentGridSystem';

import { addNewTeacher, getAllTeachers } from '../../actions/teacherActions';

require('../../styles/Login.css');

const options = [
  { value: '1', label: '11-A' },
  { value: '2', label: '11-B' },
  { value: '3', label: '11-C' },
  { value: '4', label: '11-D' },
  { value: '5', label: '11-E' },
];

const columns = [{
  Header: 'Name',
  accessor: 'teacherName', // String-based value accessors!
}, {
  Header: 'Subject',
  accessor: 'teacherSubject',
  Cell: (props) => <span className="number">{props.value}</span>, // Custom cell components!
}];

class Teachers extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
      newTeacher: {},
      teachersList: [],
    };
  }

  componentDidMount() {
    this.props.getAllTeachers(this.props.email);
    this.setState({
      teachersList: this.props.teachersList,
    });
  }

  componentDidUpdate(prevProps) {
    if (prevProps.teachersList !== this.props.teachersList) {
      this.setState({
        teachersList: this.props.teachersList,
      });
    }
  }

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
      if (action.action === 'select-option') {
        newTeacher.classesList.push(action.option);
      } else if (action.action === 'remove-value') {
        newTeacher.classesList = newTeacher.classesList.filter((item) => item.value !== action.removedValue.value);
      }
      this.setState({ newTeacher });
    }

    modalBody = () => {
      let { newTeacher } = this.state;
      return (
        <div>
          <CollapsibleSections title={newTeacher.name || 'Teacher'} show={false}>
            <div>
              {newTeacher.name || 'Teacher'}
              <span>
                <IconButton size="small" aria-label="add teacher" color="inherit" onClick={() => this.removeTeacher(i)}>
                  <CloseIcon fontSize="small" />
                </IconButton>
              </span>
            </div>
            <br />
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
                  options={options}
                  onChange={(option, action) => this.updateOptions(option, action)}
                  value={newTeacher.classesList}
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

    render() {
      return (
        <div>
          <br />
          <Link to="/"> Main </Link>
          <br />
          <Link to="/home"> Home </Link>
          <br />
          <Link to="/classes"> Add Classes </Link>
          <br />
          {
            this.state.teachersList && this.state.teachersList.length > 0
                && (
                  <Table
                    data={this.state.teachersList}
                    columns={columns}
                    defaultPageSize={5}
                    title="Teachers"
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
});

const mapDispatchToProps = {
  addNewTeacher,
  getAllTeachers,
};

export default connect(mapStateToProps, mapDispatchToProps)(Teachers);
