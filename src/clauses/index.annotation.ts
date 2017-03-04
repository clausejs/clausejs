import { setMeta as M } from '../';

M( '/clause', {
  'name': 'C',
  'showAsFunction': true,
  'comment': 'Convenient method that combines C.get() and C.set() into one function to get or set clauses from the global registry.',
  'examples': [
    'C("awesomeapp/TodoItem", TodoItemClause)',
    `var ref = C("awesomeapp/TodoItem");
ref.get()`
  ],
  'args': {
    'register': {
      'comment': 'Put the given expression onto the given path in the global clause registry.',
      'examples': 'C("awesomeapp/TodoItem", TodoItemClause)',
    },
    'retrieve': {
      'comment': 'Retrieves an expression from the given namespace path, or returns null if not found.',
      'examples': 'C("awesomeapp/TodoItem")',
    }
  },
  'ret': {
    'comment': 'Note: The returned Clause is of type ClauseRef and is not immediately resolved until one calls its get() method.',
  },
} );

M( 'clause.compose.regex/cat', {
  comment: 'Given a set of expressions or a set of label+expression pairs, returns a regex op that matches all values in an iterable. If labels are given, returns a map that groups values by these labels. Returns a Problem if no match is found.',
  examples: [
    `var CatClause = C.cat(C.isStr, C.isNum, C.isBool);
C.isValid( CatClause, ["a", 2, true] )`,
    'C.isValid( CatClause, ["a", false, "b"] )',
    `var LabelledCatClause = C.cat(
  'first', C.isStr, 
  'second', C.isNum, 
  'third', C.isBool
);
C.conform( LabelledCatClause, ["a", 2, true] )`,
    `// equivalent to the above
var LabelledCatClause = C.cat([
  [ 'first', C.isStr ], 
  [ 'second', 'this is an optional comment on second', C.isNum ], 
  [ 'third', C.isBool ]
]);
C.conform( LabelledCatClause, ["a", 2, true] )`,
  ]
} );

M( 'clause.compose.regex/or', {
  comment: 'Given a set of expressions or a set of label+expression pairs, returns a regex op that matches a value with either one of the expressions. If labels are given, returns a map with a single key that indicates the matching label.',
  examples: [
    `var OrClause = C.or(C.isStr, C.isNum);
C.conform( OrClause, "a" )`,
    `var LabelledOrClause = C.or('option1', C.isStr, 'option2', C.isNum );
C.conform( LabelledOrClause, 2 )`,
    `// equivalent to the above
var LabelledOrClause = C.or([['option1', C.isStr], ['option2', C.isNum]] );
C.conform( LabelledOrClause, 2 )`,
  ]
} );

M( 'clause.compose.regex/zeroOrMore', {
  comment: 'Given a single expression, returns a regex op that matches zero or more values in an iterable. Returns a Problem if there are no matches.',
  examples: [
    `var ZOMClause = C.zeroOrMore(C.isNum);
C.isValid( ZOMClause, [1, 2, 3] )`,
    'C.isValid( ZOMClause, [1, 2, "3"] )',
    'C.isValid( ZOMClause, [] )',
    `var CombinedClause = C.cat( 
  "babbles", C.zeroOrMore(C.oneOf("foo", "bar", "baz")),
  "truths", C.zeroOrMore(C.isBool),
  "counts", C.zeroOrMore(C.isNatInt)
);
C.conform( CombinedClause, ["foo", "foo", "bar", true,  2, 3 , 4] )`,
    'C.isValid( CombinedClause, ["foo", "foo", "bar", 2, 3 , 4] )',
    'C.isValid( CombinedClause, [ 2, 3 , 4 ] )',
    'C.isValid( CombinedClause, [ ] )',
  ]
} );

M( 'clause.compose.regex/oneOrMore', {
  comment: 'Given a single expression, returns a regex op that matches one or more values in an iterable. Returns a Problem if there are no matches.',
  examples: [
    `var OOMClause = C.oneOrMore(C.equals("hello"));
C.isValid( OOMClause, [ "hello", "hello", "hello" ] )`,
    'C.isValid( OOMClause, [ "hello", "hello", "hello" ] )',
    `var CombinedClause = C.cat( 
  "babbles", C.oneOrMore(C.oneOf("foo", "bar", "baz")),
  "truths", C.oneOrMore(C.isBool),
  "counts", C.oneOrMore(C.isNatInt)
);
C.conform( CombinedClause, ["foo", "foo", "baz", false, true, 2, 3 ] )`,
    'C.isValid( CombinedClause, [false, true, 2, 3 ] )',
  ]
} );

