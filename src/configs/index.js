module.exports.corsConfig = {
  origin: "http://localhost:8080",
};

module.exports.arduinoPortConfig = {
  baudRate: 9600,
  dataBits: 8,
  parity: "none",
  stopBits: 1,
  flowControl: false,
};

module.exports.parserConfig = {
  delimiter: "\r\n",
};

module.exports.firebaseConfig = {
  apiKey: process.env.FIREBASE_APIKEY,
  authDomain: process.env.FIREBASE_AUTHDOMAIN,
  projectId: process.env.FIREBASE_PROJECTID,
  storageBucket: process.env.FIREBASE_STORAGEBUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGINGSENDERID,
  appId: process.env.FIREBASE_APPID,
  measurementId: process.env.FIREBASE_MEASUREMENTID,
};

module.exports.socketConfig = {
  cors: this.corsConfig,
};
