import React from 'react';
import { Button, TextField } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';

import { toggleRegisterForm, setSchoolName } from '../../actions/authActions';
import { setNumPeriods } from '../../actions/timetableActions';

const RegisterPartOne = ({ auth }) => {
  const dispatch = useDispatch();
  const { schoolName } = auth;
  const timetables = useSelector((state) => state.timetables);
  const { numPeriods } = timetables;
  return (
    <div>
      <form onSubmit={() => dispatch(toggleRegisterForm())}>
        <div className="box">
          <div className="outline">
            <h2>  Enter School Details  </h2>
            <TextField
              className="text-field"
              label="Enter School Name"
              variant="outlined"
              value={schoolName}
              onChange={(e) => dispatch(setSchoolName(e.target.value))}
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
              onChange={(e) => dispatch(setNumPeriods(e.target.value))}
              size="small"
            />
            <br />
            <br />
            <Button
              color="primary"
              variant="contained"
              type="submit"
              onClick={() => dispatch(toggleRegisterForm())}
            >
              Continue
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
};
export default RegisterPartOne;
