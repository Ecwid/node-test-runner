module.exports = function(verbose) {
  var binstall = require("binstall");
  var path = require("path");
  var fs = require("fs");
  var packageInfo = require(path.join(__dirname, "package.json"));

  var binVersion = packageInfo.version;

  // 'arm', 'ia32', or 'x64'.
  var arch = process.arch;

  // 'darwin', 'freebsd', 'linux', 'sunos' or 'win32'
  var operatingSystem = process.platform;

  var filename = operatingSystem + "-" + arch + ".tar.gz";
  var url = "https://public-nexus.ecwid.com/repository/raw-hosted/elm-test/" +
    binVersion +
    "/" +
    filename;

  var binariesDir = path.join(__dirname, "bin");
  var binaryExtension = process.platform === "win32" ? ".exe" : "";
  var executablePaths = [
    path.join(binariesDir, "elm-interface-to-json" + binaryExtension)
  ];
  var errorMessage = "failed to download binary from " + url;

  return binstall(
    url,
    { path: binariesDir },
    {
      verbose: verbose,
      verify: executablePaths,
      errorMessage: errorMessage
    }
  );
};
