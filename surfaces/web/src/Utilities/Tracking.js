import firebase from "firebase";

const tracker = window.mixpanel;

export function pageAccess(path) {
  tracker.track("Page Accessed", {
    "path": path
  });
}

export function addPeople() {
  var user = firebase.auth().currentUser;
  if (user) {
    tracker.identify(user.uid);
    tracker.people.set({
        "$first_name": user.displayName,
        "$email": user.email,
        "$last_login": new Date()
    });
  }
}

export function search(searchTerm) {
  tracker.track("Search Launched", {
    "term": searchTerm
  });
}