M( 'clause.compose.regex/zeroOrOne', {
  comment: 'Given a single expression, returns a regex op that matches zero or one values in an iterable. Returns a Problem if there are no matches.',
  examples: [
    `var ZOOClause = C.zeroOrOne( C.equals( "hello" ) );
C.isValid( ZOOClause, [ "hello" ] )`,
    'C.isValid( ZOOClause, [] )',
    `var CombinedClause = C.cat( 
  "the babble", C.zeroOrOne( C.oneOf("foo", "bar", "baz") ),
  "the truth", C.zeroOrOne( C.isBool ),
  "the count", C.zeroOrOne( C.isNatInt )
);
C.conform( CombinedClause, ["foo", 4] )`,
  ]
} );

M( 'clause.compose/and', {
  comment: 'Given a list of expressions, returns a clause that matches a value with all the expressions. Successive conformed value propagates to the rest of the expressions.',
  examples: [
    `var AndClause = C.and( C.isStr, (s) => s.length > 5 );
C.isValid( AndClause, "abcdefgh" )`,
    'C.isValid( AndClause, "abc" )',
    `var PropagatingAndClause = C.and( 
  C.cat( 
    "first", C.isStr, 
    "second", C.zeroOrMore( C.isNum )
  ),
  // "second" propagated from conformed results of the previous clause
  ({ second }) => second.length > 4 ) 
C.isValid( PropagatingAndClause, [ "foo", 2, 3, 4, 5, 6 ] )`,
    'C.conform( PropagatingAndClause, [ "foo", 2, 3, 4, 5, 6 ] )',
    'C.isValid( PropagatingAndClause, [ "foo", 2, 3 ] )',
  ]
} );

M( 'clause.compose/collOf', {
  comment: 'Given a single expression, returns a clause that matches all values in an iterable with the given expression. ',
  examples: [
    `var CollOfStrClause = C.collOf(C.isStr);
C.conform( CollOfStrClause, ["a", "b", "c"] )`,
    'C.conform( CollOfStrClause, [] )',
    ` // notice the difference in behavior from C.zeroOrOne
var CombinedCollOfClause = C.cat( 
  "babbles", C.collOf(C.oneOf("foo", "bar", "baz")),
  "truths", C.collOf(C.isBool),
  "counts", C.collOf(C.isNatInt)
);
C.isValid( CombinedCollOfClause, [["foo", "foo", "bar"], [], [2, 3 , 4]] )`,
    `// invalid because collOf does not mix with regex ops like zeroOrMore
// collOf(...) here is equivalent to wall(zeroOrMore(...))
C.isValid( CombinedCollOfClause, ["foo", "foo", "bar", 2, 3 , 4] )`
  ]
} );

M( 'clause.compose/mapOf', {
  comment: 'Given a pair of expressions, returns a clause that matches an object all of whose keys matches the first expression and all of whose values matches the second expression.',
  examples: [
    `var AbilityMapClause = C.mapOf(
      (key) => key.indexOf("can") === 0,
      C.isBool );
C.isValid( AbilityMapClause, { canFly: true, canSwim: true, canDance: false } )`,
    'C.isValid( AbilityMapClause, { canFly: true, canSwim: true, canDance: "huh?" } )',
    'C.isValid( AbilityMapClause, { meNotValid: true, canSwim: true } )',
  ]
} );

M( 'clause.compose/shape', {
  comment: 'Given an object with two optional properties "required" and "optional", returns a clause that matches an object all of whose keys matches the expressions defined in "required" object and some of whose values matches the expressions defined in "optional" objects.',
  examples: [
    `var ShapeClause = C.shape( { 
  required: ["key1", "key2", "key3"], 
  optional: ["key4"],
  } );
C.isValid( ShapeClause, { key1: true, key2: 2, key3: "ss", key4: false } )`,
    'C.isValid( ShapeClause, { key1: true, key2: 2, key3: "ss" } )',
    'C.isValid( ShapeClause, { key1: true, key2: 2 } )',
    `var ShapeClause2 = C.shape( { 
  required: {
    key1: C.isBool,
    key2: C.isNatInt,
  }, 
  optional: ["key5"],
  } );
C.isValid( ShapeClause2, { key1: true, key2: 2, key5: false } )`,
    'C.isValid( ShapeClause2, { key1: "not bool", key2: 2, key5: false } )',
    `// key group conformation
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
} )`,
  ]
} );

M( 'clause.compose/any', {
  comment: 'Returns a clause that matches any value.',
  examples: [
    'C.isValid(C.any(), 123)',
    'C.isValid(C.any(), true)',
    'C.isValid(C.any(), ["sass"])',
    'C.isValid(C.any(), null)',
    'C.isValid(C.any(), undefined)',
  ]
} );

