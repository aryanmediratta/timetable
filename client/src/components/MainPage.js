import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

class MainPage extends React.Component {
    state = {

    }

    componentDidMount() {
        console.log('Mounting component');
        this.callApi();
      }
      
      callApi = async () => {
        axios.get('/api/hello').then((res) => {
          const response = res.data;
          this.setState({response: response.express});
        });
      };

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
