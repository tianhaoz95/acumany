import * as firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";

import { AlgoliaAddReviewAPI, DatabaseAddReviewAPI, RequestSessionAccessAPI } from '../../Utilities/Params';

import _ from 'lodash';
import axios from 'axios';

export function fetchMySessions() {
  return new Promise((resolve, reject) => {
    var uid = firebase.auth().currentUser.uid;
    var ref = firebase.database().ref("/UserSession/" + uid);
    ref.on("value", (snap) => {
      var data = snap.val();
      if (data === null) {
        reject("session_empty");
      } else {
        var rawList = _.toArray(data);
        var orderedList = _.orderBy(rawList, ['createTime'], ['asc']);
        resolve(orderedList);
      }
    });
  });
}

export function requestSessionAccess(sessionID) {
  return new Promise((resolve, reject) => {
    var uid = firebase.auth().currentUser.uid;
    var request = {
      sessionID: sessionID,
      uid: uid,
    };
    axios.get(RequestSessionAccessAPI, { params: request })
    .then((snap) => {
      var response = snap.data;
      if (response.type === "success") {
        resolve("access granted");
      } else {
        reject("access not granted");
      }
    })
    .catch((err) => {
      reject(err);
    })
  });
}

export function sessionReviewed(sessionInfo) {
  if (sessionInfo.reviewed === null || sessionInfo.reviewed === undefined) {
    return false;
  } else if (sessionInfo.reviewed === false) {
    return false;
  } else if (sessionInfo.reviewed === true) {
    return true;
  } else {
    console.log("unexpected value in reviewed");
    return false;
  }
}

export function fetchSkillList(uid) {
  return new Promise(function(resolve, reject) {
    var ref = firebase.database().ref("/AdvisorInformation/" + uid + "/skill");
    ref.once("value", function (snap) {
      var data = snap.val();
      if (data === null) {
        reject("no skill list found");
      } else {
        var skillList = _.toArray(data);
        resolve(skillList);
      }
    });
  });
}

export function uploadReviewToAlgolia(starCnt, objectID) {
  return new Promise(function(resolve, reject) {
    var request = {
      starCnt: starCnt,
      objectID: objectID
    };
    axios.get(AlgoliaAddReviewAPI, { params: request })
    .then(function (snap) {
      var data = snap.data;
      if (data.type === "fail") {
        reject(data.description);
      } else {
        resolve("done");
      }
    })
    .catch(function (err) {
      reject(err);
    });
  });
}

export function uploadReviewToDatabase(uid, starCnt, review, objectID, selfID, anonymous, reviewerUid) {
  return new Promise(function(resolve, reject) {
    var request = {
      starCnt: starCnt,
      review: review,
      objectID: objectID,
      selfID: selfID,
      uid: uid,
      anonymous: anonymous,
      reviewerUid: reviewerUid,
    };
    axios.get(DatabaseAddReviewAPI, { params: request })
    .then(function (snap) {
      var data = snap.data;
      if (data.type === "fail") {
        reject(data.description);
      } else {
        resolve("done");
      }
    })
    .catch(function (err) {
      reject(err);
    });
  });
}

export function uploadReview(reviewObj) {
  return new Promise(function(resolve, reject) {
    var starCnt = reviewObj.starCnt;
    var review = reviewObj.review;
    var uid = reviewObj.skill.uid;
    var objectID = reviewObj.skill.objectID;
    var selfID = reviewObj.skill.selfID;
    var reviewerUid = firebase.auth().currentUser.uid;
    var anonymous = reviewObj.anonymous;
    Promise.all([
      uploadReviewToDatabase(uid, starCnt, review, objectID, selfID, anonymous, reviewerUid),
      uploadReviewToAlgolia(starCnt, objectID)
    ])
    .then(function () {
      resolve("done");
    })
    .catch(function (err) {
      reject(err)
    });
  });
}

export function markSessionAsReviewed(sessionID) {
  return new Promise(function(resolve, reject) {
    var uid = firebase.auth().currentUser.uid;
    var ref = firebase.database().ref("/UserSession/" + uid + "/" + sessionID);
    ref.update({ reviewed: true })
    .then(function () {
      resolve("done");
    })
    .catch(function (err) {
      reject(err);
    });
  });
}

export function isOwner(ownerUid) {
  var uid = firebase.auth().currentUser.uid;
  return uid === ownerUid;
}
