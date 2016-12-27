import docgen from '../../src/docgen';
import '../../src/specs';
// import '../../author_experiments/ben.tmp';
import { getRegistry } from '../../src/namespace';
import $ from 'jquery';
import showdown from 'showdown';

const converter = new showdown.Converter();

require( '../../src/specs/index.annotation.js' );

const finalDocStr = docgen.gen( getRegistry() );
const finalCotStr = docgen.genCot( getRegistry() );

$( () => {
  document.getElementById( 'api' ).innerHTML = finalDocStr;
  document.getElementById( 'cot' ).innerHTML = finalCotStr;

  var markdownElems = Array.from( document.getElementsByClassName( 'markdown-article' ) );
  markdownElems.forEach( ( elem ) => {
    const rawMd = require( 'raw!./' + elem.attributes[ 'markdown-path' ].value );
    const html = converter.makeHtml( rawMd );
    elem.innerHTML = html;
  } );

} );
