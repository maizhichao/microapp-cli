const { execSync } = require("child_process");

const start = () => {
  execSync("yarn", { stdio: "inherit" });
};

module.exports = {
  start
};
