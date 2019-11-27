const express = require("express");

function trimObjectProperties(objectToTrim) {
  if (typeof objectToTrim !== "object") return objectToTrim;

  for (let key in objectToTrim) {
    if (objectToTrim[key] === "") {
      objectToTrim[key] = null;
    }

    if (!objectToTrim[key]) continue;

    if (objectToTrim[key].constructor && objectToTrim[key].constructor == Object) {
      trimObjectProperties(objectToTrim[key]);
    } else if (objectToTrim[key].trim) {
      let value = objectToTrim[key].trim();
      if (value === "") {
        value = null;
      }

      objectToTrim[key] = value;
    }
  }
}

class Controller {
  constructor(app, options) {
    this.app = app;
    this.options = options || {};
    this.router = express.Router();
  }

  init(routePrefix) {
    this.onInitialising();

    this.registerRoutes();
    this.app.use(routePrefix, this.router);
  }

  onInitialising() {}

  authenticate(req, res, next) {
    if (!req.isAuthenticated() || !req.user) return res.sendUnauthorized();
    if (req.user.is2faEnabled && !req.user.is2faTokenValidated) return res.sendUnauthorized();
    next();
  }

  defaultInputFilter(req, res, next) {
    switch (req.method) {
      case "POST":
      case "PUT":
        if (!req.body) {
          return res.sendBadRequest("empty body");
        }

        trimObjectProperties(req.body);
        break;
    }

    next();
  }

  getInputFilter() {
    return function filterInput(req, res, next) {
      switch (req.method) {
        case "POST":
        case "PUT":
          if (!req.body) {
            return res.sendBadRequest("empty body");
          }

          trimObjectProperties(req.body);
          break;
      }

      next();
    };
  }

  getSingleFieldBodySanitizer(fieldName, type = "string") {
    return (req, res, next) => {
      let fieldValue = type == "int" ? req.bodyInt(fieldName) : req.bodyString(fieldName);
      if (!fieldValue) return res.sendBadRequest(fieldName);

      req.sanitizedBody = req.sanitizedBody || {};
      req.sanitizedBody[fieldName] = fieldValue;
      next();
    };
  }

  getSingleFieldQuerySanitizer(fieldName, type = "string") {
    return (req, res, next) => {
      let fieldValue = type == "int" ? req.queryInt(fieldName) : req.queryString(fieldName);
      if (!fieldValue) return res.sendBadRequest(fieldName);

      req.sanitizedQuery = req.sanitizedQuery || {};
      req.sanitizedQuery[fieldName] = fieldValue;
      next();
    };
  }
}

module.exports = Controller;
