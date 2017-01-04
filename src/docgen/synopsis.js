
const { cat, or, zeroOrMore, oneOrMore, fclause, any, and, ExprClause, collOf } = require( '../core' );
const { isStr, isNum, isObj, isBool } = require( '../preds' );
const { conform, isClause, deref } = require( '../utils' );
const C = require( '../' );
const fnName = require( '../utils/fnName' );
const flatten = require( 'lodash.flatten' );


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
const CaseC = C.wall(
  C.cat(
  'theClause',
  ExprClause,
  'params',
  C.zeroOrMore(
     C.or(
       'aClause', ExprClause,
      'anAlt', C.instanceOf( LabelledAlt ),
      'aPart', C.instanceOf( LabelledPart )
    )
  )
) );

const OrC = C.and(
  C.isClause,
  ( c ) => c.type === 'OR'
);

const CatC = C.and(
  C.isClause,
  ( c ) => c.type === 'CAT'
);

const InfinitableIntegerC = or( C.isInt, C.oneOf( Number.POSITIVE_INFINITY, Number.NEGATIVE_INFINITY ) );
const PivotLocationC = C.wall( oneOrMore( InfinitableIntegerC ) );

const PivotSetWithLocationsC = collOf( cat( OrC, PivotLocationC ) );

var multipleArgFragmenter = ( cls ) =>
  ( clause ) => {
    const { exprs } = clause;
    let params;
    if ( exprs.length === 0 ) {
    //empty case
      params = [];
    } else {
      params = exprs.reduce(
        ( curr, { name, expr } ) =>
          curr
            .concat( [ new cls( name, clause, _getFragmentsExpandingParts( expr ) ) ] )
          , [] );
    }
    return [ clause ].concat( params );
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

const ExpandableCaseC = C.wall(
  cat(
  'pivotWithPos', PivotSetWithLocationsC,
  'theCase', CaseC )
);

function _getFragmentsExpandingParts( frag ) {
  let expandedParams;
  if ( ( isClause( frag ) ) ) {
    let [ , ...params ] = Fragmenters[ frag.type ]( frag );
    expandedParams = flatten( params.map( ( p ) => {
      return _getFragmentsExpandingParts( p );
    } ) );
  } else {
    return [ frag ];
  }
  return [ frag ].concat( expandedParams );
}

var getSingleCase = C.fclause( {
  args: cat( isClause ),
  ret: ExpandableCaseC,
} ).instrument(
  function getSingleCase( clause ) {
    const _case = _getFragmentsExpandingParts( clause );
    // const caseExpandedWithParts = _expandWithParts( _case );
    // console.log( _case )
    const pivotsWithPositions = _case.reduce( ( acc, curr, idx ) => {
      if ( C.isValid( OrC, curr ) ) {
        return acc.concat( [ curr, idx + 1 ] );
      } else {
        return acc;
      }
    }, [] );
    return [ pivotsWithPositions, _case ];
  }
);

var SampleClause = cat( 'first', oneOrMore( cat( isStr, isBool ) ),
                      'second', or( 'objOpt', isObj, 'showNum', cat( isNum, isBool ) ) );

var expandCase = fclause( {
  args: cat( OrC, CaseC ),
  ret: collOf( ExpandableCaseC ),
} ).instrument(
  function expandCase( [ pivot, idxInCase ], _case ) {
    // TODO
    var ePartials;
    if ( pivot.opts.named ) {
      ePartials = pivot.exprs.map( ( { name, expr } ) => {
        return [ name, getSingleCase( expr ) ];
      } );
    } else {
      ePartials = pivot.exprs.map( ( expr ) => {
        return [ null, getSingleCase( expr ) ];
      } );
    }

    const prefix = _case.slice( 0, idxInCase ),
      suffix = _case.slice( idxInCase + 1 );

    var newCases = ePartials.map( ( [ name, [ pSetWithPos, _partialCase ] ] ) => {
      var alt = new LabelledAlt( name, pivot, _partialCase );
      var newCase = prefix.concat( [ alt ] ).concat( suffix );
      var pSetWithAdjustedPos = pSetWithPos.map( ( [ p, idx ] ) => {
        return [ p, idx + idxInCase ];
      } );
      return [ pSetWithAdjustedPos, newCase ];
    } );

    return newCases;
  }
)

var synopsis = fclause( {
  args: cat( ExprClause )
} ).instrument(
  function synopsis( clause, maxNumCases = Number.POSITIVE_INFINITY ) {
    const startingECase = getSingleCase( clause );
    var expandedECases = _expandToLimit( maxNumCases, [ startingECase ] );
    return expandedECases;
  }
);

var _expandToLimit = fclause( {
  args: cat( InfinitableIntegerC, C.collOf( ExpandableCaseC ) ),
  ret: C.collOf( ExpandableCaseC ),
} ).instrument(
  function _expandToLimit( limit, eCases ) {
    let remaining = limit;
    var newECases;
    do {
      newECases = _epandOneLevel( eCases );
      if ( remaining >= newECases.length ) {
        remaining -= newECases.length;
      }
    } while ( remaining > 0 && newECases.length > eCases.length );

    return newECases;
  }
)

var _epandOneLevel = fclause( {
  args: cat( C.collOf( ExpandableCaseC ) ),
  ret: C.collOf( ExpandableCaseC )
} ).instrument(
  function _epandOneLevel( eCases ) {
    const eCaseSets = eCases.map( ( [ pivotsWithPositions, _case ] ) => {
      const im = pivotsWithPositions.map( ( pivotWithPosition ) => {
        return expandCase( pivotWithPosition, _case );
      } );
      return flatten( im );
    } );
    return flatten( eCaseSets );
  }
)


var r = synopsis( SampleClause );
console.log( r );

module.exports = {
  synopsis,
};
