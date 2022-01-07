const { initializeApp } = require("firebase/app");
const { getFirestore } = require("firebase/firestore");
const { firebaseConfig } = require("../configs");

initializeApp(firebaseConfig);
const firestore = getFirestore();

module.exports = firestore;
