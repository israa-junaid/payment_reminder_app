import {initializeApp} from 'firebase/app';
import firebase from 'firebase/app';
import 'firebase/messaging';
// import firebase from "firebase"
// import 'firebase/messaging';
import { getMessaging, getToken, onMessage } from "firebase/messaging";

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

console.log("messaging",messaging)

export const requestFirebaseNotificationPermission = () =>
  new Promise((resolve, reject) => {
    messaging
      .requestPermission()
      .then(() => messaging.getToken())
      .then((firebaseToken) => {
        resolve(firebaseToken);
        console.log("firebaseToken",firebaseToken)
      })
      .catch((err) => {
        reject(err);
      });
  });

export const onMessageListener = () =>
  new Promise((resolve) => {
    messaging.onMessage((payload) => {
      resolve(payload);
      console.log("payload notify - ",payload)
    });
  });


//   const firebaseApp =initializeApp(config);
// // const messaging = firebase.messaging();
// const messaging = getMessaging(firebaseApp);
// console.log("messaging obj ==",messaging)
// // next block of code goes here
// export const requestFirebaseNotificationPermission = () =>
// // console.log("running fun")

//   new Promise((resolve, reject) => {
//     messaging
//       .requestPermission()
//       .then(() => getToken(messaging))
//       .then((firebaseToken) => {
//         resolve(firebaseToken);
//         console.log("firebase token = ",firebaseToken);
//         console.log("getToken",getToken)
//       })
//       .catch((err) => {
//         reject(err);
//       });
//   });

//   // const checkToken = async () => {
//   //   console.log("checkingTokensss")
//   //   const fcmToken = await messaging().getToken();
    
//   //      console.log("myToken",fcmToken);
     
//   //  }
//   //  checkToken()

// export const onMessageListener = () =>
//   new Promise((resolve) => {
//     onMessage((payload) => {
//       resolve(payload);
//     });
//   });

