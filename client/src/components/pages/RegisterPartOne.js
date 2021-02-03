import React from 'react';
import { Button, TextField } from '@material-ui/core';

import store from '../../store';
import { AUTH_TYPES } from '../../actions/auth.actions';
import { TIMETABLE_TYPES } from '../../actions/timetable.actions';

const handleSubmit = () => {
  store.dispatch({
    type: AUTH_TYPES.TOGGLE_REGISTER_FORM,
    payload: true,
  });
};

const RegisterPartOne = ({
  schoolName, numPeriods,
}) => (
  <div>
    <form onSubmit={() => handleSubmit()}>
      <div className="box">
        <div className="outline">
          <h2>  Enter School Details  </h2>
          <TextField
            className="text-field"
            label="Enter School Name"
            variant="outlined"
            value={schoolName}
            onChange={(e) => {
              store.dispatch({ type: AUTH_TYPES.SET_SCHOOL_NAME, payload: e.target.value });
            }}
            size="small"
          />
          <br />
          <br />
          <TextField
            className="text-field"
            label="Enter number of periods per day"
            variant="outlined"
            type="number"
            value={numPeriods}
            onChange={(e) => {
              store.dispatch({ type: TIMETABLE_TYPES.SET_NUM_PERIODS, payload: e.target.value });
            }}
            size="small"
          />
          <br />
          <br />
          <Button
            color="primary"
            variant="contained"
            type="submit"
            onClick={() => handleSubmit()}
          >
            Continue
          </Button>
        </div>
      </div>
    </form>
  </div>
);

export default RegisterPartOne;
