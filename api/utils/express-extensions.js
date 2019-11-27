const httpStatus = require("http-status-codes");

const { AppError, RecordNotFound } = require("../app-errors");
const errorLogger = require("../logger")("error");

function init(express) {
  express.request.getClientIp = function getClientIp() {
    var req = this;
    let ip =
      (req.headers["x-forwarded-for"] || "").split(",").pop() ||
      req.connection.remoteAddress ||
      req.socket.remoteAddress ||
      (req.connection.socket && req.connection.socket.remoteAddress);

    return ip;
  };

  express.response.sendError = function sendError(errorCode, error) {
    const response =
      error instanceof AppError
        ? { error: { code: error.code, args: error.args } }
        : { error: { code: "defaultError" } };

    const logMessage = Object.assign({}, response);
    logMessage.errorCode = errorCode;
    logMessage.details = error;

    errorLogger.error(logMessage);

    if (process.env.ALLOW_DETAILED_ERROR_MESSAGES == "y") {
      response.details = error;
    }

    this.status(errorCode).json(response);
  };

  express.response.sendBadRequest = function sendBadRequest(error) {
    this.sendError(httpStatus.BAD_REQUEST, error);
  };

  express.response.sendNotFound = function sendNotFound(error) {
    this.sendError(httpStatus.NOT_FOUND, error);
  };

  express.response.sendUnauthorized = function sendUnauthorized(error) {
    this.sendError(httpStatus.UNAUTHORIZED, error);
  };

  express.response.sendInternalError = function sendInternalError(error) {
    const self = this;
    if (error && error instanceof RecordNotFound) {
      return self.sendNotFound(error);
    }

    self.sendError(httpStatus.INTERNAL_SERVER_ERROR, error);
  };

  express.response.sendOk = function sendOk(response) {
    const self = this;
    response = response || {};
    return self.status(httpStatus.OK).send(response);
  };

  express.response.sendArray = function sendArray(array) {
    const self = this;
    array = array || {};
    return self.sendOk({ data: array });
  };

  express.response.sendNoContent = function sendNoContent() {
    this.sendStatus(httpStatus.NO_CONTENT);
  };
}

module.exports = {
  init
};
