import { fetchPlans, verifyCard, createCustomer, subscribePlan, createBasicEnterprise, createEnterpriseInformation } from '../Components/Async/Business';
import { push } from 'react-router-redux';
import * as firebase from "firebase/app";
import "firebase/auth";
import { fetchBasicInformation } from '../Components/Async/AuthHelper';

export function nextStep() {
  return (dispatch, getState) => {
    var oldIndex = getState().business.currentIndex;
    var newIndex = oldIndex + 1;
    dispatch({
      type: "UPDATE_CURRENT_INDEX",
      payload: { val: newIndex }
    });
  };
}

export function prevStep() {
  return (dispatch, getState) => {
    var oldIndex = getState().business.currentIndex;
    var newIndex = oldIndex - 1;
    dispatch({
      type: "UPDATE_CURRENT_INDEX",
      payload: { val: newIndex }
    });
  };
}

export function updatePlans(val) {
  return {
    type: "UPDATE_PLANS",
    payload: { val: val }
  };
}

export function updatePlansLoading(val) {
  return {
    type: "UPDATE_PLANS_LOADING",
    payload: { val: val }
  };
}

export function fetchUpdatePlans() {
  return (dispatch, getState) => {
    dispatch(updatePlansLoading(true));
    fetchPlans()
    .then((snap) => {
      var data = snap.data;
      dispatch(updatePlans(data));
      dispatch(updatePlansLoading(false));
    })
    .catch((err) => {
      console.log("fuck", err);
    });
  };
}

export function updateSelectPlan(val) {
  return {
    type: "UPDATE_SELECTED_PLAN",
    payload: { val: val }
  };
}

export function updateVerifyCardStatus(val) {
  return {
    type: "UPDATE_VERIFY_CARD_STATUS",
    payload: { val: val }
  };
}

export function updateCardObj(val) {
  return {
    type: "UPDATE_CARD_OBJECT",
    payload: { val: val }
  };
}

export function updateBasicStatus(val) {
  return {
    type: "UPDATE_BASIC_STATUS",
    payload: { val: val }
  };
}

export function updateBasicObj(val) {
  return {
    type: "UPDATE_BASIC_OBJECT",
    payload: { val: val }
  };
}

export function updateCardInfo(val) {
  return {
    type: "UPDATE_CARD_INFO",
    payload: { val: val }
  };
}

export function updateSubmitLoading(val) {
  return {
    type: "UPDATE_SUBMIT_LOADING",
    payload: { val: val }
  };
}

export function updateSubmitError(val) {
  return {
    type: "UPDATE_SUBMIT_ERROR",
    payload: { val: val }
  };
}

export function setBasicObject(info) {
  return (dispatch, getState) => {
    if (info.password !== info.confirm) {
      dispatch(updateBasicStatus("passwordnotmatch"));
    } else {
      dispatch(updateBasicObj(info));
      dispatch(updateBasicStatus("none"));
      dispatch(nextStep());
    }
  };
}

export function verifyCreditCard(info) {
  return (dispatch, getState) => {
    dispatch(updateVerifyCardStatus("loading"));
    verifyCard(info)
    .then((snap) => {
      var data = snap.data;
      dispatch(updateCardObj(data));
      dispatch(updateVerifyCardStatus("verified"));
      dispatch(updateCardInfo(snap.info));
    })
    .catch((err) => {
      console.log(err);
      dispatch(updateVerifyCardStatus("error"));
    });
  };
}

export function createEnterpriseAccount() {
  return (dispatch, getState) => {
    dispatch(updateSubmitLoading(true));
    var info = getState().business.basicObj;
    createBasicEnterprise(info)
    .then(() => {
      var cardObj = getState().business.cardInfo;
      createCustomer(cardObj)
      .then(() => {
        subscribePlan(getState().business.selectedPlan.id)
        .then(() => {
          createEnterpriseInformation(info)
          .then(() => {
            fetchBasicInformation()
            .then((snap) => {
              dispatch({
                type: "UPDATE_BASIC_INFO",
                payload: { basicInfo: snap.data }
              });
              dispatch({
                type: "UPDATE_USER_INFO",
                payload: { userInfo: firebase.auth().currentUser }
              });
              dispatch({
                type: "UPDATE_AUTH",
                payload: { auth: true }
              });
              dispatch(updateSubmitLoading(false));
              dispatch(updateSubmitError(false));
              dispatch(push("/"));
            });
          });
        });
      });
    })
    .catch((err) => {
      dispatch(updateSubmitLoading(false));
      dispatch(updateSubmitError(true));
      console.log("fuck", err);
    });
  };
}
