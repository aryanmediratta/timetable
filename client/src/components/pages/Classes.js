import React from 'react';
import { Link } from 'react-router-dom';
import { Button, TextField } from '@material-ui/core';
import { connect } from 'react-redux';
import Dropdown from '../partials/Dropdown';

import FullWidthGrid from '../partials/TwoComponentGridSystem';
import { postClasses, getAllClasses } from '../../actions/teacherActions';

// const options = [
//   { value: '1', label: '1', section: '' },
//   { value: '2', label: '2', section: '' },
//   { value: '3', label: '3', section: '' },
//   { value: '4', label: '4', section: '' },
//   { value: '5', label: '5', section: '' },
//   { value: '6', label: '6', section: '' },
//   { value: '7', label: '7', section: '' },
//   { value: '8', label: '8', section: '' },
//   { value: '9', label: '9', section: '' },
//   { value: '10', label: '10', section: '' },
//   { value: '11', label: '11', section: '' },
//   { value: '12', label: '12', section: '' },
// ];

const options = [
  { value: '1', label: '1', section: 0 },
  { value: '2', label: '2', section: 0 },
  // { value: '3', label: '3', section: 0 },
  // { value: '4', label: '4', section: 0 },
  // { value: '5', label: '5', section: 0 },
  // { value: '6', label: '6', section: 6 },
  // { value: '7', label: '7', section: 0 },
  // { value: '8', label: '8', section: 0 },
  // { value: '9', label: '9', section: 0 },
  // { value: '10', label: '10', section: 0 },
  // { value: '11', label: '11', section: 0 },
  // { value: '12', label: '12', section: 0 },
];

class Classes extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // classList: [...options],
      currentSection: options[0],
      // sections: options[0].section,
    };
  }

  componentDidMount() {
    this.props.getAllClasses(this.props.email);
    // this.setState({
    //   teachersList: this.props.teachersList,
    // });
  }

    submitHandler = (e) => {
      e.preventDefault();
      const data = {
        sections: this.state.currentSection,
        email: this.props.email,
      };
      this.props.postClasses(data);
    }

    updateOptions = (option, action) => {
      if (action.action === 'select-option') {
        this.setState({
          currentSection: option,
          // sections: this.state.currentSection.section,
        });
      }
    }

    render() {
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
                  isMulti={false}
                  options={options}
                  onChange={(option, action) => this.updateOptions(option, action)}
                  value={this.state.currentSection}
                  isSearchable
                  showAnimations
                />
              )}
            />
            <br />
            <TextField
              id="post"
              label={`Enter no.of sections for ${this.state.currentSection.label}`}
              variant="outlined"
              value={this.state.currentSection.section}
              onChange={(e) => {
                const { currentSection } = this.state;
                currentSection.section = e.target.value;
                this.setState({ currentSection });
              }}
              size="small"
            />
            <br />
            <Button
              color="primary"
              variant="contained"
              type="submit"
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
});

const mapDispatchToProps = {
  postClasses,
  getAllClasses,
};

export default connect(mapStateToProps, mapDispatchToProps)(Classes);