M( 'clause.compose/wall', {
  comment: 'Given a single expression, returns a clause that does not regex-mix with the parent clause. Useful for validating a list inside another list in the sequence.',
  examples: [
    `var FreeMixClause = C.cat( C.oneOrMore( C.isNum ) );
C.isValid( FreeMixClause, [2, 3, 4] )`,
    'C.isValid( FreeMixClause, [ [2, 3, 4] ] )',
    ` var WalledClause = C.cat( C.wall( C.oneOrMore( C.isNum ) ) );;
C.isValid( WalledClause, [2, 3, 4] )`,
    'C.isValid( WalledClause, [ [2, 3, 4] ] )',
  ]
} );

M( 'clause.compose/fclause', {
  comment: 'Given an object that contains "args", "ret" and "fn" expressions (all optionally), returns a clause whose instrument function takes a function and validates its arguments and return value during run time and whose instrumentConformed function takes a function that takes conformed arguments.',
  examples: [
    `// first, we define a cat clause
var FnArgsClause = C.zeroOrMore(
   C.cat(
     'name', C.isStr,
     'age', C.isNatInt,
     // optional field
     'isMember', C.zeroOrOne( C.isBool )
   )
 );
C.conform(FnArgsClause, ["john", 23, true, "mary", 25, "bob", 34])`,
    `// next, we define a fclause with args as the cat clause defined above
var MyFnSpec = C.fclause( {
 args: FnArgsClause,
 ret: C.isNatInt
} );

var nameCount = MyFnSpec.instrument( 
  function _nameCount() { return Array.from(arguments).filter((s) => C.isStr(s)).length; } 
);
nameCount("john", 23, true, "mary", 25, "bob", 34);
`,
    `// invalid: missing name
    nameCount("john", 23, true, 24, false);`,
    `var averageAge = MyFnSpec.instrumentConformed( 
  function (cprofiles) { // "c" stands for "conformed"
    // cprofiles example:
    // [ { name: "john", age: 4, isMember: true }, { name: "mary", age: 23 }, { name: "bob", age: 102 } ]
    var sumOfAges = cprofiles
      .map( ( { age } ) => age )
      .reduce( (acc, c) => c + acc, 0 );
    return sumOfAges / cprofiles.length;
  }
);

// cprofile below conforms into 
averageAge("john", 4, true, "mary", 23, "bob", 102);`
  ]
} );

M( 'clause.compose/delayed', {
  comment: 'Given a funciton that returns a clause, returns a DelayedClause that does not evaluate until its get() function is called. Useful for constructing recursive clause definitions.',
  examples: [
    `
var BinaryTreeClause = C.maybe( C.wall(
  C.cat(
    'nodeName', C.isStr, 
    'leftNode', C.delayed( () => BinaryTreeClause ),
    'rightNode', C.delayed( () => BinaryTreeClause )
  )
) );

C.isValid(
  BinaryTreeClause, 
  ['john', ['bob', ['alice', null, null], null], ['sam', null, ['jane', null, null]]]
); `,
  ]
} );

M( 'clause.compose/nullable', {
  comment: 'Given an expression, returns a new clause that matches either the original clause or a null value.',
  examples: [
    'C.isValid(C.isStr, null);',
    'C.isValid(C.nullable(C.isStr), null);'
  ]
} );

M( 'clause.compose/undefinable', {
  comment: 'Given an expression, returns a new clause that matches either the original clause or undefined.',
  examples: [
    'C.isValid(C.isStr, undefined);',
    'C.isValid(C.undefinable(C.isStr), undefined);'
  ]
} );

M( 'clause.compose/maybe', {
  comment: 'Given an expression, returns a new clause that matches either the original clause, a null value, or undefined.',
  examples: [
    'C.isValid(C.isObj, undefined);',
    'C.isValid(C.maybe(C.isObj), null);',
    'C.isValid(C.maybe(C.isObj), undefined);'
  ]
} );

M( 'clause.namespace/get', {
  comment: 'Gets a clause reference from global clause registry.',
  examples: [
    'C("awesomeapp/TodoItem")',
    'C("awesomeapp/TodoItem").get()'
  ]
} );

M( 'clause.namespace/set', {
  'comment': 'Registers a clause in to global clause registry.',
  examples: [ 'C("awesomeapp/TodoItem", TodoItemClause)' ]
} );

M( 'clause.compose.string/scat', {
  examples: `
var StrClause = C.cat('greetings', C.zeroOrMore(C.scat('hello')),
                      'substence', C.zeroOrMore(C.scat('i am optional')),
                      'farewell', C.zeroOrMore(C.scat('bye')));

C.conform(StrClause, 'hellohellobyebyebyebye');
` } );

M( 'clause.types/NamespacePath', {
  'comment': 'Represents a namespace path.',
  'examples': '"com.xyz.awesomeApp/User"',
} );

M( 'clause.types/Expression', {
  'comment': 'Represents an Clause expression.',
  'examples': 'isPositiveNumber(x); C.cat(...)',
} );

M( 'clause.utils/describe', {
  'comment': 'Returns an abbreviated description of the clause as a simple tree structure.',
} );
