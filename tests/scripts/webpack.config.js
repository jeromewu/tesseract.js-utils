const path = require('path');

module.exports = {
  mode: 'development',
  entry: path.resolve(__dirname, '..', '..', 'src', 'index.browser.js'),
  output: {
    filename: 'tesseract.js-utils.js',
    library: 'TesseractJSUtils',
    libraryTarget: 'umd',
  },
};
