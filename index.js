const program = require('commander');

const helpOptions = require('./lib/core/help');

program.version(require('./package.json').version);

helpOptions();

program.parse(process.argv);
