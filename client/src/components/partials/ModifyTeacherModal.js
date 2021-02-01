import React from 'react';
import { Button, TextField } from '@material-ui/core';
import { useSelector, useDispatch } from 'react-redux';

import Dropdown from '../common/Dropdown';
import CollapsibleSections from '../common/CollapsibleSections';
import Modal from '../common/Modal';
import FullWidthGrid from '../common/TwoComponentGridSystem';
import { TEACHER_TYPES } from '../../actions/teacher.actions';
import { addNewTeacher } from '../../actions/teacherActions';

const modalBody = (teacherData, allClassesList) => {
  const auth = useSelector((state) => state.auth);
  const { user: { email } } = auth;
  const dispatch = useDispatch();
  return (
    <div>
      <CollapsibleSections title={teacherData.name || 'Teacher'} show>
        <div>
          <TextField
            className="text-field"
            label="Enter Teacher Name"
            variant="outlined"
            value={teacherData.name || ''}
            onChange={(element) => {
              teacherData = { ...teacherData, name: element.target.value };
              dispatch({ type: TEACHER_TYPES.SET_FIELD_DATA, payload: teacherData });
            }}
            size="small"
          />
        </div>
        <br />
        <div>
          <TextField
            className="text-field"
            label="Enter Subject Taught"
            variant="outlined"
            value={teacherData.subject || ''}
            onChange={(element) => {
              teacherData = { ...teacherData, subject: element.target.value };
              dispatch({ type: TEACHER_TYPES.SET_FIELD_DATA, payload: teacherData });
            }}
            size="small"
          />
        </div>
        <br />
        <FullWidthGrid
          componentOneSize={3}
          componentTwoSize={9}
          spacing={2}
          componentOne={(<span>Classes taught by teacher</span>)}
          componentTwo={(
            <Dropdown
              className="classes-dropdown"
              isMulti
              isSearchable
              showAnimations
              options={allClassesList && allClassesList.length > 0
                && allClassesList.map((myClass) => ({ value: myClass._id, label: myClass.label }))}
              value={teacherData.classesList && teacherData.classesList.length > 0
                && teacherData.classesList.map((myClass) => ({ value: myClass._id, label: myClass.label }))}
              onChange={(_option, action) => {
                let selectedOption = {};
                if (action.action === 'select-option') {
                  selectedOption = action.option;
                  selectedOption = { ...selectedOption, _id: selectedOption.value, periodsPerWeek: 0 };
                  delete selectedOption.value;
                  let { classesList } = teacherData;
                  classesList = classesList.concat(selectedOption);
                  teacherData.classesList = classesList;
                } else if (action.action === 'remove-value') {
                  teacherData.classesList = teacherData.classesList.filter((item) => item._id !== action.removedValue.value);
                }
                dispatch({ type: TEACHER_TYPES.SET_FIELD_DATA, payload: teacherData });
              }}
            />
          )}
        />
        {teacherData.classesList && teacherData.classesList.length > 0 && teacherData.classesList.map((teacher, index) => (
          <div>
            <br />
            <TextField
              className="text-field"
              label={`Enter periods per week for ${teacher.label}`}
              type="number"
              variant="outlined"
              value={teacher.periodsPerWeek || ''}
              onChange={(element) => {
                const { classesList } = teacherData;
                classesList[index] = { ...classesList[index], periodsPerWeek: element.target.value };
                dispatch({ type: TEACHER_TYPES.SET_FIELD_DATA, payload: teacherData });
              }}
              size="small"
            />
          </div>
        ))}
        <br />
        <br />
        <Button
          color="primary"
          variant="contained"
          type="submit"
          onClick={(e) => {
            e.preventDefault();
            const data = {
              newTeacher: teacherData,
              email,
            };
            dispatch(addNewTeacher(data));
          }}
        >
          Save
        </Button>
      </CollapsibleSections>
    </div>
  );
};

const ModifyTeacherModal = ({
  showModal, toggleModal, teacherData, classesList,
}) => (
  <Modal
    displayModal={showModal}
    closeModal={toggleModal}
    body={modalBody(teacherData, classesList)}
  />
);

module.exports = ModifyTeacherModal;
