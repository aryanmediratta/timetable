import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Button, TextField } from '@material-ui/core';

import { AUTH_TYPES } from '../../actions/auth.types';

import { forgotPassword } from '../../actions/authActions';

const ForgotPassword = () => {
  const auth = useSelector((state) => state.auth);
  const { isAuthenticated } = auth;
  const history = useHistory();
  const dispatch = useDispatch();
  let { forgotPassInfo } = auth;

  useEffect(() => {
    if (isAuthenticated) {
      history.push({
        pathname: '/home',
      });
    }
  });

  const submitMail = (e) => {
    const data = { email: forgotPassInfo.email };
    dispatch(forgotPassword(data));
  };

  return (
    <div>
      <h1>Forgot Password</h1>
      <div className="flex-center">
        <TextField
          className="text-field"
          label="Enter Your Email Address"
          variant="outlined"
          value={forgotPassInfo.email}
          onChange={(e) => {
            forgotPassInfo = { ...forgotPassInfo, email: e.target.value };
            dispatch({ type: AUTH_TYPES.FORGOT_PASSWORD, payload: forgotPassInfo });
          }}
          size="small"
        />
        <br />
        <br />
        <Button
          color="primary"
          variant="contained"
          type="submit"
          onClick={submitMail}
        >
          Send Change Password Link
        </Button>
      </div>
    </div>
  );
};

export default ForgotPassword;
