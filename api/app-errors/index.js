class AppError extends Error {
  constructor(errorCode = "appError", error, args = []) {
    super();

    this.code = errorCode;
    this.error = error;
    this.stack = new Error().stack;
    this.args = args;
  }
}

class AppErrorWithArgs extends AppError {
  constructor(errorCode, args, error) {
    super(errorCode, error, args);
  }
}

class RecordNotFound extends AppError {
  constructor(error) {
    super("recordNotFound", error);
  }
}

module.exports = {
  AppError,
  AppErrorWithArgs,
  RecordNotFound,
};
