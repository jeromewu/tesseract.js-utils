/* eslint-disable no-undef */
const { readImage } = TesseractJSUtils;
const testocr = { width: 640, height: 480 };
const formats = ['jpg', 'pbm', 'png'];

const duplicateIt = (desc, callback, { timeout }) => {
  it(`[ASM]: ${desc}`, callback(TesseractCoreASM)).timeout(timeout);
  it(`[WASM]: ${desc}`, callback(TesseractCoreWASM)).timeout(timeout);
};

const loadImageCases = {};

formats.forEach((format) => {
  loadImageCases[`read ${format} format`] = TesseractCore => (done) => {
    TesseractCore().then((TessModule) => {
      fetch(`http://localhost:3000/tests/assets/images/testocr.${format}`)
        .then(resp => resp.arrayBuffer())
        .then((buf) => {
          const { w, h, data } = readImage(TessModule, new Uint8Array(buf));
          expect(w).to.be(testocr.width);
          expect(h).to.be(testocr.height);
          TessModule._free(data);
          done();
        });
    });
  };
});

describe('loadImage', () => {
  Object.keys(loadImageCases).forEach((key) => {
    duplicateIt(key, loadImageCases[key], { timeout: 3000 });
  });
});
