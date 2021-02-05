import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@material-ui/core';
import { connect } from 'react-redux';

import { logoutUser } from '../../actions/authActions';

class HomePage extends React.Component {
  render() {
    const { auth: { user: { email } } } = this.props;
    return (
      <div className="container">
        <h2>Home Page</h2>
        <br />
        <h2>
          Email
          - -
          {'  '}
          {email}
        </h2>
        <Link to="/" className="link"> Manage Timetable </Link>
        <br />
        <Link to="/classes" className="link"> Manage Classes </Link>
        <br />
        <Link to="/teachers" className="link"> Manage Teachers </Link>
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

const mapStateToProps = (state) => ({
  auth: state.auth,
});

const mapDispatchToProps = {
  logoutUser,
};

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
