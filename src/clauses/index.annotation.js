import { setMeta as M } from '../';

M( '/clause', {
  'name': 'C',
  'showAsFunction': true,
  'comment': 'Convenient method that combines C.get() and C.set() into one function to get or set clauses from the global registry.',
  'examples': [
    'C("awesomeapp/TodoItem", TodoItemClause)',
    'C("awesomeapp/TodoItem")'
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

M( 'clause.namespace/get', {
} );

M( 'clause.namespace/set', {
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
  'name': 'C.describe',
  'comment': 'Returns an abbreviated description of the clause as a simple tree structure.',
} );
