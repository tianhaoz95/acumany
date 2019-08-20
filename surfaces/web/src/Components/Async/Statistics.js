import firebase from "firebase";

export function addToStatistics(attr) {
  return new Promise(function(resolve, reject) {
    const ref = firebase.database().ref("/Statistics/" + attr);
    ref.once("value", (snap) => {
      const data = snap.val();
      let cnt = 0;
      if (data !== null) {
        cnt = Number(data.cnt);
      }
      ref.update({ cnt: cnt + 1 })
      .then(() => {
        resolve("done");
      })
      .catch((err) => {
        reject(err)
      });
    });
  });
}

export function addAdvisorToStatistics() {
  return new Promise(function(resolve, reject) {
    addToStatistics("experts")
    .then(function () {
      resolve("done");
    })
    .catch(function (err) {
      console.log("fuck", err);
      reject(err);
    });
  });
}

export function addTopicToStatistics() {
  return new Promise((resolve, reject) => {
    addToStatistics("topics")
    .then(() => {
      resolve("done");
    })
    .catch((err) => {
      reject(err);
    });
  });
}

export function addSessionToStatistics() {
  return new Promise(function(resolve, reject) {
    addToStatistics("sessions")
    .then(function () {
      resolve("done");
    })
    .catch(function (err) {
      console.log("fuck", err);
      reject(err);
    });
  });
}

export function retrieveStatistics() {
  return new Promise(function(resolve, reject) {
    var ref = firebase.database().ref("/Statistics/");
    ref.once("value", function (snap) {
      var data = snap.val();
      var experts = 0;
      var sessions = 0;
      var topics = 0;
      var popularAdvisors = [];
      if (data.experts !== null && data.experts !== undefined) {
        experts = Number(data.experts.cnt);
      }
      if (data.sessions !== null && data.sessions !== undefined) {
        sessions = Number(data.sessions.cnt);
      }
      if (data.topics !== null && data.topics !== undefined) {
        topics = Number(data.topics.cnt);
      }
      if (data.popularAdvisors !== null && data.popularAdvisors !== undefined) {
        popularAdvisors = data.popularAdvisors;
      }
      resolve({
        experts: experts,
        sessions: sessions,
        topics: topics,
        popularAdvisors: popularAdvisors
      });
    });
  });
}
