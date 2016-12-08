import S from '../../src';
import docgen from '../../src/docgen';
import Registry from '../../src/specs';
require( '../../src/specs/index.annotation.js' );

const finalDocStr = docgen.gen( Registry );
document.addEventListener( 'DOMContentLoaded', () => {
  document.getElementById( 'api' ).innerHTML = finalDocStr;

  $( '[data-toggle="popover"]' ).popover();

  $( 'pre code' ).each( function( i, block ) {
    hljs.highlightBlock( block );
  } );
} );
