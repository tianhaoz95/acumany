const initState = {
  edit: false,
  content: null,
};

export default function AdvisorCredential(state=initState, action) {
  switch (action.type) {
    case "UPDATE_ADVISOR_CREDENTIAL_EDIT": {
      return {
        ...state,
        edit: action.payload.val,
      };
    }

    case "UPDATE_ADVISOR_CREDENTIAL_CONTENT": {
      return {
        ...state,
        content: action.payload.val,
      };
    }

    default: return state;
  }
}
