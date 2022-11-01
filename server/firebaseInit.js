const admin = require('firebase-admin')
const googleApplicationCredentials = require('./settings')
const serviceAccount = require("./serviceAccount.json");
const mongoose = require("mongoose");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  // databaseURL: process.env.databaseURL
});
const messaging = admin.messaging();
module.exports = messaging