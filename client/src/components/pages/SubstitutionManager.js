import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import DatePicker from 'react-datepicker';

import 'react-datepicker/dist/react-datepicker.css';

import { SUB_TYPE } from '../../actions/substitution.actions';
// import setSubDate from '../../actions/substitutionActions';

const SubstitutionManager = () => {
  const date = useSelector((state) => state.subDate);
  const dispatch = useDispatch();

  return (
    <div>
      <h1>Bello</h1>
      <DatePicker
        selected={date}
        onChange={(e) => dispatch({ type: SUB_TYPE.SET_DATE, payload: e })}
      />
    </div>

  );
};

export default SubstitutionManager;
