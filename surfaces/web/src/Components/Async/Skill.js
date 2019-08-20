import firebase from "firebase";

import { AlgoliaAddAPI, AlgoliaDeleteAPI, AlgoliaPartialUpdateAPI, AlgoliaUpdateAPI } from '../../Utilities/Params';

import _ from 'lodash';
import { addTopicToStatistics } from "./Statistics";
import axios from 'axios';

export function removeSkill(info) {
  return new Promise((resolve, reject) => {
    deleteSkillFromAlgolia(info.objectID)
    .then(() => {
      deleteSkillFromDB(info.objectID, info.selfID, info.skill)
      .then(() => {
        resolve({
          type: "success",
          description: "skill remove from database and algolia",
          data: null,
        });
      });
    })
    .catch((err) => {
      reject({
        type: "fail",
        description: "cannot remove skill",
        reason: err,
      });
    });
  });
}

export function updateSkill(newInfo) {
  return new Promise((resolve, reject) => {
    updateSkillInAlgolia(newInfo)
    .then(() => {
      updateSkillInDB(newInfo)
      .then(() => {
        resolve({
          type: "success",
          description: null,
        });
      })
    })
    .catch((err) => {
      reject({
        type: "fail",
        description: "cannot update skill",
        reason: err,
      });
    });
  });
}

export function updateSkillInDB(newSkill) {
  return new Promise((resolve, reject) => {
    const uid = firebase.auth().currentUser.uid;
    const profileRef = firebase.database().ref("/AdvisorInformation/" + uid + "/skill/" + newSkill.selfID);
    const skillRed = firebase.database().ref("/Skill/" + newSkill.objectID);
    profileRef.update(newSkill)
    .then(() => {
      skillRed.update(newSkill)
      .then(() => {
        resolve({
          type: "success",
          description: null,
        });
      });
    })
    .catch((err) => {
      reject({
        type: "fail",
        description: "cannot update skill",
        reason: err,
      });
    });
  });
}

export function updateSkillInAlgolia(newSkill) {
  return new Promise((resolve, reject) => {
    axios(AlgoliaUpdateAPI, { params: newSkill })
    .then((responseSnap) => {
      const response = responseSnap.data;
      if (response.type === "success") {
        resolve({
          type: "success",
          description: null,
          data: response.response,
        });
      } else {
        reject({
          type: "fail",
          description: "cannot send update to indexing api",
          reason: null,
        });
      }
    })
    .catch((err) => {
      reject({
        type: "fail",
        description: "cannot send update to indexing api",
        reason: err,
      });
    });
  });
}

export function updateSkillObject(payload) {
  var original = payload.original;
  var update = payload.update;
  _.forEach(update, (val, key) => {
    original[key] = val;
  });
  return original;
}

export function addSkillToAlgolia(skillObj) {
  return new Promise((resolve, reject) => {
    axios.get(AlgoliaAddAPI, { params: skillObj })
    .then((responseSnap) => {
      const response = responseSnap.data;
      if (response.type === "success") {
        resolve({
          type: "success",
          description: null,
          data: response.response,
        });
      } else {
        reject({
          type: "fail",
          description: "cannot upload to indexing api",
          reason: null,
        });
      }
    })
    .catch((err) => {
      console.log("fuck", err);
      reject({
        type: "fail",
        description: "cannot connect to indexing api",
        reason: err,
      });
    });
  });
}

export function deleteSkillFromAlgolia(objectID) {
  return new Promise((resolve, reject) => {
    var requestObj = { objectID: objectID };
    axios.get(AlgoliaDeleteAPI, { params: requestObj })
    .then((responseSnap) => {
      var response = responseSnap.data;
      if (response.type === "success") {
        resolve({
          type: "success",
          description: null,
          data: null,
        });
      } else {
        reject({
          type: "fail",
          description: "cannot delete from indexing api",
          reason: null,
        });
      }
    })
    .catch((err) => {
      reject({
        type: "fail",
        description: "cannot connect to indexing api",
        reason: err,
      });
    });
  });
}

