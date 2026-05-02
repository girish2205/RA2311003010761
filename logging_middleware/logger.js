const fs = require("fs");

function Log(stack, level, pkg, message) {
  const logMessage = `[${new Date().toISOString()}] [${stack}] [${level}] [${pkg}] ${message}\n`;
  fs.appendFileSync("app.log", logMessage);
}

module.exports = Log;