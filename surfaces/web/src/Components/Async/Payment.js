import { RetrieveCustomerAPI, DeleteCustomerAPI, StripeAccountRetrivalAPI, ConnectStripeRedirectAPI } from '../../Utilities/Params';
import axios from 'axios';
import * as firebase from "firebase/app";
import "firebase/auth";

export function retrieveCustomerInformation() {
  return new Promise((resolve, reject) => {
    var uid = firebase.auth().currentUser.uid;
    axios.get(RetrieveCustomerAPI, { params: { uid: uid } })
    .then((snap) => {
      var response = snap.data;
      if (response.type === "fail") {
        reject({
          type: "fail",
          description: response.description,
          reason: response.reason
        });
      } else {
        resolve({
          type: "success",
          description: null,
          data: response.data,
        });
      }
    })
    .catch((err) => {
      reject({
        type: "fail",
        description: "network error",
        reason: err
      });
    });
  });
}

export function deleteCustomer() {
  return new Promise((resolve, reject) => {
    var uid = firebase.auth().currentUser.uid;
    axios.get(DeleteCustomerAPI, { params: { uid: uid } })
    .then(() => {
      resolve({
        type: "success",
        description: null,
      });
    })
    .catch((err) => {
      reject({
        type: "fail",
        description: "cannot delete customer",
        reason: err,
      });
    });
  });
}

export function retrieveAccount() {
  return new Promise((resolve, reject) => {
    var uid = firebase.auth().currentUser.uid;
    var request = { uid: uid };
    axios.get(StripeAccountRetrivalAPI, { params: request })
    .then((snap) => {
      var response = snap.data;
      if (response.type === "success") {
        resolve("account retrieved");
      } else {
        reject("no account exist");
      }
    })
    .catch((err) => {
      reject(err);
    });
  });
}

export function redirectURL() {
  var uid = firebase.auth().currentUser.uid;
  var url = ConnectStripeRedirectAPI + "?uid=" + uid;
  return url;
}
