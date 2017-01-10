require( 'babel-core/register' );

var sExpression = require( '../src/utils/sExpression' );

const C = require( '../src' );
const { cat, oneOrMore, or, isObj, isNum, isBool, isStr } = C;

var SampleClause = cat(
  'first', oneOrMore( cat( isStr, isBool ) ),
  'second', or(
    'objOpt', isObj,
    'showNum', cat( isNum, or( isBool, isObj ) ) ) );

var r = sExpression( SampleClause );

console.log( r );
