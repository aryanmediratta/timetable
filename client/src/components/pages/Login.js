import React from 'react';
import { Button, TextField } from '@material-ui/core';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { loginUser, setLoginField } from '../../actions/authActions';

require('../../styles/Login.scss');

class Login extends React.Component {
  constructor(props) {
    super(props);
    const { auth: { isAuthenticated } } = this.props;
    if (isAuthenticated) {
      this.props.history.push('/home');
    }
  }

  componentDidUpdate() {
    const { auth: { isAuthenticated } } = this.props;
    if (isAuthenticated) {
      this.props.history.push('/home');
    }
  }

    handleSubmit = async (e) => {
      e.preventDefault();
      const { auth: { loginInfo: { email, password } } } = this.props;
      const data = {
        email,
        password,
      };
      this.props.loginUser(data);
    };

    render() {
      let { auth: { loginInfo } } = this.props;
      return (
        <div className="container">
          <form onSubmit={this.handleSubmit}>
            <div className="box">
              <div className="outline">
                <h2>Login</h2>
                <TextField
                  className="text-field"
                  id="email"
                  label="Enter Email"
                  variant="outlined"
                  value={loginInfo.email}
                  onChange={(e) => {
                    loginInfo = { ...loginInfo, email: e.target.value };
                    this.props.setLoginField(loginInfo);
                  }}
                  size="small"
                />
                <br />
                <br />
                <TextField
                  className="text-field"
                  id="password"
                  label="Enter Password"
                  type="password"
                  variant="outlined"
                  value={loginInfo.password}
                  onChange={(e) => {
                    loginInfo = { ...loginInfo, password: e.target.value };
                    this.props.setLoginField(loginInfo);
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
                  Login
                </Button>
                <br />
                <br />
                <Link to="/forgotpassword">
                  Forgot Password
                </Link>
              </div>
            </div>
          </form>
        </div>
      );
    }
}

Login.propTypes = {
  loginUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

const mapDispatchToProps = {
  loginUser,
  setLoginField,
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
