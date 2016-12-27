import '../../src/specs';
import '../../src/specs/index.annotation';
import docgen from '../../src/docgen';
import VERSION from '../../package_version';
import { getRegistry } from '../../src/namespace';
import showdown from 'showdown';
const converter = new showdown.Converter();

const finalDocStr = docgen.gen( getRegistry() );
const finalCotStr = docgen.genCot( getRegistry() );


function populateContent( $, requireFn ) {
  $( '#cot' ).html( finalCotStr );
  $( '#api' ).html( finalDocStr );
  $( '.specky-version' ).html( VERSION );

  var markdownElems = $( '.markdown-article' );

  markdownElems.each( ( idx, elem ) => {
    const $elem = $( elem );
    const rawMd = requireFn( $elem.attr( 'markdown-path' ) );
    const html = converter.makeHtml( rawMd );
    $elem.html( html );
  } );
}

module.exports = populateContent;
