import React from 'react';
import { Link } from 'react-router-dom';
import { Button, TextField } from '@material-ui/core';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { loginUser } from '../../actions/authActions';
import SimpleSnackbar from '../utils/Popup';

require('../../styles/Login.css');


class Login extends React.Component {

    state = {
        email: '',
        password: '',
        response: '',
        showPopup: false,
    };

    onClose = () => {
        this.setState({
            showPopup: false,
        });
    };

    componentWillReceiveProps(nextProps) {
        if (nextProps.auth.isAuthenticated) {
            this.props.history.push('/home'); // push user to home when they login
        }
        if (nextProps.errors) {
            this.setState({
                errors: nextProps.errors
            });
        }
    }

    componentDidMount() {
        console.log('Mounting Login.js')
        // If logged in and user navigates to Login page, should redirect them to home
        if (this.props.auth.isAuthenticated) {
            this.props.history.push('/home');
        }
    }

      
    handleSubmit = async e => {
        e.preventDefault();
        const data = {
            email: this.state.email,
            password: this.state.password,
        };
        this.props.loginUser(data);
    };

    render() {
        return (
            <div>
                <br/>
                <Link to="/" > Main </Link>
                <br/>
                <Link to="/home"> Home </Link>
                <br/>
                <form onSubmit={this.handleSubmit}>
                    <div className="box">
                        <div className="outline">
                            <h2>Enter Login</h2>
                            <TextField
                                className="text-field"
                                label="Enter Email"
                                variant="outlined"
                                onChange={e => this.setState({ email: e.target.value })}
                                size="small"
                            />
                            <br/>
                            <br/>
                            <TextField
                                className="text-field"
                                label="Enter Password"
                                type="password"
                                variant="outlined"
                                onChange={e => this.setState({ password: e.target.value })}
                                size="small"
                            />
                            <br/>
                            <br/>
                            <Button
                                classes="login-button"
                                color="primary"
                                variant="contained"
                                type="submit"
                                onClick={this.handleSubmit}
                            >
                            Login
                            </Button>
                        </div>
                    </div>
                </form>
                {
                    this.state.showPopup &&
                    <SimpleSnackbar onClose={this.onClose} message={this.state.response} />
                }
            </div>
        );
    }
}

Login.propTypes = {
    loginUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors
});

const mapDispatchToProps = {
    loginUser: loginUser,
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
