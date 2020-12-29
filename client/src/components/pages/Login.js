import React from 'react';
import { Link } from 'react-router-dom';
import { Button, TextField } from '@material-ui/core';

import { post } from '../utils';
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
      
    handleSubmit = e => {
        e.preventDefault();
        const data = {
            email: this.state.email,
            password: this.state.password,
        };

        post('/api/signin', data)
            .then((res) => {
                const statusCode = res.status;
                // const body = res.json();
                console.log('StatusCode', statusCode);
                // console.log('body!', body)
                if (statusCode === 422 || statusCode === 404 || statusCode === 400 || statusCode === 500) {
                    this.setState({
                        // response: body.errors[0],
                        showPopup: true,
                    });
                } else if (statusCode === 200) {
                    this.setState({
                        // response: body.token,
                        showPopup: true,
                    });
                }
        });
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

export default Login;
