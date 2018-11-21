const cache = require('./common/node/cache');

module.exports = {
  loadLang: require('./loadLang')({
    fetch: require('./common/node/fetch'),
    gunzip: require('./common/node/gunzip'),
    ...cache,
  }),
  readImage: require('./readImage'),
  cache,
};
