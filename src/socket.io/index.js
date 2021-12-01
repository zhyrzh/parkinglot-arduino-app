const { addParkingSession } = require("../helpers");

// INITIAL CONNECTION HANDLER
module.exports.onSocketConnect = (io) => {
  io.on("connection", (socket) => {
    console.log("Socket conneciton success!");
    socket.on("message", (message) => {
      console.log("Socket connected");
    });
  });
};

// RETURNS STATUS OF A PARKING SLOT (EMPTY OR OCCUPIED)
module.exports.detectParkingSlotStatus = (io, parser) => {
  parser.on("data", (data) => {
    addParkingSession(data);
    io.emit("message", data);
  });
};
