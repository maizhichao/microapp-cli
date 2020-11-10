const path = require("path");
const paths = require("./paths");
const webpack = require("webpack");
const fs = require("fs");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const ImportmapWebpackPlugin = require("./webpack-plugins/importmap-webpack-plugin");

const isEnvProduction = process.env.NODE_ENV === "production";

function makeWebpackLibConfig(localUrlForBrowser) {
  if (!fs.existsSync(paths.appBuild)) {
    fs.mkdirSync(paths.appBuild);
  }

  const entry = {
    antd: path.resolve(paths.appNodeModules, "antd"),
    "react-router": path.resolve(paths.appNodeModules, "react-router"),
    "react-dom-server": path.resolve(paths.appNodeModules, "react-dom/server"),
    axios: path.resolve(paths.libPath, "axios.js"),
    lodash: path.resolve(paths.appNodeModules, "lodash"),
    moment: path.resolve(paths.libPath, "moment.js")
  };

  const externals = [/^react$/, /^react-dom$/];

  const output = {
    path: path.resolve(paths.appBuild, "library"),
    pathinfo: !isEnvProduction,
    libraryTarget: "system",
    filename: "[name].js"
  };

  const reactBundle = !isEnvProduction ? "development" : "production.min";

  const plugins = [
    new ImportmapWebpackPlugin({
      from: path.resolve(paths.libPath),
      filename: "importmap.json",
      replacements: {
        PUBLIC_URL: localUrlForBrowser || "%PUBLIC_URL%"
      }
    }),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: `node_modules/react/umd/react.${reactBundle}.js`,
          to: `${paths.appBuild}/library/react.js`
        },
        {
          from: `node_modules/react-dom/umd/react-dom.${reactBundle}.js`,
          to: `${paths.appBuild}/library/react-dom.js`
        },
        {
          from: "node_modules/systemjs/dist",
          to: `${paths.appBuild}/library/systemjs`
        }
      ]
    }),
    isEnvProduction &&
      new webpack.DefinePlugin({
        "process.env": {
          NODE_ENV: JSON.stringify("production")
        }
      })
  ].filter(Boolean);

  const rules = [{ parser: { system: false } }];

  return {
    mode: isEnvProduction ? "production" : "development",
    devtool: isEnvProduction ? false : "source-map",
    bail: isEnvProduction,
    entry: entry,
    output: output,
    module: {
      strictExportPresence: true,
      rules: rules
    },
    resolve: {
      extensions: [".js", ".ts", ".tsx", ".json", ".jsx"]
    },
    externals: externals,
    plugins: plugins
  };
}

module.exports = makeWebpackLibConfig;
