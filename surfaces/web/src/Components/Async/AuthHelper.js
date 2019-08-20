import firebase from "firebase";
import {AvatarPlaceholder} from '../../Utilities/Params';
import moment from 'moment-timezone';
import initialIntroduction from '../../Utilities/Introduction.json';
import initialCredential from '../../Utilities/Credential.json';
import {Raw} from 'slate';

export function switchToAdvisor() {
  return new Promise((resolve, reject) => {
    var user = firebase.auth().currentUser;
    if (user === null) {
      reject("user not logged in");
    } else {
      if (!user.emailVerified) {
        reject("user not verified");
      } else {
        createInitialAdvisor()
        .then(() => {
          updateBasicInformation({ type: "advisor" })
          .then(() => {
            resolve("done");
          })
          .catch((err) => {
            reject(err);
          });
        })
        .catch((err) => {
          reject(err);
        })
      }
    }
  });
}

export function createInitialAdvisor() {
  return new Promise((resolve, reject) => {
    console.log("creating initial advisor");
    var user = firebase.auth().currentUser;
    var uid = user.uid;
    var ref = firebase.database().ref("/AdvisorInformation/" + uid);
    var introduction = Raw.serialize(Raw.deserialize(initialIntroduction, { terse: true }));
    var credential = Raw.serialize(Raw.deserialize(initialCredential, { terse: true }));
    ref.set({
      introduction: introduction,
      credential: credential,
    })
    .then(() => {
      console.log("successfully create the advisor profile");
      resolve({
        type: "success",
        description: null,
      });
    })
    .catch((err) => {
      console.log("fuck, cannot set initial advisor information => ", err);
      reject({
        type: "fail",
        description: "cannot set initial advisor information",
        reason: err,
      });
    });
  });
}

export function fetchBasicInformation() {
  /* This function fetch user information from database */
  return new Promise((resolve, reject) => {
    let user = firebase.auth().currentUser;
    if (user === null) {
      reject({
        type: "fail",
        description: "user not logged in",
      });
    } else {
      let uid = user.uid;
      let basicInfoRef = firebase.database().ref("/BasicInformation/" + uid);
      // TODO: comment
      basicInfoRef.once("value", (basicSnap) => {
        let basicData = basicSnap.val();
        if (basicData === null) {
          reject({
            type: "fail",
            description: "cannot retrieve user basic information",
          });
        } else {
          resolve({
            type: "success",
            description: null,
            data: basicData,
          });
        }
      });
    }
  });
}

export function fetchAdvisorInformation() {
  return new Promise((resolve, reject) => {
    const user = firebase.auth().currentUser;
    if (user === null) {
      reject({
        type: "fail",
        description: "user not logged in",
      });
    } else {
      const advisorInfoRef = firebase.database().ref("/AdvisorInformation/" + user.uid);
      advisorInfoRef.once("value", (advisorSnap) => {
        const advisorData = advisorSnap.val();
        if (advisorData === null) {
          reject({
            type: "fail",
            description: "cannot retrieve advisor information",
          });
        } else {
          const processedData = advisorData;
          if (typeof advisorData.introduction !== "object") {
            processedData.introduction = JSON.parse(advisorData.introduction);
          }
          if (typeof advisorData.credential !== "object") {
            processedData.credential = JSON.parse(advisorData.credential);
          }
          resolve({
            type: "success",
            description: null,
            data: processedData,
          });
        }
      });
    }
  });
}

export function updateBasicInformation(updateInfo) {
  return new Promise((resolve, reject) => {
    var user = firebase.auth().currentUser;
    if (user === null) {
      reject({
        type: "fail",
        description: "user not logged in",
      });
    } else {
      var uid = user.uid;
      var basicInfoRef = firebase.database().ref("/BasicInformation/" + uid);
      basicInfoRef.update(updateInfo)
      .then(() => {
        resolve({
          type: "success",
          description: null,
        });
      })
      .catch((err) => {
        reject({
          type: "fail",
          description: "cannot update database basic information",
          reason: err,
        });
      });
    }
  });
}

export function updateUserInfo(name, photo) {
  return new Promise((resolve, reject) => {
    var user = firebase.auth().currentUser;
    user.updateProfile({
      displayName: name,
      photoURL: photo
    }).then(function() {
      resolve({
        type: "success",
        description: null,
      });
    }, function(err) {
      console.log("fuck, cannot update user info => ", err);
      reject({
        type: "fail",
        description: "cannot update user info",
        reason: err,
      });
    });
  });
}

export function createInitial(name, type) {
  /* This helper function update user info and user database
   * only when user profile successfully updated can update database
   * name: string
   * type: string
   */
  return new Promise((resolve, reject) => {
    // get user from firebase
    let user = firebase.auth().currentUser;
    if (user === null) {
      // if user is null, return reject action
      reject({
        type: "fail",
        description: "user not logged in",
      });
    } else {
      // if user, init profile with name input
      // initialize photo
      user.updateProfile({
        displayName: name,
        photoURL: AvatarPlaceholder
      })
      .then(() => {
        // if update user info success, update database
        let uid = user.uid;
        let basicInfoRef = firebase.database().ref("/BasicInformation/" + uid);
        basicInfoRef.set({
          name: name,
          photo: AvatarPlaceholder,
          email: user.email,
          introduction: "A short sentence that best describe you",
          timezone: moment.tz.guess(),
          type: type,
        })
        .then(() => {
          // if update database success, return resolve action
          resolve({
            type: "success",
            description: "database updated",
          });
        })
        .catch((err) => {
          // if update database fail, return reject action
          reject({
            type: "fail",
            description: "cannot update database",
            reason: err,
          });
        });
      })
      .catch((err) => {
        // if user profile update fail, return reject action
        reject({
          type: "fail",
          description: "cannot update profile",
          reason: err,
        });
      });
    }
  });
  // Discussion: What if user profile updates successfully, but database doesn't
}

export function uploadRichText(path, field, text) {
  return new Promise((resolve, reject) => {
    var uploadable = Raw.serialize(text);
    var ref = firebase.database().ref(path);
    var updateObj = {};
    updateObj[field] = JSON.stringify(uploadable);
    ref.update(updateObj)
    .then(() => {
      resolve({
        type: "success",
        description: null,
      });
    })
    .catch((err) => {
      console.log("fuck, cannot upload rich text to database");
      reject({
        type: "fail",
        description: "cannot upload rich text to databse",
        reason: err
      });
    });
  });
}

export function sendPasswordReset(email) {
  return new Promise((resolve, reject) => {
    var auth = firebase.auth();
    auth.sendPasswordResetEmail(email).then(function() {
      resolve({
        type: "success",
        description: null,
      });
    }, function(err) {
      reject({
        type: "fail",
        description: "cannot upload rich text to databse",
        reason: err
      });
    });
  });
}
