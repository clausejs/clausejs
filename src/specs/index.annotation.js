import { meta as M } from '../';

M( '/specky', {
  'name': 'S',
  'args': {
    'register': {
      'comment': 'Registers a namespace path with an expression.',
      'example': 'S("awesomeapp/TodoItem", todoItemSpec)',
    },
    'retrieve': {
      'comment': 'Retrieves an expression by namespace path.',
      'example': 'S("awesomeapp/TodoItem")',
    }
  },
  'ret': {
    'comment': 'Note: The returned Spec is not immediately resolved',
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
  'comment': 'returns an abbreviated description of the spec as a simple tree structure',
} );
