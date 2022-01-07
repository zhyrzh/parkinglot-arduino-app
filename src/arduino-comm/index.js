const { arduinoPortConfig, parserConfig } = require("../configs"); // CONFIGS

const SerialPort = require("serialport");
const parsers = SerialPort.parsers;

const parser = new parsers.Readline(parserConfig);
const ARDUINO_PORT = new SerialPort("COM3", arduinoPortConfig);

ARDUINO_PORT.pipe(parser);

module.exports = parser;
