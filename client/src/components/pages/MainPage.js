import React from 'react';
import { Link } from 'react-router-dom';

import Timetable from './Timetable';

class MainPage extends React.Component {
  render() {
    return (
      <div className="container">
        <h2>Main Page??</h2>
        <Link to="/home" className="link"> Home </Link>
        <br />
        <Link to="/classes" className="link"> Manage Classes </Link>
        <br />
        <Link to="/teachers" className="link"> Manage Teachers </Link>
        <br />
        <br />
        <Timetable />
      </div>
    );
  }
}

export default MainPage;
