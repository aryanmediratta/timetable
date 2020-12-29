import React from 'react';
import { Link } from 'react-router-dom';

import { get } from '../utils';

class MainPage extends React.Component {
    state = {

    }

    componentDidMount() {
        console.log('Mounting component');
        this.callApi();
      }

      callApi = () => {
        get('/api/hello')
          .then(res => {
            this.setState({response: res.express});
          });
      }

    render() {
        return (
            <div>
                <h2>Main Page??</h2>
                <Link to="/home" > Home </Link>
                <br/>
                <Link to="/login" > Login </Link>
                {
                    this.state.response &&
                    <p>{this.state.response}</p>
                }
            </div>
        )
    }
}

export default MainPage;
