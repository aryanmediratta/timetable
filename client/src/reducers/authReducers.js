import { SET_CURRENT_USER, UNSET_CURRENT_USER } from "../actions/types";

const initialState = {
    isAuthenticated: false,
    user: {},
    loading: false
};

export default function(state = initialState, action) {
    switch (action.type) {
        case SET_CURRENT_USER:
        return {
            ...state,
            isAuthenticated: true,
            user: action.payload,
        };
        case UNSET_CURRENT_USER:
        return {
            ...state,
            isAuthenticated: false,
            user: {},
        };
        default:
        return state;
    }
};
