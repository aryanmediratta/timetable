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
            console.log('res', res)
            this.setState({response: res.express});
          });
      }

    render() {
        return (
            <div>
                <h2>Main Page??</h2>
                {
                    this.state.response &&
                    <p>{this.state.response}</p>
                }
                <Link to="/home" > Home </Link>
            </div>
        )
    }
}

export default MainPage;
