import React from 'react';
import { Link } from 'react-router-dom';

import { post } from '../utils';


class OtherPage extends React.Component {

    state = {
        response: '',
        post: '',
        responseToPost: '',
      };
      
      handleSubmit = e => {
        e.preventDefault();
        const data = {
          post: this.state.post
        }
        post('/api/world', data)
          .then((res) => {
            if (res.success) {
              this.setState({ responseToPost: res.message });
            } else {
              this.setState({ responseToPost: 'Some Error occurred. We are working on it.' });
            }
          });
      };
    
    render() {
        return(
            <div>
                <h2>Home Page??</h2>
                <Link to="/" > Main </Link>

                <p>{this.state.response}</p>
                <form onSubmit={this.handleSubmit}>
                <p>
                    <strong>Post to Server and Save in DB:</strong>
                </p>
                <input
                    type="text"
                    value={this.state.post}
                    onChange={e => this.setState({ post: e.target.value })}
                />
                <button type="submit">Submit</button>
                </form>
                <p>{this.state.responseToPost}</p>
            </div>
        )
    }
}

export default OtherPage;
