const initState = {
  mySessions: [],
  signUpLoading: false,
  signUpError: false,
  currentSessionID: null,
};

export default function Session(state=initState, action) {
  switch (action.type) {
    case "UPDATE_SIGN_UP_LOADING": {
      return {
        ...state,
        signUpLoading: action.payload.val,
      };
    }

    case "UPDATE_CURRENT_SESSION_ID": {
      return {
        ...state,
        currentSessionID: action.payload.val,
      };
    }

    case "UPDATE_SIGN_UP_ERROR": {
      return {
        ...state,
        signUpError: action.payload.val,
      };
    }

    case "UPDATE_MY_SESSIONS": {
      return {
        ...state,
        mySessions: action.payload.val,
      };
    }

    default: return state;
  }
}
