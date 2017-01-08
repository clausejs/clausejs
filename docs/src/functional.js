
import $ from 'jquery';
import tether from 'tether';
import C from '../../src';
// require( 'bootstrap/dist/css/bootstrap.css' );
// require( 'highlight.js/styles/default.css' );
// const HLJS = require( 'highlight.js/lib/highlight' );
// HLJS.registerLanguage( 'javascript', require( 'highlight.js/lib/languages/javascript' ) );
window.$ = window.jQuery = $;
window.Tether = tether;
window.Util = require( 'exports-loader?Util!bootstrap/js/dist/util' );
window.Tooltip = require( 'exports-loader?Tooltip!bootstrap/js/dist/tooltip' );
window.Popover = require( 'exports-loader?Popover!bootstrap/js/dist/popover' );

$( () => {

  //highlight source code
  // $( 'pre code' ).each( ( i, block ) => {
  //   HLJS.highlightBlock( block );
  // } );

  $( '[data-toggle="popover"]' ).popover();

  $( function flashAnchors() {
    $( 'a[href*="#"]' ).click( function( e ) {
      $( `div[data-path="${$( e.target ).data( 'path' )}"]` )
        .delay( 100 ).fadeIn( 100 ).fadeOut( 100 ).fadeIn( 100 ).fadeOut( 100 ).fadeIn( 100 );
    } );
  } );
} );

$( () => {
  window.klipse_settings = {
    selector_eval_js: 'pre code', // css selector for the html elements you want to klipsify
    codemirror_options_in: {
      indentUnit: 2,
      lineWrapping: false,
      lineNumbers: true,
      autoCloseBrackets: true
    },
    codemirror_options_out: {
      lineWrapping: false,
      lineNumbers: false,
      readOnly: true,
      theme: 'output',
    }
  };

  window.TodoItemClause = C.shape( {
    required: [ 'title' ]
  } );

  loadJS( './vendor/klipse_plugin.min.js' );
} );

function loadJS( file ) {
    // DOM: Create the script element
  var jsElm = document.createElement( 'script' );
    // set the type attribute
  jsElm.type = 'application/javascript';
    // make the script element load file
  jsElm.src = file;
    // finally insert the element to the body element in order to load the script
  document.body.appendChild( jsElm );
}

// quick hack; to expose variable S to window
// TODO: separate build file configs in webpack.config
module.exports = C;
