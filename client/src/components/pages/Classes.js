import React from 'react';
import { Link } from 'react-router-dom';
import { Button, TextField } from '@material-ui/core';
import { connect } from 'react-redux';
import Dropdown from '../common/Dropdown';

import FullWidthGrid from '../common/TwoComponentGridSystem';
import { addNewClasses, getAllClasses } from '../../actions/teacherActions';

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
    this.state = {
      classList: [],
      saveButtonDisabled: false,
    };
  }

  componentDidMount() {
    console.log('Classes', this.props.classesList);
    const { email } = this.props;
    // If user refreshes page, the store is empty thus these values are false. so we fetch them again.
    if (this.props.classesList === false) {
      this.props.getAllClasses(email);
    }
    // Update Data to a form that the dropdown understands.
    if (this.props.classesList && this.props.classesList.length > 0) {
      this.updateData();
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps.classesList === false && (this.props.classesList && this.props.classesList.length > 0)) {
      this.updateData();
    }
  }

  updateData = () => {
    const classes = [];
    const classFrequency = {};
    this.props.classesList && this.props.classesList.length > 0 && this.props.classesList.forEach((myClass) => {
      classFrequency[myClass.class] ? classFrequency[myClass.class]++ : classFrequency[myClass.class] = 1;
    });
    Object.keys(classFrequency).map((value) => {
      const obj = {};
      obj.value = value;
      obj.label = value;
      obj.numberOfSections = classFrequency[value];
      classes.push(obj);
      return null;
    });
    this.setState({
      classList: classes,
      saveButtonDisabled: true,
    });
  }

  submitHandler = (e) => {
    e.preventDefault();
    const { classList } = this.state;
    const { email } = this.props;
    const data = {
      classesList: classList,
      email,
    };
    console.log('This Guy', data);
    this.props.addNewClasses(data);
  }

  updateOptions = (_, action) => {
    let { classList } = this.state;
    if (action.action === 'select-option') {
      classList.push(action.option);
    } else if (action.action === 'remove-value') {
      classList = classList.filter((item) => item.value !== action.removedValue.value);
    }
    this.setState({ classList });
  }

  render() {
    const { classList } = this.state;
    return (
      <div>
        <br />
        <Link to="/"> Main </Link>
        <br />
        <Link to="/home"> Home </Link>
        <br />
        <Link to="/teachers"> Add Teachers </Link>
        <br />
        <div>
          <FullWidthGrid
            componentOneSize={3}
            componentTwoSize={9}
            spacing={2}
            componentOne={(<h3>Select Class</h3>)}
            componentTwo={(
              <Dropdown
                isMulti
                options={options}
                onChange={(option, action) => this.updateOptions(option, action)}
                value={classList}
                isSearchable
                showAnimations
              />
            )}
          />
          { classList.map((e) => (
            <div>
              <br />
              <TextField
                className="text-field"
                label={`Enter Number of classes for Class ${e.label}`}
                variant="outlined"
                size="small"
                value={e.numberOfSections}
                onChange={(element) => {
                  e.numberOfSections = element.target.value;
                  this.setState({
                    classList,
                  });
                }}
              />
              <br />
              <br />
              <div className="heading-text">{`List Of Sections for ${e.label}: `}</div>
              {
                showAllSections(e.numberOfSections).map((section) => (
                  <span className="sub-heading">
                    {e.label}
                    -
                    {section}
                  </span>
                ))
              }
            </div>
          ))}
          <br />
          <Button
            color="primary"
            variant="contained"
            type="submit"
            disabled={this.state.saveButtonDisabled}
            onClick={this.submitHandler}
          >
            Save
          </Button>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth,
  errors: state.errors,
  email: state.auth.user.email,
  classesList: state.teachers && state.teachers.classesList && state.teachers.classesList.length > 0 && state.teachers.classesList,
});

const mapDispatchToProps = {
  addNewClasses,
  getAllClasses,
};

export default connect(mapStateToProps, mapDispatchToProps)(Classes);
