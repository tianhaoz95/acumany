importScripts('https://www.gstatic.com/firebasejs/3.9.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/3.9.0/firebase-messaging.js');

var FIREBASE_CLOUD_MESSAGING_SENDER_ID = process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID;

firebase.initializeApp({
  'messagingSenderId': FIREBASE_CLOUD_MESSAGING_SENDER_ID
});

const messaging = firebase.messaging();

messaging.setBackgroundMessageHandler(function(payload) {
  console.log('[firebase-messaging-sw.js] Received background message ', payload);
  const notificationTitle = payload.data.title;
  const notificationOptions = {
    body: "From: " + payload.data.fromUser,
    icon: '/favicon.png'
  };

  return self.registration.showNotification(notificationTitle,
      notificationOptions);
});
