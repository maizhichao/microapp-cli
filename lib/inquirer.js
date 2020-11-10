const inquirer = require("inquirer");
const files = require("./files");

module.exports = {
  askResourceType: () => {
    const questions = [
      {
        type: "list",
        name: "MICROAPP_PROJECT_NAME",
        message: "Select the module type you want to install:",
        choices: ["child module", "base module"]
      }
    ];
    return inquirer.prompt(questions);
  },
  askRepoInfo: () => {
    const argv = require("minimist")(process.argv.slice(2));

    const defaultPackageName = argv._[0] || files.getCurrentDirectoryBase();

    const questions = [
      {
        type: "input",
        name: "MICROAPP_PROJECT_NAME",
        message: "Enter a name for the git repository:",
        default: defaultPackageName,
        validate: function (value) {
          if (value.length) {
            return true;
          } else {
            return "Please enter a name for the repository.";
          }
        }
      },
      {
        type: "input",
        name: "MICROAPP_NPM_PACKAGE_NAME",
        message: "Enter a name for the npm package (all in lowercase):",
        default: defaultPackageName,
        validate: function (value) {
          if (value.length && value === value.toLowerCase()) {
            return true;
          } else {
            return "Please enter a name for the npm package (all in lowercase).";
          }
        }
      },
      {
        type: "input",
        name: "MICROAPP_NPM_PACKAGE_DESCRIPTION",
        default: null,
        message: "Optionally enter a description of the npm package:"
      },
      {
        type: "input",
        name: "MICROAPP_PROJECT_VERSION",
        default: "1.0.0",
        message: "Please enter a version of the project:"
      },
      {
        type: "list",
        name: "MICROAPP_BASE_ANTD_VERSION",
        default: "3.26.18",
        choices: ["^3.26.18", "^4.2.2"],
        message: "Please enter the version of antd:"
      },
      {
        type: "input",
        name: "MICROAPP_LOCALHOST_PORT",
        default: 5000,
        message: "Please enter the localhost port:"
      }
    ];
    return inquirer.prompt(questions);
  }
};
