import React from 'react';
import { Switch, BrowserRouter, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import jwt_decode from 'jwt-decode';
// import setAuthToken from './utils';

import store from './store';
import { setCurrentUser, logoutUser } from './actions/authActions';
import PrivateRoute from './utils/privateRoutes';

import MainPage from './components/pages/MainPage';
import HomePage from './components/pages/HomePage';
import Login from './components/pages/Login';
import RegisterForm from './components/pages/RegisterForm';
import Header from './components/common/Header';
import Teachers from './components/pages/Teachers';
import Classes from './components/pages/Classes';
import SubstitutionManager from './components/pages/SubstitutionManager';
import ChangePassword from './components/pages/ChangePassword';
import ForgotPassword from './components/pages/ForgotPassword';
import ResetPassword from './components/pages/ResetPassword';
import Popup from './components/utils/Popup';

// Check for token to keep user logged in

if (localStorage.jwtToken) {
  const token = localStorage.jwtToken;
  // setAuthToken(token);
  const decoded = jwt_decode(token);
  store.dispatch(setCurrentUser(decoded));
  const currentTime = Date.now() / 1000; // to get in milliseconds
  if (decoded.exp < currentTime) {
    localStorage.removeItem('jwtToken');
    store.dispatch(logoutUser());
    // window.location.href = '/login';
  }
}

require('./styles/App.scss');

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <Provider store={store}>
          <BrowserRouter>
            <Header />
            <Switch>
              <PrivateRoute exact path="/" component={MainPage} />
              <PrivateRoute exact path="/home" component={HomePage} />
              <Route exact path="/login" component={Login} />
              <Route exact path="/signup" component={RegisterForm} />
              <Route exact path="/forgotpassword" component={ForgotPassword} />
              <Route exact path="/resetpassword/:token" component={ResetPassword} />
              <PrivateRoute exact path="/classes" component={Classes} />
              <PrivateRoute exact path="/teachers" component={Teachers} />
              <PrivateRoute exact path="/substitutions" component={SubstitutionManager} />
              <PrivateRoute exact path="/changepassword" component={ChangePassword} />
            </Switch>
            <Popup />
          </BrowserRouter>
        </Provider>
      </div>
    );
  }
}

export default App;
