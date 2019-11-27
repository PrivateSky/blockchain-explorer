/* eslint-disable no-console */
const fs = require("fs");
const path = require("path");
const rimraf = require("rimraf");
const chalk = require("chalk");
const archiver = require("archiver");
const ncp = require("ncp").ncp;
ncp.limit = 16;

const chalkError = chalk.red;
const chalkWarning = chalk.yellow;
const chalkSuccess = chalk.green;

const sourceApiFolder = path.join(__dirname, "../api");
const sourceDistFolder = path.join(__dirname, "../dist");
const sourceStaticFolder = path.join(__dirname, "../src/static");

const deployFolder = path.join(__dirname, "../deployment");
const destinationPublicFolder = path.join(deployFolder, "public");
const destinationDistFolder = path.join(deployFolder, "public");
const destinationStaticFolder = path.join(deployFolder, "public/static");

(function run() {
  cleanup();
  copyFiles()
    .then(() => zipContent())
    .catch(err => console.error(chalkError(err)));
})();

function cleanup() {
  rimraf.sync(deployFolder);
  try {
    fs.mkdirSync(deployFolder);
  } catch (error) {
    console.log(chalkWarning(error));
  }
  try {
    fs.mkdirSync(destinationPublicFolder);
  } catch (error) {
    console.log(chalkWarning(error));
  }
}

function copyFiles() {
  let apiCopy = new Promise((resolve, reject) => {
    const apiCopyOptions = {
      filter: /^((?!node_modules|\.env|\.eslintrc.*|yarn\.lock|package-lock\.json|logs|sessions|.*\.db|\.editorconfig|\.gitignore|\.npmrc|\.prettierrc|.*\.log).)*$/
    };
    ncp(sourceApiFolder, deployFolder, apiCopyOptions, function(err) {
      if (err) return reject(err);

      console.log(chalkSuccess("Copying api folder completed!"));

      const distCopyOptions = {
        filter: /^(?!.*\.map).*$/
      };
      ncp(sourceDistFolder, destinationDistFolder, distCopyOptions, function(err) {
        if (err) return reject(err);
        console.log(chalkSuccess("Copying dist folder completed!"));

        const sourceStaticCopyOptions = {
          filter: /^((?!sitemap.xml|robots.txt).)*$/
        };
        ncp(sourceStaticFolder, destinationStaticFolder, sourceStaticCopyOptions, function(err) {
          if (err) return reject(err);

          console.log(chalkSuccess("Copying static folder completed!"));
          return resolve();
        });
      });
    });
  });

  let packageJsonCopy = new Promise((resolve, reject) => {
    ncp(path.join(__dirname, "../package.json"), path.join(deployFolder, "package.json"), function(err) {
      if (err) reject(err);
      console.log(chalkSuccess("Copying package.json file completed!"));
      resolve();
    });
  });

  let faviconCopy = new Promise((resolve, reject) => {
    ncp(path.join(__dirname, "../src/favicon.ico"), path.join(destinationPublicFolder, "favicon.ico"), function(err) {
      if (err) return reject(err);
      console.log(chalkSuccess("Copying favicon.ico file completed!"));
      resolve();
    });
  });

  // let sitemapCopy = new Promise((resolve, reject) => {
  //   ncp(path.join(__dirname, "../src/static/sitemap.xml"), path.join(destinationPublicFolder, "sitemap.xml"), function(
  //     err
  //   ) {
  //     if (err) return reject(err);
  //     console.log(chalkSuccess("Copying sitemap.xml file completed!"));
  //     resolve();
  //   });
  // });

  // let robotsCopy = new Promise((resolve, reject) => {
  //   ncp(path.join(__dirname, "../src/static/robots.txt"), path.join(destinationPublicFolder, "robots.txt"), function(
  //     err
  //   ) {
  //     if (err) return reject(err);
  //     console.log(chalkSuccess("Copying robots.txt file completed!"));
  //     resolve();
  //   });
  // });

  return Promise.all([apiCopy, packageJsonCopy, faviconCopy]);
}

function zipContent() {
  return new Promise((resolve, reject) => {
    let outputZipStream = fs.createWriteStream(path.join(__dirname, "../deployment.zip"));
    let archive = archiver("zip");

    outputZipStream.on("close", function() {
      console.log(chalkSuccess(archive.pointer() + " total bytes"));
      console.log(chalkSuccess("archiver has been finalized and the outputZipStream file descriptor has closed."));
      resolve();
    });

    archive.on("error", function(err) {
      reject(err);
    });

    archive.pipe(outputZipStream);
    archive.directory(deployFolder, false);
    archive.finalize();
  });
}
