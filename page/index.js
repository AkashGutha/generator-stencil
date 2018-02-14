'use strict';
const Generator = require('yeoman-generator');
const changeCase = require('change-case');
const _ = require('lodash');
const composeObjs = require('./../utils/ComposeObjects');

module.exports = class extends Generator {
  prompting() {
    const prompValues = this.config.get('promptValues');
    const sassSupport = this.options.sassSupport || _.get(prompValues, 'sassSupport');
    const testSupport = this.options.sassSupport || _.get(prompValues, 'testSupport');

    let prompts = [
      {
        type: 'input',
        name: 'pageName',
        message: 'Name your Page:',
        default: 'MyPage'
      }
    ];

    if (testSupport === undefined) {
      prompts.push({
        type: 'confirm',
        name: 'testSupport',
        message: 'Want to add unit tests?'
      });
    }

    this.props = composeObjs(this.props, {
      sassSupport: sassSupport,
      testSupport: testSupport
    });

    return this.prompt(prompts).then(props => {
      // To access props later use this.props.someAnswer;
      this.props = composeObjs(this.props, props);
    });
  }

  writing() {
    const pageName = this.props.pageName;
    this.props.paramCasePageName = changeCase.paramCase(pageName);

    this.fs.copyTpl(
      this.templatePath(`_page.tsx`),
      this.destinationPath(
        `src/pages/${changeCase.paramCase(pageName)}/${changeCase.paramCase(
          pageName
        )}.tsx`
      ),
      this.props
    );

    if (this.props.testSupport) {
      this.fs.copyTpl(
        this.templatePath(`_page.spec.ts`),
        this.destinationPath(
          `src/pages/${changeCase.paramCase(pageName)}/${changeCase.paramCase(
            pageName
          )}.spec.ts`
        ),
        this.props
      );
    }

    if (this.props.sassSupport) {
      this.fs.copyTpl(
        this.templatePath(`_page.scss`),
        this.destinationPath(
          `src/pages/${changeCase.paramCase(pageName)}/${changeCase.paramCase(
            pageName
          )}.scss`
        ),
        this.props
      );
    } else {
      this.fs.copyTpl(
        this.templatePath(`_page.css`),
        this.destinationPath(
          `src/pages/${changeCase.paramCase(pageName)}/${changeCase.paramCase(
            pageName
          )}.css`
        ),
        this.props
      );
    }
  }
};
