import React from 'react';
import { Button, TextField } from '@material-ui/core';
import { connect } from 'react-redux';

import Dropdown from '../common/Dropdown';
import FullWidthGrid from '../common/TwoComponentGridSystem';

import {
  addNewClasses, getAllClasses, updateClasses, setClassesData,
} from '../../actions/classesActions';
import { getAllTeachers } from '../../actions/teacherActions';

import { showAllSections } from '../utils';

require('../../styles/Classes.scss');

const options = [
  { value: '1', label: '1', numberOfSections: '' },
  { value: '2', label: '2', numberOfSections: '' },
  { value: '3', label: '3', numberOfSections: '' },
  { value: '4', label: '4', numberOfSections: '' },
  { value: '5', label: '5', numberOfSections: '' },
  { value: '6', label: '6', numberOfSections: '' },
  { value: '7', label: '7', numberOfSections: '' },
  { value: '8', label: '8', numberOfSections: '' },
  { value: '9', label: '9', numberOfSections: '' },
  { value: '10', label: '10', numberOfSections: '' },
  { value: '11', label: '11', numberOfSections: '' },
  { value: '12', label: '12', numberOfSections: '' },
];

class Classes extends React.Component {
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

  updateClasses = (e) => {
    e.preventDefault();
    const { classes: { classesForDropdown }, email } = this.props;
    const data = {
      classesList: classesForDropdown,
      email,
    };
    this.props.updateClasses(data);
  }

  createNewClasses = (e) => {
    e.preventDefault();
    const { classes: { classesForDropdown }, email } = this.props;
    const data = {
      classesList: classesForDropdown,
      email,
    };
    this.props.addNewClasses(data);
  }

  updateOptions = (_, action) => {
    let { classes: { classesForDropdown } } = this.props;
    const { classes: { classesList } } = this.props;
    if (action.action === 'select-option') {
      classesForDropdown.push(action.option);
    } else if (action.action === 'remove-value') {
      // Not deleting classes present in classesList.
      const found = classesList.filter((obj) => obj.class === parseInt(action.removedValue.value, 10));
      if (found && found.length === 0) {
        classesForDropdown = classesForDropdown.filter((item) => item.value !== action.removedValue.value);
      }
    }
    this.props.setClassesData(classesForDropdown);
  }

  render() {
    const {
      classes: {
        classesForDropdown, updateData,
      },
    } = this.props;

    return (
      <div className="container">
        <h2> Manage Classes </h2>
        <div>
          <div className="warning-text"> Warning: number of section cannot be changed after creation. </div>
          <div className="help-text">
            Select a class from the dropdown. Then add the number of sections for that class.
          </div>
          <FullWidthGrid
            componentOneSize={2}
            componentTwoSize={10}
            spacing={0}
            componentOne={(<h3 className="create-class-text">Select Class</h3>)}
            componentTwo={(
              <Dropdown
                className="create-class-dropdown"
                isMulti
                options={options}
                onChange={(option, action) => this.updateOptions(option, action)}
                value={classesForDropdown}
                isSearchable
                showAnimations
              />
            )}
          />
          { classesForDropdown && classesForDropdown.length > 0 && classesForDropdown.map((e, id) => (
            <div key={`section - ${id}`}>
              <br />
              <TextField
                className="text-field"
                label={`Enter Number of classes for Class ${e.label}`}
                variant="outlined"
                type="number"
                size="small"
                disabled={e.disabled}
                value={e.numberOfSections}
                onChange={(element) => {
                  e.numberOfSections = element.target.value;
                  this.props.setClassesData(classesForDropdown);
                }}
              />
              <br />
              <br />
              <div className="heading-text">{`List Of Sections for ${e.label}: `}</div>
              {
                showAllSections(e.numberOfSections).map((section, index) => (
                  <span className="sub-heading" key={`section - ${index}`}>
                    {e.label}
                    -
                    {section}
                  </span>
                ))
              }
            </div>
          ))}
          <br />
          {
            updateData
              ? (
                <Button
                  color="primary"
                  variant="contained"
                  type="submit"
                  onClick={this.updateClasses}
                >
                  Save
                </Button>
              )
              : (
                <Button
                  color="primary"
                  variant="contained"
                  type="submit"
                  onClick={this.createNewClasses}
                >
                  Save
                </Button>
              )
          }
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth,
  email: state.auth.user.email,
  classes: state.classes,
  teachers: state.teachers,
});

const mapDispatchToProps = {
  addNewClasses,
  getAllClasses,
  updateClasses,
  setClassesData,
  getAllTeachers,
};

export default connect(mapStateToProps, mapDispatchToProps)(Classes);
