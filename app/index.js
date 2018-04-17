'use strict';
const Generator = require('yeoman-generator');
const chalk = require('chalk');
const yosay = require('yosay');
const composeObjs = require('utils/composeObjects');

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
        type: 'list',
        name: 'stylingSupport',
        message: 'Select a stlying option?',
        choices: ['Sass', 'PostCSS'],
        store: true
      },
      {
        type: 'checkbox',
        name: 'optionalFeatures',
        message: 'Choose the features that you want?',
        choices: ['Helmet', 'Stencil Router', 'Webpack', 'Redux'],
        store: true
      },
      {
        type: 'confirm',
        name: 'testSupport',
        message: 'Want to enable Unit testing?',
        store: true
      }
    ];

    return this.prompt(prompts).then(props => {
      // To access props later use this.props.someAnswer;
      this.props = composeObjs(props, { username: name }, { email: email });
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

    this.composeWith('stencil:page', this.props);
    this.composeWith('stencil:component', this.props);
  }

  install() {
    this.installDependencies({
      npm: true,
      bower: false
    });
  }
};
