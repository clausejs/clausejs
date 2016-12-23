var oAssign = require( 'object-assign' );
var isUndefined = require( '../../preds/isUndefined' );

/*eslint func-names: 0*/
var FOLD = function() {};
var ENTER = function() {};
var MULTI_ENTER = function() {};
var MAYBE_ENTER = function() {};
var MAYBE_SINGLE_ENTER = function() {};

function Value( val ) {
  this.value = val;
}

function ArrayFragment( frag ) {
  this.fragment = frag;
}

function Nothing() {

}

function MaybeEnter() {}

function getMatch( chain, walkFn, walkOpts ) {
  // console.log( JSON.stringify( chain, null, 2 ) );
  var { conform } = walkOpts;
  var { inputType } = chain;

  const valStack = [];
  var r;

  chain.forEach( function( curr ) {
    if ( curr.move ) {
      switch ( curr.move.dir ) {
      case 'maybe_enter' : {
        valStack.push( new MaybeEnter() );
      } break;
      case 'maybe_exit': {
        let c,
          acc = new Nothing();
        while ( !( ( c = valStack.pop() ) instanceof MaybeEnter ) ) {
          acc = _foldLeft( acc, c );
        }
        valStack.push( acc );
      } break;
      case 'enter' : {
      } break;
      case 'exit': {
      } break;
      case 'maybe_in': {
      } break;
      case 'loop': {
      } break;
      case 'maybe_out': {
      } break;
      case 'in': {
      } break;
      case 'out': {
      } break;
      case 'spec': {
        let conformed = walkFn( curr.spec, curr.guide, walkOpts );
        valStack.push( new Value( conformed ) );
      } break;
      default: console.error( curr ); throw 'FUUU';
      }
    }
    console.log( curr.move.dir, curr, valStack );

  } );
  if ( valStack.length !== 1 ) {
    console.error( 'valStack', valStack );
    throw '!';
  }
  r = valStack.pop();

  if ( r instanceof ArrayFragment ) {
    r = r.fragment;
  }

  if ( inputType === 'string' ) {
    r = r.join( '' );
  }
  console.log( 'r', r );
  return r;
}

function _foldLeft( acc, c ) {
  var rightArr;
  if ( acc instanceof ArrayFragment ) {
    rightArr = acc.fragment;
  } else if ( acc instanceof Nothing ) {
    rightArr = [];
  } else if ( !acc ) {
    rightArr = [];
  } else {
    throw '!!acc';
  }
  var leftArr;
  if ( c instanceof Value ) {
    leftArr = [ c.value ];
  } else if ( c instanceof ArrayFragment ) {
    leftArr = c.fragment;
  } else if ( c instanceof Nothing ) {
    leftArr = [];
  } else {
    throw '!!';
  }
  return new ArrayFragment( leftArr.concat( rightArr ) );
}

module.exports = getMatch;
