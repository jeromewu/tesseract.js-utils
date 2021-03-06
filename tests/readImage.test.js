const { readImage } = TesseractJSUtils;
const testocr = { width: 640, height: 480 };
const formats = ['bmp', 'jpg', 'pbm', 'png'];

const duplicateIt = (desc, callback, { timeout }) => {
  it(`[ASM]: ${desc}`, callback(TesseractCoreASM)).timeout(timeout);
  it(`[WASM]: ${desc}`, callback(TesseractCoreWASM)).timeout(timeout);
};

const loadImageCases = {};

formats.forEach((format) => {
  loadImageCases[`read ${format} format`] = TesseractCore => (done) => {
    TesseractCore().then((TessModule) => {
      axios.get(`http://localhost:3000/tests/assets/images/testocr.${format}`, {
        responseType: 'arraybuffer',
      })
        .then((resp) => {
          const { w, h, data } = readImage(TessModule, resp.data);
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
    duplicateIt(key, loadImageCases[key], { timeout: 5000 });
  });
});
