import { or, cat, fspec, shape, ExprSpec } from '../core';
import { delayed, isNamespacePath, isExpr, isSpecRef } from '../utils';
import { isObj } from '../preds';

var ExprOrPartialRefMapSpec =
 // or(
 //  'expression',
  delayed( () => {
    //TODO
    return ExprSpec;
  } );
// );

const NamespaceFnSpec = fspec( {
  args: or(
    'register', cat(
      'nsPath', isNamespacePath,
      'expression', ExprOrPartialRefMapSpec ),
    'retrieve', cat( 'nsPath', isNamespacePath )
  ),
  ret: ExprSpec,
} );

const MetaFnSpec = fspec( {
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

const NamespaceObjSpec = shape( {
  optional: {
    subNamespaces: [ isNamespaceFragment, delayed( () => {
      return NamespaceObjSpec;
    } ) ],
    '.meta': isObj,
    '.expr': isExpr,
  }
} );

export {
  isSpecRef, NamespaceFnSpec,
  isNamespacePath, MetaFnSpec,
  NamespaceObjSpec
};
