import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Grid } from '@material-ui/core';
import { connect } from 'react-redux';

import { logoutUser } from '../../actions/authActions';
import ShowCard from '../utils/Cards';

import { getAllClasses } from '../../actions/classesActions';
import { getAllTeachers } from '../../actions/teacherActions';

class HomePage extends React.Component {
  constructor(props) {
    super(props);
    const { auth: { user: { email } }, classes: { classesForDropdown }, teachers: { teachersList } } = this.props;
    if (classesForDropdown.length === 0) {
      this.props.getAllClasses(email);
    }
    if (teachersList.length === 0) {
      this.props.getAllTeachers(email);
    }
  }

  render() {
    const { auth: { user: { email } }, classes: { classesForDropdown }, teachers: { teachersList } } = this.props;

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
        <h2> Classes </h2>
        <div style={{
          maxHeight: '160px', overflowX: 'hidden', overflowY: 'auto', border: '1px solid black', padding: '40px 40px 20px 60px',
        }}
        >
          <Grid container style={{ flexGrow: 1 }} spacing={2}>
            {
              classesForDropdown && classesForDropdown.map((classObj) => (
                <ShowCard
                  label={`Class: ${classObj.label}`}
                  sections={`Number of Sections: ${classObj.numberOfSections}`}
                />
              ))
            }
          </Grid>
        </div>
        <br />
        <br />
        <h2> Teachers </h2>
        <div style={{
          maxHeight: '200px', overflowX: 'hidden', overflowY: 'auto', border: '1px solid black', padding: '40px 40px 20px 60px',
        }}
        >
          <Grid container style={{ flexGrow: 1 }} spacing={2}>
            {
              teachersList && teachersList.map((teacher) => (
                <ShowCard
                  label={teacher.teacherName}
                  sections={teacher.teacherSubject}
                />
              ))
            }
          </Grid>
        </div>
        <br />
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
  teachers: state.teachers,
});

const mapDispatchToProps = {
  logoutUser,
  getAllClasses,
  getAllTeachers,
};

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
