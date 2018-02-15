'use strict';
const Generator = require('yeoman-generator');
const changeCase = require('change-case');
const _ = require('lodash');
const composeObjs = require('./../utils/ComposeObjects');

module.exports = class extends Generator {
  prompting() {
    const prompValues = this.config.get('promptValues');

    const stylingSupport = this.options.stylingSupport || _.get(prompValues, 'stylingSupport');
    const testSupport = this.options.stylingSupport || _.get(prompValues, 'testSupport');

    let prompts = [
      {
        type: 'input',
        name: 'componentName',
        message: 'Name your component:',
        default: 'MyComponent'
      }
    ];

    if (stylingSupport === undefined) {
      prompts.push({
        type: 'confirm',
        name: 'stylingSupport',
        message: 'Want to enable Sass?'
      });
    }
    if (testSupport === undefined) {
      prompts.push({
        type: 'confirm',
        name: 'testSupport',
        message: 'Want to add unit tests?'
      });
    }

    this.props = composeObjs(this.props, {
      stylingSupport: stylingSupport,
      testSupport: testSupport
    });

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
        `src/components/${changeCase.paramCase(componentName)}/${changeCase.paramCase(
          componentName
        )}.tsx`
      ),
      this.props
    );

    if (this.props.testSupport) {
      this.fs.copyTpl(
        this.templatePath(`_component.spec.ts`),
        this.destinationPath(
          `src/components/${changeCase.paramCase(componentName)}/${changeCase.paramCase(
            componentName
          )}.spec.ts`
        ),
        this.props
      );
    }

    if (this.props.stylingSupport) {
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
