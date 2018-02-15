'use strict';
const Generator = require('yeoman-generator');
const changeCase = require('change-case');
const _ = require('lodash');
const composeObjs = require('./../utils/ComposeObjects');

module.exports = class extends Generator {
  prompting() {
    const prompValues = this.config.get('promptValues');

    const stylingSupport =
      this.options.stylingSupport || _.get(prompValues, 'stylingSupport');
    const testSupport = this.options.testSupport || _.get(prompValues, 'testSupport');

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
        type: 'list',
        name: 'stylingSupport',
        message: 'Select a stlying option?',
        choices: ['Sass', 'PostCSS']
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
    const paramCaseComponentName = changeCase.paramCase(componentName);
    this.props.paramCaseComponentName = paramCaseComponentName;

    this.fs.copyTpl(
      this.templatePath(`_page.tsx`),
      this.destinationPath(
        `src/pages/${paramCaseComponentName}/${paramCaseComponentName}.tsx`
      ),
      this.props
    );

    if (this.props.testSupport) {
      this.fs.copyTpl(
        this.templatePath(`_page.spec.ts`),
        this.destinationPath(
          `src/pages/${paramCaseComponentName}/${paramCaseComponentName}.spec.ts`
        ),
        this.props
      );
    }

    if (this.props.stylingSupport.includes('Sass')) {
      this.fs.copyTpl(
        this.templatePath(`_page.scss`),
        this.destinationPath(
          `src/pages/${paramCaseComponentName}/${paramCaseComponentName}.scss`
        ),
        this.props
      );
    } else {
      this.fs.copyTpl(
        this.templatePath(`_page.css`),
        this.destinationPath(
          `src/pages/${paramCaseComponentName}/${paramCaseComponentName}.css`
        ),
        this.props
      );
    }
  }
};
