module.exports = {
  loadLang: require('./loadLang')({
    fetch: require('./common/node/fetch'),
    gunzip: require('./common/node/gunzip'),
    ...require('./common/node/cache'),
  }),
  readImage: require('./readImage'),
};
