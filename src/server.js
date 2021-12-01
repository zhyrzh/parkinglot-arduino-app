const express = require("express");
const app = express();
const SerialPort = require("serialport");
const parsers = SerialPort.parsers;
const httpServer = require("http").createServer(app);
const { Server } = require("socket.io");
const cors = require("cors");
const { corsConfig, arduinoPortConfig } = require("./configs");
const { initializeApp } = require("firebase/app");
const { getFirestore, collection, addDoc } = require("firebase/firestore");

const io = new Server(httpServer, {
  cors: corsConfig,
});
const SERVER_PORT = 5000;

app.use(cors(corsConfig));

const parser = new parsers.Readline();

const ARDUINO_PORT = new SerialPort("/dev/ttyACM0", arduinoPortConfig);

ARDUINO_PORT.pipe(parser);

io.on("connection", (socket) => {
  console.log("Socket conneciton");
  socket.on("message", (message) => {
    console.log("Socket connected");
  });
});

parser.on("data", (data) => {
  addData(data);
  io.emit("message", data);
});

httpServer.listen(SERVER_PORT, () => console.log("Testing"));

const firebaseConfig = {
  apiKey: "AIzaSyATytuhCrhw7Q1hP4VS-MJWvfUCf7nNkgk",
  authDomain: "parkinglot-app-48e99.firebaseapp.com",
  projectId: "parkinglot-app-48e99",
  storageBucket: "parkinglot-app-48e99.appspot.com",
  messagingSenderId: "110528791942",
  appId: "1:110528791942:web:ca6f8cea2ea10c0db0d807",
  measurementId: "G-1PLDEK7JTN",
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
const firestore = getFirestore(firebaseApp);

async function addData(data) {
  try {
    const docRef = await addDoc(collection(firestore, "users"), {
      data,
    });
    console.log("Document written with ID: ", docRef.id);
  } catch (e) {
    console.error("Error adding document: ", e);
  }
}
