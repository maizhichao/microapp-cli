const fs = require("fs");
const path = require("path");
const chalk = require("chalk");
const escapeStringRegexp = require("escape-string-regexp");
const ncp = require("ncp").ncp;

let _workingDir;

const getWorkingDir = () => {
  return _workingDir;
};

const getCurrentDirectoryBase = () => {
  return path.basename(process.cwd());
};

const directoryExists = filePath => {
  return fs.existsSync(filePath);
};

const makeWorkingDirectory = () => {
  const argv = require("minimist")(process.argv.slice(2));
  const repoName = argv._[0];
  if (!repoName) {
    console.log(
      chalk.red(
        "Missing argument! you need to provide the repo name, e.x. [create-microapp MyMicroApp]"
      )
    );
    process.exit();
  }
  _workingDir = path.resolve(process.cwd(), repoName);

  if (!fs.existsSync(_workingDir)) {
    fs.mkdirSync(_workingDir);
  } else {
    console.log(chalk.red(`Oops, [${_workingDir}] already exists!`));
    process.exit();
  }
  process.chdir(_workingDir);
};

const interpolateVariables = (filepath, replacements) => {
  if (fs.statSync(filepath).isDirectory()) {
    const files = fs.readdirSync(filepath);
    files.forEach(file => {
      interpolateVariables(filepath + "/" + file, replacements);
    });
  } else {
    let content = fs.readFileSync(filepath, "utf-8");
    Object.keys(replacements).forEach(key => {
      const value = replacements[key];
      content = content.replace(
        new RegExp("{" + escapeStringRegexp(key) + "}", "g"),
        value
      );
    });
    fs.writeFileSync(filepath, content, { encoding: "utf8" });
  }
};

async function copyAsync(source, destination) {
  return new Promise(resolve => {
    ncp(source, destination, err => {
      if (err) {
        console.log(chalk.red(err));
        process.exit(1);
      }
      resolve();
    });
  });
}

async function getResources(resourceType, replacements) {
  const from = resourceType === "child module" ? "module" : "base";
  const resourcesPath = path.resolve(__dirname, `../resources/${from}`);
  await copyAsync(resourcesPath, ".");
  fs.renameSync("gitignore", ".gitignore");
  interpolateVariables(process.cwd(), replacements);
}

module.exports = {
  getWorkingDir,
  getCurrentDirectoryBase,
  directoryExists,
  makeWorkingDirectory,
  getResources
};
