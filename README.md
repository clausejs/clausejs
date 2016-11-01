# Specky 👓 [![Circle CI](https://circleci.com/gh/settinghead/specky.svg?style=shield)](https://circleci.com/gh/settinghead/specky) [![npm version](https://badge.fury.io/js/specky.svg)](https://badge.fury.io/js/specky) [![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square)](http://makeapullrequest.com)

### What

A powerful & highly flexible JavaScript data validation and conformation library that enables you to:

- Build your data validation rules (specs) with composable, regex-like expressions built from primitives predicates such as `and`, `or`, `any`, `oneOrMore`, `zeroOrMore`, etc
- Validate and make assertions about your data with these predicate functions
- Assert & validate the shape and properties of your function's arguments and its return value
- Conform your data with a range of available shapes of specs
- Automatically generate test cases for your spec'ed functions

### Why

- A complement/alternative to unit testing
- facilitates a better debugging experience
- Auto generation of test cases based on function specs
- Guides you through the initial modeling process of code implementation
- Help create more customizable type and behavior constraints that is more powerful than typed languages such as TypeScript

### Project status
- Alpha. Feedback and feature suggestions [are welcome](/../../issues/).

### Examples

- [Use in browser](examples/simple.html)
- [Spec'ing promises](examples/promise)
- For more examples on usage, refer to examples in the test folder [`/test`](test/).

### Generative Testing

WIP

### Run tests

#### In Dev mode

```bash
npm run dev
```

#### In CI mode
```bash
npm run test
```

### Credit
- Both origin of the idea and API are heavily inspired by Rich Hickey's [clojure.spec](http://clojure.org/about/spec)
- NFA spec matching inspired by Thompson NFA regex matching algorithm, and is based on [afader's implementation](https://github.com/afader/thompson-regex-js)
