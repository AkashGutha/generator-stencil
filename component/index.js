'use strict';
const Generator = require('yeoman-generator');
const changeCase = require('change-case');

const composeObjs = require('./../utils/ComposeObjects');

module.exports = class extends Generator {
  prompting() {
    const sassSupport = this.options.sassSupport;
    const tsSupport = this.options.tsSupport;

    let prompts = [
      {
        type: 'input',
        name: 'componentName',
        message: 'Name your component:',
        default: 'MyComponent'
      }
    ];

    if (tsSupport === undefined) {
      prompts.push({
        type: 'confirm',
        name: 'tsSupport',
        message: 'Want to enable Typescript support?'
      });
    }
    if (sassSupport === undefined) {
      prompts.push({
        type: 'confirm',
        name: 'sassSupport',
        message: 'Want to enable Sass?'
      });
    }

    this.props = composeObjs(this.props, {
      sassSupport: sassSupport,
      tsSupport: tsSupport
    });

    return this.prompt(prompts).then(props => {
      // To access props later use this.props.someAnswer;
      this.props = composeObjs(this.props, props);
    });
  }

  writing() {
    const componentName = this.props.componentName;
    this.props.paramCaseComponentName = changeCase.paramCase(componentName);

    if (this.props.tsSupport) {
      this.fs.copyTpl(
        this.templatePath(`_component.tsx`),
        this.destinationPath(
          `src/components/${changeCase.paramCase(componentName)}/${changeCase.paramCase(
            componentName
          )}.tsx`
        ),
        this.props
      );
    } else {
      this.fs.copyTpl(
        this.templatePath(`_component.tsx`),
        this.destinationPath(
          `src/components/${changeCase.paramCase(componentName)}/${changeCase.paramCase(
            componentName
          )}.jsx`
        ),
        this.props
      );
    }

    if (this.props.sassSupport) {
      this.fs.copyTpl(
        this.templatePath(`_component.scss`),
        this.destinationPath(
          `src/components/${changeCase.paramCase(componentName)}/${changeCase.paramCase(
            componentName
          )}.scss`
        ),
        this.props
      );
    } else {
      this.fs.copyTpl(
        this.templatePath(`_component.css`),
        this.destinationPath(
          `src/components/${changeCase.paramCase(componentName)}/${changeCase.paramCase(
            componentName
          )}.css`
        ),
        this.props
      );
    }
  }
};
