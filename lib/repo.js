const CLI = require("clui");
const Spinner = CLI.Spinner;
const { execSync } = require("child_process");

module.exports = {
  setupRepo: () => {
    const status = new Spinner("Initializing local repository...");
    status.start();

    try {
      execSync(`git init && git add . && git commit -m "Initial commit"`, {
        stdio: "inherit"
      });
    } finally {
      status.stop();
    }
  }
};
