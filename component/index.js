'use strict';
const Generator = require('yeoman-generator');
const changeCase = require('change-case');

module.exports = class extends Generator {
  prompting() {
    const prompts = [
      {
        type: 'input',
        name: 'componentName',
        message: "What is your component's name?",
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
