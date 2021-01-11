import React from 'react';
import { Link } from 'react-router-dom';
import { Button, TextField } from '@material-ui/core';

require('../../styles/Login.css');

class Teachers extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            input1: '',
            input2: '',
            input3: '',
            countArr: [],
            addMode: false
        }
    }
    
    // submitHandler = e => {

    //     e.preventDefault();

    // }

    addTeacher = () => {
        const emptyArr = [];
        this.setState({ 
            addMode: true,
            countArr : this.state.countArr.push(emptyArr), 
        })
    }

    componentDidMount () {
        console.log('Bello')
        console.log('Bello')
        console.log('Bello')
        console.log('Bello')
        console.log('Bello')
        console.log('Bello')

    }

    render() {

        const { countArr } = this.state

        return ( 
        <div>
            <br/>
            <Link to="/" > Main </Link>
            <br/>
        </div>
            // <div>
            //     <form>
            //         <div>
            //             <div>
            //             Hello World
            //             </div>
            //             <br />
            //             <br />
            //             <div>
            //             Hello World
            //             </div>
            //             <br />
            //             <br />
            //             <div>
            //             Hello World
            //             </div>
            //             <br />
            //             <br />
            //             <div>
            //             Hello World
            //             </div>
            //             <br />
            //             <br />
            //             <div>
            //             Hello World
            //             </div>
            //             <br />
            //             <br />
            //             <div>
            //             {/* 
            //                 { this.state.list.forEach(element => {
            //                     this.state.addMode &&
            //                     <TextField
            //                     className="text-field"
            //                     label="Enter Email"
            //                     variant="outlined"
            //                     // onChange={e => this.setState({ input1: e.target.value })}
            //                     size="small"
            //                     />
            //                         })} */}
            //                 {/* <TextField
            //                     className="text-field"
            //                     label="Enter Email"
            //                     variant="outlined"
            //                     onChange={e => this.setState({ input1: e.target.value })}
            //                     size="small"
            //                 />
            //                 <br />
            //                 <br />
            //                 <TextField
            //                     className="text-field"
            //                     label="Enter Email"
            //                     variant="outlined"
            //                     onChange={e => this.setState({ input2: e.target.value })}
            //                     size="small"
            //                 />
            //                 <br />
            //                 <br />
            //                 <TextField
            //                     className="text-field"
            //                     label="Enter Email"
            //                     variant="outlined"
            //                     onChange={e => this.setState({ input3: e.target.value })}
            //                     size="small"
            //                 /> */}
            //             </div>
            //         </div>
            //     </form>
            // </div>
        );
    }
}

export default Teachers;