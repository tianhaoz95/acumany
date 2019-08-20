const initState = {
  status: "loading",
  currentTime: null,
  eventList: [],
  addEventStatus: "edit",
};

export default function AdvisorSchedule(state=initState, action) {
  switch (action.type) {
    case "UPDATE_ADVISOR_SCHEDULE_EVENT_LIST": {
      return {
        ...state,
        eventList: action.payload.val,
      };
    }

    case "UPDATE_ADVISOR_SCHEDULE_ADD_EVENT_STATUS": {
      return {
        ...state,
        addEventStatus: action.payload.val,
      };
    }

    case "UPDATE_ADVISOR_SCHEDULE_CURRENT_TIME": {
      return {
        ...state,
        currentTime: action.payload.val,
      };
    }

    case "UPDATE_ADVISOR_SCHEDULE_STATUS": {
      return {
        ...state,
        status: action.payload.val,
      };
    }

    default: return state;
  }
}
