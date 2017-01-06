
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

function LabelledAlt( name, orSpec, _case ) {
  this.name = name;
  this._case = _case;
  this.orSpec = orSpec;
}

function LabelledPart( name, catSpec, _case ) {
  this.name = name;
  this._case = _case;
  this.catSpec = catSpec;
}

const PartialableClauseC = C.or(
  'aClause', ExprClause,
  'anAlt', C.instanceOf( LabelledAlt ),
  'aPart', C.instanceOf( LabelledPart )
);

// prefix notation data structure
const CaseC = C.wall(
  C.cat(
  'theClause', PartialableClauseC,
  'params', C.zeroOrMore( PartialableClauseC )
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
const PivotLocationC = C.wall( oneOrMore( C.isInt ) );

const PivotWithLocationC = C.wall( cat( OrC, PivotLocationC ) );
const PivotSetWithLocationsC = collOf( PivotWithLocationC );

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
            .concat( [ new cls( name, clause, _getFragmentsExpandingCat( expr ) ) ] )
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
  'FCLAUSE': ( { args, ret, fn } ) => [].concat( args ? [ 'args: ', args ] : [] )
    .concat( ret ? [ 'ret: ', ret ] : [] )
    .concat( fn ? [ 'fn: ', fnName( fn ), '()' ] : [] ),
};

const ExpandableCaseC = C.wall(
  cat(
  'pivotWithPos', PivotSetWithLocationsC,
  'theCase', CaseC )
);

function _getFragmentsExpandingCat( frag ) {
  let expandedParams;
  if ( isClause( frag ) ) {
    let [ , ...params ] = Fragmenters[ frag.type ]( frag );
    expandedParams = params.reduce( ( acc, p ) => {
      return acc.concat( _getFragmentsExpandingCat( p ) );
    }, [] );

    return [ frag ].concat( expandedParams );
  } else {
    return [ frag ];
  }
}

var _elevatePivotWithLocation = fclause( {
  args: cat( PivotLocationC, PivotWithLocationC )
} ).instrument(
  function _elevatePivotWithLocation( parentLoc, [ pivot, loc ] ) {
    return [ pivot, parentLoc.concat( loc ) ];
  }
)

var _pivotsWithLocations = fclause( {
  args: cat( CaseC ),
  ret: PivotSetWithLocationsC
} ).instrument(
  function _pivotsWithLocations( _case ) {
    const pivotsWithLocations = _case.reduce( ( acc, curr, idx ) => {
      const currLoc = [ parseInt( idx + 1 ) ];
      if ( C.isValid( OrC, curr ) ) {
        return acc.concat( [ [ curr, currLoc ] ] );
      } else if ( curr instanceof LabelledPart ) {
        var psWithLs = _pivotsWithLocations( curr._case );
        var elevatedPsWithLs = psWithLs.map(
          ( pWithL ) => _elevatePivotWithLocation( currLoc, pWithL ) );
        return acc.concat( elevatedPsWithLs );
      } else {
        return acc;
      }
    }, [] );
    return pivotsWithLocations;
  }
);


var getSingleCase = C.fclause( {
  args: cat( isClause ),
  ret: ExpandableCaseC,
} ).instrument(
  function getSingleCase( clause ) {
    const _case = _getFragmentsExpandingCat( clause );
    // const caseExpandedWithParts = _expandWithParts( _case );
    // console.log( _case )
    const pivotsWithLocations = _pivotsWithLocations( _case );
    return [ pivotsWithLocations, _case ];
  }
);

var SampleClause = cat(
  'first', oneOrMore( cat( isStr, isBool ) ),
  'second', or(
    'objOpt', isObj,
    'showNum', cat( isNum, or( isBool, isObj ) ) ) );

var expandCase = fclause( {
  args: cat( PivotWithLocationC, CaseC ),
  ret: collOf( ExpandableCaseC, { minCount: 1 } ),
} ).instrument(
  function expandCase( [ pivot, location ], _case ) {
    // TODO
    if ( pivot.opts.named ) {
      alts = pivot.exprs.map( ( { label, expr } ) => {
        return new LabelledAlt( label, pivot, getSingleCase( expr ) );
      } );
    } else {
      alts = pivot.exprs.map( ( expr ) => {
        return new LabelledAlt( null, pivot, getSingleCase( expr ) );
      } );
    }

    const params = _case.slice( 1 );
    var newCases = alts.map(
      ( alt ) => {
        var newCase = [ alt ].concat( params );

        return [ [ [ pivot, location ] ], newCase ];
      } );

    return newCases;
  }
)

var _expandToLimit = fclause( {
  args: cat( InfinitableIntegerC, C.collOf( ExpandableCaseC ) ),
  ret: C.collOf( ExpandableCaseC ),
} ).instrument(
  function _expandToLimit( limit, eCases ) {
    let remaining = limit;
    var newECases = eCases;
    let count = 0;
    do {
      eCases = newECases;
      newECases = _epandOneLevel( eCases );
      if ( remaining >= newECases.length ) {
        remaining -= newECases.length;
      }
    } while ( count < 20 && remaining > 0 && newECases.length > eCases.length );

    return newECases;
  }
)

var _epandOneLevel = fclause( {
  args: cat( C.collOf( ExpandableCaseC ) ),
  ret: C.collOf( ExpandableCaseC ),
  fn: ( [ cases ], newCases ) => newCases.length >= cases.length,
} ).instrument(
  function _epandOneLevel( eCases ) {
    const newECases = eCases.reduce(
      ( acc, eCase ) => {
        const [ pivotsWithLocations, _case ] = eCase;
        if ( pivotsWithLocations.length === 0 ) {
          return acc.concat( [ eCase ] );
        } else {
          const im = pivotsWithLocations.reduce(
          ( acc1, pivotWithLocation ) => {
            const expandedCases = expandCase( pivotWithLocation, _case );
            return acc1.concat( expandedCases );
          }, [] );
          return acc.concat( im );
        }
      }, [] );
    return newECases;
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


var r = synopsis( SampleClause );
console.log( r );

module.exports = {
  synopsis,
};
