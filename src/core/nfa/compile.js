var fragment = require( './fragment.js' );
var Clause = require( '../../models/Clause' );
var deref = require( '../../utils/deref' );

var indexedFragmentStates = function( fragment ) {
  var nextIndex = 0;
  var frontier = [ fragment.head ];
  var states = [];
  while ( frontier.length > 0 ) {
    var state = frontier.pop();
    if ( state.index === null ) {
      state.index = nextIndex;
      nextIndex++;
      state.transitions.forEach( ( transition ) => {
        frontier.push( transition.target );
      } );
      states.push( state );
    }
  }
  return states;
};

var evalFunctions = {};

function evalClause( clause ) {
  clause = deref( clause );
  var evalFn;

  if ( clause.type === null ) {
    throw 'Clause has no type: ' + clause;
  } else if ( !( clause.type in evalFunctions ) ) {
    evalFn = evalFunctions.PRED;
  } else {
    evalFn = evalFunctions[ clause.type ];
  }
  var r = evalFn( clause );
  return r;
}

var evalChildThen = function( wrapper ) {
  return function evalChildThenWrapped( clause ) {
    var childFrag = evalClause( clause.exprs[ 0 ] );
    return wrapper( childFrag );
  };
};

var evalChildrenThen = function( wrapper ) {
  return function evalChildrenThenWrapped( clause ) {
    var childFrags = clause.exprs.map( ( child ) => {
      var s = evalClause( child.expr );
      s.name = child.name;
      return s;
    } );
    return wrapper( childFrags );
  };
};

[ 'ROOT',
  'Z_OR_M',
  'O_OR_M',
  'Z_OR_O' ].forEach( ( fragName ) => {
    evalFunctions[ fragName ] = evalChildThen( fragment[ fragName ] );
  } );

[ 'OR',
  'CAT' ].forEach( ( fragName ) => {
    evalFunctions[ fragName ] = evalChildrenThen( fragment[ fragName ] );
  } );

evalFunctions.PRED = ( x ) => {
  return fragment[ 'PRED' ]( x );
};

function wrapRoot( expr ) {
  return new Clause( {
    type: 'ROOT',
    exprs: [ expr ],
  } );
}

var compile = function( expr ) {
  var rootedExpr = wrapRoot( expr );
  var fragment = evalClause( rootedExpr );
  var states = indexedFragmentStates( fragment );
  var numStates = states.length;
  var nfaTransitions = {};
  var finalState;
  states.forEach( ( state ) => {
    if ( state.transitions.length === 0 ) {
      finalState = state.index;
    }
    var outTrans = {};
    state.transitions.forEach( ( fragTrans ) => {
      outTrans[ fragTrans.target.index ] = fragTrans.clause;
    } );
    nfaTransitions[ state.index.toString() ] = outTrans;
  } );
  return {
    initialState: 0,
    numStates: numStates,
    finalState: finalState,
    transitions: nfaTransitions,
    expression: expr,
  };
};

module.exports = compile;
