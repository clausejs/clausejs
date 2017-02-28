// import '../../author_experiments/ben.tmp';
var $ = require( 'jquery');
import populateContent from  './populateContent';

import  '../../src/clauses/index.annotation';

$( () => {
  populateContent( $, loadMd );
} );

function loadMd(path) {
  return require('raw-loader!../articles/' + path);
}
