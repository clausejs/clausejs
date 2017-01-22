
import $ from 'jquery';
import tether from 'tether';
import C from '../../src';
// require( 'bootstrap/dist/css/bootstrap.css' );
require( 'highlight.js/styles/default.css' );
const HLJS = require( 'highlight.js/lib/highlight' );
HLJS.registerLanguage( 'javascript', require( 'highlight.js/lib/languages/javascript' ) );
HLJS.registerLanguage( 'clause', require( './highlightjs-clause' ) );
window.$ = window.jQuery = $;
window.Tether = tether;
window.Util = require( 'exports-loader?Util!bootstrap/js/dist/util' );
window.Tooltip = require( 'exports-loader?Tooltip!bootstrap/js/dist/tooltip' );
window.Popover = require( 'exports-loader?Popover!bootstrap/js/dist/popover' );
window.CodeMirror = require( 'codemirror' );
require( 'bootstrap/js/dist/collapse' );

$( () => {

  //highlight source code
  $( '.code-examples pre code' ).each( ( i, block ) => {
    HLJS.highlightBlock( block );
  } );

  $( 'pre.clause-description code' ).each( ( i, block ) => {
    HLJS.highlightBlock( block );
  } );

  $( '[data-toggle="popover"]' ).popover();

  // $( function flashAnchors() {
  //   $( 'a[href*="#"]' ).click( function( e ) {
  //     $( `div[data-path="${$( e.target ).data( 'path' )}"]` )
  //       .delay( 100 ).fadeIn( 100 ).fadeOut( 100 ).fadeIn( 100 ).fadeOut( 100 ).fadeIn( 100 );
  //   } );
  // } );

  $( '.launch-code-examples' ).click( ( e ) => {
    const name = $( e.target ).data( 'name' );
    window.klipse_settings.selector_es2017 = `.code-examples[data-name=${name}] pre code`;
    window.klipse.plugin.init( window.klipse.run.plugin_prod.plugin.settings() );
  } );
} );

window.klipse_settings = {
  selector_es2017: '.noop-doesnt-exist pre code', // css selector for the html elements you want to klipsify
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

$( () => {

  window.TodoItemClause = C.shape( {
    required: [ 'title' ]
  } );

  window.klipse_settings.selector_es2017 = '.markdown-article pre code';
  window.klipse.plugin.init( window.klipse.run.plugin_prod.plugin.settings() );

} );

// quick hack; to expose variable C to window
// TODO: separate build file configs in webpack.config
module.exports = C;
