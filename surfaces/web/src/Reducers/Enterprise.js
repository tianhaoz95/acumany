const initState = {
  info: null,
  status: "loading",
  memberList: [],
  memberStatus: "loading",
};

export default function Enterprise(state=initState, action) {
  switch (action.type) {
    case "UPDATE_ENTERPRISE_INFO": {
      return {
        ...state,
        info: action.payload.val,
      };
    }

    case "UPDATE_ENTERPRISE_MEMBER_STATUS": {
      return {
        ...state,
        memberStatus: action.payload.val,
      };
    }

    case "UPDATE_ENTERPRISE_STATUS": {
      return {
        ...state,
        status: action.payload.val,
      };
    }

    case "UPDATE_ENTERPRISE_MEMBER_LIST": {
      return {
        ...state,
        memberList: action.payload.val,
      };
    }

    default: return state;
  }
}
