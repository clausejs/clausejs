import { meta as M } from '../';

M( '/specky', {
  'name': 'S',
  'comment': 'Registers or retrieves a spec from global spec regitry by path.',
  'args': {
    'register': {
      'comment': 'Put the given expression onto the given path in the global spec registry.',
      'example': 'S("awesomeapp/TodoItem", todoItemSpec)',
    },
    'retrieve': {
      'comment': 'Retrieves an expression from the given namespace path, or returns null if not found.',
      'example': 'S("awesomeapp/TodoItem")',
    }
  },
  'ret': {
    'comment': 'Note: The returned Spec is of type SpecRef and is not immediately resolved until one calls its get() method.',
  },
} );

M( '/specky/get', {
  'name': 'S.get'
} );

M( '/specky/set', {
  'name': 'S.set'
} );

M( 'specky.types/NamespacePath', {
  'comment': 'Represents a namespace path.',
  'example': '"com.xyz.awesomeApp/User"',
} );

M( 'specky.types/Expression', {
  'comment': 'Represents an Specky expression.',
  'example': 'isPositiveNumber(x); S.cat(...)',
} );

M( 'specky.utils/describe', {
  'name': 'S.describe',
  'comment': 'Returns an abbreviated description of the spec as a simple tree structure.',
} );
