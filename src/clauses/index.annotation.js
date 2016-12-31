import { meta as M } from '../';

M( '/clausejs', {
  'name': 'C',
  'comment': 'Registers or retrieves a clause from global clause regitry by path.',
  'args': {
    'register': {
      'comment': 'Put the given expression onto the given path in the global clause registry.',
      'example': 'S("awesomeapp/TodoItem", todoItemClause)',
    },
    'retrieve': {
      'comment': 'Retrieves an expression from the given namespace path, or returns null if not found.',
      'example': 'S("awesomeapp/TodoItem")',
    }
  },
  'ret': {
    'comment': 'Note: The returned Clause is of type ClauseRef and is not immediately resolved until one calls its get() method.',
  },
} );

M( '/clausejs/get', {
  'name': 'C.get'
} );

M( '/clausejs/set', {
  'name': 'C.set'
} );

M( 'clausejs.types/NamespacePath', {
  'comment': 'Represents a namespace path.',
  'example': '"com.xyz.awesomeApp/User"',
} );

M( 'clausejs.types/Expression', {
  'comment': 'Represents an Clause expression.',
  'example': 'isPositiveNumber(x); C.cat(...)',
} );

M( 'clausejs.utils/describe', {
  'name': 'C.describe',
  'comment': 'Returns an abbreviated description of the clause as a simple tree structure.',
} );
