const initState = {
  edit: false,
  content: null,
  loading: false,
};

export default function AdvisorIntro(state=initState, action) {
  switch (action.type) {
    case "UPDATE_ADVISOR_INTRO_EDIT": {
      return {
        ...state,
        edit: action.payload.val,
      };
    }

    case "UPDATE_ADVISOR_INTRO_CONTENT": {
      return {
        ...state,
        content: action.payload.val,
      };
    }

    case "UPDATE_ADVISOR_INTRO_LOADING": {
      return {
        ...state,
        loading: action.payload.val,
      };
    }

    default: return state;
  }
}
