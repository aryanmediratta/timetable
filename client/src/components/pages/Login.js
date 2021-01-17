import React from 'react';
import { Link } from 'react-router-dom';
import { Button, TextField } from '@material-ui/core';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { loginUser } from '../../actions/authActions';
import SimpleSnackbar from '../utils/Popup';

require('../../styles/Login.css');

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      showPopup: false,
      errorMessage: '',
    };
  }

  componentDidMount() {
    // If logged in and user navigates to Login page, should redirect them to home
    if (this.props.auth.isAuthenticated) {
      this.props.history.push('/home');
    }
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (nextProps.auth.isAuthenticated) {
      this.props.history.push('/home'); // push user to home when they login
    }
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

    handleSubmit = async (e) => {
      e.preventDefault();
      const data = {
        email: this.state.email,
        password: this.state.password,
      };
      this.props.loginUser(data);
    };

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
          <form onSubmit={this.handleSubmit}>
            <div className="box">
              <div className="outline">
                <h2>Enter Login</h2>
                <TextField
                  className="text-field"
                  label="Enter Email"
                  variant="outlined"
                  onChange={(e) => this.setState({ email: e.target.value })}
                  size="small"
                />
                <br />
                <br />
                <TextField
                  className="text-field"
                  label="Enter Password"
                  type="password"
                  variant="outlined"
                  onChange={(e) => this.setState({ password: e.target.value })}
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
                  Login
                </Button>
              </div>
            </div>
          </form>
          {
            this.state.showPopup
                    && <SimpleSnackbar onClose={this.onClose} message={this.state.errorMessage} />
          }
        </div>
      );
    }
}

Login.propTypes = {
  loginUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  errors: state.errors,
});

const mapDispatchToProps = {
  loginUser,
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
