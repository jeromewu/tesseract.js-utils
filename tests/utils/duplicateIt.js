/* eslint-disable import/no-extraneous-dependencies */
const TesseractCoreASM = require('tesseract.js-core/src/tesseract-core.asm');
const TesseractCoreWASM = require('tesseract.js-core/src/tesseract-core');

module.exports = (desc, callback, { timeout }) => {
  it(`[ASM]: ${desc}`, callback(TesseractCoreASM)).timeout(timeout);
  it(`[WASM]: ${desc}`, callback(TesseractCoreWASM)).timeout(timeout);
};
