import React from 'react';
import { Link } from 'react-router-dom';
import { Button, TextField } from '@material-ui/core';
import { element } from 'prop-types';

require('../../styles/Login.css');

class Teachers extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            input1: '',
            input2: '',
            input3: '',
            countArr: [],
        }
    }
    
    submitHandler = e => {
        e.preventDefault();
    }

    handleInputChange = (e, index) => {
        const { name, value } = e.target;
        const list = [...this.state.countArr];
        list[index][name] = value;
        this.setState({ countArr: list });
    }

    addTeacher = () => {
        this.setState({
            countArr : [...this.state.countArr, {input1: '', input2: '', input3: ''}]
        })
    }

    removeTeacher = index => {
        const list = [...this.state.countArr];
        list.splice(index, 1);
        this.setState({countArr: list});
    }

    render() {

        // const { countArr } = this.state

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
                        <br />
                        <br />

                        <div>
                            { this.state.countArr.map((e,i) => {
                                return (
                                <div>
                                    <div>
                                        <h1>Teacher {i+1}</h1>
                                        <Button
                                            classes="login-button"
                                            color="primary"
                                            variant="contained"
                                            type="submit"
                                            onClick={()=> this.removeTeacher(i)}
                                        >
                                        Remove
                                        </Button>
                                    </div>
                                    <br />
                                    <div>
                                        <TextField
                                        className="text-field"
                                        label="Enter Input 1"
                                        variant="outlined"
                                        // value={e.input1}
                                        onChange={e => handleInputChange(e,i)}
                                        size="small"
                                        />
                                    </div>
                                    <br />
                                    <div>
                                        <TextField
                                        className="text-field"
                                        label="Enter Input 2"
                                        variant="outlined"
                                        // value={e.input2}
                                        onChange={e => handleInputChange(e,i)}
                                        size="small"
                                        />
                                    </div>
                                    <br />
                                    <div>
                                        <TextField
                                        className="text-field"
                                        label="Enter Input 3"
                                        variant="outlined"
                                        // value={e.input3}
                                        onChange={e => handleInputChange(e,i)}
                                        size="small"
                                        />
                                    </div>
                                    <br />
                                </div>
                                );
                                }) 
                            }
                        </div>
                    </div>
                </form>
            </div>
        );
    }
}

export default Teachers;