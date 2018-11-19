/* eslint-disable import/no-extraneous-dependencies */
global.expect = require('expect.js');
global.fetch = require('node-fetch');
global.TesseractCoreASM = require('tesseract.js-core/src/tesseract-core.asm');
global.TesseractCoreWASM = require('tesseract.js-core/src/tesseract-core');
global.TesseractJSUtils = require('../../src/index.node');

process.setMaxListeners(Infinity);
