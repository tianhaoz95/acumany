import * as firebase from "firebase/app";
import "firebase/auth";
import { ReFetchBasicInfo, UpdateUserInfo, initializeAdvisorIntroduction } from './Auth';
import { fetchAdvisorInformation, fetchBasicInformation, updateBasicInformation, updateUserInfo, uploadRichText } from '../Components/Async/AuthHelper';
import { updateAllMySkillsInAlgolia, updateAllMySkillsInDatabase } from '../Components/Async/Skill';
import { uploadFile } from '../Components/Async/FileUploader';

export function updateUploadTimezoneLoading(val) {
  return {
    type: "UPDATE_UPLOAD_TIMEZONE_LOADING",
    payload: { val: val }
  };
}

export function updateUploadTimezoneError(val) {
  return {
    type: "UPDATE_UPLOAD_TIMEZONE_ERROR",
    payload: { val: val }
  };
}

export function updateUploadIntroductionLoading(val) {
  return {
    type: "UPDATE_UPLOAD_INTRODUCTION_LOADING",
    payload: { val: val }
  };
}

export function updateUploadIntroductionError(val) {
  return {
    type: "UPDATE_UPLOAD_INTRODUCTION_ERROR",
    payload: { val: val }
  };
}

export function updateUploadUsernameError(val) {
  return {
    type: "UPDATE_UPLOAD_USER_NAME_ERROR",
    payload: { val: val }
  };
}

export function updateUploadUsernameLoading(val) {
  return {
    type: "UPDATE_UPLOAD_USER_NAME_LOADING",
    payload: { val: val }
  };
}

export function updateEditAdvisorIntro(val) {
  return {
    type: "UPDATE_ADVISOR_INTRO_EDIT",
    payload: { val: val }
  };
}

export function updateAdvisorIntroContent(val) {
  return {
    type: "UPDATE_ADVISOR_INTRO_CONTENT",
    payload: { val: val }
  };
}

export function updateEditAdvisorCredential(val) {
  return {
    type: "UPDATE_ADVISOR_CREDENTIAL_EDIT",
    payload: { val: val }
  };
}

export function updateAdvisorCredentialContent(val) {
  return {
    type: "UPDATE_ADVISOR_CREDENTIAL_CONTENT",
    payload: { val: val }
  };
}

export function updateEditAvatar(val) {
  return {
    type: "UPDATE_AVATAR_EDIT",
    payload: { val: val }
  };
}

export function updateAvatarFile(file) {
  return {
    type: "UPDATE_AVATAR_FILE",
    payload: { file: file }
  };
}

export function updateAvatarLoading(val) {
  return {
    type: "UPDATE_AVATAR_LOADING",
    payload: { val: val }
  };
}

export function updateEditName(val) {
  return {
    type: "UPDATE_EDIT_NAME",
    payload: { val: val }
  };
}

export function updateEditIntro(val) {
  return {
    type: "UPDATE_EDIT_INTRO",
    payload: { val: val }
  };
}

export function updateEditTimezone(val) {
  return {
    type: "UPDATE_EDIT_TIMEZONE",
    payload: { val: val }
  };
}

export function updateAdvisorIntroLoading(val) {
  return {
    type: "UPDATE_ADVISOR_INTRO_LOADING",
    payload: { val: val }
  };
}

export function updateAdvisorCredentialLoading(val) {
  return {
    type: "UPDATE_ADVISOR_CREDENTIAL_LOADING",
    payload: { val: val }
  };
}

export function uploadAvatar() {
  return (dispatch, getState) => {
    dispatch(updateAvatarLoading(true));
    var state = getState();
    var avatarObj = state.avatar;
    var file = avatarObj.file;
    var userType = state.auth.basicInfo.type;
    if (file === null) {
      dispatch(updateAvatarLoading(false));
      return;
    } else {
      var uid = state.auth.userInfo.uid;
      var name = state.auth.userInfo.displayName;
      var path = "/UserFiles/" + uid + "/Avatar/Avatar.jpg";
      uploadFile(path, file)
      .then((snap) => {
        var url = snap.data;
        var promiseList = userType === "advisor" ? [
          updateUserInfo(name, url),
          updateBasicInformation({ photo: url }),
          updateAllMySkillsInAlgolia("photo", url),
          updateAllMySkillsInDatabase("photo", url)
        ] : [
          updateUserInfo(name, url),
          updateBasicInformation({ photo: url })
        ]
        Promise.all(promiseList)
        .then(() => {
          fetchBasicInformation()
          .then((basicSnap) => {
            dispatch({
              type: "UPDATE_BASIC_INFO",
              payload: { basicInfo: basicSnap.data }
            });
            dispatch(updateAvatarLoading(false));
            dispatch(updateEditAvatar(false));
          })
          .catch(function (err) {
            console.log(err);
            dispatch(updateAvatarLoading(false));
          });
        })
        .catch((err) => {
          console.log(err);
          dispatch(updateAvatarLoading(false));
        });
      })
      .catch(function (err) {
        console.log(err);
        dispatch(updateAvatarLoading(false));
      })
    }
  };
}

