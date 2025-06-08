const fs = require('fs');
const path = require('path');

const logPath = path.join(__dirname, '..', 'transactions.log');

exports.log = (message) => {
  const log = `[${new Date().toISOString()}] ${message}\n`;
  fs.appendFileSync(logPath, log);
};
