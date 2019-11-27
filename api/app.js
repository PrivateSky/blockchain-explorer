require("dotenv").config();
const domain = require("domain");
const express = require("express");
const http = require("http");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const helmet = require("helmet");
const sanitize = require("sanitize");

const features = require("./features");
const expressExtensions = require("./utils/express-extensions");
const errorLogger = require("./logger")("error");
const defaultLogger = require("./logger")();

const env = process.env;
const publicFolderPath = process.env.PUBLIC_FOLDER_PATH;

expressExtensions.init(express);

const app = express();

app.set("port", process.env.SERVER_PORT);
app.disable("x-powered-by");
app.use(helmet());
app.set("trust proxy", 1); // trust first proxy

// setting domain creation middleware
app.use(function(req, res, next) {
  const reqDomain = domain.create();
  reqDomain.add(req);
  reqDomain.add(res);
  reqDomain.on("error", next);
  reqDomain.run(next);
});

// if a static resource is requested then send it without initialising the other middlewares
app.use("/", express.static(publicFolderPath));

app.use(cookieParser());
app.use(bodyParser.json({ extended: true, limit: env.BODY_PARSER_LIMIT }));

app.use(sanitize.middleware);

features.init(app, { publicFolderPath: publicFolderPath });

app.use(function(req, res) {
  res.status(404);

  // respond with html page
  if (req.accepts("html")) {
    res.redirect(`/404`);
    return;
  }

  // respond with json
  if (req.accepts("json")) {
    res.send({ error: "Not found" });
    return;
  }

  // default to plain-text. send()
  res.type("txt").send("Not found");
});

// setting error capturing middleware
app.use(function(err, req, res) {
  errorLogger.error("[capturing middleware] UNCAUGHT EXCEPTION");
  errorLogger.error(err);
  errorLogger.error(err.stack);

  if (env.ALLOW_DETAILED_ERROR_MESSAGES == "y") {
    return res.sendInternalError(err.stack);
  }

  return res.sendInternalError();
});

const server = http.createServer(app);
server.listen(app.get("port"), function() {
  defaultLogger.info(`Express server listening on port ${app.get("port")}`);
});
