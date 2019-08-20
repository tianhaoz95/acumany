const initState = {
  openLogin: false,
  openSignUp: false,
  signUpLoading: false,
  signUpError: false,
  loginLoading: false,
  loginError: false,
};

export default function Header(state=initState, action) {
  switch (action.type) {
    case "UPDATE_LOGIN_POPOVER": {
      return {
        ...state,
        openLogin: action.payload.val,
      };
    }

    case "UPDATE_SIGNUP_ERROR": {
      return {
        ...state,
        signUpError: action.payload.val,
      };
    }

    case "UPDATE_SIGNUP_POPOVER": {
      return {
        ...state,
        openSignUp: action.payload.val,
        signUpError: null
      };
    }

    case "UPDATE_LOGIN_ERROR": {
      return {
        ...state,
        loginError: action.payload.val,
      };
    }

    case "UPDATE_SIGNUP_LOADING": {
      return {
        ...state,
        signUpLoading: action.payload.val,
      };
    }

    // promise-middleware generated action
    case "EMAIL_SIGNUP_PENDING": {
      return {
        ...state,
        signUpLoading: true,
        signUpError: null
      };
    }

    // promise-middleware generated action
    case "EMAIL_SIGNUP_REJECTED": {
      return {
        ...state,
        signUpLoading: false,
      };
    }

    case "UPDATE_LOGIN_LOADING": {
      return {
        ...state,
        loginLoading: action.payload.val,
      };
    }

    default: return state;
  }
}
