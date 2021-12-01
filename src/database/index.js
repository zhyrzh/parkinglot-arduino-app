const { initializeApp } = require("firebase/app");
const { getFirestore, collection, addDoc } = require("firebase/firestore");
const { firebaseConfig } = require("../configs");

const firebaseApp = initializeApp(firebaseConfig);
const firestore = getFirestore(firebaseApp);

module.exports = firestore;
