const fs = require("fs");
const path = require("path");
const escapeStringRegexp = require("escape-string-regexp");

class ImportmapWebpackPlugin {
  constructor({ filename = "importmap.json", from, replacements = {} }) {
    this.filename = filename;
    this.from = from;
    this.replacements = replacements;
  }

  apply(compiler) {
    compiler.hooks.emit.tapAsync(
      "ImportmapWebpackPlugin",
      (compilation, callback) => {
        const filePath = path.resolve(this.from, this.filename);
        if (!fs.existsSync(filePath)) {
          console.error(`ImportmapWebpackPlugin: ${filePath} not found!`);
          process.exit(1);
        }
        let importmap = fs.readFileSync(filePath, { encoding: "utf8" });
        Object.keys(this.replacements).forEach(key => {
          const value = this.replacements[key];
          importmap = importmap.replace(
            new RegExp("%" + escapeStringRegexp(key) + "%", "g"),
            value
          );
        });
        // Insert this list into the webpack build as a new file asset:
        compilation.assets[this.filename] = {
          source: function () {
            return importmap;
          },
          size: function () {
            return importmap.length;
          }
        };

        callback();
      }
    );
  }
}

module.exports = ImportmapWebpackPlugin;
