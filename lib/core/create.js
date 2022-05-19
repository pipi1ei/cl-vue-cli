const program = require('commander');
const { createProjectAction } = require('./actions');

const createCommands = () => {
  program
    .command('create <project>')
    .description('create a vue project')
    .action(createProjectAction);

  program.on('command:*', operands => {
    console.error(`error: unknown command ${operands[0]}`);
  });
};

module.exports = createCommands;
