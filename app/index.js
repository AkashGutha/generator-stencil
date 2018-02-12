'use strict';
const Generator = require('yeoman-generator');
const chalk = require('chalk');
const yosay = require('yosay');
const changeCase = require('change-case');

module.exports = class extends Generator {
  prompting() {
    // Have Yeoman greet the user.
    this.log(yosay('Welcome to ' + chalk.red('stencil') + ' generator!'));

    const prompts = [
      {
        type: 'input',
        name: 'appName',
        message: "What is your app's name?",
        default: 'app'
      },
      {
        type: 'input',
        name: 'description',
        message: 'Describe your app:',
        default: 'description'
      },
      {
        type: 'confirm',
        name: 'sassSupport',
        message: 'Would you like to enable Sass?',
        store: true
      }
    ];

    return this.prompt(prompts).then(props => {
      // To access props later use this.props.someAnswer;
      this.props = props;
    });
  }

  writing() {
    this.fs.copyTpl(
      this.templatePath('app/**/*.*'),
      this.destinationPath(''),
      this.props
    );
    this.composeWith('stencil:component', {
      sassSupport: this.props.sassSupport
    });
  }

  install() {
    this.installDependencies({
      npm: true,
      bower: false
    });
  }
};
