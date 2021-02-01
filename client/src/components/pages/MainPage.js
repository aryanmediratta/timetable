import React from 'react';
import { Link } from 'react-router-dom';
import Timetable from './Timetable';

class MainPage extends React.Component {
  render() {
    return (
      <div>
        <h2>Main Page??</h2>
        <Link to="/home"> Home </Link>
        <br />
        <Link to="/login"> Login </Link>
        <br />
        <Link to="/classes"> Add Classes </Link>
        <br />
        <Link to="/teachers"> Add Teachers </Link>
        <br />
        <br />
        <Timetable />
      </div>
    );
  }
}

export default MainPage;
