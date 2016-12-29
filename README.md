# Specky 👓

 [![Build Status](https://travis-ci.org/speckyjs/specky.svg?branch=master)](https://travis-ci.org/speckyjs/specky) [![npm version](https://badge.fury.io/js/specky.svg)](https://badge.fury.io/js/specky)  [![Size Gzipped](http://img.badgesize.io/speckyjs/specky/master/packages/specky/dist/specky.min.js?compression=gzip&label=min%2Bgzipped)](packages/specky/dist) [![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](http://makeapullrequest.com)

## What is Specky?

Specky is a powerful & flexible library for JavaScript data validation, conformation, runtime-checking & property testing.

Specky enables you to:

- Build your data validation rules (specs) with simple predicate functions and composable logical expressions such as `and`, `any`, `shape`, `collOf`, `mapOf` as well as regex-like spec-composing operators such as concatenation(`cat`), `or`(`|`), `oneOrMore`(`+`), `zeroOrMore`(`*`), `zeroOrOne`(`?`), etc
- Validate and make assertions about your data with your specs
- Define complex specs for your functions' arguments, return value and the relation between them
- Conform (parse) your data/arguments for writing simpler code

## Why Specky

Specky's goal is to provide the defining contract/protocol for your JS app. By writing a set of specs for your app *once*, you can get a lot of leverage out your effort, including

- Clearly-defined expectations for your app's functions and data structures
- **Runtime validation** for your data and functions (compile-time analysis may be possible in the future)
- Advanced **data conformation** (parsing) that simplifies your data processing code
- **Automatic generation of API documentation** for your app (via [specky-docgen](packages/specky-docgen), WIP)
- **Automatic generation of property-based test cases** for your functions (via [specky-gen](packages/specky-gen), WIP)
- A safety harness with highly flexible **type and behavior constraints**, which is even more powerful than typed languages such as TypeScript


## Project status
- Alpha. API's are subject to change and improvement based on [feedback](/../../issues/).

## Quick Examples

#### Regex Ops

```js
var MySpec = S.cat( S.oneOrMore(S.isNum), S.zeroOrOne( S.isObj ) );
S.isValid(MySpec, [ 1, 2, 3, { a: 1 } ]); // true
S.isValid(MySpec,  [ 1, 2, 3 ]); // true
S.isValid(MySpec,  [ 1, 2, 3, null ]); // false: the trailing element does not satisfy our spec
S.isValid(MySpec,  [ 1, 2, 3, { a: 1 }, { } ]); // false: extra trailing element
S.conform(MySpec, [ 1, 2, 3, null ]);
// returns a "Problem" object with detailed explanation why validation failed

// Next, we redefine the above concatenation spec, with a label for each part.
var MyLabelledSpec = S.cat(
    "myNumbers", S.oneOrMore(S.isNum),
    "myObject", S.zeroOrOne( S.isObj )
  );
S
MyLabelledSpec.conform( [ 1, 2, 3, { a: 1 } ] );
// returns { myNumbers: [ 1, 2, 3 ], myObject: { a: 1 } }

```

#### Spec Registry

```js
// Specky comes with an application-wide global spec registry.
S.set("myApp/myLabelledSpec", MyLabelledSpec); // defines a spec in the registry
S("myApp/myLabelledSpec"); // returns the same spec above (MyLabelledSpec)
```

#### Object Shapes

```js
// Before we continue: let's first define a predicate function
// (which is just a function that returns either true or false).
function startsWithBar( str ) {
  return str.indexOf("bar") === 0;
}

// Now let's specify a "shape" for our objects.
var MyObjSpec = S.shape({
    // alternatively, you can simply provide an array of strings
    // as required keys e.g. [ "propertyA", "propertyB",... ]
    required: {
      // define a single key with value spec
      foo: S.isBool,
      // ...or define a group of properties whose keys satisfy the first spec (e.g. startsWithBar),
      // and whose value satisfies the second (e.g. S.any)
      bars: [ startsWithBar, S.any ]
    },
    optional: {
        // you can also arbitrarily compose new specs from registered specs
        myObj: S("myApp/myLabelledSpec")
    }
});

// With the above spec defined, now let's try shape conformation.
S.conform( MyObjSpec, { foo: true, bar1: 1, bar2: 2, bar3: 3 });
// returns { foo: true, bars: { bar1: 1, bar2: 2, bar3: 3 } }
// (Notice how all object keys that begin with "bar" are now grouped under a single value "bars").
```
#### Function Specs

```js
// Now onward to function specs.
var MyFnSpec = S.fspec({
  args: MyLabelledSpec , // reusing MySpec from above
  ret: S.isBool,
});

// Next we write our function.
function __myFunction(num1, num2, num3, myObj) {
  // doesn't do much; just returns true for now.
  return true;
};

// Then "instrument"(wrap/protect) this function with our function spec.
var myProtectedFn = MyFnSpec.instrument(__myFunction);

// We can now try our new protected function.
myProtectedFn(1, 2, 3, { a: true }); // returns true
myProtectedFn(1, 2, 3, 'hello'); // Throws a "Problem" due to mismatched argument per our fspec definition.

// Finally, let's build a function that checks if the sum of all numbers are odd
// by taking advantage of Specky's function argument conformation.

// Step 1: we write a "barebone" function with our core logic,
// which consumes the conformed arguments as a single object.
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

// Step 2: wrap the barebone function with S.instrumentConformed()
var sumIsOdd = MyFnSpec.instrumentConformed(__sumIsOdd);

// Let's try our new super function!
sumIsOdd( 1, 1, 1 ); // true: sum is odd
sumIsOdd( 2, 2, 2 ); // false: sum is even
sumIsOdd( 1, 1, 1, {} ); // true (remember the optional trailing isObj we defined above?)
sumIsOdd( 2, 2, 2, null ); // throws a "Problem" because arguments do not conform
sumIsOdd( 2, 2, 2, {}, {} ); // same as above
```

For more advanced features and concepts, refer to [documentation site](https://specky.js.org).


## Try It Yourself

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

- [Simple example in browser](examples/simple.html)
- [Experiment Spec'ing promises](examples/promise/index.js)
- [Codebreaker game example](examples/codebreaker/index.js)

In addition, there are plenty of examples in test files under [`/test`](test/).

## Performance & Reliability

- [![Size Minified](http://img.badgesize.io/speckyjs/specky/master/packages/specky/dist/specky.min.js?label=min)](packages/specky/dist) [![Size Gzipped](http://img.badgesize.io/speckyjs/specky/master/packages/specky/dist/specky.min.js?compression=gzip&label=min%2Bgzipped)](packages/specky/dist)
- Specky uses Thompson NFA algorithm in handling complex regex operations.
- Specky's implementation is optimizated against running into a long chains of recursive function calls in path searching and making redundant path visits wherever possible.

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
