const webpack = require('webpack');
const middleware = require('webpack-dev-middleware');
const express = require('express');
const path = require('path');
const cors = require('cors');
const webpackConfig = require('./webpack.config');

const compiler = webpack(webpackConfig);
const app = express();

express.static.mime.types.wasm = 'application/wasm';

app.use(cors());
app.use('/', express.static(path.resolve(__dirname, '..')));
app.use(middleware(compiler, { publicPath: '/js' }));

app.listen(3000, () => console.log('Server is running on port 3000'));
