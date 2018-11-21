const handleLang = modules => ({
  tessModule,
  dataPath,
  cachePath,
  cacheMethod,
  lang,
}) => (data) => {
  if (tessModule) {
    if (dataPath) {
      try {
        tessModule.FS.mkdir(dataPath);
      } catch (err) {
        // TODO: Do some error handling here.
      }
    }
    tessModule.FS.writeFile(`${dataPath || '.'}/${lang}.traineddata`, data);
  }
  if (['write', 'refresh', undefined].includes(cacheMethod)) {
    return modules.writeCache(`${cachePath || '.'}/${lang}.traineddata`, data)
      .then(() => data);
  }

  return data;
};

const loadAndGunzipFile = modules => ({
  langURI,
  cachePath,
  cacheMethod,
  ...options
}) => (lang) => {
  let { readCache } = modules;
  if (['refresh', 'none'].includes(cacheMethod)) {
    readCache = () => Promise.resolve();
  }

  return readCache(`${cachePath || '.'}/${lang}.traineddata`)
    .then((data) => {
      if (typeof data === 'undefined') {
        return Promise.reject();
      }
      return handleLang(modules)({
        cachePath, cacheMethod, lang, ...options,
      })(data);
    })
    .catch(() => (
      // console.log(`Download ${lang}.traineddata.gz from ${langURI}/${lang}.traineddata.gz...`);
      modules.fetch(`${langURI}/${lang}.traineddata.gz`)
        .then(resp => resp.arrayBuffer())
        .then(buf => modules.gunzip(new Uint8Array(buf)))
        .then(handleLang(modules)({
          cachePath, cacheMethod, lang, ...options,
        }))
    ));
};

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
 * @param {string} cacheMethod - method of cache invaliation, should one of following options:
 *  write: read cache and write back (default option)
 *  readOnly: read cache and not to write back (if cache does not exist, it is the same as none)
 *  refresh: not to read cache and write back
 *  none: not to read cache and not to write back
 *
 */
module.exports = modules => ({
  langs,
  ...options
}) => (
  Promise
    .all(langs.split('+').map(loadAndGunzipFile(modules)(options)))
);
