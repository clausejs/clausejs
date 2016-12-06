import S from '../../src';
import docgen from '../../src/docgen';
import Registry from '../../src/specs';
require( '../../src/specs/index.annotation.js' );

const finalDocStr = docgen.gen( Registry );

document.getElementById( 'api' ).innerHTML = finalDocStr;
