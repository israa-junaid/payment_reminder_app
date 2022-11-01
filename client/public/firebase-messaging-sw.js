importScripts('https://www.gstatic.com/firebasejs/7.14.2/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/7.14.2/firebase-messaging.js');

const config = {
    apiKey: "AIzaSyBo4NgIJW7MxnbchmB7IvAUuaD7oU4DCG8",
    authDomain: "payment-reminderapp.firebaseapp.com",
    projectId: "payment-reminderapp",
    storageBucket: "payment-reminderapp.appspot.com",
    messagingSenderId: "938510718527",
    appId: "1:938510718527:web:830d40d9ff32b6be6fca8a"
  };

firebase.initializeApp(config);
const messaging = firebase.messaging();

messaging.setBackgroundMessageHandler(function(payload) {
  console.log('[firebase-messaging-sw.js] Received background message ', payload);
  const notificationTitle = payload.data.title;
  const notificationOptions = {
    body: payload.data.body,
    icon: '/firebase-logo.png'
  };
  return self.registration.showNotification(notificationTitle,
    notificationOptions);
});

self.addEventListener('notificationclick', event => {
  console.log(event)
  return event;
});