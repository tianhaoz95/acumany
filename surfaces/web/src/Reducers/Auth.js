const initState = {
  auth: false,
  userInfo: null,
  basicInfo: null,
  advisorInfo: null,
  enterpriseInfo: null,
};

export default function Auth(state=initState, action) {
  switch (action.type) {
    case "UPDATE_AUTH": {
      return {
        ...state,
        auth: action.payload.auth,
      };
    }

    case "UPDATE_BASIC_INFO": {
      return {
        ...state,
        basicInfo: action.payload.basicInfo,
      };
    }

    case "UPDATE_ADVISOR_INFO": {
      return {
        ...state,
        advisorInfo: action.payload.advisorInfo,
      };
    }

    case "UPDATE_USER_INFO": {
      return {
        ...state,
        userInfo: action.payload.userInfo,
      };
    }

    default: return state;
  }
};
