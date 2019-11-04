/* eslint-disable promise/no-nesting */
/* eslint-disable promise/always-return */
const functions = require('firebase-functions');
const admin = require("firebase-admin");
admin.initializeApp(functions.config().firebase);

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });

exports.onMessageSent = functions.https.onRequest((req, res) => {
  const { senderName, messagingToken, message } = req.body;
      console.log(messagingToken);
      const payload = {
        token: messagingToken,
        notification: {
          title: senderName,
          body: message,
        }
      };
      admin
        .messaging()
        .send(payload)
        .then(response => {
            console.log("Successfully sent message:", response);
        })
        .catch(error => console.log("Error sending message:", error));
  });

  exports.onCarWashRequestCreate = functions.firestore
  .document("bookings/{request}")
  .onCreate((snap, context) => {
    const { request } = context.params;
    const data = snap.data();
    console.log('DATA', data);
    const { washerId } = data;

    const db = admin.firestore();
    db.collection("users")
      .doc(washerId)
      .get()
      .then(washer => {
        const { messagingToken } = washer.data();
        const payload = {
          token: messagingToken,
          notification: {
            title: "Car wash request",
            body: "This is test request",
          },
        };
        admin
          .messaging()
          .send(payload)
          .then(response => {
              console.log("Successfully sent message:", response);
          })
          .catch(error => console.log("Error sending message:", error));
      })
      .catch(err => console.log(err));
  });
  