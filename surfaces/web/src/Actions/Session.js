import {fetchMySessions, requestSessionAccess, uploadReview, markSessionAsReviewed} from '../Components/Async/Session';
import {push} from 'react-router-redux';

export function updateSignUpLoading(val) {
  return {
    type: "UPDATE_SIGN_UP_LOADING",
    payload: {val: val}
  };
}

export function updateSignUpError(val) {
  return {
    type: "UPDATE_SIGN_UP_ERROR",
    payload: {val: val}
  };
}

export function updateMySessions(val) {
  return {
    type: "UPDATE_MY_SESSIONS",
    payload: {val: val}
  };
}

export function updateCurrentSessionID(val) {
  return {
    type: "UPDATE_CURRENT_SESSION_ID",
    payload: {val: val}
  };
}


export function refreshMySessions() {
  return (dispatch, getState) => {
    fetchMySessions()
      .then((mySessions) => {
        dispatch(updateMySessions(mySessions));
      })
      .catch((err) => {
        dispatch(updateMySessions([]));
      })
  };
}

export function enterSession(sessionID) {
  return (dispatch, getState) => {
    requestSessionAccess(sessionID)
      .then(() => {
        dispatch(updateCurrentSessionID(sessionID));
        dispatch(push("/workspace/session"));
      })
      .catch((err) => {
        console.log("fuck", err);
      })
  };
}


export function reviewSession(reviewObj, sessionObj) {
  return (dispatch, getState) => {
    uploadReview(reviewObj)
      .then(function () {
        markSessionAsReviewed(sessionObj.sessionID)
          .then(function () {
            dispatch(refreshMySessions());
          })
          .catch(function (err) {
            console.log("fuck", err);
          });
      })
      .catch(function (err) {
        console.log("fuck", err);
      });
  };
}
