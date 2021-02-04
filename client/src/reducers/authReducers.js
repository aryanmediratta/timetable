import { AUTH_TYPES } from '../actions/auth.actions';

const initialLoginInfo = {
  email: '',
  password: '',
};

const initialRegisterInfo = {
  name: '',
  email: '',
  password: '',
  passwordConfirmation: '',
};

const initialState = {
  loginInfo: {
    ...initialLoginInfo,
  },
  registerInfo: {
    ...initialRegisterInfo,
  },
  showPopup: false,
  success: false,
  errorMessage: '',
  isAuthenticated: false,
  user: {},
  userName: '',
  schoolName: '',
  updatedRegisterView: false,
};

export default function authReducer(state = initialState, action) {
  switch (action.type) {
  // Set Login Data
  case AUTH_TYPES.SET_LOGIN_FIELD:
    return {
      ...state,
      loginInfo: {
        ...action.payload,
      },
    };

  // Set Register Data
  case AUTH_TYPES.SET_REGISTER_FIELD:
    return {
      ...state,
      registerInfo: {
        ...action.payload,
      },
    };

  // Handling Errors
  case AUTH_TYPES.TOGGLE_POPUP:
    if (action.payload === null) {
      return {
        ...state,
        showPopup: false,
        errorMessage: '',
        success: action.success,
      };
    }
    return {
      ...state,
      showPopup: true,
      errorMessage: action.payload,
      success: action.success,
    };

  // Successful Login
  case AUTH_TYPES.SET_CURRENT_USER:
    return {
      isAuthenticated: true,
      user: action.payload,
      loginInfo: { ...initialLoginInfo },
      registerInfo: { ...initialRegisterInfo },
    };

  // Set School Name
  case AUTH_TYPES.SET_SCHOOL_NAME:
    return {
      ...state,
      schoolName: action.payload,
    };

  // Toggle View
  case AUTH_TYPES.TOGGLE_REGISTER_FORM:
    return {
      ...state,
      updatedRegisterView: !state.updatedRegisterView,
    };

  // Successful Logout
  case AUTH_TYPES.UNSET_CURRENT_USER:
    return initialState;
  default:
    return state;
  }
}
