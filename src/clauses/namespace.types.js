import { or, cat, fclause, shape, zeroOrOne, ExprClause } from '../core';
import { delayed, isNamespacePath, isClauseRef } from '../utils';
import { isObj, isBool } from '../preds';
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

const MetaFnClause = fclause( {
  args: cat( 'source',
            or(
              'namespacePath', isNamespacePath,
              'expression', ExprClause
            ),
            'metaObj', isObj ),
  ret: ExprClause,
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
  isNamespacePath, MetaFnClause,
  ResolveFnClause,
  NamespaceObjClause
};
