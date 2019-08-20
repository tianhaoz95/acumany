import firebase from "firebase";

export function uploadFile(path, file) {
  return new Promise((resolve, reject) => {
    var storageRef = firebase.storage().ref();
    var uploadRef = storageRef.child(path);
    uploadRef.put(file)
    .then(() => {
      uploadRef.getDownloadURL()
      .then((url) => {
        resolve({
          type: "success",
          description: null,
          data: url,
        });
      })
      .catch((err) => {
        console.log("fuck, cannot fetch download link => ", err);
        reject({
          type: "fail",
          description: "cannot fetch download link",
          reason: err,
        });
      });
    })
    .catch((err) => {
      console.log("fuck, cannot upload file => ", err);
      reject({
        type: "fail",
        description: "cannot upload file",
        reason: err,
      });
    });
  });
}
