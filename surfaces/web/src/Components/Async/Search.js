import firebase from "firebase";

import { InitConversationAPI } from '../../Utilities/Params';
import _ from 'lodash';
import axios from 'axios';

// Fetch skill set from firebase
// Note: always resolve
export function refreshSkillAutocomplete() {
  return new Promise((resolve, reject) => {
    var autocompleteRef = firebase.database().ref("/SkillMeta");
    autocompleteRef.once("value", (autocompleteSnap) => {
      var autocompleteData = autocompleteSnap.val();
      console.log(autocompleteData);
      if (autocompleteData === null) {
        resolve({
          type: "success",
          description: "skill set is empty",
          data: [],
        });
      } else {
        var list = [];
        _.forEach(autocompleteData, (val, key) => {
          list.push({
            title: key,
            count: val.count,
          });
        });
        var orderedList = _.orderBy(list, ["count"], ["desc"]);
        resolve({
          type: "success",
          description: "got the autocomplete list",
          data: orderedList,
        });
      }
    });
  });
}

export function initConversation(toUid, title, content, type) {
  return new Promise((resolve, reject) => {
    var user = firebase.auth().currentUser;
    if (user === null) {
      reject({
        type: "fail",
        description: "You need to login to send message"
      });
    } else {
      var fromUid = user.uid;
      var request = {
        fromUid: fromUid,
        toUid: toUid,
        title: title,
        content: content,
        type: type,
      };
      console.log("sending the request => ", request);
      axios.get(InitConversationAPI, { params: request })
      .then((snap) => {
        var response = snap.data;
        if (response.type === "success") {
          resolve(response.conversationID);
        } else {
          reject(response.reason);
        }
      })
      .catch((err) => {
        reject(err);
      });
    }
  });
}
