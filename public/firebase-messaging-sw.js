importScripts(
  "https://www.gstatic.com/firebasejs/11.10.0/firebase-app-compat.js"
);
importScripts(
  "https://www.gstatic.com/firebasejs/11.10.0/firebase-messaging-compat.js"
);

firebase.initializeApp({
  apiKey: "AIzaSyD7h5F41hRPfZxeK3V_RJVQ5hx0JynoPjU",
  authDomain: "sun-box-chat.firebaseapp.com",
  projectId: "sun-box-chat",
  storageBucket: "sun-box-chat.firebasestorage.app",
  messagingSenderId: "288403389610",
  appId: "1:288403389610:web:d42660f1cb843faaf564d3",
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage(function (payload) {
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: "/firebase-logo.png",
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});
