import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
import { userInfo } from "os";

// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
// export const helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });

admin.initializeApp(functions.config().firebase);

export const addMessage = functions.https.onRequest((req, res) => {
  const phone = req.query.phone;
  const code = req.query.code;

  admin
    .auth()
    .getUserByPhoneNumber(phone)
    .then(userRecord => {
      const ref = admin.database().ref(`users/${userRecord.uid}/verification`);
      ref.on("value", snapshot => {
        ref.off();
        const verification = snapshot.val();
        const timeNow = Date.now();

        if (
          verification.code !== code ||
          !verification.valid ||
          timeNow > verification.expiration
        ) {
          return res.status(422).send({ error: "Code not valid" });
        }

        ref.update({ valid: false });
        return admin
          .auth()
          .createCustomToken(userRecord.uid)
          .then(token => res.send({ token }));
      });
    });
});