export function addSkill(info) {
  return new Promise((resolve, reject) => {
    addTopicToStatistics()
      .then(() => {
        const skillRef = firebase.database().ref("/Skill").push();
        const user = firebase.auth().currentUser;
        const profileRef = firebase.database().ref("/AdvisorInformation/" + user.uid + "/skill").push();
        const metaRef = firebase.database().ref("/SkillMeta/" + info.skill);
        const skillObj = {
          skill: info.skill,
          rate: info.rate,
          description: info.description,
          audience: info.audience,
          name: user.displayName,
          objectID: skillRef.key,
          selfID: profileRef.key,
          uid: user.uid,
          photo: user.photoURL,
          star: 0,
          review: 0,
          enterprises: [],
        };
        addSkillToAlgolia(skillObj)
          .then(() => {
            profileRef.set(skillObj);
          })
          .then(() => {
            skillRef.set(skillObj);
          })
          .then(() => {
            metaRef.once("value", (metaSnap) => {
              const metaData = metaSnap.val();
              if (metaData === null) {
                metaRef.set({count: 1})
                  .then(() => {
                    resolve({
                      type: "success",
                      description: null,
                    });
                  });
              } else {
                const previous = Number(metaData.count);
                metaRef.set({count: previous + 1})
                  .then(() => {
                    resolve({
                      type: "success",
                      description: null,
                    });
                  });
              }
            });
          })
          .catch((err) => {
            console.log("fuck", err);
            reject({
              type: "fail",
              description: "cannot upload skill to Algolia",
              reason: err,
            });
          });
      });
  });
}

export function deleteSkillFromDB(objectID, selfID, skill) {
  return new Promise((resolve, reject) => {
    const uid = firebase.auth().currentUser.uid;
    const profileRef = firebase.database().ref("/AdvisorInformation/" + uid + "/skill/" + selfID);
    const skillRef = firebase.database().ref("/Skill/" + objectID);
    const metaRef = firebase.database().ref("/SkillMeta/" + skill);
    profileRef.remove()
    .then(() => {
      skillRef.remove()
      .then(() => {
        metaRef.once("value", (snap) => {
          const data = snap.val();
          if (data === null) {
            reject({
              type: "fail",
              description: "this skill does not exist in metadata",
              reason: null
            });
          } else {
            const count = Number(data.count);
            if (count <= 1) {
              metaRef.remove()
              .then(() => {
                resolve({
                  type: "success",
                  description: "skill deleted, no one with this skill",
                });
              });
            } else {
              metaRef.update({ count: count - 1 })
              .then(() => {
                resolve({
                  type: "success",
                  description: "skill deleted",
                });
              });
            }
          }
        });
      });
    })
    .catch((err) => {
      console.log("fuck", err);
      reject({
        type: "fail",
        description: "cannot remove skill from database",
        reason: err
      });
    });
  });
}

export function retrieveSkillName(objectID) {
  return new Promise(function(resolve, reject) {
    var ref = firebase.database().ref("/Skill/" + objectID);
    ref.once("value", function (snap) {
      var data = snap.val();
      var name = "unknown";
      if (data !== null) {
        name = data.skill;
      }
      resolve(name);
    });
  });
}

export function partialUpdateAlgolia(objectID, field, change) {
  return new Promise(function(resolve, reject) {
    var request = {
      objectID: objectID,
      field: field,
      change: change
    };
    axios.get(AlgoliaPartialUpdateAPI, { params: request })
    .then(function (snap) {
      var data = snap.data;
      if (data.type === "fail") {
        reject(data);
      } else {
        resolve("done");
      }
    })
    .catch(function (err) {
      reject(err);
    });
  });
}

export function updateAllMySkillsInAlgolia(field, change) {
  return new Promise(function(resolve, reject) {
    var uid = firebase.auth().currentUser.uid;
    var ref = firebase.database().ref("/AdvisorInformation/" + uid + "/skill");
    ref.once("value", function (snap) {
      var data = snap.val();
      if (data !== null) {
        var skillList = _.toArray(data);
        Promise.all(skillList.map((skill, index) => (
          partialUpdateAlgolia(skill.objectID, field, change)
        )))
        .then(function () {
          resolve("done");
        })
        .catch(function (err) {
          reject(err);
        })
      }
    });
  });
}

export function partialUpdateSkillDatabase(objectID, field, change) {
  return new Promise(function(resolve, reject) {
    var updateObj = {};
    updateObj[field] = change;
    var ref = firebase.database().ref("/Skill/" + objectID);
    ref.update(updateObj)
    .then(function () {
      resolve("done");
    })
    .catch(function (err) {
      reject(err);
    });
  });
}

export function updateAllMySkillsInDatabase(field, change) {
  return new Promise(function(resolve, reject) {
    var uid = firebase.auth().currentUser.uid;
    var ref = firebase.database().ref("/AdvisorInformation/" + uid + "/skill");
    ref.once("value", function (snap) {
      var data = snap.val();
      if (data !== null) {
        var skillList = _.toArray(data);
        Promise.all(skillList.map((skill, index) => (
          partialUpdateSkillDatabase(skill.objectID, field, change)
        )))
        .then(function () {
          resolve("done");
        })
        .catch(function (err) {
          reject(err);
        })
      }
    });
  });
}
