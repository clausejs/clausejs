import { meta as M } from '../';

M( '/Specky', {
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
  'example': 'com.xyz.awesomeApp/User',
} );
