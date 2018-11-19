const path = require('path');

module.exports = {
  mode: 'development',
  entry: path.resolve(__dirname, '..', 'src', 'index.js'),
  output: {
    path: path.resolve(__dirname, '..', 'dist'),
    filename: 'tesseract.js-utils.js',
    library: 'TesseractJSUtils',
    libraryTarget: 'umd',
  },
  serve: {
    content: path.resolve(__dirname, 'dist'),
  },
};
