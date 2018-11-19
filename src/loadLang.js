const handleLang = modules => ({
  tessModule,
  dataPath,
  cachePath,
  cache,
  lang,
}) => (data) => {
  if (tessModule) {
    if (dataPath) {
      try {
        tessModule.FS.mkdir(dataPath);
      } catch (err) {
        // Do nothing
      }
    }
    tessModule.FS.writeFile(`${dataPath || '.'}/${lang}.traineddata`, data);
  }
  if (cache) {
    modules.writeCache(`${cachePath || '.'}/${lang}.traineddata`, data);
  }
  return data;
};

const loadAndGunzipFile = modules => ({
  langURI,
  cachePath,
  ...options
}) => lang => (
  modules.readCache(`${cachePath || '.'}/${lang}.traineddata`)
    .then((data) => {
      if (typeof data === 'undefined') {
        return Promise.reject();
      }
      return handleLang(modules)({ cachePath, lang, ...options })(data);
    })
    .catch(() => (
      // console.log(`Download ${lang}.traineddata.gz from ${langURI}/${lang}.traineddata.gz...`);
      modules.fetch(`${langURI}/${lang}.traineddata.gz`)
        .then(resp => resp.arrayBuffer())
        .then(buf => modules.gunzip(new Uint8Array(buf)))
        .then(handleLang(modules)({ cachePath, lang, ...options }))
    ))
);

/**
 * Load language(s) from local cache, download from remote if not in cache.
 *
 * All params below actually store in a object.
 *
 * ex:
 *   loadLang({ langs, tesssModule, ... });
 *
 * @name loadLang
 * @function
 * @param {string} langs - langs to load, use '+' for multiple languages, ex: eng+chi_tra
 * @param {object} tessModule - TesseractModule
 * @param {string} langURI - prefix URI for downloading lang file
 * @param {string} cachePath - path to find cache
 * @param {string} dataPath - path to store data in mem
 * @param {boolean} cache - true for caching
 *
 */
module.exports = modules => ({
  langs,
  ...options
}) => (
  Promise
    .all(langs.split('+').map(loadAndGunzipFile(modules)(options)))
);
