import React from 'react';
import { Switch, BrowserRouter, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import jwt_decode from 'jwt-decode';
import setAuthToken from './utils';

import store from './store';
import { setCurrentUser, logoutUser } from './actions/authActions';
import PrivateRoute from './utils/privateRoutes';

import MainPage from './components/pages/MainPage';
import OtherPage from './components/pages/OtherPage';
import Login from './components/pages/Login';
import Register from './components/pages/Register';
import Header from './components/partials/Header';
import Teachers from './components/pages/Teachers';
import Classes from './components/pages/Classes';


// Check for token to keep user logged in
// if (localStorage.jwtToken) {
//     // Set auth token header auth
//     const token = localStorage.jwtToken;
//     // setAuthToken(token);
//     // Decode token and get user info and exp
//     const decoded = jwt_decode(token);
//     // Set user and isAuthenticated
//     store.dispatch(setCurrentUser(decoded));
//     // Check for expired token
//     const currentTime = Date.now() / 1000; // to get in milliseconds
//     if (decoded.exp < currentTime) {
//         // Logout user
//         store.dispatch(logoutUser());
//         // Redirect to login
//         window.location.href = '/login';
//     }
// }

class App extends React.Component {
    render() {
        return (
            <div className="App">
                <Provider store={store}>
                    <BrowserRouter>
                    <Header/>
                        <Switch>
                            <Route exact path='/' component={MainPage}></Route>
                            <PrivateRoute exact path='/home' component={OtherPage} />
                            <Route exact path='/login' component={Login}></Route>
                            <Route exact path='/signup' component={Register}></Route>
                            <Route exact path ='/classes' component={Classes}></Route>
                            <PrivateRoute exact path='/addTeacher' component={Teachers} />
                        </Switch>
                    </BrowserRouter>
                </Provider>
            </div>
         );
    }
};

export default App;
