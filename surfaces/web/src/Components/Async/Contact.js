import * as firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";

import { CreateSessionAPI, SignUpSessionAPI } from '../../Utilities/Params';

import _ from 'lodash';
import { addSessionToStatistics } from "./Statistics";
import axios from 'axios';
import { initConversation } from './Search';
import moment from 'moment-timezone';

export function createSession(info) {
  return new Promise((resolve, reject) => {
    addSessionToStatistics();
    var ownerUid = firebase.auth().currentUser.uid;
    var title = info.title;
    var price = Number(info.price);
    var scheduleTime = info.date;
    var time = info.time;
    scheduleTime.set('hour', time.get('hour'));
    scheduleTime.set('minute', time.get('minute'));
    var duration = info.duration;
    var content = info.content;
    var request = {
      ownerUid: ownerUid,
      title: title,
      price: price,
      scheduleTime: scheduleTime.valueOf(),
      duration: duration,
      content: content,
    };
    axios.get(CreateSessionAPI, { params: request })
    .then((response) => {
      var data = response.data;
      if (data.type === "fail") {
        reject({
          type: "fail",
          description: data.description,
          reason: data.reason,
        });
      } else {
        resolve({
          type: "success",
          description: null,
          data: data.data,
        });
      }
    })
    .catch((err) => {
      reject({
        type: "fail",
        description: "network error",
        reason: err,
      });
    })
  });
}

export function fetchMessageChain(conversationID) {
  return new Promise((resolve, reject) => {
    var ref = firebase.database().ref("/Conversation/" + conversationID);
    ref.once("value", (snap) => {
      var chain = snap.val();
      if (chain === null) {
        reject({
          type: "fail",
          description: "cannot retrieve message chain",
        });
      } else {
        var rawChain = _.toArray(chain);
        var orderedChain = _.orderBy(rawChain, ['timestamp'], ['asc']);
        resolve({
          type: "success",
          description: null,
          data: orderedChain,
        });
      }
    });
  });
}

export function fetchConversationList() {
  return new Promise((resolve, reject) => {
    var uid = firebase.auth().currentUser.uid;
    var listRef = firebase.database().ref("/UserConversation/" + uid);
    listRef.once("value", (listSnap) => {
      var list = listSnap.val();
      if (list === null) {
        reject({
          type: "fail",
          description: "conversation list is empty",
        });
      } else {
        var rawList = _.toArray(list);
        var orderedList = _.orderBy(rawList, ['timestamp'], ['desc']);
        resolve({
          type: "success",
          description: null,
          data: orderedList
        });
      }
    });
  });
}

export function markConversationAsRead(conversationID) {
  return new Promise((resolve, reject) => {
    var uid = firebase.auth().currentUser.uid;
    var ref = firebase.database().ref("/UserConversation/" + uid + "/" + conversationID);
    ref.update({ newMessage: false })
    .then(() => {
      resolve({
        type: "success",
        description: null,
      });
    })
    .catch((err) => {
      reject({
        type: "fail",
        description: "network error",
        reason: err,
      });
    });
  });
}

export function fetchBasicInfo(uid) {
  return new Promise((resolve, reject) => {
    var ref = firebase.database().ref("/BasicInformation/" + uid);
    ref.once("value", (snap) => {
      var data = snap.val();
      if (data === null) {
        reject({
          type: "fail",
          description: "user does not exist",
        });
      } else {
        resolve({
          type: "success",
          description: null,
          data: data,
        });
      }
    });
  });
}

export function uploadMessage(toUid, title, content, conversationID, type) {
  return new Promise((resolve, reject) => {
    var timestamp = moment().valueOf();
    var fromUid = firebase.auth().currentUser.uid;
    var ref = firebase.database().ref("/Conversation/" + conversationID).push();
    var messageObject = {
      content: content,
      fromUid: fromUid,
      timestamp: timestamp,
      title: title,
      toUid: toUid,
      type: type,
      selfKey: ref.key,
    };
    ref.set(messageObject)
    .then(() => {
      resolve({
        type: "success",
        description: null,
      });
    })
    .catch((err) => {
      reject({
        type: "fail",
        description: "cannot push new message to chain",
        reason: err
      });
    });
  });
}

export function retrieveSessionFromProfile(sessionID) {
  return new Promise((resolve, reject) => {
    var uid = firebase.auth().currentUser.uid;
    var ref = firebase.database().ref("/UserSession/" + uid + "/" + sessionID);
    ref.once("value", (snap) => {
      var session = snap.val();
      if (session === null) {
        reject("session does not exist");
      } else {
        resolve(session);
      }
    });
  });
}

export function sendSignUpSession(sessionID) {
  return new Promise((resolve, reject) => {
    var uid = firebase.auth().currentUser.uid;
    var request = {
      sessionID: sessionID,
      uid: uid,
    };
    axios.get(SignUpSessionAPI, { params: request })
    .then(() => {
      resolve("success");
    })
    .catch((err) => {
      reject(err);
    })
  });
}

export function removeMessage(selfKey, conversationID) {
  return new Promise((resolve, reject) => {
    var ref = firebase.database().ref("/Conversation/" + conversationID + "/" + selfKey);
    ref.remove()
    .then(() => {
      resolve("message removed");
    })
    .catch((err) => {
      console.log("fuck", err);
      resolve("refresh anyway");
    });
  });
}

export function isGuest(session) {
  var uid = firebase.auth().currentUser.uid;
  return session.ownerUid !== uid;
}

export function isRecipient(message) {
  var uid = firebase.auth().currentUser.uid;
  return message.toUid === uid;
}

export function initAppointment(toUid, content) {
  return new Promise((resolve, reject) => {
    var title = "New Appointment";
    var type = "appointment";
    initConversation(toUid, title, content, type)
    .then((conversationID) => {
      resolve(conversationID);
    })
    .catch((err) => {
      reject(err);
    });
  });
}
