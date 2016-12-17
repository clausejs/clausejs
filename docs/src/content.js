import docgen from '../../src/docgen';
import '../../src/specs';
// import '../../author_experiments/ben.tmp';
import { getRegistry } from '../../src/namespace';
import $ from 'jquery';

require( '../../src/specs/index.annotation.js' );

const finalDocStr = docgen.gen( getRegistry() );
const finalCotStr = docgen.genCot( getRegistry() );

$( () => {
  document.getElementById( 'api' ).innerHTML = finalDocStr;
  document.getElementById( 'cot' ).innerHTML = finalCotStr;
} );
