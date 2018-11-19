module.exports = {
  loadLang: require('./loadLang')({
    fetch: require('./common/browser/fetch'),
    gunzip: require('./common/browser/gunzip'),
    ...require('./common/browser/cache'),
  }),
  readImage: require('./readImage'),
};
