const { set, get } = require('idb-keyval');

module.exports = {
  readCache: get,
  writeCache: set,
};
