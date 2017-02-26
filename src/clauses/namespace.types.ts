import { or, cat, fclause, shape, zeroOrOne, ExprClause, maybe } from '../core';
import { delayed, isNamespacePath, isClauseRef } from '../utils';
import { isObj, isBool, isUndefined } from '../preds';
import isExpr from "../utils/isExpr";

const ExprOrPartialRefMapClause =
 // or(
 //  'expression',
  delayed( () => {
    //TODO
    return ExprClause;
  } );
// );

export const GetArgClause = cat( 'nsPath', isNamespacePath );

export const GetNSFnClause = fclause( {
  args: GetArgClause,
  ret: isClauseRef,
} );

export const SetArgClause = cat(
  'nsPath', isNamespacePath,
  'expression', ExprOrPartialRefMapClause );

export const SetNSFnClause = fclause( {
  args: SetArgClause,
  ret: isBool,
} );

export const NamespaceArgsCLause = or(
  'register', SetArgClause,
  'retrieve', GetArgClause
);

export const NamespaceFnClause = fclause( {
  args: NamespaceArgsCLause,
  ret: or( isUndefined, isClauseRef )
} );

export const SetMetaFnClause = fclause( {
  args: cat( 'source',
            or(
              'namespacePath', isNamespacePath,
              'expression', ExprClause
            ),
            'metaObj', isObj,
            'registry', zeroOrOne( isObj ) ),
  ret: isUndefined,
} );

export const GetMetaFnClause = fclause( {
  args: cat(
    'source', or(
      'namespacePath', isNamespacePath,
      'expression', ExprClause
    ),
    'registry', zeroOrOne( isObj ) ),
  ret: maybe( isObj )
} );

export const ResolveFnClause = fclause( {
  args: cat( 'expression', ExprClause,
            'registry', zeroOrOne( isObj ) ),
  ret: isNamespacePath,
} );

export function isNamespaceFragment( x ) {
  return !!/^[^.@%\&\*#]+/.test( x );
}

export const NamespaceObjClause = shape( {
  optional: {
    subNamespaces: [ isNamespaceFragment, delayed( () => {
      return NamespaceObjClause;
    } ) ],
    '.meta': isObj,
    '.expr': isExpr,
  }
} );

export { isClauseRef };
