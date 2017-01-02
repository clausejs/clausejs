
const { cat, or, zeroOrMore, oneOrMore, fclause, any, and, ExprClause, collOf } = require( '../core' );
const { isStr, isNum, isObj, isBool } = require( '../preds' );
const { conform, isClause, deref } = require( '../utils' );
const C = require( '../' );
const fnName = require( '../utils/fnName' );


//     ----'first'-----  --------'second'---------
// fn( (isStr, isBool)+, (isObj | (isNum, isBool)) )

//     -----'first'----  ---second--
//                        -(objOpt)-
// fn( (isStr, isBool)+,    isObj     )
//     -----'first'----  ----second----
//                       ---(showNum)--
// fn( (isStr, isBool)+, isNum, isBool )

// fn( { <required>: [ 'propA': isNum, <propB: beginsWithS>: any ], <optional>: [  ] } )

// cat('first', oneOrMore(cat (isStr, isBool), 'second': {...}  ))

// console.log( conform( sample, [ 'hello', true, 'abc', false, 32, false ] ) );

function LabelledAlt( name, orSpec, fragments ) {
  this.name = name;
  this.fragments = fragments;
  this.orSpec = orSpec;
}

function LabelledPart( name, catSpec, fragments ) {
  this.name = name;
  this.fragments = fragments;
  this.catSpec = catSpec;
}

// prefix notation data structure
const CaseC = C.cat(
  ExprClause,
  C.zeroOrMore(
     C.or(
      ExprClause,
      C.instanceOf( LabelledAlt ),
      C.instanceOf( LabelledPart )
    )
  )
);

const PivotC = C.and(
  C.isClause,
  ( c ) => c.type === 'OR'
);

const PivotSetC = collOf( PivotC );
const PivotLevelsC = collOf( PivotSetC );

var multipleArgFragmenter = ( cls ) =>
  ( clause ) => {
    const { exprs } = clause;
    if ( exprs.length === 0 ) {
    //empty case
      return [];
    } else {
      return exprs.reduce(
        ( curr, { name, expr } ) =>
          curr
            .concat( [ new cls( name, clause, [ expr ] ) ] )
          , [] );
    }
  };

var singleArgFragmenter = ( clause ) => [ clause, clause.opts.enclosedClause ];

var Fragmenters = {
  'PRED': ( { opts: { predicate } } ) => [ predicate ],
  'WALL': ( { opts: { enclosedClause } } ) => [ enclosedClause ],
  // TODO
  'AND': ( { exprs } ) => exprs,
  'CAT': multipleArgFragmenter( LabelledPart ),
  'OR': multipleArgFragmenter( LabelledAlt ),
  'Z_OR_M': singleArgFragmenter,
  'O_OR_M': singleArgFragmenter,
  'Z_OR_O': singleArgFragmenter,
  'ANY': () => [],
  // TODO
  'MAP_OF': () => [],
  // TODO
  'SHAPE': () => [],
  // TODO: fix comma
  'FCLAUSE': ( { args, ret, fn } ) => [].concat( args ? [ 'args: ', args ] : [] )
    .concat( ret ? [ 'ret: ', ret ] : [] )
    .concat( fn ? [ 'fn: ', fnName( fn ), '()' ] : [] ),
};

var getSingleCase = C.fclause( {
  args: cat( isClause ),
  ret: [ CaseC, PivotLevelsC ],
} ).instrument(
  function getSingleCase( clause ) {
    return [ clause ].concat( Fragmenters[ clause.type ]( clause ) );
  }
);

var SampleClause = cat( 'first', oneOrMore( cat( isStr, isBool ) ),
                      'second', or( 'objOpt', isObj, 'showNum', cat( isNum, isBool ) ) );

var SampleFnClause = fclause( {
  args: SampleClause,
} );


var synopsis = fclause( {
  args: cat( ExprClause )
} ).instrument(
  function synopsis( clause ) {
    const startingCase = getSingleCase( clause );

  }
);

var r = synopsis( SampleClause );
console.log( r );

module.exports = {
  synopsis,
};
