import React from 'react';
import { Link } from 'react-router-dom';
import { Button, TextField, IconButton } from '@material-ui/core';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import CloseIcon from '@material-ui/icons/Close';

import Dropdown from '../partials/Dropdown';
import CollapsibleSections from '../partials/CollapsibleSections';
import Modal from '../partials/Modal';

import { addNewTeacher, getAllTeachers } from '../../actions/teacherActions';
import Table from '../partials/Table';

import { post } from '../utils'

require('../../styles/Login.css');

const options = [
    { value: '1', label: '11-A' },
    { value: '2', label: '11-B' },
    { value: '3', label: '11-C' },
    { value: '4', label: '11-D' },
    { value: '5', label: '11-E' },
];
 
const columns = [{
    Header: 'Name',
    accessor: 'teacherName' // String-based value accessors!
  }, {
    Header: 'Subject',
    accessor: 'teacherSubject',
    Cell: props => <span className='number'>{props.value}</span> // Custom cell components!
  }]

class Teachers extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            showModal: false,
            newTeacher: {},
            teachersList: [],
            postResponse: 'Teachers Response',
        }
    }

    componentDidMount() {
        this.props.getAllTeachers(this.props.email);
        console.log('Mounting Teacher page');
        this.setState({
            teachersList: this.props.teachersList,
        });
    }

    componentDidUpdate(prevProps) {
        if (prevProps.teachersList !== this.props.teachersList) {
            console.log('Update MAN');
            this.setState({
                teachersList: this.props.teachersList
            });
        }
    }
    
    submitHandler = e => {
        e.preventDefault();
        const data = {
            newTeacher: this.state.newTeacher,
            email: this.props.email,
        }
        this.props.addNewTeacher(data);
    }

    toggleModal = () => {
        this.setState({
            showModal: !this.state.showModal,
        })
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
            newTeacher: {name: '', subject: '', classesList: []},
            showModal: !this.state.showModal,
        })
    }

    updateOptions = (_, action) => {
        const { newTeacher } = this.state;
        if (action.action === 'select-option') {
            newTeacher.classesList.push(action.option);
        } else if (action.action === 'remove-value') {
            newTeacher.classesList = newTeacher.classesList.filter(item => item.value !== action.removedValue.value)
        }
        this.setState({ newTeacher });
    }

    modalBody = () => {
        const { newTeacher } = this.state;
        return (
            <div>
            <CollapsibleSections title={newTeacher.name || `Teacher`} show={false}>
            <div>
            {newTeacher.name || `Teacher`}
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
                value={newTeacher.name || ''}
                onChange={(element) => {
                    let { newTeacher } =  this.state;
                    newTeacher = { ...newTeacher, name: element.target.value };
                    this.setState({ newTeacher });
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
                value={newTeacher.subject || ''}
                onChange={(element) => {
                    let { newTeacher } = this.state;
                    newTeacher = { ...newTeacher, subject: element.target.value };
                    this.setState({ newTeacher });
                    }}
                size="small"
                />
            </div>
            <br />
            <span>Classes taught by teacher
            <Dropdown
                className="classes-dropdown"
                isMulti={true}
                options={options}
                onChange={(option, action) => this.updateOptions(option, action)}
                value={newTeacher.classesList}
                isSearchable={true}
                showAnimations
            />
            </span>
            {newTeacher.classesList && newTeacher.classesList.length > 0 && newTeacher.classesList.map((teacher, index) => (
                <div>
                    <br/>
                    <TextField
                        className="text-field"
                        label={`Enter periods per week for ${teacher.label}`}
                        variant="outlined"
                        value={teacher.periodsPerWeek || ''}
                        onChange={(element) => {
                            const { newTeacher } = this.state;
                            const classesList = newTeacher.classesList;
                            classesList[index] = { ...classesList[index], periodsPerWeek: element.target.value };
                            this.setState({ newTeacher });
                            }}
                        size="small"
                    />
                </div>
            ))}
            <br/>
            <br/>
            <Button
                color="primary"
                variant="contained"
                type="submit"
                onClick={this.submitHandler}
            >
                Save
            </Button>
            </CollapsibleSections>
        </div>
        );
    }

    render() {
        return (
            <div>
                <br/>
                <Link to="/" > Main </Link>
                <br/>
                <Link to="/home"> Home </Link>
                <br/>
                <Link to="/classes"> Add Classes </Link>
                <br/>
                {
                    this.state.teachersList && this.state.teachersList.length > 0 &&
                <Table
                    data={this.state.teachersList}
                    columns={columns}
                    defaultPageSize={5}
                    title='Teachers'
                />
                }
                <Modal 
                    displayModal={this.state.showModal}
                    closeModal={this.toggleModal}
                    body={this.modalBody()}
                />
                <br/>
                <br />
                <Button
                    color="primary"
                    variant="contained"
                    type="submit"
                    onClick={this.addTeacher}
                >
                + Add Teacher
                </Button>
                <br/>
            </div>
        );
    }
}

// export default Teachers;

Teachers.propTypes = {
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired,
};
  
const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors,
    email: state.auth.user.email,
    teachersList: state.teachers && state.teachers.teachersList && state.teachers.teachersList.length > 0 && state.teachers.teachersList,
});

const mapDispatchToProps = {
    addNewTeacher: addNewTeacher,
    getAllTeachers: getAllTeachers,
}

export default connect(mapStateToProps, mapDispatchToProps)(Teachers);
