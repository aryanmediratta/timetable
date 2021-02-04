import React from 'react';
import { withRouter } from 'react-router-dom';
import { Button, TextField } from '@material-ui/core';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import SimpleSnackbar from '../utils/Popup';
import {
  registerUser, toggleErrorPopup, toggleRegisterForm, setRegisterField,
} from '../../actions/authActions';

require('../../styles/Login.css');

class RegisterPartTwo extends React.Component {
  constructor(props) {
    super(props);
    const { auth: { isAuthenticated } } = this.props;
    if (isAuthenticated) {
      this.props.history.push('/home');
    }
  }

  onClose = () => {
    this.props.toggleErrorPopup(null);
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const {
      auth: {
        registerInfo: {
          email, password, passwordConfirmation, name,
        },
        schoolName,
      },
      timetables: { numPeriods },
    } = this.props;
    const data = {
      email,
      password,
      passwordConfirmation,
      name,
      numPeriods,
      schoolName,
    };
    this.props.registerUser(data);
  };

  updateView = () => {
    this.props.toggleRegisterForm();
  }

  render() {
    let { auth: { registerInfo } } = this.props;
    const { auth: { errorMessage, showPopup } } = this.props;
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <div className="box">
            <div className="outline">
              <h2>  Sign up  </h2>
              <TextField
                className="text-field"
                label="Enter Name"
                variant="outlined"
                onChange={(e) => {
                  registerInfo = { ...registerInfo, name: e.target.value };
                  this.props.setRegisterField(registerInfo);
                }}
                size="small"
              />
              <br />
              <br />
              <TextField
                className="text-field"
                label="Enter Email"
                variant="outlined"
                onChange={(e) => {
                  registerInfo = { ...registerInfo, email: e.target.value };
                  this.props.setRegisterField(registerInfo);
                }}
                size="small"
              />
              <br />
              <br />
              <TextField
                className="text-field"
                label="Enter Password"
                type="password"
                variant="outlined"
                onChange={(e) => {
                  registerInfo = { ...registerInfo, password: e.target.value };
                  this.props.setRegisterField(registerInfo);
                }}
                size="small"
              />
              <br />
              <br />
              <TextField
                className="text-field"
                label="Confirm Password"
                type="password"
                variant="outlined"
                onChange={(e) => {
                  registerInfo = { ...registerInfo, passwordConfirmation: e.target.value };
                  this.props.setRegisterField(registerInfo);
                }}
                size="small"
              />
              <br />
              <br />
              <Button
                color="primary"
                variant="contained"
                type="submit"
                onClick={this.handleSubmit}
              >
                Register
              </Button>
              &nbsp;&nbsp;&nbsp;&nbsp;
              <Button
                color="secondary"
                variant="contained"
                type="submit"
                onClick={this.updateView}
              >
                Back
              </Button>
            </div>
          </div>
        </form>
        {
          showPopup
                  && <SimpleSnackbar onClose={this.onClose} message={errorMessage} />
        }
      </div>
    );
  }
}

RegisterPartTwo.propTypes = {
  registerUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  timetables: state.timetables,
});

const mapDispatchToProps = {
  registerUser,
  toggleErrorPopup,
  toggleRegisterForm,
  setRegisterField,
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(RegisterPartTwo));
