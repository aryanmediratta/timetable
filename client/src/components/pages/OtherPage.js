import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@material-ui/core';
import { TextField } from '@material-ui/core';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { logoutUser } from '../../actions/authActions';
import { post } from '../utils';
import Dropdown from '../partials/Dropdown';

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
                <br/>
                <Link to="/addTeacher" > Add Teachers </Link>
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
                <h2>User Email - {this.props.auth && this.props.auth.user && this.props.auth.user.email}</h2>
                <br/>
                <Dropdown isMulti={true} showAnimations={true} />
                <br/>
                <br/>            
                <Button
                  color="primary"
                  variant="contained"
                  type="submit"
                >
                  Save
                </Button>
                </form>
                <br />
                <br/>
                <Button
                  color="primary"
                  variant="contained"
                  type="submit"
                  onClick={this.props.logoutUser}
                >
                Logout
                </Button>
                <p>{this.state.responseToPost}</p>
            </div>
        )
    }
}


OtherPage.propTypes = {
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors,
});

const mapDispatchToProps = {
  logoutUser: logoutUser,
};

export default connect(mapStateToProps, mapDispatchToProps)(OtherPage);
