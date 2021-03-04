import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Button, TextField } from '@material-ui/core';

import { AUTH_TYPES } from '../../actions/auth.types';

import { setNewPass } from '../../actions/authActions';

const changePassword = () => {
  const auth = useSelector((state) => state.auth);
  const { user: { email } } = auth;
  let { changePassInfo } = auth;
  const dispatch = useDispatch();

  const submitPassword = async (e) => {
    e.preventDefault();
    const { changePassInfo: { password, newPassword, confirmNewPassword } } = auth;
    const data = {
      userEmail: email,
      password,
      newPassword,
      confirmNewPassword,
    };
    dispatch(setNewPass(data));
  };

  return (
    <div>
      <h1>Change Password</h1>
      <div class="flex-center">
        <TextField
          className="text-field"
          label="Enter current Password"
          type="password"
          variant="outlined"
          value={changePassInfo.password}
          onChange={(e) => {
            changePassInfo = { ...changePassInfo, password: e.target.value };
            dispatch({ type: AUTH_TYPES.CHANGE_CURRENT_PASSWORD, payload: changePassInfo });
          }}
          size="small"
        />
      </div>
      <br />
      <TextField
        className="text-field"
        label="Enter new Password"
        type="password"
        variant="outlined"
        value={changePassInfo.newPassword}
        onChange={(e) => {
          changePassInfo = { ...changePassInfo, newPassword: e.target.value };
          dispatch({ type: AUTH_TYPES.CHANGE_CURRENT_PASSWORD, payload: changePassInfo });
        }}
        size="small"
      />
      <br />
      <br />
      <TextField
        className="text-field"
        label="Confirm new Password"
        type="password"
        variant="outlined"
        value={changePassInfo.newPasswordConfirmation}
        onChange={(e) => {
          changePassInfo = { ...changePassInfo, confirmNewPassword: e.target.value };
          dispatch({ type: AUTH_TYPES.CHANGE_CURRENT_PASSWORD, payload: changePassInfo });
        }}
        size="small"
      />
      <br />
      <br />
      <Button
        color="primary"
        variant="contained"
        type="submit"
        onClick={submitPassword}
      >
        ChangePassword
      </Button>
    </div>
  );
};

export default changePassword;
