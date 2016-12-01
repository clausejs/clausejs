import S, { meta as M } from '../';

M( 'Specky.types.NamespacePath', {
  comment: 'Represents a namespace path.',
  example: 'com.xyz.awesomeApp.User',
} );
M( 'Specky', {
  '.args': {
    '?register': {
      comment: 'Registers a namespace path with an expression.',
    },
    '?retrieve': {
      comment: 'Retrieves an expression by namespace path',
    }
  },
  '.ret': {
    comment: 'Note: The returned Spec is not immediately resolved',
  },
} );

function C( nsPath, comment ) {
  M( nsPath, { comment } );
}

function E( nsPath, example ) {
  M( nsPath, { example } );
}
