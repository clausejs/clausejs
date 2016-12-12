import { meta as M } from '../';

M( '/specky', {
  'name': 'S',
  'comment': 'Registers or retrieves a spec from global spec regitry by path.',
  'args': {
    'register': {
      'comment': 'Registers a namespace path with the given expression.',
      'example': 'S("awesomeapp/TodoItem", todoItemSpec)',
    },
    'retrieve': {
      'comment': 'Retrieves an expression by namespace path.',
      'example': 'S("awesomeapp/TodoItem")',
    }
  },
  'ret': {
    'comment': 'Note: The returned Spec is not immediately resolved until one calls its get() method.',
  },
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
