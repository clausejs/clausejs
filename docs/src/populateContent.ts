import '../../src/clauses';
import '../../src/clauses/index.annotation';
import docgen from '../../src/docgen';
import VERSION from '../../package_version';
import { getRegistry } from '../../src/namespace';
import showdown from 'showdown';
const converter = new showdown.Converter();

const finalDocStr = docgen.gen( getRegistry() );
const finalCotStr = docgen.genCot( getRegistry() );

export default function populateContent( $, requireFn ) {
  $( '#cot' ).html( finalCotStr );
  $( '#api' ).html( finalDocStr );
  $( '.clausejs-version' ).html( VERSION );

  var markdownElems = $( '.markdown-article' );

  markdownElems.each( ( idx, elem ) => {
    const $elem = $( elem );
    const rawMd = requireFn( $elem.attr( 'markdown-path' ) );
    const html = converter.makeHtml( rawMd );
    $elem.html( html );
  } );
}
