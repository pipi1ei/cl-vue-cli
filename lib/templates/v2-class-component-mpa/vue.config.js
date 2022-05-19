const path = require('path');
const getPages = require('./config/getPages.ts');

module.exports = {
  productionSourceMap: false,
  pages: getPages(),
  configureWebpack: {
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src'),
        pages: path.resolve(__dirname, 'src/pages')
      }
    }
  }
};
