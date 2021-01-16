import React from 'react';
import { Link } from 'react-router-dom';
import Timetable from './Timetable';
import { get } from '../utils';

class MainPage extends React.Component {
    state = {
      response: '',
    }

    componentDidMount() {
        this.callApi();
      }

      callApi = () => {
        get('/api/hello')
          .then(res => {
            this.setState({response: res.express});
          })
          .catch(err => {
            this.setState({response: err});
          })
      }

    render() {
        return (
            <div>
                <h2>Main Page??</h2>
                <Link to="/home" > Home </Link>
                <br/>
                <Link to="/login" > Login </Link>
                <br/>
                <Link to="/classes"> Add Classes </Link>
                <br/>
                <Link to="/addTeacher"> Add Teachers </Link>
                <br />
                {this.state.response}
                <br />
                <Timetable />
            </div>
        )
    }
}

export default MainPage;
