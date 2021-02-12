import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@material-ui/core';
import { connect } from 'react-redux';

import { logoutUser } from '../../actions/authActions';
import ShowCard from '../utils/Cards';

import { getAllClasses } from '../../actions/classesActions';

class HomePage extends React.Component {
  constructor(props) {
    super(props);
    const { auth: { user: { email } } } = this.props;
    // this.props.getAllTeachers(email);
    this.props.getAllClasses(email);
  }

  render() {
    const { auth: { user: { email } } } = this.props;
    const { classes: { classesForDropdown } } = this.props;
    console.log(classesForDropdown);

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
        <div>
          {
            classesForDropdown && classesForDropdown.forEach((classObj) => {
              <ShowCard
                label={classObj.label}
                sections={classObj.numberOfSections}
              />
              console.log(classObj);
            })
          }
          {/* <ShowCard
            label={classesForDropdown[1].label}
            sections={classesForDropdown[1].numberOfSections}
          /> */}
        </div>
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
  classes: state.classes,
});

const mapDispatchToProps = {
  logoutUser,
  getAllClasses,
};

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
