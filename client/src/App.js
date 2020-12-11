import React from 'react';

import { Switch, BrowserRouter, Route } from 'react-router-dom';

import MainPage from './components/MainPage';
import OtherPage from './components/OtherPage';

class App extends React.Component {
  state = {
    response: '',
    post: '',
    responseToPost: '',
  };
  
  handleSubmit = async e => {
    e.preventDefault();
    const response = await fetch('/api/world', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ post: this.state.post }),
    });
    const body = await response.text();
    
    this.setState({ responseToPost: body });
  };
  
render() {
    return (
      <div className="App">
        <p>{this.state.response}</p>
        <form onSubmit={this.handleSubmit}>
          <p>
            <strong>Post to Server and Save in DB:</strong>
          </p>
          <input
            type="text"
            value={this.state.post}
            onChange={e => this.setState({ post: e.target.value })}
          />
          <button type="submit">Submit</button>
        </form>
        <p>{this.state.responseToPost}</p>
        <BrowserRouter>
          <Switch>
            <Route exact path='/' component={MainPage}></Route>
            <Route exact path='/home' component={OtherPage}></Route>
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
};

export default App;
