import { or, cat, fspec, shape, ExprSpec } from '../core';
import { delayed, isNamespacePath, isExpr, isSpecRef } from '../utils';
import { isObj, isUndefined } from '../preds';

var ExprOrPartialRefMapSpec =
 // or(
 //  'expression',
  delayed( () => {
    //TODO
    return ExprSpec;
  } );
// );

const GetArgSpec = cat( 'nsPath', isNamespacePath );

const GetNSFnSpec = fspec( {
  args: GetArgSpec,
  ret: ExprSpec,
} );

const SetArgSpec = cat(
  'nsPath', isNamespacePath,
  'expression', ExprOrPartialRefMapSpec );

const SetNSFnSpec = fspec( {
  args: SetArgSpec,
  ret: isUndefined,
} );

const NamespaceFnSpec = fspec( {
  args: or(
      'register', SetArgSpec,
      'retrieve', GetArgSpec
    ),
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
  isSpecRef, SetNSFnSpec, GetNSFnSpec,
  NamespaceFnSpec,
  isNamespacePath, MetaFnSpec,
  NamespaceObjSpec
};