export function uploadAdvisorIntroduction() {
  return (dispatch, getState) => {
    dispatch(updateAdvisorIntroLoading(true));
    var state = getState();
    var uid = state.auth.userInfo.uid;
    var text = state.advisorIntro.content;
    var path = "/AdvisorInformation/" + uid;
    var field = "introduction";
    uploadRichText(path, field, text)
    .then(() => {
      fetchAdvisorInformation()
      .then((advisorSnap) => {
        var advisorData = advisorSnap.data;
        if (advisorData === null) {
          console.log("fuck, advisor data is empty");
        } else {
          dispatch({
            type: "UPDATE_ADVISOR_INFO",
            payload: { advisorInfo: advisorData }
          });
          dispatch(initializeAdvisorIntroduction());
          dispatch(updateAdvisorIntroLoading(false));
          dispatch(updateEditAdvisorIntro(false));
        }
      })
      .catch((err) => {
        console.log("fuck", err);
      });
    })
    .catch((err) => {
      console.log("fuck", err);
    });
  };
}

export function uploadAdvisorCredential() {
  return (dispatch, getState) => {
    dispatch(updateAdvisorIntroLoading(true));
    var state = getState();
    var uid = state.auth.userInfo.uid;
    var text = state.advisorCredential.content;
    var path = "/AdvisorInformation/" + uid;
    var field = "credential";
    uploadRichText(path, field, text)
    .then(() => {
      fetchAdvisorInformation()
      .then((advisorSnap) => {
        var advisorData = advisorSnap.data;
        if (advisorData === null) {
          console.log("fuck, advisor data is empty");
        } else {
          dispatch({
            type: "UPDATE_ADVISOR_INFO",
            payload: { advisorInfo: advisorData }
          });
          dispatch(initializeAdvisorIntroduction());
          dispatch(updateAdvisorCredentialLoading(false));
          dispatch(updateEditAdvisorCredential(false));
        }
      })
      .catch((err) => {
        console.log("fuck", err);
      });
    })
    .catch((err) => {
      console.log("fuck", err);
    });
  };
}

export function updateProfileSkillList() {
  return (dispatch, getState) => {
    const skillListObj = getState().auth.advisorInfo.skill;
    if (skillListObj !== undefined) {
      const newList = Object.values(skillListObj);
      dispatch({
        type: "UPDATE_PROFILE_SKILL_LIST",
        payload: { list: newList }
      });
    } else {
      dispatch({
        type: "UPDATE_PROFILE_SKILL_LIST",
        payload: { list: [] }
      });
    }
  };
}

export function refreshProfileSkillList() {
  return (dispatch, getState) => {
    fetchAdvisorInformation()
    .then((snap) => {
      dispatch({
        type: "UPDATE_ADVISOR_INFO",
        payload: { advisorInfo: snap.data }
      });
      dispatch(updateProfileSkillList());
    })
    .catch((err) => {
      console.log("fuck", err);
    });
  };
}

export function updateUsername(newUserName) {
  return (dispatch, getState) => {
    dispatch(updateUploadUsernameLoading(true));
    const photoURL = firebase.auth().currentUser.photoURL;
    const userType = getState().auth.basicInfo.type;
    const promiseList = userType === "advisor" ? [
      updateUserInfo(newUserName, photoURL),
      updateBasicInformation({ name: newUserName }),
      updateAllMySkillsInAlgolia("name", newUserName),
      updateAllMySkillsInDatabase("name", newUserName)
    ] : [
      updateUserInfo(newUserName, photoURL),
      updateBasicInformation({ name: newUserName })
    ];
    Promise.all(promiseList)
    .then(() => {
      dispatch(ReFetchBasicInfo())
      dispatch(UpdateUserInfo());
      dispatch(updateUploadUsernameLoading(false));
      dispatch(updateUploadUsernameError(false));
      dispatch(updateEditName(false));
    })
    .catch((err) => {
      console.log("fuck", err);
      dispatch(updateUploadUsernameLoading(false));
      dispatch(updateUploadUsernameError(true));
    });
  };
}

export function updateIntroduction(newIntroduction) {
  return (dispatch, getState) => {
    dispatch(updateUploadIntroductionLoading(true));
    updateBasicInformation({ introduction: newIntroduction })
    .then(() => {
      dispatch(ReFetchBasicInfo())
      dispatch(updateUploadIntroductionLoading(false));
      dispatch(updateUploadIntroductionError(false));
      dispatch(updateEditIntro(false));
    })
    .catch((err) => {
      console.log("fuck", err);
      dispatch(updateUploadIntroductionLoading(false));
      dispatch(updateUploadIntroductionError(true));
    });
  };
}

export function updateTimezone(newTimezone) {
  return (dispatch, getState) => {
    dispatch(updateUploadTimezoneLoading(true));
    updateBasicInformation({ timezone: newTimezone })
    .then(() => {
      dispatch(ReFetchBasicInfo());
      dispatch(updateUploadTimezoneLoading(false));
      dispatch(updateUploadTimezoneError(false));
      dispatch(updateEditTimezone(false));
    })
    .catch((err) => {
      console.log("fuck", err);
      dispatch(updateUploadTimezoneLoading(false));
      dispatch(updateUploadTimezoneError(true));
    });
  };
}
