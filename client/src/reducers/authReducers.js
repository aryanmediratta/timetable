import { AUTH_TYPES } from '../actions/auth.types';

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

const initialForgotPassInfo = {
  email: '',
};

const initialResetPassInfo = {
  email: '',
  newPassword: '',
  confirmNewPassword: '',
};

const initialChangePassInfo = {
  password: '',
  newPassword: '',
  confirmNewPassword: '',
};

const initialState = {
  loginInfo: {
    ...initialLoginInfo,
  },
  registerInfo: {
    ...initialRegisterInfo,
  },
  changePassInfo: {
    ...initialChangePassInfo,
  },
  forgotPassInfo: {
    ...initialForgotPassInfo,
  },
  resetPassInfo: {
    ...initialResetPassInfo,
  },
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

  // Successful Login
  case AUTH_TYPES.SET_CURRENT_USER:
    return {
      ...state,
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

  case AUTH_TYPES.SET_USER_NAME:
    return {
      ...state,
      userName: action.payload,
    };

  // Toggle View
  case AUTH_TYPES.TOGGLE_REGISTER_FORM:
    return {
      ...state,
      updatedRegisterView: !state.updatedRegisterView,
    };

  // Change Password
  case AUTH_TYPES.CHANGE_CURRENT_PASSWORD:
    return {
      ...state,
      changePassInfo: {
        ...action.payload,
      },
    };

  // Forgot Password
  case AUTH_TYPES.FORGOT_PASSWORD:
    return {
      ...state,
      forgotPassInfo: {
        ...action.payload,
      },
    };

  // Reset Password
  case AUTH_TYPES.RESET_PASSWORD_EMAIL:
    return {
      ...state,
      resetPassInfo: {
        ...state,
        email: action.payload,
      },
    };

  case AUTH_TYPES.RESET_PASSWORD:
    return {
      ...state,
      resetPassInfo: {
        ...action.payload,
      },
    };

  // Successful Logout
  case AUTH_TYPES.UNSET_CURRENT_USER:
    return initialState;
  default:
    return state;
  }
}
