// STANDARD PACKAGE INPUTS
const express = require("express");
const app = express();
const httpServer = require("http").createServer(app);
const { Server } = require("socket.io");
const cors = require("cors");
require("dotenv").config();

const { corsConfig, socketConfig } = require("./configs"); // CONFIGS
const parser = require("./arduino-comm"); // ARDUINO PARSER
const { onSocketConnect, detectParkingSlotStatus } = require("./socket.io"); // WEB SOCKETS

const io = new Server(httpServer, socketConfig);
const SERVER_PORT = 5000;

app.use(cors(corsConfig));
onSocketConnect(io);
detectParkingSlotStatus(io);

httpServer.listen(SERVER_PORT, () => console.log("Testing"));
