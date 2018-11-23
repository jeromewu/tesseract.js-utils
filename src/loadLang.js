const isURL = require('is-url');

const handleLang = modules => ({
  TessModule,
  dataPath,
  cachePath,
  cacheMethod,
  lang,
}) => (data) => {
  if (TessModule) {
    if (dataPath) {
      try {
        TessModule.FS.mkdir(dataPath);
      } catch (err) {
        // TODO: Do some error handling here.
      }
    }
    TessModule.FS.writeFile(`${dataPath || '.'}/${lang}.traineddata`, data);
  }
  if (['write', 'refresh', undefined].includes(cacheMethod)) {
    return modules.writeCache(`${cachePath || '.'}/${lang}.traineddata`, data)
      .then(() => data);
  }

  return data;
};

const loadAndGunzipFile = modules => ({
  langPath,
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
    .catch(() => {
      const fetchTrainedData = iLangPath => (
        modules.fetch(`${iLangPath}/${lang}.traineddata.gz`)
          .then(resp => resp.arrayBuffer())
          .then(buf => modules.gunzip(new Uint8Array(buf)))
          .then(handleLang(modules)({
            cachePath, cacheMethod, lang, ...options,
          }))
      );

      /** When langPath is an URL, just do the fetch */
      if (isURL(langPath)) {
        return fetchTrainedData(langPath);
      }

      /** When langPath is not an URL in browser environment */
      if (process.browser) {
        return fetchTrainedData(modules.resolveURL(langPath));
      }

      /** When langPath is not an URL in Node.js environment */
      return modules.readCache(`${langPath}/${lang}.traineddata.gz`)
        .then(buf => modules.gunzip(new Uint8Array(buf)))
        .then(handleLang(modules)({
          cachePath, cacheMethod, lang, ...options,
        }));
    });
};

/**
 *
 * @name loadLang
 * @function load language(s) from local cache, download from remote if not in cache.
 * @param {object} options
 * @param {string} options.lang - langs to load, use '+' for multiple languages, ex: eng+chi_tra
 * @param {object} options.TessModule - TesseractModule
 * @param {string} options.langPath - prefix path for downloading lang file
 * @param {string} options.cachePath - path to find cache
 * @param {string} options.dataPath - path to store data in mem
 * @param {string} options.cacheMethod -
 *     method of cache invaliation, should one of following options:
 *       write: read cache and write back (default method)
 *       readOnly: read cache and not to write back
 *       refresh: not to read cache and write back
 *       none: not to read cache and not to write back
 *
 */
module.exports = modules => ({
  lang: langs,
  ...options
}) => (
  Promise
    .all(langs.split('+').map(loadAndGunzipFile(modules)(options)))
);
