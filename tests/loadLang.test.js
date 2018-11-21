const {
  loadLang,
  cache: {
    deleteCache, checkCache, writeCache, readCache,
  },
} = TesseractJSUtils;
const LANG_URI = 'http://localhost:3000/tests/assets/traineddata';
const ONE_LANG = 'slk_frak';
const TWO_LANGS = 'slk_frak+fas';
const THREE_LANGS = 'slk_frak+fas+mri';

const deleteCaches = langs => (
  Promise.all(
    langs.split('+').map(lang => deleteCache(`./${lang}.traineddata`)),
  )
);

describe('loadLang', () => {
  describe('Load multiple lang', () => {
    it(`load 1 lang from ${LANG_URI}`, (done) => {
      loadLang({ langs: ONE_LANG, langURI: LANG_URI })
        .then((langs) => {
          expect(langs.length).to.be(1);
          expect(langs[0].length).not.to.be(0);
          return deleteCaches(ONE_LANG);
        })
        .then(() => {
          done();
        });
    });

    it(`load 2 langs from ${LANG_URI}`, (done) => {
      loadLang({ langs: TWO_LANGS, langURI: LANG_URI })
        .then((langs) => {
          expect(langs.length).to.be(2);
          expect(langs[0].length).not.to.be(0);
          expect(langs[1].length).not.to.be(0);
          return deleteCaches(TWO_LANGS);
        })
        .then(() => {
          done();
        });
    });

    it(`load 3 langs from ${LANG_URI}`, (done) => {
      loadLang({ langs: THREE_LANGS, langURI: LANG_URI })
        .then((langs) => {
          expect(langs.length).to.be(3);
          expect(langs[0].length).not.to.be(0);
          expect(langs[1].length).not.to.be(0);
          expect(langs[2].length).not.to.be(0);
          return deleteCaches(THREE_LANGS);
        }).then(() => {
          done();
        });
    });
  });

  describe('Cache method', () => {
    it('Not to write with "none" method', (done) => {
      loadLang({ langs: ONE_LANG, langURI: LANG_URI, cacheMethod: 'none' })
        .then(() => checkCache(`./${ONE_LANG}.traineddata`))
        .then((exist) => {
          expect(exist).to.be(false);
          done();
        });
    });

    it('Not to write with "readOnly" method', (done) => {
      loadLang({ langs: ONE_LANG, langURI: LANG_URI, cacheMethod: 'readOnly' })
        .then(() => checkCache(`./${ONE_LANG}.traineddata`))
        .then((exist) => {
          expect(exist).to.be(false);
          done();
        });
    });

    it('Refresh cache with "refresh" method', (done) => {
      writeCache(`./${ONE_LANG}.traineddata`, [])
        .then(() => loadLang({ langs: ONE_LANG, langURI: LANG_URI, cacheMethod: 'refresh' }))
        .then(() => readCache(`./${ONE_LANG}.traineddata`))
        .then((data) => {
          expect(data.length).not.to.be(0);
          return deleteCaches(ONE_LANG);
        })
        .then(() => {
          done();
        });
    });
  });
});
