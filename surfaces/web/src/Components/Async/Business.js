import axios from 'axios';
import { PlansAPI, CardTokenAPI, CreateCustomerAPI, AvatarPlaceholder, SubscribeAPI } from '../../Utilities/Params';
import moment from 'moment-timezone';
import * as firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";

export function fetchPlans() {
  return new Promise((resolve, reject) => {
    axios.get(PlansAPI)
    .then((snap) => {
      var data = snap.data;
      if (data.type === "success") {
        resolve({
          type: "success",
          description: null,
          data: data.data
        });
      } else {
        reject({
          type: "fail",
          description: "cannot retrieve plans",
          reason: data
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

export function verifyCard(info) {
  return new Promise((resolve, reject) => {
    var request = info;
    var time = info.expire;
    request["expire"] = null;
    var year = time.get("year");
    var month = time.get("month");
    request["exp_month"] = month;
    request["exp_year"] = year;
    axios.get(CardTokenAPI, { params: request })
    .then((snap) => {
      var response = snap.data;
      if (response.type === "success") {
        var data = response.data;
        resolve({
          type: "success",
          description: null,
          data: data,
          info: request,
        });
      } else {
        reject({
          type: "fail",
          description: response.description,
          reason: response.reason,
        });
      }
    })
    .catch((err) => {
      reject({
        type: "fail",
        description: "cannot verify card",
        reason: err
      });
    });
  });
}

export function createCustomer(cardObj) {
  return new Promise((resolve, reject) => {
    var request = cardObj;
    var uid = firebase.auth().currentUser.uid;
    request["uid"] = uid;
    axios.get(CreateCustomerAPI, { params: request })
    .then((snap) => {
      var response = snap.data;
      if (response.type === "success") {
        // var data = response.data;
        // commented out to clean unused variable
        // TODO: see if this variable is needed.
        //       if not, please remove them.
        resolve({
          type: "success",
          description: null,
        });
      } else {
        reject({
          type: "fail",
          description: response.description,
          reason: response.reason,
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

export function createEnterpriseInformation(info) {
  return new Promise((resolve, reject) => {
    var uid = firebase.auth().currentUser.uid;
    var ref = firebase.database().ref("/EnterpriseInformation/" + uid);
    ref.set({
      memberCount: 0,
      type: info.audience,
    })
    .then(() => {
      resolve({
        type: "success",
        description: null,
      });
    })
    .catch((err) => {
      reject({
        type: "fail",
        description: "cannot upload enterprise information to database",
        reason: err
      });
    });
  });
}

export function createBasicEnterprise(info) {
  return new Promise((resolve, reject) => {
    firebase.auth().createUserWithEmailAndPassword(info.email, info.password)
    .then(() => {
      firebase.auth().currentUser.updateProfile({
        displayName: info.name,
        photoURL: AvatarPlaceholder
      }).then(() => {
        var initProfile = {
          name: info.name,
          email: info.email,
          photo: AvatarPlaceholder,
          introduction: info.description,
          timezone: moment.tz.guess(),
          type: "enterprise",
        };
        var uid = firebase.auth().currentUser.uid;
        var ref = firebase.database().ref("/BasicInformation/" + uid);
        ref.set(initProfile)
        .then(() => {
          resolve({
            type: "success",
            description: null,
          });
        });
      });
    })
    .catch((err) => {
      reject({
        type: "fail",
        description: "cannot create account for enterprise",
        reason: err
      });
    });
  });
}

export function subscribePlan(plan) {
  return new Promise((resolve, reject) => {
    var uid = firebase.auth().currentUser.uid;
    var request = {
      plan: plan,
      uid: uid,
    };
    axios.get(SubscribeAPI, { params: request })
    .then((snap) => {
      var response = snap.data;
      if (response.type === "success") {
        // var data = response.data;
        // commented out to clean unused variable
        // TODO: please see if this variable is
        //      needed. If not, please remove it.
        resolve({
          type: "success",
          description: null
        });
      } else {
        reject({
          type: "fail",
          description: response.description,
          reason: response.reason,
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
