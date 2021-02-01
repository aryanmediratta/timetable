import React from 'react';
import { Switch, BrowserRouter, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import jwt_decode from 'jwt-decode';
// import setAuthToken from './utils';

import store from './store';
import { setCurrentUser, logoutUser } from './actions/authActions';
import PrivateRoute from './utils/privateRoutes';

import MainPage from './components/pages/MainPage';
import OtherPage from './components/pages/OtherPage';
import Login from './components/pages/Login';
import Register from './components/pages/Register';
import Header from './components/common/Header';
import Teachers from './components/pages/Teachers';
import Classes from './components/pages/Classes';

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
    window.location.href = '/login';
  }
}

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <Provider store={store}>
          <BrowserRouter>
            <Header />
            <Switch>
              <PrivateRoute exact path="/" component={MainPage} />
              <PrivateRoute exact path="/home" component={OtherPage} />
              <Route exact path="/login" component={Login} />
              <Route exact path="/signup" component={Register} />
              <PrivateRoute exact path="/classes" component={Classes} />
              <PrivateRoute exact path="/teachers" component={Teachers} />
            </Switch>
          </BrowserRouter>
        </Provider>
      </div>
    );
  }
}

export default App;
