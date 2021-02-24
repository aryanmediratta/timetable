import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import DatePicker from 'react-datepicker';
import { Button } from '@material-ui/core';
import Dropdown from '../common/Dropdown';

import 'react-datepicker/dist/react-datepicker.css';

import { SUB_TYPE } from '../../actions/substitution.actions';
import { formatDate } from '../utils';
import {
  createNewSub,
  setSubDate,
  getSubstitutions,
  generateSubstitutions,
} from '../../actions/substitutionActions';
import { getAllTeachers } from '../../actions/teacherActions';

const SubstitutionManager = () => {
  const substitution = useSelector((state) => state.substitution);
  const auth = useSelector((state) => state.auth);
  const { user: { email } } = auth;
  const { date, _id } = substitution;
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllTeachers(email));
    dispatch(getSubstitutions(email, formatDate(date)));
  }, []);

  const teachers = useSelector((state) => state.teachers);
  const { teachersList } = teachers;

  const handleClick = (e) => {
    const data = {
      _id,
      date: formatDate(date),
      email,
      absentList: substitution.absentList,
    };
    dispatch(createNewSub(data));
  };

  // const generateSub = (e) => {

  // };

  return (
    <div>
      <div>
        <h1>Bello</h1>
        <DatePicker
          selected={date}
          onChange={(e) => {
            dispatch(setSubDate(e));
            dispatch(getSubstitutions(email, formatDate(e)));
            // console.log(substitution.absentList);
          }}
        />
        <br />
        <br />
        <Dropdown
          className="absent-teachers-dropdown"
          isMulti
          isSearchable
          showAnimations
          options={teachersList && teachersList.length > 0
          && teachersList.map((teacher) => ({ value: teacher._id, label: teacher.teacherName }))}
          value={substitution.absentList && substitution.absentList.length > 0
          && substitution.absentList.map((teacher) => ({ value: teacher._id, label: teacher.label }))}
          onChange={(_option, action) => {
            let selectedOption = {};
            if (action.action === 'select-option') {
              selectedOption = action.option;
              selectedOption = { ...selectedOption, _id: selectedOption.value };
              delete selectedOption.value;
              let { absentList } = substitution;
              absentList = absentList.concat(selectedOption);
              substitution.absentList = absentList;
            } else if (action.action === 'remove-value') {
              substitution.absentList = substitution.absentList.filter((item) => item._id !== action.removedValue.value);
            }
            dispatch({ type: SUB_TYPE.SET_ABSENT_LIST, payload: substitution.absentList });
          }}
        />
        <br />
        <br />
        <Button
          color="primary"
          variant="contained"
          type="submit"
          onClick={handleClick}
        >
          Save Date
        </Button>
        <br />
        <br />
        <Button
          color="primary"
          variant="contained"
          type="submit"
          onClick={(e) => dispatch(generateSubstitutions(email, formatDate(date)))}
        >
          Generate Sub Chart
        </Button>
      </div>
    </div>
  );
};

export default SubstitutionManager;
