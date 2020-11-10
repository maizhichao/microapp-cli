// Makes the script crash on unhandled rejections instead of silently
// ignoring them. In the future, promise rejections that are not handled will
// terminate the Node.js process with a non-zero exit code.
process.on("unhandledRejection", err => {
  throw err;
});

// Ensure environment variables are read.
require("../config/env");

const path = require("path");
const chalk = require("react-dev-utils/chalk");
const fs = require("fs-extra");
const webpack = require("webpack");
const makeWebpackLibConfig = require("../config/webpack.config.lib");
const paths = require("../config/paths");
const formatWebpackMessages = require("react-dev-utils/formatWebpackMessages");
const FileSizeReporter = require("react-dev-utils/FileSizeReporter");
const printBuildError = require("react-dev-utils/printBuildError");

const measureFileSizesBeforeBuild =
  FileSizeReporter.measureFileSizesBeforeBuild;

const isInteractive = process.stdout.isTTY;

const libBuildFolder = path.resolve(paths.appBuild, "library");

// We require that you explicitly set browsers and do not fall back to
// browserslist defaults.
const { checkBrowsers } = require("react-dev-utils/browsersHelper");
function buildLib(localUrlForBrowser) {
  return checkBrowsers(paths.appPath, isInteractive)
    .then(() => {
      // First, read the current file sizes in build directory.
      // This lets us display how much they changed later.
      return measureFileSizesBeforeBuild(libBuildFolder);
    })
    .then(previousFileSizes => {
      // Remove all content but keep the directory so that
      // if you're in it, you don't end up in Trash
      fs.emptyDirSync(paths.appBuild);
      // Start the webpack build
      return build(previousFileSizes, localUrlForBrowser);
    })
    .then(
      ({ warnings }) => {
        if (warnings.length) {
          console.log(chalk.yellow("Compiled with warnings.\n"));
          console.log(warnings.join("\n\n"));
          console.log(
            "\nSearch for the " +
              chalk.underline(chalk.yellow("keywords")) +
              " to learn more about each warning."
          );
          console.log(
            "To ignore, add " +
              chalk.cyan("// eslint-disable-next-line") +
              " to the line before.\n"
          );
        } else {
          console.log(chalk.green("Compiled successfully.\n"));
        }
      },
      err => {
        const tscCompileOnError = process.env.TSC_COMPILE_ON_ERROR === "true";
        if (tscCompileOnError) {
          console.log(
            chalk.yellow(
              "Compiled with the following type errors (you may want to check these before deploying your app):\n"
            )
          );
          printBuildError(err);
        } else {
          console.log(chalk.red("Failed to compile.\n"));
          printBuildError(err);
          process.exit(1);
        }
      }
    )
    .catch(err => {
      if (err && err.message) {
        console.log(err.message);
      }
      process.exit(1);
    });
}

// Create the production build and print the deployment instructions.
function build(previousFileSizes, localUrlForBrowser) {
  console.log("Creating share libraries...");

  const compiler = webpack(makeWebpackLibConfig(localUrlForBrowser));
  return new Promise((resolve, reject) => {
    compiler.run((err, stats) => {
      let messages;
      if (err) {
        if (!err.message) {
          return reject(err);
        }

        let errMessage = err.message;

        messages = formatWebpackMessages({
          errors: [errMessage],
          warnings: []
        });
      } else {
        messages = formatWebpackMessages(
          stats.toJson({ all: false, warnings: true, errors: true })
        );
      }
      if (messages.errors.length) {
        // Only keep the first error. Others are often indicative
        // of the same problem, but confuse the reader with noise.
        if (messages.errors.length > 1) {
          messages.errors.length = 1;
        }
        return reject(new Error(messages.errors.join("\n\n")));
      }
      if (
        process.env.CI &&
        (typeof process.env.CI !== "string" ||
          process.env.CI.toLowerCase() !== "false") &&
        messages.warnings.length
      ) {
        console.log(
          chalk.yellow(
            "\nTreating warnings as errors because process.env.CI = true.\n" +
              "Most CI servers set it automatically.\n"
          )
        );
        return reject(new Error(messages.warnings.join("\n\n")));
      }

      const resolveArgs = {
        stats,
        previousFileSizes,
        warnings: messages.warnings
      };

      return resolve(resolveArgs);
    });
  });
}

module.exports = buildLib;
