const glob = require('glob');
const path = require('path');

const getPages = () => {
  const globPath = './src/pages/**/main.ts';
  const pages = {};

  glob.sync(globPath).forEach(entry => {
    const template = entry.replace('main.ts', 'index.html');

    let temp = [];
    let pathname = '';
    temp = entry.split('/').slice(3, -1);
    pathname = temp.join('/');

    pages[pathname] = {
      entry: entry,
      template: template,
      filename: path.join('./', pathname, 'index.html')
    };
  });

  return pages;
};

module.exports = getPages;
