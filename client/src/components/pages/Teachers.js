import React from 'react';
import { Link } from 'react-router-dom';
import { Button, TextField, IconButton } from '@material-ui/core';
import Dropdown from '../partials/Dropdown';
import CollapsibleSections from '../partials/CollapsibleSections';

import CloseIcon from '@material-ui/icons/Close';

import { post } from '../utils'

require('../../styles/Login.css');

const options = [
    { value: '1', label: '11-A' },
    { value: '2', label: '11-B' },
    { value: '3', label: '11-C' },
    { value: '4', label: '11-D' },
    { value: '5', label: '11-E' },
];

class Teachers extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            teachersList: [],
            postResponse: 'Teachers Response',
        }
    }
    
    submitHandler = e => {
        e.preventDefault();
    }

    saveCall = () => {
        const data = {
            lol: this.state.postResponse 
        }
        post('/api/save', data)
        .then(res => res.json())
        .then((res)  => {
            console.log(this.state.postResponse)
            this.setState({
                postResponse: res.message,
            }), ()=> console.log(this.state.response);
        });
    }

    addTeacher = () => {
        this.setState({
            teachersList : [...this.state.teachersList, {name: '', subject: '', classesList: []}]
        })
    }

    updateOptions = (_, action, i) => {
        const { teachersList } = this.state;
        if (action.action === 'select-option') {
            teachersList[i].classesList.push(action.option);
        } else if (action.action === 'remove-value') {
            teachersList[i].classesList = teachersList[i].classesList.filter(item => item.value !== action.removedValue.value)
        }
        this.setState({teachersList});
    }

    removeTeacher = index => {
        const teachersList = [...this.state.teachersList];
        teachersList.splice(index, 1);
        this.setState({ teachersList });
    }

    render() {
        return (
            <div>
                <form onSubmit={this.submitHandler}>
                    <div>
                        <br />
                        <div>
                        <Button
                            classes="login-button"
                            color="primary"
                            variant="contained"
                            type="submit"
                            onClick={this.addTeacher}
                        >
                        + Add Teacher
                        </Button>
                        </div>
                        <div>
                            { this.state.teachersList.map((e,i) => {
                                return (
                                <div>
                                    <CollapsibleSections title={e.name || `Teacher Number ${i+1}`} show={false}>
                                    <div>
                                        Teacher {i+1}
                                        <span>
                                        <IconButton size="small" aria-label="add teacher" color="inherit" onClick={() => this.removeTeacher(i)}>
                                            <CloseIcon fontSize="small" />
                                        </IconButton>
                                        </span>
                                    </div>
                                    <br />
                                    <div>
                                        <TextField
                                        className="text-field"
                                        label="Enter Teacher Name"
                                        variant="outlined"
                                        value={e.name}
                                        onChange={(element) => {
                                            const teachersList = [...this.state.teachersList];
                                            teachersList[i] = { ...teachersList[i], name: element.target.value };
                                            this.setState({ teachersList });
                                          }}
                                        size="small"
                                        />
                                    </div>
                                    <br />
                                    <div>
                                        <TextField
                                        className="text-field"
                                        label="Enter Subject Taught"
                                        variant="outlined"
                                        value={e.subject}
                                        onChange={(element) => {
                                            const teachersList = [...this.state.teachersList];
                                            teachersList[i] = { ...teachersList[i], subject: element.target.value };
                                            this.setState({ teachersList });
                                          }}
                                        size="small"
                                        />
                                    </div>
                                    <br />
                                    <span>Classes taught by teacher
                                    <Dropdown
                                        isMulti={true}
                                        options={options}
                                        onChange={(option, action) => this.updateOptions(option, action, i)}
                                        value={e.classesList}
                                        isSearchable={true}
                                        showAnimations
                                    />
                                    </span>
                                    {e.classesList && e.classesList.length > 0 && e.classesList.map((teacher, index) => (
                                        <div>
                                            <br/>
                                            <TextField
                                        className="text-field"
                                        label={`Enter periods per week for ${teacher.label}`}
                                        variant="outlined"
                                        value={teacher.periodsPerWeek}
                                        onChange={(element) => {
                                            const teachersList = [...this.state.teachersList];
                                            const classesList = teachersList[i].classesList;
                                            classesList[index] = { ...classesList[index], periodsPerWeek: element.target.value };
                                            this.setState({ teachersList });
                                          }}
                                        size="small"
                                        />
                                        </div>
                                    ))}
                                    </CollapsibleSections>
                                </div>
                                );
                                }) 
                            }
                        </div>
                    </div>
                    <div>
                        {this.state.teachersList.length > 0 &&
                        <Button
                            classes="login-button"
                            color="primary"
                            variant="contained"
                            type="submit"
                            onClick={this.saveCall}
                        >
                        Save
                        </Button>
                        }   
                    </div>
                </form>
            </div>
        );
    }
}

export default Teachers;