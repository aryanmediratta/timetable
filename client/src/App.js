import React from 'react';

import { Switch, BrowserRouter, Route } from 'react-router-dom';

import MainPage from './components/pages/MainPage';
import OtherPage from './components/pages/OtherPage';

class App extends React.Component {
  
render() {
    return (
      <div className="App">
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
