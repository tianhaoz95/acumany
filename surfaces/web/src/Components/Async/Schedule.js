import * as firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";
import _ from 'lodash';
import moment from 'moment';

export function filterEventByDate(date, list) {
  var rawList = list;
  var filteredList = [];
  _.forEach(rawList, (val, key) => {
    if (moment(Number(val.scheduleTime)).isSame(date, 'day')) {
      filteredList.push(val);
    }
  });
  return filteredList;
}

export function retrieveMyScheduleByMonth(date) {
  return new Promise((resolve, reject) => {
    var uid = firebase.auth().currentUser.uid;
    retrieveEventListByMonth(uid, date)
    .then((list) => {
      resolve(list);
    })
    .catch((err) => {
      reject(err);
    });
  });
}

export function uploadMyEventToSchedule(event) {
  return new Promise((resolve, reject) => {
    var uid = firebase.auth().currentUser.uid;
    uploadEventToSchedule(uid, event)
    .then((msg) => {
      resolve(msg);
    })
    .catch((err) => {
      reject(err);
    });
  });
}

export function removeEventFromMySchedule(key) {
  return new Promise((resolve, reject) => {
    var uid = firebase.auth().currentUser.uid;
    removeEventFromSchedule(uid, key)
    .then((msg) => {
      resolve(msg);
    })
    .catch((err) => {
      reject(err);
    });
  });
}

export function retrieveEventListByMonth(uid, date) {
  return new Promise((resolve, reject) => {
    var startTime = moment(date);
    startTime.startOf('month');
    var endTime = moment(date);
    endTime.endOf('month');
    var ref = firebase.database().ref("/UserSchedule/" + uid)
    .orderByChild('scheduleTime')
    .startAt(startTime.valueOf())
    .endAt(endTime.valueOf());
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

export function uploadEventToSchedule(uid, event) {
  return new Promise((resolve, reject) => {
    var ref = firebase.database().ref("/UserSchedule/" + uid).push();
    var scheduleTime = event.scheduleTime.valueOf();
    var createTime = moment().valueOf();
    var note = event.note;
    var key = ref.key;
    var uploadable = {
        note: note,
        key: key,
        createTime: createTime,
        scheduleTime: scheduleTime,
    };
    ref.set(uploadable)
    .then(() => {
      resolve("uploaded");
    })
    .catch((err) => {
      reject(err);
    });
  });
}

export function removeEventFromSchedule(uid, key) {
  return new Promise((resolve, reject) => {
    var ref = firebase.database().ref("/UserSchedule/" + uid + "/" + key);
    ref.remove()
    .then(() => {
      resolve("deleted");
    })
    .catch((err) => {
      reject(err);
    });
  });
}
