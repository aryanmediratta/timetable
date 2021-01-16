import React from 'react';
import { Link } from 'react-router-dom';
import { Button, TextField } from '@material-ui/core';
import Dropdown from '../partials/Dropdown';
import { connect } from 'react-redux';

import { addNewClasses } from '../../actions/teacherActions';

const options = [
    { value: '1', label: '1', section: '' },
    { value: '2', label: '2', section: '' },
    { value: '3', label: '3', section: '' },
    { value: '4', label: '4', section: '' },
    { value: '5', label: '5', section: '' },
    { value: '6', label: '6', section: '' },
    { value: '7', label: '7', section: '' },
    { value: '8', label: '8', section: '' },
    { value: '9', label: '9', section: '' },
    { value: '10', label: '10', section: '' },
    { value: '11', label: '11', section: '' },
    { value: '12', label: '12', section: '' },
];

class Classes extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            classList: [],
        }
    }


    submitHandler = e => {
        e.preventDefault();
        console.log('classes list ->', this.state.classList);
        this.props.addNewClasses(this.state.classList);
    }

    updateOptions = (_, action) => {
        let { classList } = this.state;
        if (action.action === 'select-option') {
            classList.push(action.option);
        } else if (action.action === 'remove-value') {
            classList = classList.filter(item => item.value !== action.removedValue.value)
        }
        this.setState({classList});
    }

    render() {
        return (
            <div>
                <br/>
                <Link to="/" > Main </Link>
                <br/>
                <Link to="/home"> Home </Link>
                <br/>
                <Link to="/addTeacher"> Add Teachers </Link>
                <br />  
                <div>
                    <span>Select Class
                        <Dropdown
                            isMulti={true}
                            options={options}
                            onChange={(option, action) => this.updateOptions(option, action)}
                            value={options.value}
                            isSearchable={true}
                            showAnimations
                        />
                    </span>
                    <br />
                    {   this.state.classList.map((e) => (
                    <div>
                        <br /> 
                        <TextField
                            className="text-field"
                            label={`Enter Number of classes for Class ${e.label}`}
                            variant="outlined"
                            size="small"
                            value={e.section}
                            onChange = {(element) => {
                                e.section = element.target.value;
                                this.setState({
                                    classList: this.state.classList,
                                });
                            }}
                        />
                    </div> ))}
                    <br />
                    <Button
                        color="primary"
                        variant="contained"
                        type="submit"
                        onClick={this.submitHandler}
                    >
                    Save
                    </Button>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors,
    email: state.auth.user.email,
});

const mapDispatchToProps = {
    addNewClasses: addNewClasses,
}

export default connect(mapStateToProps, mapDispatchToProps)(Classes);
