import '../../src/clauses';
import '../../src/clauses/index.annotation';
import {gen, genCot} from '../../src/docgen';
const VERSION = require('../../package_version');
import { getRegistry } from '../../src/namespace';
import showdown, {Converter} from 'showdown';
const converter = new Converter();

const finalDocStr = gen( getRegistry() );
const finalCotStr = genCot( getRegistry() );

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
