import { push } from 'react-router-redux';

export function checkAuthStatus() {
  return (dispatch, getState) => {
    var authStatus = getState().auth.auth;
    if (!authStatus) {
      dispatch(push("/"));
    }
  };
}

export function checkUserType(type) {
  return (dispatch, getState) => {
    var auth = getState().auth;
    var userType = auth.basicInfo.type;
    var authStatus = auth.auth;
    if (!authStatus) {
      dispatch(push("/"));
    } else {
      if (userType !== type) {
        dispatch(push("/"));
      }
    }
  };
}
