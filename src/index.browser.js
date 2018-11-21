const cache = require('./common/browser/cache');

module.exports = {
  loadLang: require('./loadLang')({
    fetch: require('./common/browser/fetch'),
    gunzip: require('./common/browser/gunzip'),
    ...cache,
  }),
  readImage: require('./readImage'),
  cache,
};
