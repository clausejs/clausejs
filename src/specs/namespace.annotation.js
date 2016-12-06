import S, { meta as M } from '../';

M( '/Specky', {
  '.name': 'S',
  '.args': {
    'register': {
      '.comment': 'Registers a namespace path with an expression.',
    },
    'retrieve': {
      '.comment': 'Retrieves an expression by namespace path',
    }
  },
  '.ret': {
    '.comment': 'Note: The returned Spec is not immediately resolved',
  },
} );

M( 'specky.types/NamespacePath', {
  '.comment': 'Represents a namespace path.',
  '.example': 'com.xyz.awesomeApp/User',
} );
