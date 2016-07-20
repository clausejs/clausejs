# Specky [![Circle CI](https://circleci.com/gh/settinghead/specky.svg?style=svg)](https://circleci.com/gh/settinghead/specky)

### Project status
- Pre-alpha. Under active development and tinkering.

### What

A higher order JavaScript schema framework that lets you:

- Build your data validation rules (specs) with composable, regex-like expressions built from primitives predicates such as `and`, `or`, `any`, `oneOrMore`, `zeroOrMore`, etc
- Validate and make assertions about data with these predicate functions
- Assert & validate the shape and properties of a function's arguments and its return value
- Conform your data with a range of available shapes of specs

### Why

It facilitates

- Creating better tests
- Data-driven programming
- Property-based (generative) testing

### Run tests

#### Dev mode

```bash
npm run dev
```

#### CI mode
```bash
npm run test
```
