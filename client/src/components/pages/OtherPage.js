import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@material-ui/core';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { logoutUser } from '../../actions/authActions';

class OtherPage extends React.Component {
  render() {
    return (
      <div>
        <h2>Home Page??</h2>
        <Link to="/"> Main </Link>
        <br />
        <Link to="/login"> Login </Link>
        <br />
        <Link to="/teachers"> Add Teachers </Link>
        <h2>
          User Email -
          {this.props.auth && this.props.auth.user && this.props.auth.user.email}
        </h2>
        <br />
        <br />
        <br />
        <Button
          color="primary"
          variant="contained"
          type="submit"
          onClick={this.props.logoutUser}
        >
          Logout
        </Button>
      </div>
    );
  }
}

OtherPage.propTypes = {
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  errors: state.errors,
  email: state.auth && state.auth.user && state.auth.user.email,
});

const mapDispatchToProps = {
  logoutUser,
};

export default connect(mapStateToProps, mapDispatchToProps)(OtherPage);
