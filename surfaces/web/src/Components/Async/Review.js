import * as firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";
import _ from 'lodash';

export function retrieveOverallReview(uid) {
  return new Promise(function(resolve, reject) {
    var ref = firebase.database().ref("/ReviewMeta/" + uid);
    ref.once("value", function (snap) {
      var data = snap.val();
      var starCnt = 0;
      var review = 0;
      var avgStar = 0;
      if (data !== null) {
        starCnt = parseFloat(data.star);
        review = Number(data.review);
        avgStar = starCnt / review;
      }
      resolve({
        starCnt: avgStar,
        reviewCnt: review,
      });
    });
  });
}

export function retrieveMyOverallReview() {
  return new Promise(function(resolve, reject) {
    var uid = firebase.auth().currentUser.uid;
    retrieveOverallReview(uid)
    .then(function (review) {
      resolve(review);
    })
    .catch(function (err) {
      reject(err);
    });
  });
}

export function retrieveReviewList(uid) {
  return new Promise(function(resolve, reject) {
    var ref = firebase.database().ref("/Review/" + uid);
    ref.once("value", function (snap) {
      var data = snap.val();
      var reviewList = [];
      if (data !== null) {
        var rawList = _.toArray(data);
        var orderedList = _.orderBy(rawList, ['timestamp'], ['desc']);
        reviewList = orderedList;
      }
      resolve(reviewList);
    });
  });
}

export function retrieveMyReviewList() {
  return new Promise(function(resolve, reject) {
    var uid = firebase.auth().currentUser.uid;
    retrieveReviewList(uid)
    .then(function (reviewList) {
      resolve(reviewList);
    })
    .catch(function (err) {
      reject(err);
    });
  });
}
