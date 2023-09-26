var admin = require("firebase-admin");
var firebase = require('firebase');
const { firebase_sdk_cred } = require("../cred/env");
firebase.initializeApp(firebase_sdk_cred);
// firebase.initializeApp(firestore_config);


exports.signupWithEmail = (req, res) => {

    let { email, password, name } = req.body

    admin.auth().createUser({ email, password, displayName: name }).then((userRecord) => {
        console.log("Reg uid===>", userRecord.uid);
        console.log("user data===>", userRecord);
        res.status(200).json({ status: 0, message: "user created successfully", data: { email: userRecord.email, displayName: userRecord.displayName } })

    }).catch(err => {
        console.log("error on signup ===>", err);
        res.status(400).json({ status: 0, message: (err?.errorInfo?.message) ? err.errorInfo.message : "error in user signup" })
    })
}



exports.loginWithEmail = (req, res) => {

    let { email, password } = req.body


    firebase.auth().signInWithEmailAndPassword(email, password).then(function (userData) {
        firebase.auth().currentUser.getIdToken(true).then((idToken) => {
            // admin.apps({ email, password, displayName: name }).then((userRecord) => {
            //     console.log("Reg uid===>", userData.uid);
            //     console.log("Reg emailVerified===>", userData.emailVerified);
            res.status(200).json({ status: 0, message: "user login successfully", data: idToken })

        }).catch(err => {
            console.log("error on token validation ===>", err);
            res.status(400).json({ status: 0, message: (err?.errorInfo?.message) ? err.errorInfo.message : "error in user signup" })
        })
    }).catch(err => {
        console.log("error on sign-in ===>", err);
        res.status(400).json({ status: 0, message: (err?.message) ? err.message : "error on sign-in" })
    })
}

