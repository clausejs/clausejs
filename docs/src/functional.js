
import $ from 'jquery';
import tether from 'tether';
import S from '../../src';
// require( 'bootstrap/dist/css/bootstrap.css' );
require( 'highlight.js/styles/default.css' );
const HLJS = require( 'highlight.js/lib/highlight' );
HLJS.registerLanguage( 'javascript', require( 'highlight.js/lib/languages/javascript' ) );
window.$ = window.jQuery = $;
window.Tether = tether;
require( 'bootstrap/js/tooltip' );
require( 'bootstrap/js/popover' );

$( () => {

  //highlight source code
  $( 'pre code' ).each( ( i, block ) => {
    HLJS.highlightBlock( block );
  } );

  $( '[data-toggle="popover"]' ).popover();

  $( function flashAnchors() {
    $( 'a[href*="#"]' ).click( function( e ) {
      $( `div[data-path="${$( e.target ).data( 'path' )}"]` )
        .delay( 100 ).fadeIn( 100 ).fadeOut( 100 ).fadeIn( 100 ).fadeOut( 100 ).fadeIn( 100 );
    } );
  } );
} );

// quick hack; to expose variable S to window
// TODO: separate build file configs in webpack.config
module.exports = S;
