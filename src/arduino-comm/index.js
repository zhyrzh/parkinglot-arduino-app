const { arduinoPortConfig, parserConfig } = require("./configs"); // CONFIGS

const SerialPort = require("serialport");
const parsers = SerialPort.parsers;

const parser = new parsers.Readline(parserConfig);
const ARDUINO_PORT = new SerialPort("/dev/ttyACM0", arduinoPortConfig);

ARDUINO_PORT.pipe(parser);

module.exports = parser;
