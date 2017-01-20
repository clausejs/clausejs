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
  'second', C.isNum, 
  'third', C.isBool
);
C.conform( LabelledCatClause, ["a", 2, true] )`,
    `// equivalent to the above
var LabelledCatClause = C.cat([
  [ 'first', C.isStr ], 
  [ 'second', C.isNum ], 
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

M( 'clause.compose/cat', {
} );

M( 'clause.compose/or', {
} );

M( 'clause.compose/zeroOrMore', {
} );

M( 'clause.compose.string/sCat', {
  examples: `
var StrClause = C.cat('part1', C.zeroOrMore(C.sCat('foo')),
                      'part2.5', C.zeroOrMore(C.sCat('i am optional')),
                      'part2', C.zeroOrMore(C.sCat('bar')));

C.conform(StrClause, 'foofoofoobarbar');
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
