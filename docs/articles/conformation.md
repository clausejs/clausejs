### What is Conformation?

To put it plainly, as a developer you expect your data to be of certain "shape".

You define the shape of the data with clauses.

To "conform" your data with your clauses is to shape it in a way that is <em>better organized</em>, making it easier for your code to consume.

In order for conformation to work, one must specify a label for each part of your spec definition (example to follow below).

There are 3 ways that data can be conformed with Clause:

#### Cat Conformation (on arrays and strings)

```js
var MyCatClause = C.cat(
  'first', C.isStr, 
  'second', C.isNum, 
  'third', C.isBool
);
C.conform( MyCatClause, ["a", 2, true] )
```

In addition to arrays, strings can also be conformed with `scat`.

```js
var StrClause = C.cat('greetings', C.zeroOrMore(C.scat('hello')),
                      'substence', C.zeroOrMore(C.scat('i am optional')),
                      'farewell', C.zeroOrMore(C.scat('bye')));

C.conform(StrClause, 'hellohellobyebyebyebye');
```

### Or Conformation

```js
var MyOrClause = C.or('option1', C.isStr, 'option2', C.isNum );
C.conform( MyOrClause, 2 )
```

#### Shape Conformation

```js
var ShapeClause3 = C.shape( { 
  required: {
    abilityGroup: [ 
      // key expression
      (key) => key.indexOf('can') === 0,
      // value expression
      C.isBool
    ],
    someKey: C.isNatInt,
  }, 
  optional: ["key5"],
  } );

C.conform( ShapeClause3, { 
  canDance: true, 
  canFly: true, 
  canSwim: false, 
  someKey: 999 
} )
```

Notice that for all the examples given above, a label is supplied for each conformed parts.

#### Use `match()` to simplfy code

In conjunction with conformation, `C.match()` can be used to simplify case handling. For example,

```js
// TODO give example
```