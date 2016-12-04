# Specky 👓 [![Build Status](https://travis-ci.org/speckyjs/specky.svg?branch=master)](https://travis-ci.org/speckyjs/specky) [![npm version](https://badge.fury.io/js/specky.svg)](https://badge.fury.io/js/specky)  [![Size Gzipped](http://img.badgesize.io/speckyjs/specky/master/packages/specky/dist/specky.min.js?compression=gzip)](packages/specky/dist) [![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](http://makeapullrequest.com)

## What

A powerful & highly flexible JavaScript data validation and conformation library that enables you to:

- Build your data validation rules (specs) with composable, regex-like expressions built from primitives predicates such as `and`, `or`, `any`, `props`, `oneOrMore`, `zeroOrMore`, etc
- Validate and make assertions about your data with these predicate functions
- Assert & validate the shape and properties of your function's arguments and its return value
- Conform your data with a range of available shapes of specs
- Automatic generation of test cases for your functions (coming soon)
- Automatic documentation generation (coming soon)

## Why Specky

- A complement/alternative to unit testing
- facilitates a better debugging experience
- Auto generation of test cases based on function specs
- Guides you through the initial modeling process of code implementation
- Help create more customizable type and behavior constraints that is more powerful than typed languages such as TypeScript

## Performance

- [![Size Minified](http://img.badgesize.io/speckyjs/specky/master/packages/specky/dist/specky.min.js?label=min)](packages/specky/dist) [![Size Gzipped](http://img.badgesize.io/speckyjs/specky/master/packages/specky/dist/specky.min.js?compression=gzip&label=min%2Bgzipped)](packages/specky/dist)
- Uses fast NFA-based algorithms in handling complex Specs
- In general, very fast.

## Project status
- Alpha. Subject to constant change and improvement based on [feedback](/../../issues/).


## Try it

- [Try it online](https://jsbin.com/fisiyeh/latest/edit?js,console)

## Installation

```bash
npm install specky
```

Or in the `<head>` or `<body>` tag of your HTML:
```html
<script src="//unpkg.com/specky@latest/dist/specky.js"></script>
```

## Examples

- [Specky in browser](examples/simple.html)
- [Spec'ing promises](examples/promise/index.js)
- [Codebreaker game](examples/codebreaker/index.js)
- In addition, there are plenty of examples in test files under [`/test`](test/).

## Planned Features

Coming soon.

- `specky-gen`: Generative/Property-based Testing
- `specky-docgen`: Automatic documentation generation based on function specs
- `specky-react`: Specky integration for React. A replacement for `React.PropTypes`

## Run tests

### In Dev mode

```bash
npm run dev
```

### In CI mode
```bash
npm run test
```

## Credit
- Both origin of the idea and API are heavily inspired by Rich Hickey's [clojure.spec](http://clojure.org/about/spec)
- NFA spec matching inspired by Thompson NFA regex matching algorithm, and is based on [afader's implementation](https://github.com/afader/thompson-regex-js)
