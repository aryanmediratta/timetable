import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';

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
          .then(res => res.json())
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
                <br/>
                <Link to="/login" > Login </Link>
                <p>{this.state.response}</p>
                <form onSubmit={this.handleSubmit}>
                <p>
                  <strong>Post to Server and Save in DB:</strong>
                </p>
                <TextField
                  id="post"
                  label="Enter text to save"
                  variant="outlined"
                  onChange={e => this.setState({ post: e.target.value })}
                  size="small"
                />
                <Button
                  color="primary"
                  variant="contained"
                  type="submit"
                >
                  Save
                </Button>
                </form>
                <p>{this.state.responseToPost}</p>
            </div>
        )
    }
}

export default OtherPage;
