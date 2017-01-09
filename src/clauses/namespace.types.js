import { or, cat, fclause, shape, ExprClause } from '../core';
import { delayed, isNamespacePath, isExpr, isClauseRef } from '../utils';
import { isObj, isBool } from '../preds';

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
              'expression', isExpr
            ),
            'metaObj', isObj ),
  ret: isExpr,
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
  NamespaceObjClause
};
