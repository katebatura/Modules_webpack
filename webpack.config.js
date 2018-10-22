'use strict';

var path = require('path');
// Пример экспорта в стиле CommonJS
module.exports = {
 entry: './src/index.js',
 output: {
   filename: 'bundle.js',
   path: path.resolve(__dirname, 'dist')
 }
};
