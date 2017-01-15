import { or, cat, fclause, shape, zeroOrOne, ExprClause, maybe } from '../core';
import { delayed, isNamespacePath, isClauseRef } from '../utils';
import { isObj, isBool, isUndefined } from '../preds';
const isExpr = require( '../utils/isExpr' );

var ExprOrPartialRefMapClause =
 // or(
 //  'expression',
  delayed( () => {
    //TODO
    return ExprClause;
  } );
// );

const GetArgClause = cat( 'nsPath', isNamespacePath );

const GetNSFnClause = fclause( {
  args: GetArgClause,
  ret: ExprClause,
} );

const SetArgClause = cat(
  'nsPath', isNamespacePath,
  'expression', ExprOrPartialRefMapClause );

const SetNSFnClause = fclause( {
  args: SetArgClause,
  ret: isBool,
} );

const NamespaceFnClause = fclause( {
  args: or(
      'register', SetArgClause,
      'retrieve', GetArgClause
    ),
} );

const SetMetaFnClause = fclause( {
  args: cat( 'source',
            or(
              'namespacePath', isNamespacePath,
              'expression', ExprClause
            ),
            'metaObj', isObj,
            'registry', zeroOrOne( isObj ) ),
  ret: isUndefined,
} );

const GetMetaFnClause = fclause( {
  args: cat(
    'source', or(
      'namespacePath', isNamespacePath,
      'expression', ExprClause
    ),
    'registry', zeroOrOne( isObj ) ),
  ret: maybe( isObj )
} );

const ResolveFnClause = fclause( {
  args: cat( 'expression', ExprClause,
            'registry', zeroOrOne( isObj ) ),
  ret: isNamespacePath,
} );

function isNamespaceFragment( x ) {
  return !!/^[^.@%\&\*#]+/.test( x );
}

const NamespaceObjClause = shape( {
  optional: {
    subNamespaces: [ isNamespaceFragment, delayed( () => {
      return NamespaceObjClause;
    } ) ],
    '.meta': isObj,
    '.expr': isExpr,
  }
} );

export {
  isClauseRef, SetNSFnClause, GetNSFnClause,
  NamespaceFnClause,
  isNamespacePath, SetMetaFnClause, GetMetaFnClause,
  ResolveFnClause,
  NamespaceObjClause
};
