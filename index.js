#!/usr/bin/env node

const chalk = require("chalk");
const clear = require("clear");
const figlet = require("figlet");
const files = require("./lib/files");
const repo = require("./lib/repo");
const validator = require("./lib/validator");
const install = require("./lib/install");
const inquirer = require("./lib/inquirer");

clear();

console.log(
  chalk.yellow(figlet.textSync("microapp", { horizontalLayout: "full" }))
);

validator.validateNodeVersion();

const run = async () => {
  files.makeWorkingDirectory();

  const info = await inquirer.askRepoInfo();

  await files.getResources(info);

  install.start();

  repo.setupRepo();

  console.log(
    chalk.green(
      "All done! you can run [yarn run dev] to start your webpack dev server"
    )
  );
};

run();
