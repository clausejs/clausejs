const isStr = require( '../preds/isStr' );

const dict = {
  Z_OR_M: 'zeroOrMore',
  O_OR_M: 'oneOrMore',
  Z_OR_O: 'zeroOrOne',
  COLL_OF: 'collOf',
  MAP_OF: 'mapOf',
};

function humanReadable( expr ) {
  if ( isStr( expr ) ) {
    return expr;
  }
  if ( !expr ) {
    debugger;
  }
  if ( expr.type ) {
    if ( dict[ expr.type ] ) {
      return dict[ expr.type ];
    } else {
      return expr.type.toLowerCase();
    }
  } else {
    return expr.toString();
  }
}

module.exports = humanReadable;
