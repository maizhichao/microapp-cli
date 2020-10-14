const chalk = require("chalk");
const currentNodeVersion = process.versions.node;
const semver = currentNodeVersion.split(".");
const major = semver[0];

module.exports = {
  validateNodeVersion: () => {
    if (major < 12) {
      console.log(
        chalk.red(
          "You are running Node " +
            currentNodeVersion +
            ".\n" +
            "Create Micro App requires Node 12 or higher. \n" +
            "Please update your version of Node."
        )
      );
      process.exit();
    }
  }
};
