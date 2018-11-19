/* eslint-disable no-undef */
const { loadLang } = TesseractJSUtils;
const LANG_URI = 'https://cdn.jsdelivr.net/gh/naptha/tessdata@gh-pages/4.0.0';
const ONE_LANG = 'slk_frak';
const TWO_LANGS = 'slk_frak+fas';
const THREE_LANGS = 'slk_frak+fas+mri';

describe('loadLang', () => {
  it(`load 1 lang from ${LANG_URI}`, (done) => {
    loadLang({ langs: ONE_LANG, langURI: LANG_URI })
      .then((langs) => {
        expect(langs.length).to.be(1);
        expect(langs[0].length).not.to.be(0);
        done();
      });
  }).timeout(60000);

  it(`load 2 langs from ${LANG_URI}`, (done) => {
    loadLang({ langs: TWO_LANGS, langURI: LANG_URI })
      .then((langs) => {
        expect(langs.length).to.be(2);
        expect(langs[0].length).not.to.be(0);
        expect(langs[1].length).not.to.be(0);
        done();
      });
  }).timeout(60000);

  it(`load 3 langs from ${LANG_URI}`, (done) => {
    loadLang({ langs: THREE_LANGS, langURI: LANG_URI })
      .then((langs) => {
        expect(langs.length).to.be(3);
        expect(langs[0].length).not.to.be(0);
        expect(langs[1].length).not.to.be(0);
        expect(langs[2].length).not.to.be(0);
        done();
      });
  }).timeout(60000);
});
