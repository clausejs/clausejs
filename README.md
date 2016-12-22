# Specky 👓

 [![Build Status](https://travis-ci.org/speckyjs/specky.svg?branch=master)](https://travis-ci.org/speckyjs/specky) [![npm version](https://badge.fury.io/js/specky.svg)](https://badge.fury.io/js/specky)  [![Size Gzipped](http://img.badgesize.io/speckyjs/specky/master/packages/specky/dist/specky.min.js?compression=gzip&label=min%2Bgzipped)](packages/specky/dist) [![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](http://makeapullrequest.com)

## What is Specky?

Specky is a powerful & flexible JavaScript data validation, conformation, runtime-checking & testing library that enables you to:

- Build your data validation rules (specs) with simple predicate functions and composable logical expressions such as `and`, `any`, `shape`, `collOf`, `mapOf` as well as regex-like spec-composing operators such as concatenation(`cat`), `or`(`|`), `oneOrMore`(`+`), `zeroOrMore`(`*`), `zeroOrOne`(`?`), etc
- Validate and make assertions about your data with your specs
- Define complex specs for your functions' arguments, return value and the relation between them
- Conform (parse) your data/arguments for writing simpler code

## Why Specky

Specky's goal is to provide the defining contract/protocol for your JS app. By writing a set of specs for your app *once*, Specky helps you squeeze a lot of leverage out your effort, including

- Clearly-defined expectations for your app's functions and data structures
- **Runtime validation** for your data and functions (compile-time analysis may be possible in the future)
- Advanced **data conformation** (parsing) that simplifies your data processing code
- **Automatic generation of API documentation** for your app (via [specky-docgen](packages/specky-docgen), WIP)
- **Automatic generation of property-based test cases** for your functions (via [specky-gen](packages/specky-gen), WIP)
- A safety harness with highly flexible **type and behavior constraints**, which is even more powerful than typed languages such as TypeScript


## Project status
- Alpha. API are subject to change and improvement based on [feedback](/../../issues/).

## Quick Example

- TODO


## Try it

- [Try it online](https://jsbin.com/fisiyeh/latest/edit?js,console)


## Usage

For Node.js/browserify/webpack:

```bash
npm install specky
```

For browser:

Include Specky script tag in `<head>` or `<body>` tag of your HTML:

```html
<script src="//unpkg.com/specky@latest/dist/specky.js"></script>
```

The variable `S` will be exposed in the global environment.

## Documentation

Documentation website: http://specky.js.org


## Detailed Examples

- [Specky in browser](examples/simple.html)
- [Spec'ing promises](examples/promise/index.js)
- [Codebreaker game](examples/codebreaker/index.js)
- In addition, there are plenty of examples in test files under [`/test`](test/).

## Performance

- [![Size Minified](http://img.badgesize.io/speckyjs/specky/master/packages/specky/dist/specky.min.js?label=min)](packages/specky/dist) [![Size Gzipped](http://img.badgesize.io/speckyjs/specky/master/packages/specky/dist/specky.min.js?compression=gzip&label=min%2Bgzipped)](packages/specky/dist)
- Uses fast Thompson NFA algorithm in handling regex-like Specs
- In general, fast.

## Subprojects

- [`specky-docgen`](packages/specky-docgen): Automatic documentation generation based on function specs
- [`specky-gen`](packages/specky-gen): Generative/Property-based Testing
- [`specky-react`](packages/specky-react): More robust props validation for your React apps. A replacement for `React.PropTypes`

## Run tests

### In Dev mode

```bash
npm run dev
```

### In CI mode
```bash
npm run test
```


## Why not just use ClojureScript + cljs.spec?

The goal for Specky is to provide JavaScript developers as much the benefit as possible derived from the spec system.

Specky API for the most part is kept similar to clojure.spec, except for some differences related to usability and JavaScript-specific conventions.

(Clojure is a wonderful language. If you can use Clojure/ClojureScript, by all means go ahead and try cljs.spec.)

## Credit
- Both origin of the idea and API are heavily inspired by Rich Hickey's [clojure.spec](http://clojure.org/about/spec)
- NFA spec matching inspired by Thompson NFA regex matching algorithm, and is based on [afader's implementation](https://github.com/afader/thompson-regex-js)
