import { SET_ALL_TEACHERS, ADD_NEW_TEACHER } from "../actions/types";

const initialState = {
    teachersList: [],
};

export default function(state = initialState, action) {
    switch (action.type) {
        case SET_ALL_TEACHERS:
            return {
                ...state,
                teachersList: action.payload,
            };
        case ADD_NEW_TEACHER:
            return {
                ...state,
                teachersList: [...state.teachersList, action.payload],
            };
        default:
            return state;
    }
};
