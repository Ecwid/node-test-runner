// @flow

const path = require("path"),
  spawn = require("cross-spawn"),
  fs = require("fs-extra"),
  pipeFilename = require("./pipe-filename.js");

function prepareCompiledJsFile(dest/*:string*/) {
  return Promise.all([
    readUtf8(path.join(__dirname, "..", "templates", "before.js")),
    readUtf8(dest),
    readUtf8(path.join(__dirname, "..", "templates", "after.js"))
  ]).then(([before, content, after]) => {
    const finalContent = [
      before,
      "var Elm = (function(module) { ",
      content,
      "return this.Elm;",
      "})({});",
      "var pipeFilename = " + JSON.stringify(pipeFilename) + ";",
      after
    ].join("\n");

    return fs.writeFile(dest, finalContent);
  });
}

function readUtf8(filepath) {
  return new Promise((resolve, reject) => {
    fs.readFile(filepath, {encoding: "utf8"}, (err, contents) =>
      {
        if (err) {
          reject(err);
        } else {
          resolve(contents);
        }
      }
    );
  });
}

module.exports = {prepareCompiledJsFile};
