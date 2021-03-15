import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import DatePicker from 'react-datepicker';
import { Button, Grid } from '@material-ui/core';
import Dropdown from '../common/Dropdown';

import 'react-datepicker/dist/react-datepicker.css';

import { SUB_TYPE } from '../../actions/substitution.actions';
import { formatDate } from '../utils';
import {
  createNewSub,
  setSubDate,
  getSubstitutions,
  generateSubstitutions,
  saveSubChart,
} from '../../actions/substitutionActions';
import { getAllTeachers } from '../../actions/teacherActions';
import Loader from '../common/Loader';

require('../../styles/Substitution.scss');

const SubstitutionManager = () => {
  const substitution = useSelector((state) => state.substitution);
  const auth = useSelector((state) => state.auth);
  const { user: { email } } = auth;
  const {
    date,
    _id,
    subChart,
    loading,
  } = substitution;
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllTeachers(email));
    dispatch(getSubstitutions(email, formatDate(date)));
  }, []);

  const teachers = useSelector((state) => state.teachers);
  const { teachersList } = teachers;

  const saveAbsentTeachers = (e) => {
    const data = {
      _id,
      date: formatDate(date),
      email,
      absentList: substitution.absentList,
      subChart: [],
    };
    dispatch(createNewSub(data));
    dispatch({ type: SUB_TYPE.SET_SUB_CHART, payload: [] });
  };

  const saveSubTable = (e) => {
    const data = {
      _id,
      date: formatDate(date),
      email,
      absentList: substitution.absentList,
      subChart: substitution.subChart,
    };
    dispatch(saveSubChart(data));
  };

  return (
    <div className="container">
      <div>
        <h1>Substitution Chart</h1>
        <div className="help-text">
          You can create a substitution chart on this page. Just select the absent teachers, save them and click on Generate Substitution chart.
        </div>
        <div className="date-style">
          <DatePicker
            selected={date}
            onChange={(e) => {
              dispatch(setSubDate(e));
              dispatch(getSubstitutions(email, formatDate(e)));
            }}
          />
        </div>
        <br />
        <Dropdown
          className="absent-teachers-dropdown"
          placeholder="Absent Teachers"
          isMulti
          isSearchable
          showAnimations
          options={(teachersList && teachersList.length > 0
          && teachersList.map((teacher) => ({ value: teacher._id, label: teacher.teacherName }))) || []}
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
          onClick={saveAbsentTeachers}
        >
          Save absent teachers
        </Button>
        <br />
        <br />
        <Button
          color="primary"
          variant="contained"
          type="submit"
          onClick={(e) => dispatch(generateSubstitutions(email, formatDate(date)))}
        >
          Generate substitution chart
        </Button>
        <br />
        <br />
        { loading === true && <Loader /> }
        <Grid
          container
          justify="center"
          alignItems="baseline"
          direction="row"
          spacing={0}
        >
          { subChart && subChart.length > 0
            && subChart.map((period, index) => (
              <Grid key={index} item>
                <div className="subtable-periods">
                  {index + 1}
                </div>
                <Grid
                  container
                  justify="center"
                  alignItems="baseline"
                  direction="column"
                >
                  { period && period.length > 0
                    && period.map((sub, subIndex) => (
                      <Grid key={subIndex} item>
                        <div className="subtable-periods-sub">
                          <p>{`Absent teacher\n${sub.absentTeacher}`}</p>
                          <p>{`Class ${sub.substitutionClass}`}</p>
                          <p>{`Sub Teacher\n${sub.teacher}`}</p>
                        </div>
                      </Grid>
                    ))}
                </Grid>
              </Grid>
            ))}
        </Grid>
        <br />
        {subChart && subChart.length > 0
          && (
            <Button
              color="secondary"
              variant="contained"
              type="submit"
              onClick={saveSubTable}
            >
              Save Substitution Chart
            </Button>
          )}
      </div>
    </div>
  );
};

export default SubstitutionManager;
