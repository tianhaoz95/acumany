import * as firebase from "firebase/app";
import "firebase/auth";

export function getCurrentEmailAddr() {
  var email = firebase.auth().currentUser.email;
  return email;
}

export function updateUserPassword(password, confirmation) {
  return new Promise(function(resolve, reject) {
    if (password === confirmation) {
      var user = firebase.auth().currentUser;
      user.updatePassword(password).then(function() {
        resolve("done");
      }, function(error) {
        reject(error);
      });
    } else {
      reject("Passwords do not match");
    }
  });
}

export function updateEmailAddr(email) {
  return new Promise(function(resolve, reject) {
    firebase.auth().currentUser.updateEmail(email).then(function() {
      firebase.auth().currentUser.sendEmailVerification().then(function() {
        resolve("done");
      }, function(error) {
        reject(error);
      });
    }, function(error) {
      reject(error);
    });
  });
}
