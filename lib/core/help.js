const program = require('commander');

const helpOptions = () => {
  program.option('-v --vue <vue>', 'vue version. value: 2, 3');
  program.option('-s --syntax <syntax>', 'syntax, composition-api or class component. value: 0, 1');
  program.option('-t --type <type>', 'application type, SPA or MPA. value: 0, 1');
};

module.exports = helpOptions;
