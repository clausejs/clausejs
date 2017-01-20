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

M( 'clause.compose/cat', {
  comment: 'Given a set of expressions or a set of label+expression pairs, returns a regex op that matches all values in an iterable. If labels are given, returns a map that groups values by these labels. Returns a Problem if no match is found.',
  examples: [
    `var CatClause = C.cat(C.isStr, C.isNum, C.isBool);
C.conform( CatClause, ["a", 2, true] )`,
    `var LabelledCatClause = C.cat(
  'first', C.isStr, 
  'second', 'this is an optional comment', C.isNum, 
  'third', C.isBool
);
C.conform( LabelledCatClause, ["a", 2, true] )`,
    `// equivalent to the above
var LabelledCatClause = C.cat([
  [ 'first', C.isStr ], 
  [ 'second', 'this is an optional comment', C.isNum ], 
  [ 'third', C.isBool ]
]);
C.conform( LabelledCatClause, ["a", 2, true] )`,
  ]
} );

M( 'clause.compose/or', {
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

M( 'clause.compose/zeroOrMore', {
  comment: 'Given a single expression, returns a regex op that matches zero or more values in an iterable. Returns a Problem if there are no matches.',
  examples: [
    `var ZOMClause = C.zeroOrMore(C.isStr);
C.conform( ZOMClause, ["a", "b", "c"] )`,
    'C.conform( ZOMClause, [] )',
    `var CombinedClause = C.cat( 
  "babbles", C.zeroOrMore(C.oneOf("foo", "bar", "baz")),
  "truths", C.zeroOrMore(C.isBool),
  "counts", C.zeroOrMore(C.isNatInt)
);
C.conform( CombinedClause, ["foo", "foo", "bar", 2, 3 , 4] )`,
  ]
} );

M( 'clause.compose/oneOrMore', {
  comment: 'Given a single expression, returns a regex op that matches one or more values in an iterable. Returns a Problem if there are no matches.',
  examples: [
    `var OOMClause = C.oneOrMore(C.equals("hello"));
C.conform( OOMClause, [ "hello", "hello", "hello" ] )`,
    'C.isValid( OOMClause, [] )',
    `var CombinedClause = C.cat( 
  "babbles", C.oneOrMore(C.oneOf("foo", "bar", "baz")),
  "truths", C.oneOrMore(C.isBool),
  "counts", C.oneOrMore(C.isNatInt)
);
C.conform( CombinedClause, ["foo", "foo", "bar", false, true, 2, 3 , 4] )`,
  ]
} );

M( 'clause.compose/zeroOrOne', {
  comment: 'Given a single expression, returns a regex op that matches zero or one values in an iterable. Returns a Problem if there are no matches.',
  examples: [
    `var ZOOClause = C.zeroOrOne( C.equals( "hello" ) );
C.conform( ZOOClause, [ "hello" ] )`,
    'C.conform( ZOOClause, [] )',
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
C.conform( AndClause, "abcdefgh" )`,
    `var PropagatingAndClause = C.and( 
  C.cat( 
    "first", C.isStr, 
    "second", C.zeroOrMore( C.isNum )
  ),
  ({ second }) => second.length > 4 ) 
C.isValid( PropagatingAndClause, [ "foo", 2, 3, 4, 5, 6 ] )`,
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
    'C.isValid( ShapeClause, { key1: true, key2: 2 } )',
    `var ShapeClause2 = C.shape( { 
  required: {
    key1: C.isStr,
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

M( 'clause.compose.string/sCat', {
  examples: `
var StrClause = C.cat('greetings', C.zeroOrMore(C.sCat('hello')),
                      'substence', C.zeroOrMore(C.sCat('i am optional')),
                      'farewell', C.zeroOrMore(C.sCat('bye')));

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
