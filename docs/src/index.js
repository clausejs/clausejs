
import docgen from '../../src/docgen';
import '../../src/specs';
// import '../../author_experiments/ben.tmp';
import S from '../../src';
import $ from 'jquery';
import tether from 'tether';
require( 'bootstrap/dist/css/bootstrap.css' );
require( 'highlight.js/styles/default.css' );
const HLJS = require( 'highlight.js' );
window.$ = window.jQuery = $;
window.Tether = tether;
require( 'bootstrap' );

require( '../../src/specs/index.annotation.js' );
const finalDocStr = docgen.gen( S.getRegistry() );
const finalCotStr = docgen.genCot( S.getRegistry() );

$( () => {
  document.getElementById( 'api' ).innerHTML = finalDocStr;
  document.getElementById( 'cot' ).innerHTML = finalCotStr;
} )

$( () => {
  $( '[data-toggle="popover"]' ).popover();

  //highlight source code
  $( 'pre code' ).each( ( i, block ) => {

    HLJS.highlightBlock( block );
  } );
} );

$( function flashAnchors() {
  $( 'a[href*="#"]' ).click( function( e ) {
    $( `div[data-path="${$( e.target ).data( 'path' )}"]` )
      .delay( 100 ).fadeIn( 100 ).fadeOut( 100 ).fadeIn( 100 ).fadeOut( 100 ).fadeIn( 100 );
  } );
} );
