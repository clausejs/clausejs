import docgen from '../../src/docgen';
import '../../src/specs';
// import '../../author_experiments/ben.tmp';
import S from '../../src';
import $ from 'jquery';

require( '../../src/specs/index.annotation.js' );
const finalDocStr = docgen.gen( S.getRegistry() );
const finalCotStr = docgen.genCot( S.getRegistry() );

$( () => {
  document.getElementById( 'api' ).innerHTML = finalDocStr;
  document.getElementById( 'cot' ).innerHTML = finalCotStr;
} );
