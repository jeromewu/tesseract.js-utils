/* eslint-disable import/no-extraneous-dependencies */
const express = require('express');

let server = null;
const app = express();
const PORT = 3000;

app.use('/', express.static('.'));

module.exports = {
  start: (callback) => {
    if (server === null) {
      server = app.listen(PORT, callback);
    } else {
      callback();
    }
  },
  stop: (callback) => {
    server.close();
    server = null;
    callback();
  },
};
