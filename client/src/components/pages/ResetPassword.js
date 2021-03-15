import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Button, TextField } from '@material-ui/core';

import { resetLinkValidation, resetPassword } from '../../actions/authActions';
import { AUTH_TYPES } from '../../actions/auth.types';

const ResetPassword = () => {
  const dispatch = useDispatch();
  const { token } = useParams();
  const auth = useSelector((state) => state.auth);
  const { resetPassInfo: { email } } = auth;
  let { resetPassInfo } = auth;

  useEffect(() => {
    dispatch(resetLinkValidation(token));
  }, []);

  const reset = (e) => {
    e.preventDefault();
    const { newPassword, confirmNewPassword } = resetPassInfo;
    const data = {
      email,
      newPassword,
      confirmNewPassword,
    };
    dispatch(resetPassword(data));
  };

  return (
    <div className="container">
      <div>
        <h1>Reset Password Link</h1>
        {email && (email !== null || email !== '')
          && (
            <div>
              <TextField
                className="text-field"
                label="Enter New Password"
                variant="outlined"
                type="password"
                value={resetPassInfo.newPassword}
                onChange={(e) => {
                  resetPassInfo = { ...resetPassInfo, newPassword: e.target.value };
                  dispatch({ type: AUTH_TYPES.RESET_PASSWORD, payload: resetPassInfo });
                }}
                size="small"
              />
              <br />
              <br />
              <TextField
                className="text-field"
                label="Confirm Password"
                variant="outlined"
                type="password"
                value={resetPassInfo.confirmNewPassword}
                onChange={(e) => {
                  resetPassInfo = { ...resetPassInfo, confirmNewPassword: e.target.value };
                  dispatch({ type: AUTH_TYPES.RESET_PASSWORD, payload: resetPassInfo });
                }}
                size="small"
              />
              <br />
              <br />
              <Button
                color="primary"
                variant="contained"
                type="submit"
                onClick={reset}
              >
                Reset Password
              </Button>
            </div>
          )}
      </div>
    </div>
  );
};

export default ResetPassword;
