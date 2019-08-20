import { 
  uploadMyEventToSchedule, 
  retrieveMyScheduleByMonth, 
  removeEventFromMySchedule 
} from '../Components/Async/Schedule';

export function updateAdvisorScheduleStatus(val) {
  return {
    type: "UPDATE_ADVISOR_SCHEDULE_STATUS",
    payload: { val: val }
  };
}

export function updateAdvisorScheduleList(val) {
  return {
    type: "UPDATE_ADVISOR_SCHEDULE_EVENT_LIST",
    payload: { val: val }
  };
}

export function updateAdvisorScheduleCurrentTime(val) {
  return {
    type: "UPDATE_ADVISOR_SCHEDULE_CURRENT_TIME",
    payload: { val: val }
  };
}

export function updateAdvisorScheduleAddEventStatus(val) {
  return {
    type: "UPDATE_ADVISOR_SCHEDULE_ADD_EVENT_STATUS",
    payload: { val: val }
  };
}

export function addEvent(info) {
  return (dispatch, getState) => {
    dispatch(updateAdvisorScheduleAddEventStatus("loading"));
    var date = info.date;
    var time = info.time;
    var scheduleTime = date;
    scheduleTime.set("hour", time.get("hour"));
    scheduleTime.set("minute", time.get("minute"));
    var note = info.note;
    var event = {
      note: note,
      scheduleTime: scheduleTime,
    };
    uploadMyEventToSchedule(event)
    .then(() => {
      dispatch(updateAdvisorScheduleAddEventStatus("done"));
      var currentTime = getState().advisorSchedule.currentTime;
      dispatch(refreshMonthEventList(currentTime));
      setTimeout(function () {
        dispatch(updateAdvisorScheduleAddEventStatus("edit"));
      }, 1000);
    })
    .catch((err) => {
      dispatch(updateAdvisorScheduleAddEventStatus("error"));
    });
  };
}

export function refreshMonthEventList(date) {
  return (dispatch, getState) => {
    dispatch(updateAdvisorScheduleList([]));
    dispatch(updateAdvisorScheduleStatus("loading"));
    retrieveMyScheduleByMonth(date)
    .then((list) => {
      dispatch(updateAdvisorScheduleCurrentTime(date));
      dispatch(updateAdvisorScheduleList(list));
      dispatch(updateAdvisorScheduleStatus("ready"));
    })
    .catch((err) => {
      console.log("fuck", err);
      dispatch(updateAdvisorScheduleStatus("ready"));
    });
  };
}

export function deleteEventFromMySchedule(event) {
  return (dispatch, getState) => {
    var key = event.key;
    removeEventFromMySchedule(key)
    .then(() => {
      var currentTime = getState().advisorSchedule.currentTime;
      dispatch(refreshMonthEventList(currentTime));
    })
    .catch((err) => {
      console.log("fuck", err);
    });
  }
}
