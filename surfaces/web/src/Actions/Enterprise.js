import { fetchMyEnterpriseInfo, uploadMyHomepage, fetchAllMemberInfo, addMember } from '../Components/Async/Enterprise';
import { push } from 'react-router-redux';
import * as firebase from "firebase/app";
import "firebase/auth";

export function updateEnterpriseInfo(val) {
  return {
    type: "UPDATE_ENTERPRISE_INFO",
    payload: { val: val },
  };
}

export function updateEnterpriseInfoLoading(val) {
  return {
    type: "UPDATE_ENTERPRISE_STATUS",
    payload: { val: val },
  };
}

export function updateEnterpriseMemberList(val) {
  return {
    type: "UPDATE_ENTERPRISE_MEMBER_LIST",
    payload: { val: val },
  };
}

export function updateEnterpriseMemberStatus(val) {
  return {
    type: "UPDATE_ENTERPRISE_MEMBER_STATUS",
    payload: { val: val },
  };
}

export function refreshEnterpriseInfo() {
  return (dispatch, getState) => {
    dispatch(updateEnterpriseInfoLoading("loading"));
    fetchMyEnterpriseInfo()
    .then(function (info) {
      dispatch(updateEnterpriseInfo(info));
      dispatch(updateEnterpriseInfoLoading("ready"));
      dispatch(refreshMemberList());
    })
    .catch(function (err) {
      console.log("fuck", err);
      dispatch(updateEnterpriseInfoLoading("error"));
    });
  };
}

export function refreshMemberList() {
  return (dispatch, getState) => {
    dispatch(updateEnterpriseMemberStatus("loading"));
    var member = getState().enterprise.info.member;
    fetchAllMemberInfo(member)
    .then(function (list) {
      dispatch(updateEnterpriseMemberList(list));
      dispatch(updateEnterpriseMemberStatus("ready"));
    })
    .catch(function (err) {
      dispatch(updateEnterpriseMemberList([]));
      dispatch(updateEnterpriseMemberStatus("error"));
    });
  };
}

export function addMemberToMyEnterprise(email) {
  return (dispatch, getState) => {
    addMember(email)
    .then(function () {
      dispatch(refreshEnterpriseInfo());
    })
    .catch(function (err) {
      console.log("fuck", err);
    });
  };
}

export function saveMyHomepage(content) {
  return (dispatch, getState) => {
    uploadMyHomepage(content)
    .then(function () {
      dispatch(refreshEnterpriseInfo());
    })
    .catch(function (err) {
      console.log("fuck", err);
    });
  };
}

export function previewHomepage() {
  return (dispatch, getState) => {
    var uid = firebase.auth().currentUser.uid;
    var dest = "/enterprise/" + uid;
    dispatch(push(dest));
  };
}
