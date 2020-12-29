import React from 'react';

import { Switch, BrowserRouter, Route } from 'react-router-dom';

import MainPage from './components/pages/MainPage';
import OtherPage from './components/pages/OtherPage';
import Login from './components/pages/Login';
import Register from './components/pages/Register';
import Header from './components/partials/Header';

class App extends React.Component {
  
    render() {
        return (
            <div className="App">
                <BrowserRouter>
                <Header/>
                    <Switch>
                        <Route exact path='/' component={MainPage}></Route>
                        <Route exact path='/home' component={OtherPage}></Route>
                        <Route exact path='/login' component={Login}></Route>
                        <Route exact path='/signup' component={Register}></Route>
                    </Switch>
                </BrowserRouter>
            </div>
        );
    }
};

export default App;
