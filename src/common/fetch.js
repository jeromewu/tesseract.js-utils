module.exports = process.browser
  ? require('whatwg-fetch')
  : require('node-fetch');
