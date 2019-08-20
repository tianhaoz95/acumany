const initState = {
  siderCollapsed: true,
  sessionInProgress: false
};

export default function Workspace(state = initState, action) {
  switch (action.type) {
    case "UPDATE_SIDER_COLLAPSED": {
      return {
        ...state,
        siderCollapsed: action.payload.val,
      };
    }

    case "SESSION_IN_PROGRESS": {
      return {
        ...state,
        sessionInProgress: action.payload,
      };
    }

    default:
      return state;
  }
}
