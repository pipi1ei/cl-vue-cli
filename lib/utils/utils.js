const fs = require('fs');
const path = require('path');
const ora = require('ora');

const resolveApp = relativePath => {
  return path.resolve(process.cwd(), relativePath);
};

const isExistFolder = pathName => {
  return fs.existsSync(pathName);
};

const startSpinner = (text, color = 'yellow') => {
  const spinner = ora(text);
  spinner.color = color;
  spinner.start();

  return spinner;
};

module.exports = {
  resolveApp,
  isExistFolder,
  startSpinner
};
