'use strict';
const Generator = require('yeoman-generator');
const changeCase = require('change-case');
const _ = require('lodash');

module.exports = class extends Generator {
  prompting() {
    const prompValues = this.config.get('promptValues');
    const stylingSupport =
      this.options.stylingSupport || _.get(prompValues, 'stylingSupport');
    const testSupport = this.options.testSupport || _.get(prompValues, 'testSupport');
    const optionalFeatures =
      this.options.optionalFeatures || _.get(prompValues, 'optionalFeatures');

    let prompts = [
      {
        type: 'input',
        name: 'pageName',
        message: 'Name your Page:',
        default: 'MyPage'
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

    this.props = _.assign(this.props, {
      stylingSupport: stylingSupport,
      testSupport: testSupport,
      optionalFeatures: optionalFeatures
    });

    return this.prompt(prompts).then(props => {
      // To access props later use this.props.someAnswer;
      this.props = _.assign(this.props, props);
    });
  }

  writing() {
    const pageName = this.props.pageName;
    const paramCasePageName = changeCase.paramCase(pageName);
    this.props.paramCasePageName = paramCasePageName;

    this.fs.copyTpl(
      this.templatePath(`_page.tsx`),
      this.destinationPath(`src/pages/${paramCasePageName}/${paramCasePageName}.tsx`),
      this.props
    );

    if (this.props.testSupport) {
      this.fs.copyTpl(
        this.templatePath(`_page.spec.ts`),
        this.destinationPath(
          `src/pages/${paramCasePageName}/${paramCasePageName}.spec.ts`
        ),
        this.props
      );
    }

    if (this.props.stylingSupport.includes('Sass')) {
      this.fs.copyTpl(
        this.templatePath(`_page.scss`),
        this.destinationPath(`src/pages/${paramCasePageName}/${paramCasePageName}.scss`),
        this.props
      );
    } else {
      this.fs.copyTpl(
        this.templatePath(`_page.css`),
        this.destinationPath(`src/pages/${paramCasePageName}/${paramCasePageName}.css`),
        this.props
      );
    }
  }
};
