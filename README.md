<div align="center">
<a href="https://www.emojione.com/emoji/1f528">
<img src="./assets/hammer.png"/>
</a>
<h1>generator-stencil</h1>
</div>

[![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url] [![Dependency Status][daviddm-image]][daviddm-url] [![Coverage percentage][coveralls-image]][coveralls-url]
> scaffolding tool for stencil compiler

## Installation

First, install [Yeoman](http://yeoman.io) and generator-stencil using [npm](https://www.npmjs.com/) (we assume you have pre-installed [node.js](https://nodejs.org/)).

```bash
npm install -g yo
npm install -g generator-stencil
```

Then generate your new project:

```bash
yo stencil
```

what does this generator support?

1. Stencil Router
2. Tests

more coming soon.. check Roadmap

## Sub-generators

Stencil generator comes with a few sub generators that will help you scaffold faster and easier web-components

1. Component generator 
```bash
yo stencil:component
```

2. Page generator
```bash
yo stencil:page
```

## Roadmap

- [x] Sass and PostCSS support
- [x] Stencil Router support
- [x] Test's support
- [ ] Automatic intelligent bundling
- [ ] Life Cycle Events flag for components
- [ ] Adding Events and Event listeners
- [ ] Adding Forms
- [ ] Improving audit scores

## License

MIT © [Akash Gutha](https://twitter.com/AkashGutha)


[npm-image]: https://badge.fury.io/js/generator-stencil.svg
[npm-url]: https://npmjs.org/package/generator-stencil
[travis-image]: https://travis-ci.org/AkashGutha/generator-stencil.svg?branch=master
[travis-url]: https://travis-ci.org/AkashGutha/generator-stencil
[daviddm-image]: https://david-dm.org/AkashGutha/generator-stencil.svg?theme=shields.io
[daviddm-url]: https://david-dm.org/AkashGutha/generator-stencil
[coveralls-image]: https://coveralls.io/repos/AkashGutha/generator-stencil/badge.svg
[coveralls-url]: https://coveralls.io/r/AkashGutha/generator-stencil
