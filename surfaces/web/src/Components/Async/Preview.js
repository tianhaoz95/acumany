import * as firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";
import _ from 'lodash';

export function retrieveBasicInformation(uid) {
  return new Promise((resolve, reject) => {
    var ref = firebase.database().ref("/BasicInformation/" + uid);
    ref.once("value", (snap) => {
      var data = snap.val();
      if (data === null) {
        reject("cannot retrieve basic information");
      } else {
        resolve(data);
      }
    });
  });
}

export function retrieveAdvisorIntroduction(uid) {
  return new Promise((resolve, reject) => {
    var ref = firebase.database().ref("/AdvisorInformation/" + uid + "/introduction");
    ref.once("value", (snap) => {
      var data = snap.val();
      if (data === null) {
        reject("cannot retrieve introduction")
      } else {
        var introduction = data;
        if (typeof introduction !== "object") {
          introduction = JSON.parse(data);
        }
        resolve(introduction);
      }
    });
  });
}

export function retrieveAdvisorCredential(uid) {
  return new Promise((resolve, reject) => {
    var ref = firebase.database().ref("/AdvisorInformation/" + uid + "/credential");
    ref.once("value", (snap) => {
      var data = snap.val();
      if (data === null) {
        reject("cannot retrieve introduction")
      } else {
        var credential = data;
        if (typeof credential !== "object") {
          credential = JSON.parse(data);
        }
        resolve(credential);
      }
    });
  });
}

export function retrieveSkills(uid) {
  return new Promise((resolve, reject) => {
    var ref = firebase.database().ref("/AdvisorInformation/" + uid + "/skill");
    ref.once("value", (snap) => {
      var data = snap.val();
      if (data === null) {
        reject("cannot retrieve introduction")
      } else {
        var skillList = _.toArray(data);
        resolve(skillList);
      }
    });
  });
}

export function isMyself(uid) {
  var user = firebase.auth().currentUser;
  if (user) {
    var myUid = user.uid;
    return myUid === uid;
  } else {
    return false;
  }
}
