const inquirer = require("inquirer");
const files = require("./files");

const ModuleType = {
  BASE: "base module",
  CHILD: "child module"
};

const packageNameRegex = /^(?:@[a-z0-9-*~][a-z0-9-*._~]*\/)?[a-z0-9-~][a-z0-9-._~]*$/;
const reduxReducerKey = /^[a-z]+$/;

module.exports = {
  askModuleType: async () => {
    const questions = [
      {
        type: "list",
        name: "MICROAPP_MODULE_TYPE",
        message: "Select the module type you want to install:",
        choices: [ModuleType.BASE, ModuleType.CHILD]
      }
    ];
    const res = await inquirer.prompt(questions);
    return res.MICROAPP_MODULE_TYPE;
  },
  askRepoInfo: moduleType => {
    const argv = require("minimist")(process.argv.slice(2));

    const defaultPackageName = argv._[0] || files.getCurrentDirectoryBase();

    const isChildModule = moduleType === ModuleType.CHILD;

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
          if (packageNameRegex.test(value)) {
            return true;
          }
          return "Please enter a name for the npm package:\n(matching /^(?:@[a-z0-9-*~][a-z0-9-*._~]*/)?[a-z0-9-~][a-z0-9-._~]*$/).";
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
        type: "input",
        name: "MICROAPP_LOCALHOST_PORT",
        default: 5000,
        message: "Please enter the localhost port:"
      },
      isChildModule && {
        type: "input",
        name: "MICROAPP_BASE_MODULE_NAME",
        message: "Please enter the base module name:",
        validate: function (value) {
          if (packageNameRegex.test(value)) {
            return true;
          }
          return "Please enter the name of the base module:\n(matching /^(?:@[a-z0-9-*~][a-z0-9-*._~]*/)?[a-z0-9-~][a-z0-9-._~]*$/).";
        }
      },
      isChildModule && {
        type: "input",
        name: "MICROAPP_CHILD_MODULE_REDUX_KEY",
        message:
          "Please enter the redux reducer key: (single word in lowercase)",
        validate: function (value) {
          if (reduxReducerKey.test(value)) {
            return true;
          }
          return "Please enter the redux reducer key: (single word in lowercase)";
        }
      }
    ].filter(Boolean);
    return inquirer.prompt(questions);
  }
};
