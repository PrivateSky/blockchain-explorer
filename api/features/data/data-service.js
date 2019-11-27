const readline = require("readline");
const fs = require("fs");
const path = require("path");
const Promise = require("bluebird");

const logger = require("../../logger")("api");

const readFile = Promise.promisify(fs.readFile);

const CURRENT_VERSION_FILE_PATH = process.env.CURRENT_VERSION_FILE_PATH;
const TRANSACTIONS_LOG_FILE_PATH = process.env.TRANSACTIONS_LOG_FILE_PATH;

const ASSET_TYPE_EXTRACTION_REGEX = /^[\w\d]*.([\d\w]*)\/([\d\w]*)$/;
let currentVersionData;
let transactionsLogData;

function parseJsonProperties(obj) {
  if (!obj) return;
  if (typeof obj !== "object") return;

  Object.keys(obj).forEach(key => {
    if (!obj[key]) return;
    if (typeof obj[key] !== "string") return;

    try {
      obj[key] = JSON.parse(obj[key]);
    } catch (error) {
      logger.error(`Error while parsing property ${key} of ${JSON.stringify(obj)}!`);
      logger.error(error);
    }
  });
}

function processCurrentVersion(currentVersion) {
  if (!currentVersion) return;

  currentVersion = JSON.parse(currentVersion);
  parseJsonProperties(currentVersion.cset);

  let processedInfo = {};

  let cset = currentVersion.cset;
  let pskDbKeys = Object.keys(cset);

  let assetTypesMap = {};
  pskDbKeys.forEach(pskKey => {
    let keyDataExtraction = ASSET_TYPE_EXTRACTION_REGEX.exec(pskKey);
    let assetType = keyDataExtraction[1];
    let assetId = keyDataExtraction[2];

    if (!assetType || !assetId) return;

    if (!assetTypesMap[assetType]) {
      assetTypesMap[assetType] = {
        name: assetType,
        assets: []
      };
    }

    let assetTypeHolder = assetTypesMap[assetType];

    if (assetId.toLowerCase() === "aliases") {
      assetTypeHolder.aliases = cset[pskKey];
    } else {
      assetTypeHolder.assets.push({
        id: assetId,
        data: cset[pskKey]
      });
    }
  });

  let assetTypes = Object.keys(assetTypesMap).map(assetType => {
    let aliases = assetTypesMap[assetType].aliases || {};
    let assetAliases = {};

    Object.keys(aliases).forEach(aliasName => {
      let assetId = aliases[aliasName];
      assetAliases[assetId] = aliasName;
    });

    let assets = assetTypesMap[assetType].assets;
    assets.forEach(asset => {
      asset.alias = assetAliases[asset.id];
    });

    return {
      name: assetType,
      assets: assetTypesMap[assetType].assets,
      aliases: assetTypesMap[assetType].aliases
    };
  });

  processedInfo = {
    assetTypes
  };

  return processedInfo;
}

function processTransaction(transaction) {
  transaction = JSON.parse(transaction);

  let txId;

  Object.keys(transaction).forEach(txObjectKey => {
    if (!txId && typeof txObjectKey === "string" && txObjectKey.length === 64) {
      txId = txObjectKey;
    }

    if (typeof transaction[txObjectKey] != "object") return;

    let tx = transaction[txObjectKey];

    parseJsonProperties(tx.output);

    if (tx.swarm) {
      parseJsonProperties(tx.swarm.output);
    }
  });

  return {
    txId,
    data: transaction
  };
}

function getCurrentVersionData({ forceRefresh = false } = {}) {
  if (currentVersionData && !forceRefresh) return Promise.resolve(currentVersionData);

  logger.info(`Loading currentVersion: ${CURRENT_VERSION_FILE_PATH}`);

  return readFile(CURRENT_VERSION_FILE_PATH, "utf8").then(contents => {
    logger.info("currentVersion file loaded.");

    currentVersionData = processCurrentVersion(contents);

    return currentVersionData;
  });
}

function getTransactionsLog({ forceRefresh = false } = {}) {
  if (transactionsLogData && !forceRefresh) return Promise.resolve(transactionsLogData);

  logger.info(`Loading transactionsLog: ${TRANSACTIONS_LOG_FILE_PATH}`);

  return new Promise((resolve, reject) => {
    transactionsLogData = [];

    var fileStream = fs.createReadStream(TRANSACTIONS_LOG_FILE_PATH);
    fileStream.on("error", function(err) {
      logger.error("An error has occured while reading the transactionsLog file");
      logger.error(err);
      reject(err);
    });

    let transactionsRl = readline.createInterface({
      input: fileStream
    });

    transactionsRl.on("line", function(line) {
      let transaction = processTransaction(line);
      transactionsLogData.push(transaction);
    });

    // end
    transactionsRl.on("close", function() {
      logger.info("transactionsLog loaded");
      resolve(transactionsLogData);
    });
  });
}

module.exports = {
  getCurrentVersionData,
  getTransactionsLog
};
