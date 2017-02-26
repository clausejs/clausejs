import Problem from "../models/Problem";
import isProblem from "../utils/isProblem";
import isNum from "../preds/isNum";

export default function collOfWalker( clause, walkFn ) {
  var expr = clause.exprs[ 0 ];
  var opts = clause.opts;

  return {
    trailblaze: collOfTrailblaze,
    reconstruct: collOfReconstruct,
  };

  function collOfTrailblaze( x, walkOpts ) {

    var guides = [],
      problems = [];

    if ( !Array.isArray( x ) ) {
      return new Problem( x, clause, [], 'collOf expects an array' );
    } else {

      if ( opts ) {
        var { maxCount, minCount } = opts;

        if ( isNum( maxCount ) && x.length > maxCount ) {
          return new Problem( x, clause, problems,
            `collOf: collection size ${x.length} exceeds maxCount ${maxCount}.`
          );
        }

        if ( isNum( minCount ) && x.length < minCount ) {
          return new Problem( x, clause, problems,
            `collOf: collection size ${x.length} is less than minCount ${minCount}.`
          );
        }
      }

      for ( var i = 0; i < x.length; i += 1 ) {
        var guide = walkFn( expr, x[ i ], walkOpts );
        if ( isProblem( guide ) ) {
          problems.push( guide );
          //TODO
          break;
        } else {
          guides.push( guide );
        }
      }

      if ( problems.length > 0 ) {
        return new Problem( x, clause, problems, 'One or more elements failed collOf test' );
      } else {
        return guides;
      }
    }
  }

  function collOfReconstruct( guides, walkOpts ) {
    var results = [];

    for ( var i = 0; i < guides.length; i += 1 ) {
      var r = walkFn( expr, guides[ i ], walkOpts );
      results.push( r );
    }

    return results;
  }
}