import React from 'react';
import { Button } from '@material-ui/core';
import { useSelector, useDispatch } from 'react-redux';

import CollapsibleSections from '../common/CollapsibleSections';
import Modal from '../common/Modal';
import { getSuggestionsForTimetable } from '../../actions/timetableActions';
import {
  PERIOD_NUMBER, DAYS_OF_WEEK, convertPeriodToDay, getPeriodOfDay,
} from '../utils';

const EditTimetableModal = ({ showEditTimetableModal, toggleModal, selectedEntityId }) => {
  const auth = useSelector((state) => state.auth);
  const timetables = useSelector((state) => state.timetables);
  const { numPeriods } = timetables;
  const {
    entityId, entityType, suggestions, suggestionsFound,
  } = timetables;
  const { user: { email } } = auth;
  const data = {
    email,
    entityId: entityId.value,
    entityType: entityType.value,
    selectedEntityId,
    numPeriods,
  };
  const dispatch = useDispatch();
  return (
    <Modal
      displayModal={showEditTimetableModal}
      closeModal={toggleModal}
      body={(
        <div>
          <CollapsibleSections title={`Edit Timetable for ${entityId.label}`} show>
            <p>
              Replacement for
              {' '}
              {selectedEntityId && selectedEntityId.label}
              {' '}
              on
              {' '}
              {PERIOD_NUMBER[selectedEntityId && selectedEntityId.entityNumber]}
              {', '}
              {DAYS_OF_WEEK[selectedEntityId && selectedEntityId.periodNumber - 1]}
            </p>
            <Button
              color="secondary"
              variant="contained"
              type="submit"
              onClick={() => dispatch(getSuggestionsForTimetable(data))}
            >
              Get Suggestions
            </Button>
            <br />
            {
              suggestions.length > 0 && suggestions.map((obj, id) => (
                <div id={id}>
                  <p>
                    Day -
                    &nbsp;
                    {convertPeriodToDay(obj.periodNumber, numPeriods)}
                    &nbsp;&nbsp;&nbsp;
                    Period Number -
                    &nbsp;
                    {getPeriodOfDay(obj.periodNumber, numPeriods)}
                  </p>
                  <p>
                    Teacher name -
                    &nbsp;
                    {obj.teacherName}
                  </p>
                  <p>
                    Class -
                    &nbsp;
                    {obj.className}
                  </p>
                  <br />
                </div>
              ))
            }
            <br />
            {
              suggestionsFound === false && (
                <div className="warning-text">
                  No Suggestions Found for this period.
                </div>
              )
            }
          </CollapsibleSections>
        </div>
      )}
    />
  );
};

module.exports = EditTimetableModal;
