'use strict';
const Generator = require('yeoman-generator');
const chalk = require('chalk');
const yosay = require('yosay');
const changeCase = require('change-case');
const composeObjs = require('./../utils/ComposeObjects');

module.exports = class extends Generator {

  constructor(args, opts) {
    super(args, opts);

    this.option('skip-welcome-message', {
      desc: 'Skips the welcome message',
      type: Boolean
    });
  }

  prompting() {
    if (!this.options['skip-welcome-message']) {
      // Have Yeoman greet the user.
      this.log(yosay('Welcome to ' + chalk.red('stencil') + ' generator!'));
    }

    const name = this.user.git.name();
    const email = this.user.git.email();

    const prompts = [
      {
        type: 'input',
        name: 'appName',
        message: 'Name your app:',
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
        message: 'Want to enable Sass?',
        store: true
      },
      {
        type: 'confirm',
        name: 'testSupport',
        message: 'Want to enable Unit testing?',
        store: true
      },
      {
        type: 'confirm',
        name: 'stencilRouterSupport',
        message: 'Want to include stencil router?',
        store: true
      }
    ];

    return this.prompt(prompts).then(props => {
      // To access props later use this.props.someAnswer;
      this.props = props;
      this.props = composeObjs(this.props, { username: name }, { email: email });
    });
  }

  writing() {
    this.fs.copyTpl(
      this.templatePath('app/**/*.*'),
      this.destinationPath(''),
      this.props
    );
    this.composeWith(require.resolve('generator-license'), {
      name: this.props.username,
      email: this.props.email,
      website: 'https://example.com',
      licensePrompt: 'Which license do you want to use?', // (optional) customize license prompt text
      defaultLicense: 'MIT' // (optional) Select a default license
    });
    this.composeWith('stencil:page', {
      sassSupport: this.props.sassSupport,
      testSupport: this.props.testSupport
    });
    this.composeWith('stencil:component', {
      sassSupport: this.props.sassSupport,
      testSupport: this.props.testSupport
    });
  }

  install() {
    this.installDependencies({
      npm: true,
      bower: false
    });
  }
};
