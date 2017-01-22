# Clause

A powerful, expressive & practical JavaScript library for defining and verifying your JS app contract. Also facilitates with bug discovery, debugging & data parsing.

 [![Build Status](https://travis-ci.org/clausejs/clausejs.svg?branch=master)](https://travis-ci.org/clausejs/clausejs) [![npm version](https://badge.fury.io/js/clausejs.svg)](https://badge.fury.io/js/clausejs)  [![Dependencies](https://david-dm.org/clausejs/clausejs.svg)](https://david-dm.org/clausejs/clausejs)  [![Size Gzipped](http://img.badgesize.io/clausejs/clausejs/master/packages/clausejs/dist/clausejs.min.js?compression=gzip&label=min%2Bgzipped)](packages/clausejs/dist)  [![Open Source Love](https://badges.frapsoft.com/os/mit/mit.svg?v=102)](https://github.com/ellerbrock/open-source-badge/)  [![Discussion](https://img.shields.io/gitter/room/TechnologyAdvice/Stardust.svg)](https://gitter.im/clausejs/clausejs)

<img src="https://cdn.rawgit.com/clausejs/clausejs/master/docs/media/clausejs.svg"
     width="190" height="190" align="right" hspace="10" />

## Overview

Clause enables you to:

- Build your data validation rules (clauses) with simple predicate functions and composable logical expressions such as `and`, `any`, `shape`, `collOf`, `mapOf`, `maybe` as well as regex-like clause-composing operators such as concatenation(`cat`), `or`(`|`), `oneOrMore`(`+`), `zeroOrMore`(`*`), `zeroOrOne`(`?`), etc
- Validate and make assertions about your data with your clauses
- Define complex clauses for your functions' arguments, return value and the relation between them
- Conform (parse) your data/arguments for writing simpler code
- Create types that are *recursively* defined

Clause is heavily inspired by [clojure.spec](http://clojure.org/about/spec), but will be evolving on its own to better suite the needs of JavaScript community.

## Why Clause

> If a programming language is regarded as a tool to aid the programmer, it should give him the greatest assistance in the most difficult aspects of his art, namely program design, documentation, and debugging.
>
> — *C. A. R. Hoare, Hints on Programming Language Design*

Clause's primary goal is to allow you to create *the definitive contract* for your JavaScript project.

By writing clauses for your data and functions *only once*, you can get a lot of leverage out your effort, including

- Clearly defined specifications for your app's functions and data structures
- Type and behavior checking **at runtime** for data and functions (some compile-time analysis may also be possible in the future)
- Convenient **data conformation (parsing)** that simplifies your code for complex data and parameter parsing
- Mathematically sound, plain-object style contracts that can be compared against previous and future versions to **detect breaking changes** (coming soon)
- **Automatic generation of API documentation** for your app (via [clausejs-docgen](packages/clausejs-docgen), WIP)
- **Automatic generation of property-based test coverage** for your functions (via [clausejs-gen](packages/clausejs-gen), coming soon)

Also worth looking at are videos on rationale for clojure.spec (and, by extension, Clause).

- ["Agility & Robustness: Clojure spec" by Stuart Halloway](https://www.youtube.com/watch?v=VNTQ-M_uSo8&t=746s)
- [Rich Hickey on Clojure Spec](https://vimeo.com/195711510)
- ["A Tool for Thought by David Nolen"](http://swannodette.github.io/2016/06/03/tools-for-thought)

## Project status

Alpha.

- Most core functions of Clause have gone through many iterations of bug fixing and are stablizing.
- Some aspects of the implementation, such as object models are still subject to change based on [developer feedback](/../../issues/).
- Feedback and suggestions [are welcome](https://github.com/clausejs/clausejs/issues/new).

## Quick Examples

#### Regex Ops & conformation

```js

// In browser environment, Clause will by default expose "C" as a global variable
var C = require('clausejs');

var MyClause = C.cat( C.oneOrMore(C.isNum), C.zeroOrOne( C.isObj ) );
C.isValid(MyClause, [ 1, 2, 3, { a: 1 } ]); //=> true
C.isValid(MyClause,  [ 1, 2, 3 ]); //=> true
C.isValid(MyClause,  [ 1, 2, 3, null ]); //=> false: the trailing element does not satisfy our clause
C.isValid(MyClause,  [ 1, 2, 3, { a: 1 }, { } ]); //=> false: extra trailing element
C.conform(MyClause, [ 1, 2, 3, null ]);
//=> a "Problem" object with detailed explanation why validation failed

// Next, we redefine the above concatenation clause, with a label for each part.
var MyLabelledClause = C.cat(
    "myNumbers", C.oneOrMore(C.isNum),
    "myObject", C.zeroOrOne( C.isObj )
  );

MyLabelledClause.conform( [ 1, 2, 3, { a: 1 } ] );
//=> { myNumbers: [ 1, 2, 3 ], myObject: { a: 1 } }

```

(Notice how the returned results are grouped by the labels specified in the `cat` clause.)

#### Clause Registry

```js
// Clause comes with an application-wide global clause registry.
C("myApp/myLabelledClause", MyLabelledClause); // defines a clause in the registry
C("myApp/myLabelledClause"); // returns the same clause above (MyLabelledClause)
```

#### Object Shapes

```js
// Before we continue: let's first define a predicate function
// (which is just a function that returns either true or false).
function startsWithBar( str ) {
  return str.indexOf("bar") === 0;
}

// Now let's clauseify a "shape" for our objects.
var MyObjClause = C.shape({
    // alternatively, you can simply provide an array of strings
    // as required keys e.g. [ "propertyA", "propertyB",... ]
    required: {
      // define a single key with value clause
      foo: C.isBool,
      // ...or define a group of properties whose keys satisfy the first clause (e.g. startsWithBar),
      // and whose value satisfies the second (e.g. C.any)
      bars: [ startsWithBar, C.any ]
    },
    optional: {
        // you can also arbitrarily compose new clauses from registered clauses
        myObj: C("myApp/myLabelledClause")
    }
});

// With the above clause defined, now let's try shape conformation.
C.conform( MyObjClause, { foo: true, bar1: 1, bar2: 2, bar3: 3 });
// { foo: true, bars: { bar1: 1, bar2: 2, bar3: 3 } }
// (Notice how all object keys that begin with "bar" are now grouped under a single value "bars").
```
#### Function Clauses

```js
// Now onward to function clauses.
var MyFnClause = C.fclause({
  args: MyLabelledClause , // reusing MyClause from above
  ret: C.isBool,
});

// Next we write our function.
function __myFunction(num1, num2, num3, myObj) {
  // doesn't do much; just returns true for now.
  return true;
};

// Then "instrument"(wrap/protect) this function with our function clause.
var myProtectedFn = MyFnClause.instrument(__myFunction);

// We can now try our new protected function.
myProtectedFn(1, 2, 3, { a: true }); // returns true
myProtectedFn(1, 2, 3, 'hello'); // Throws a "Problem" due to mismatched argument per our fclause definition.

// Finally, let's build a function that checks if the sum of all numbers are odd
// by taking advantage of Clause's function argument conformation.

// Step 1: we write a "barebone" function with our core logic,
// which consumes the conformed arguments as a single object.
// This will make sense in a second.
function __sumIsOdd( conformedArgs ) {
  // (Here "conformedArgs" stores the value of the conformed object
  // as we illustrated above.)
  var myNumbers = conformedArgs.myNumbers; // e.g. [ 1, 2, 3 ]
  var myObject = conformedArgs.myObject; // e.g. { a: 1 }
  // (or simply { myNumbers, myObject } with ES6 destructring)

  // Get the sum
  var sum = myNumbers.reduce( function(c,s) { return s + c; }, 0 );

  // Returns whether the sum is odd
  return sum % 2 === 1;
}

// Step 2: wrap the barebone function with C.instrumentConformed()
var sumIsOdd = MyFnClause.instrmentConformed(__sumIsOdd);

// Let's try our new super function!
sumIsOdd( 1, 1, 1 ); //=> true: sum is odd
sumIsOdd( 2, 2, 2 ); //=> false: sum is even
sumIsOdd( 1, 1, 1, {} ); //=> true (remember the optional trailing isObj we defined above?)
sumIsOdd( 2, 2, 2, null ); //=> throws a "Problem" because arguments do not conform
sumIsOdd( 2, 2, 2, {}, {} ); //=> same as above
```
For more examples, advanced features and concepts, refer to [documentation site](https://clause.js.org).

## More Examples

- [Simple example in browser](examples/simple.html)
- [Codebreaker game example](examples/codebreaker/index.js)

In addition, there are plenty of examples in test files under [`/test`](test/).

## Try It Yourself

- [Try it online](https://jsbin.com/fisiyeh/latest/edit?js,console)


## Usage

For Node.js/browserify/webpack:

```bash
npm install clausejs
```

For browser:

Include Clause script tag in `<head>` or `<body>` tag of your HTML:

```html
<script src="//unpkg.com/clausejs@latest/dist/clausejs.js"></script>
```

The variable `C` will be exposed in the global environment (e.g. `window` for browser and `globals` for Node.js).


## Run tests

### In Dev mode

```bash
npm run dev
```

### In CI mode
```bash
npm run test
```

## Documentation

Documentation website: http://clause.js.org

## Performance & Reliability

- [![Size Minified](http://img.badgesize.io/clausejs/clausejs/master/packages/clausejs/dist/clausejs.min.js?label=min)](packages/clausejs/dist) [![Size Gzipped](http://img.badgesize.io/clausejs/clausejs/master/packages/clausejs/dist/clausejs.min.js?compression=gzip&label=min%2Bgzipped)](packages/clausejs/dist)
- No external dependencies
- Clause is mostly self-contained and has very few external dependencies.
- Clause uses NFA algorithm for regex parsing, which means it's generally pretty fast in handling complex regex operations.
- Clause's implementation is optimized in such a way that it avoid long chains of recursive function calls and makes as few redundant path visits as possible.

## Subprojects

WIP:

- [`clausejs-docgen`](packages/clausejs-docgen): Automatic documentation generation based on function clauses
- [`clausejs-react`](packages/clausejs-react): More robust props validation for your React apps. A replacement for `React.PropTypes`

Coming soon:

- [`clausejs-gen`](packages/clausejs-gen): Generative/Property-based Testing
- [`clausejs-diff`](packages/clausejs-diff): (Coming soon) clause version diffing that detects breaking changes.

## FAQ

### Why not just use ClojureScript + cljs.spec?

Clojure IMO is a great and practical language. If you can use Clojure/ClojureScript, by all means go ahead and try cljs.spec.

The goal for Clause is to provide JavaScript developers as much the benefit derived from the spec system as possible.

Clause API for the most part is kept similar to clojure.spec, except for some differences related to usability and JavaScript-related conventions.

### Why don't you call it "spec"?

"Spec" already carries a different meaning in the JavaScript community, which is strongly associated with unit tests. While introducing this library to developers with the term "spec", 
I was often met with a confused look along with a commment such as "I already know how to write a spec, so what's the point?" I then quickly realized that a new term needs to be coined to refect some of the vastly different concepts introduced in Clause.

## Community

[![Discussion](https://img.shields.io/gitter/room/TechnologyAdvice/Stardust.svg)](https://gitter.im/clausejs/clausejs)

## Prior art & related work

- Both origin of the idea and API are heavily inspired by Rich Hickey et, al.'s [clojure.spec](http://clojure.org/about/clause).
- Some aspects of the design are drawn by Scheme's [contract system](https://docs.racket-lang.org/guide/contracts.html).
- NFA clause matching inspired by Thompson NFA regex matching algorithm, and is based on [afader's implementation](https://github.com/afader/thompson-regex-js).
- [React's PropTypes](https://facebook.github.io/react/docs/typechecking-with-proptypes.html)

- [js.spec], another attempt at bringing the power of clojure.spec to JavaScript (https://github.com/prayerslayer/js.spec)
- [tcomb](https://github.com/gcanti/tcomb)