const program = require('commander');
const inquirer = require('inquirer');
const path = require('path');
const fs = require('fs-extra');
const validateProjectName = require('validate-npm-package-name');
const chalk = require('chalk');

const { commandSpawn } = require('../utils/terminal');
const { resolveApp, isExistFolder, startSpinner } = require('../utils/utils');

const createProjectAction = projectName => {
  const result = validateProjectName(program);
  if (!result.validForNewPackages) {
    console.error(chalk.red(`Invalid project name: "${projectName}"`));
    result.errors &&
      result.errors.forEach(err => {
        console.error(chalk.red.dim('Error: ' + err));
      });
    result.warnings &&
      result.warnings.forEach(err => {
        console.error(chalk.red.dim('Warning: ' + err));
      });
    return;
  }
  new ProjectActionCreator(projectName);
};

class ProjectActionCreator {
  version = '2'; // vue version
  syntax = '0'; // 0 composition-api, 1 class-component
  type = '0'; // 0 spa, 1 mpa

  constructor(projectName) {
    this.projectName = projectName;
    this.init();
  }

  async init() {
    const state = isExistFolder(resolveApp(this.projectName));
    if (state) {
      console.error(chalk.red(`directory already exists: ${this.projectName}`));
      return;
    }

    if (program.vue || program.syntax || program.type) {
      const { valid, message } = this.validateOption();
      if (!valid) {
        console.error(message);
        return;
      }
      this.version = program.vue || '2';
      this.syntax = program.syntax || '0';
      this.type = program.type || '0';
    } else {
      await this.getOptions();
    }

    this.createTemplate();
  }

  validateOption() {
    const vueValue = [undefined, '2', '3'];
    const syntaxValue = [undefined, '0', '1'];
    const typeValue = [undefined, '0', '1'];

    if (!vueValue.includes(program.vue)) {
      return {
        valid: false,
        message: chalk.red(
          `vue version error, please use ${chalk.green('2')} or ${chalk.green('3')}`
        )
      };
    }
    if (!syntaxValue.includes(program.syntax)) {
      return {
        valid: false,
        message: chalk.red(`syntax error, please use ${chalk.green('0')} or ${chalk.green('1')}`)
      };
    }
    if (!typeValue.includes(program.type)) {
      return {
        valid: false,
        message: chalk.red(`type error, please use ${chalk.green('0')} or ${chalk.green('1')}`)
      };
    }
    return {
      valid: true,
      message: ''
    };
  }

  async getOptions() {
    const questions = [
      {
        name: 'version',
        type: 'list',
        message: 'select a vue version',
        choices: [
          { name: '2.x', value: '2' },
          { name: '3.x', value: '3' }
        ]
      },
      {
        name: 'syntax',
        type: 'list',
        message: 'use composition-api or class-component',
        when: answer => answer.version === '2',
        choices: [
          { name: 'composition-api', value: '0' },
          { name: 'class-component', value: '1' }
        ]
      },
      {
        name: 'type',
        type: 'list',
        message: 'use SPA or MPA',
        choices: [
          { name: 'SPA', value: '0' },
          { name: 'MPA', value: '1' }
        ]
      }
    ];
    const { version, syntax, type } = await inquirer.prompt(questions);
    this.version = version;
    this.syntax = syntax || '0';
    this.type = type;
  }

  createTemplate() {
    let template = '';
    if (this.version === '2') {
      const templates = [
        ['v2-composition-api-spa', 'v2-composition-api-mpa'],
        ['v2-class-component-spa', 'v2-class-component-mpa']
      ];
      template = templates[this.syntax][this.type];
    } else {
      const templates = ['v3-spa', 'v3-mpa'];
      template = templates[this.type];
    }

    const spinner = startSpinner(chalk.yellow('creating project...'));
    fs.copy(path.resolve(__dirname, `../templates/${template}`), resolveApp(this.projectName))
      .then(() => {
        spinner.succeed(chalk.green('project creation completed'));
        this.installDependency();
      })
      .catch(e => spinner.fail(chalk.red('create project failed')));
  }

  async installDependency() {
    const spinner = startSpinner(chalk.yellow('installing dependencies...'));
    const command = process.platform === 'win32' ? 'npm.cmd' : 'npm';
    try {
      await commandSpawn(command, ['install'], { cwd: `./${this.projectName}` });
      spinner.succeed(
        chalk.green(`dependencies installation completed, please run:
      ${chalk.blue(`cd ${this.projectName}`)}
      ${chalk.blue('npm run vite')}`)
      );
    } catch (e) {
      spinner.fail(chalk.red('install dependencies failed'));
    }
  }
}

module.exports = {
  createProjectAction
};
