const util = require('util');
const fs = require('fs');

const readFile = util.promisify(fs.readFile);
const writeFile = util.promisify(fs.writeFile);

module.exports = {
  readCache: uri => readFile(uri),
  writeCache: (uri, data) => writeFile(uri, data),
};
