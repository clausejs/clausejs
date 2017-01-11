require( 'babel-core/register' );

var sExpression = require( '../src/utils/sExpression' ).default;
var describe = require( '../src/utils/describe' );

const C = require( '../src' );
const { cat, any, wall, shape, oneOrMore, zeroOrMore, or, isObj, isNum, isBool, isStr } = C;

var SampleClause = cat(
    'first', oneOrMore( cat( isStr, isBool ) ),
    'second', or(
        'objOpt', isObj,
        'hula', shape( {
          req: [ 'a', 'b', 'c' ],
          optional: {
            hello: any,
            world: isObj,
          }
        } ),
        'showNum', cat( isNum, or( isBool, isObj ) ) ),
        'third', zeroOrMore( C.delayed( () => SampleClause ) )
  );

var r = describe( SampleClause );

console.log( r );
