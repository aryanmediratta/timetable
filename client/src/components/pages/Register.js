import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Button, TextField } from '@material-ui/core';
import PropTypes from "prop-types";
import { connect } from "react-redux";

import SimpleSnackbar from '../utils/Popup';
import { registerUser } from "../../actions/authActions";

require('../../styles/Login.css');
 

class Register extends React.Component {

    state = {
        email: '',
        password: '',
        passwordConfirmation: '',
        name: '',
        response: '',
        showPopup: false,
    };

    componentDidMount() {
        if (this.props.auth.isAuthenticated) {
            this.props.history.push('/home');
        }
    }

    componentDidUpdate(prevProps) {
        if (prevProps.errors !== this.props.errors) {
            this.setState({
                response: this.props.errors && this.props.errors.message,
                showPopup: true,
            });
        }
    }
    

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
            passwordConfirmation: this.state.passwordConfirmation,
            name: this.state.name,
        };
        this.props.registerUser(data);
    };

    render() {
        console.log('Resp', this.state.response);
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
                            <h2>  Sign up  </h2>
                            <TextField
                                className="text-field"
                                label="Enter Name"
                                variant="outlined"
                                onChange={e => this.setState({ name: e.target.value })}
                                size="small"
                            />
                            <br/>
                            <br/>
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
                            <TextField
                                className="text-field"
                                label="Confirm Password"
                                type="password"
                                variant="outlined"
                                onChange={e => this.setState({ passwordConfirmation: e.target.value })}
                                size="small"
                            />
                            <br/>
                            <br/>
                            <Button
                                color="primary"
                                variant="contained"
                                type="submit"
                                onClick={this.handleSubmit}
                            >
                            Register
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

Register.propTypes = {
    registerUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors
});

const mapDispatchToProps = {
    registerUser: registerUser,
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Register));
