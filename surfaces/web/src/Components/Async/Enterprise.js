import axios from 'axios';
import * as firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";
import _ from 'lodash';
import { AddMemberAPI } from '../../Utilities/Params';

export function determineContent(empty, downloaded) {
  if (downloaded === null || downloaded === undefined) {
    return empty;
  } else {
    return JSON.parse(downloaded);
  }
}

export function uploadMyHomepage(content) {
  return new Promise((resolve, reject) => {
    var uploadable = JSON.stringify(content);
    var uid = firebase.auth().currentUser.uid;
    var ref = firebase.database().ref("/EnterpriseInformation/" + uid + "/homepage");
    ref.set(uploadable)
    .then(() => {
      resolve("done");
    })
    .catch((err) => {
      reject(err);
    });
  });
}

export function fetchEnterpriseInfo(uid) {
  return new Promise((resolve, reject) => {
    var ref = firebase.database().ref("/EnterpriseInformation/" + uid);
    ref.once("value", (snap) => {
      var data = snap.val();
      if (data === null) {
        reject("enterprise_not_exist");
      } else {
        resolve(data);
      }
    });
  });
}

export function fetchMyEnterpriseInfo() {
  return new Promise((resolve, reject) => {
    var uid = firebase.auth().currentUser.uid;
    fetchEnterpriseInfo(uid)
    .then((info) => {
      resolve(info);
    })
    .catch((err) => {
      reject(err);
    });
  });
}

export function fetchAllMemberInfo(memberListObj) {
  return new Promise((resolve, reject) => {
    if (memberListObj === null || memberListObj === undefined) {
      resolve([]);
    } else {
      var memberList = _.toArray(memberListObj);
      Promise.all(memberList.map((member, index) => (fetchMemberInfo(member.memberUid))))
      .then((memberInfoList) => {
        resolve(memberInfoList);
      })
      .catch((err) => {
        resolve([]);
      });
    }
  });
}

export function fetchMemberInfo(uid) {
  return new Promise((resolve, reject) => {
    var result = null;
    var ref = firebase.database().ref("/BasicInformation/" + uid);
    ref.once("value", (snap) => {
      var data = snap.val();
      if (data === null) {
        resolve(result);
      } else {
        result = data;
        if (data.type === "advisor") {
          fetchSkills(uid)
          .then((list) => {
            result.skill = list;
            resolve(result);
          });
        } else {
          resolve(result);
        }
      }
    });
  });
}

export function fetchSkills(uid) {
  return new Promise((resolve, reject) => {
    var ref = firebase.database().ref("/AdvisorInformation/" + uid + "/skill");
    ref.once("value", (snap) => {
      var data = snap.val();
      if (data === null) {
        resolve([]);
      } else {
        var list = _.toArray(data);
        resolve(list);
      }
    });
  });
}

export function addMember(email) {
  return new Promise((resolve, reject) => {
    var uid = firebase.auth().currentUser.uid;
    var request = {
      uid: uid,
      email: email
    };
    axios.get(AddMemberAPI, { params: request })
    .then(function (snap) {
      var data = snap.data;
      if (data.type === "success") {
        resolve("done");
      } else {
        reject(data.description);
      }
    })
    .catch(function (err) {
      reject(err);
    });
  });
}
