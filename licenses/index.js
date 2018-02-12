'use strict';
const Generator = require('yeoman-generator');
const changeCase = require('change-case');
const gitConfig = require('git-config');

const licenses = [
  { name: 'Apache 2.0', value: 'Apache-2.0' },
  { name: 'MIT', value: 'MIT' },
  { name: 'Mozilla Public License 2.0', value: 'MPL-2.0' },
  { name: 'BSD 2-Clause (FreeBSD) License', value: 'BSD-2-Clause-FreeBSD' },
  { name: 'BSD 3-Clause (NewBSD) License', value: 'BSD-3-Clause' },
  { name: 'Internet Systems Consortium (ISC) License', value: 'ISC' },
  { name: 'GNU AGPL 3.0', value: 'AGPL-3.0' },
  { name: 'GNU GPL 3.0', value: 'GPL-3.0' },
  { name: 'GNU LGPL 3.0', value: 'LGPL-3.0' },
  { name: 'Unlicense', value: 'unlicense' },
  { name: 'No License (Copyrighted)', value: 'nolicense' }
];

module.exports = class extends Generator {
  prompting() {
    const prompts = [
      {
        type: 'input',
        name: 'componentName',
        message: 'Choose a license',
        default: 'MyComponent'
      }
    ];

    return this.prompt(prompts).then(props => {
      // To access props later use this.props.someAnswer;
      this.props = props;
    });
  }

  writing() {
    const componentName = this.props.componentName;
    this.props.paramCaseComponentName = changeCase.paramCase(componentName);

    this.fs.copyTpl(
      this.templatePath(`_component.tsx`),
      this.destinationPath(`src/components/${changeCase.paramCase(componentName)}.tsx`),
      this.props
    );
  }
};
