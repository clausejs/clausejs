import { or, cat, fspec, props, ExprSpec } from '../core';
import { delayed, isNamespacePath, isExpr, isSpecRef } from '../utils';
import { isObj } from '../preds';

var ExprOrPartialRefMapSpec = or(
  'expression', delayed( () => {
    //TODO
    return ExprSpec;
  } )
);

const NamespaceFnSpec = fspec( {
  args: or(
    'register', cat(
      'path', isNamespacePath,
      'val', ExprOrPartialRefMapSpec ),
    'retrieve', cat( 'path', isNamespacePath )
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

const NamespaceObjSpec = props( {
  optional: {
    subNamespaces: [ isNamespaceFragment, delayed( () => NamespaceObjSpec ) ],
    '.meta': isObj,
    '.expr': isExpr,
  }
} );

export {
  isSpecRef, NamespaceFnSpec,
  isNamespacePath, MetaFnSpec,
  NamespaceObjSpec
};
