const path = require("path");
const log4js = require("log4js");
const mkdirp = require("mkdirp");

const logFolderPath = path.join(__dirname, "..", "logs");

mkdirp.sync(logFolderPath);

let consoleAppenders = process.env.DISABLE_CONSOLE_LOGGING === "y" ? [] : ["stdout"];

log4js.configure({
  appenders: {
    // console: { type: 'console' },
    stdout: { type: "stdout" },
    stderr: { type: "stderr" },
    dbLogFile: {
      type: "file",
      filename: `${logFolderPath}/db.log`,
      absolute: true,
      maxLogSize: 10240,
      backups: 100
    },
    apiLogFile: {
      type: "file",
      filename: `${logFolderPath}/api.log`,
      absolute: true,
      maxLogSize: 10240,
      backups: 100
    },
    blockchainLogFile: {
      type: "file",
      filename: `${logFolderPath}/blockchain.log`,
      absolute: true,
      maxLogSize: 10240,
      backups: 100
    },
    websocketLogFile: {
      type: "file",
      filename: `${logFolderPath}/websocket.log`,
      absolute: true,
      maxLogSize: 10240,
      backups: 100
    }
  },
  categories: {
    default: { appenders: [...consoleAppenders, "apiLogFile"], level: "info" },
    db: { appenders: [...consoleAppenders, "dbLogFile"], level: "debug" },
    api: { appenders: [...consoleAppenders, "apiLogFile"], level: "info" },
    blockhain: { appenders: [...consoleAppenders, "blockchainLogFile"], level: "info" },
    websocket: { appenders: [...consoleAppenders, "websocketLogFile"], level: "info" }
  }
});

module.exports = (category = "api") => log4js.getLogger(category);
