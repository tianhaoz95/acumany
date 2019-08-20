const initState = {
  editName: false,
  editIntro: false,
  editTimezone: false,
  becomeAdvisorLoading: false,
  becomeAdvisorError: false,
  becomeAdvisorErrorMsg: "",
  uploadUsernameLoading: false,
  uploadUsernameError: false,
  uploadIntroductionLoading: false,
  uploadIntroductionError: false,
  uploadTimezoneLoading: false,
  uploadTimezoneError: false,
};

export default function BasicInfoField(state=initState, action) {
  switch (action.type) {
    case "UPDATE_EDIT_NAME": {
      return {
        ...state,
        editName: action.payload.val,
      };
    }

    case "UPDATE_UPLOAD_TIMEZONE_LOADING": {
      return {
        ...state,
        uploadTimezoneLoading: action.payload.val,
      };
    }

    case "UPDATE_UPLOAD_TIMEZONE_ERROR": {
      return {
        ...state,
        uploadTimezoneError: action.payload.val,
      };
    }

    case "UPDATE_UPLOAD_INTRODUCTION_LOADING": {
      return {
        ...state,
        uploadIntroductionLoading: action.payload.val,
      };
    }

    case "UPDATE_UPLOAD_INTRODUCTION_ERROR": {
      return {
        ...state,
        uploadIntroductionError: action.payload.val,
      };
    }

    case "UPDATE_UPLOAD_USER_NAME_LOADING": {
      return {
        ...state,
        uploadUsernameLoading: action.payload.val,
      };
    }

    case "UPDATE_UPLOAD_USER_NAME_ERROR": {
      return {
        ...state,
        uploadUsernameError: action.payload.val,
      };
    }

    case "UPDATE_EDIT_INTRO": {
      return {
        ...state,
        editIntro: action.payload.val,
      };
    }

    case "UPDATE_EDIT_TIMEZONE": {
      return {
        ...state,
        editTimezone: action.payload.val,
      };
    }

    case "UPDATE_BECOME_ADVISOR_LOADING": {
      return {
        ...state,
        becomeAdvisorLoading: action.payload.val,
      };
    }

    case "UPDATE_BECOME_ADVISOR_ERROR": {
      return {
        ...state,
        becomeAdvisorError: action.payload.val,
      };
    }

    case "UPDATE_BECOME_ADVISOR_ERROR_MSG": {
      return {
        ...state,
        becomeAdvisorErrorMsg: action.payload.val,
      };
    }

    default: return state;
  }
}
