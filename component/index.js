'use strict';
const Generator = require('yeoman-generator');
const changeCase = require('change-case');

const composeObjs = require('./../utils/ComposeObjects');

module.exports = class extends Generator {
  prompting() {
    const sassSupport = this.options.sassSupport;

    let prompts = [
      {
        type: 'input',
        name: 'componentName',
        message: "What is your component's name?",
        default: 'MyComponent'
      }
    ];

    if (sassSupport === undefined) {
      prompts.push({
        type: 'confirm',
        name: 'sassSupport',
        message: 'Would you like to enable Sass?',
        store: true
      });
    } else {
      this.props = composeObjs(this.props, { sassSupport: sassSupport });
    }

    return this.prompt(prompts).then(props => {
      // To access props later use this.props.someAnswer;
      this.props = composeObjs(this.props, props);
    });
  }

  writing() {
    const componentName = this.props.componentName;
    this.props.paramCaseComponentName = changeCase.paramCase(componentName);

    this.fs.copyTpl(
      this.templatePath(`_component.tsx`),
      this.destinationPath(
        `src/components/${changeCase.paramCase(componentName)}/
        ${changeCase.paramCase(componentName)}.tsx`
      ),
      this.props
    );

    if (this.props.sassSupport) {
      this.fs.copyTpl(
        this.templatePath(`_component.scss`),
        this.destinationPath(
          `src/components/${changeCase.paramCase(componentName)}/
          ${changeCase.paramCase(componentName)}.scss`
        ),
        this.props
      );
    } else {
      this.fs.copyTpl(
        this.templatePath(`_component.css`),
        this.destinationPath(`src/components/${changeCase.paramCase(componentName)}.css`),
        this.props
      );
    }
  }
};
