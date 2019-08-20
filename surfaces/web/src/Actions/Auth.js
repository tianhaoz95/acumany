import * as firebase from "firebase/app";
import "firebase/auth";

import {
  createInitial,
  fetchAdvisorInformation,
  fetchBasicInformation,
  switchToAdvisor,
  updateBasicInformation
} from '../Components/Async/AuthHelper';
import {
  updateLoginError,
  updateLoginLoading,
  updateLoginPopover,
  updateSignUpError,
  updateSignUpLoading,
  updateSignUpPopover
} from './Header';

import {Raw} from 'slate';
import {addAdvisorToStatistics} from "../Components/Async/Statistics";
import {persistor} from '../Reducers';
import {push} from 'react-router-redux';
import storejs from 'store';
import {updateProfileSkillList} from './Profile';

export function UpdateBasicInfo(val) {
  return {
    type: "UPDATE_BASIC_INFO",
    payload: { basicInfo: val }
  };
}

export function UpdateUserInfo() {
  return {
    type: "UPDATE_USER_INFO",
    payload: { userInfo: firebase.auth().currentUser }
  };
}

export function UpdateAuth(val) {
  return {
    type: "UPDATE_AUTH",
    payload: { auth: val }
  };
}

export function UpdateAdvisorInfo(val) {
  return {
    type: "UPDATE_ADVISOR_INFO",
    payload: { advisorInfo: val }
  };
}

export function UpdateBecomeAdvisorError(val) {
  return {
    type: "UPDATE_BECOME_ADVISOR_ERROR",
    payload: { val: val }
  };
}

export function UpdateBecomeAdvisorLoading(val) {
  return {
    type: "UPDATE_BECOME_ADVISOR_LOADING",
    payload: { val: val }
  };
}

export function UpdateBecomeAdvisorErrorMessage(val) {
  return {
    type: "UPDATE_BECOME_ADVISOR_ERROR_MSG",
    payload: { val: val }
  };
}

export function InitCloudMsgToken(token) {
  return (dispatch, getState) => {
    updateBasicInformation({ cloudMsgToken: token })
    .then(() => {
      fetchBasicInformation()
      .then((snap) => {
        dispatch(UpdateBasicInfo(snap.data));
      })
    })
    .catch((err) => {
      console.log("fuck", err);
    });
  };
}

export function refreshAdvisorInfo() {
  return (dispatch, getState) => {
    fetchAdvisorInformation()
    .then(function (snap) {
      console.log("refreshing =>", snap.data);
      dispatch(UpdateAdvisorInfo(snap.data));
      dispatch(updateProfileSkillList());
    })
    .catch(function (err) {
      console.log("fuck", err);
    });
  };
}

export function ReFetchBasicInfo() {
  return (dispatch, getState) => {
    fetchBasicInformation()
    .then((snap) => {
      dispatch(UpdateBasicInfo(snap.data));
    })
    .catch((err) => {
      console.log("fuck", err);
    });
  };
}

// 2018-03-21: refactor promise chain
//
export function EmailSignUp(email, password, name) {
  /* This async action is for email sign up with following steps
  * 1. Update loading screen status (Sync)
  * 2. Create new user name with in firebase (Async)
  *   - then get user info and send email verification
  *   - then update user profile and user database
  *   - then retrieve user info from database
  *   - then update all states
  * */
  return (dispatch) => {
    dispatch(updateSignUpLoading(true));
    dispatch({
      type: "EMAIL_SIGNUP",
      payload: firebase.auth().createUserWithEmailAndPassword(email, password)
    })
    .then(() => {
      let user = firebase.auth().currentUser;
      user.sendEmailVerification()
    })
    .then(() => {
      createInitial(name, "user")
    })
    .then(() => {
      fetchBasicInformation()
    })
    .then((snap) => {
      dispatch(UpdateBasicInfo(snap.data));
      dispatch(UpdateUserInfo());
      dispatch(UpdateAuth(true));
      dispatch(updateSignUpLoading(false));
      dispatch(updateSignUpError(null));
      dispatch(updateSignUpPopover(false));
      dispatch(push('/workspace/advisorprofile'))
    })
    .catch((err) => {
      dispatch(updateSignUpError(err.message));
      dispatch(updateSignUpLoading(false));
    });
  };
}

export function EmailLogin(email, password, remember) {
  return (dispatch) => {
    dispatch(updateLoginLoading(true));
    dispatch({
      type: "EMAIL_LOGIN",
      payload: firebase.auth().signInWithEmailAndPassword(email, password)
    })
    .then(() => {
      dispatch({
        type: "UPDATE_USER_INFO",
        payload: firebase.auth().currentUser,
      });
      fetchBasicInformation()
      .then((snap) => {
        if (remember) {
          storejs.set('auth', {
            remember: true,
            email: email,
            password: password,
          });
        } else {
          storejs.set('auth', {
            remember: false,
            email: "unknown",
            password: "unknown",
          });
        }
        dispatch(UpdateBasicInfo(snap.data));
        dispatch(UpdateAuth(true));
        dispatch(UpdateUserInfo());
        dispatch(updateLoginLoading(false));
        dispatch(updateLoginError(false));
        dispatch(updateLoginPopover(false));
        dispatch(push("/workspace/advisorprofile"));
      })
    })
    .catch((err) => {
      console.log("fuck, cannot login", err);
      dispatch(updateLoginLoading(false));
      dispatch(updateLoginError(true));
    });
  };
}

export function initializeAdvisorIntroduction() {
  return (dispatch, getState) => {
    var advisorInfo = getState().auth.advisorInfo;
    var introduction = advisorInfo.introduction;
    var credential = advisorInfo.credential;
    console.log(introduction);
    console.log(Raw.deserialize(introduction, { terse: true }));
    dispatch({
      type: "UPDATE_ADVISOR_INTRO_CONTENT",
      payload: { val: Raw.deserialize(introduction, { terse: true }) }
    });
    dispatch({
      type: "UPDATE_ADVISOR_CREDENTIAL_CONTENT",
      payload: { val: Raw.deserialize(credential, { terse: true }) }
    });
  };
}

export function Logout() {
  return (dispatch) => {
    dispatch({
      type: "LOGOUT",
      payload: firebase.auth().signOut()
    })
    .then(() => {
      persistor.purge()
      .then(() => {
        console.log("purged");
        dispatch(push("/"));
        window.location.reload();
      });
    })
    .catch((err) => {
      console.log("fuck, cannot logout => ", err);
    });
  }
}

export function SwitchToAdvisor() {
  return (dispatch) => {
    addAdvisorToStatistics();
    dispatch({
      type: "UPDATE_BECOME_ADVISOR_LOADING",
      payload: { val: true }
    });
    switchToAdvisor()
    .then(() => {
      fetchBasicInformation()
      .then((snap) => {
        dispatch(UpdateBasicInfo(snap.data));
        dispatch(UpdateBecomeAdvisorError(false));
        dispatch(UpdateBecomeAdvisorLoading(false));
        dispatch(push("/workspace/advisorprofile"));
      })
      .catch((err) => {
        dispatch(UpdateBecomeAdvisorError(true));
        dispatch(UpdateBecomeAdvisorErrorMessage(err.description));
        dispatch(UpdateBecomeAdvisorLoading(false));
      });
    })
    .catch((err) => {
      dispatch(UpdateBecomeAdvisorError(true));
      dispatch(UpdateBecomeAdvisorErrorMessage(err.description));
      dispatch(UpdateBecomeAdvisorLoading(false));
    });
  };
}
