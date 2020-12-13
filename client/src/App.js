import React from 'react';

import { Switch, BrowserRouter, Route } from 'react-router-dom';

import MainPage from './components/pages/MainPage';
import OtherPage from './components/pages/OtherPage';

class App extends React.Component {
  
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
