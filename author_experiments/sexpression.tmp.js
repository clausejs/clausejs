require( 'babel-core/register' );

var sExpression = require( '../src/utils/sExpression' );

const C = require( '../src' );
const { cat, wall, oneOrMore, zeroOrMore, or, isObj, isNum, isBool, isStr } = C;

var SampleClause = cat(
    'first', oneOrMore( cat( isStr, isBool ) ),
    'second', or(
        'objOpt', isObj,
        'showNum', cat( isNum, or( isBool, isObj ) ) ),
        'third', zeroOrMore( C.delayed( () => SampleClause ) )
  );

var r = sExpression( SampleClause );

console.log( r );
