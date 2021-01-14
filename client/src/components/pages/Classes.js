import React from 'react';
import { Link } from 'react-router-dom';
import { Button, TextField, IconButton } from '@material-ui/core';
import Dropdown from '../partials/Dropdown';

import CloseIcon from '@material-ui/icons/Close';

import { post } from '../utils'

const options = [
    { value: '1', label: '1', section: 0 },
    { value: '2', label: '2', section: 0 },
    { value: '3', label: '3', section: 0 },
    { value: '4', label: '4', section: 0 },
    { value: '5', label: '5', section: 0 },
    { value: '6', label: '6', section: 0 },
    { value: '7', label: '7', section: 0 },
    { value: '8', label: '8', section: 0 },
    { value: '9', label: '9', section: 0 },
    { value: '10', label: '10', section: 0 },
    { value: '11', label: '11', section: 0 },
    { value: '12', label: '12', section: 0 },
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
    }

    updateOptions = (option, action) => {
        let { classList } = this.state;
        if (action.action === 'select-option') {
            classList.push(action.option);
        } else if (action.action === 'remove-value') {
            classList = classList.filter(item => item.value !== action.removedValue.value)
        }
        this.setState({classList});
        console.log(action.option);
    }

    render() {

        // const renderClasses = [...options];
        // console.log(renderClasses);

        return (
            <div>
                <div>Papadam</div>
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
                        // this.state.classList[i] == e &&
                    <div>
                        <br /> 
                        <TextField
                            className="text-field"
                            label={`Enter Number of classes for Class ${e.label}`}
                            variant="outlined"
                            value={e.section}
                            onChange = {(element) => {
                                e.section = element.target.value;
                                this.setState({
                                    classList: this.state.classList,
                                });
                            }}
                        />
                    </div> ))}
                </div>
            </div>
        );
    }
}

export default Classes;