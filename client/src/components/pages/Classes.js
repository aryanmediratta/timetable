import React from 'react';
import { Link } from 'react-router-dom';
import { Button, TextField } from '@material-ui/core';
import { connect } from 'react-redux';
import Dropdown from '../partials/Dropdown';

import FullWidthGrid from '../partials/TwoComponentGridSystem';
import { addNewClasses } from '../../actions/teacherActions';

const options = [
  { value: '1', label: '1', section: '' },
  { value: '2', label: '2', section: '' },
  { value: '3', label: '3', section: '' },
  { value: '4', label: '4', section: '' },
  { value: '5', label: '5', section: '' },
  { value: '6', label: '6', section: '' },
  { value: '7', label: '7', section: '' },
  { value: '8', label: '8', section: '' },
  { value: '9', label: '9', section: '' },
  { value: '10', label: '10', section: '' },
  { value: '11', label: '11', section: '' },
  { value: '12', label: '12', section: '' },
];

class Classes extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      classList: [],
    };
  }

    submitHandler = (e) => {
      e.preventDefault();
      const { classList } = this.state;
      this.props.addNewClasses(classList);
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
                  value={options.value}
                  isSearchable
                  showAnimations
                />
              )}
            />
            <br />
            { classList.map((e) => (
              <div>
                <br />
                <TextField
                  className="text-field"
                  label={`Enter Number of classes for Class ${e.label}`}
                  variant="outlined"
                  size="small"
                  value={e.section}
                  onChange={(element) => {
                    e.section = element.target.value;
                    this.setState({
                      classList,
                    });
                  }}
                />
              </div>
            ))}
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
  addNewClasses,
};

export default connect(mapStateToProps, mapDispatchToProps)(Classes);
