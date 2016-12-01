import { or, cat, fspec, ExprSpec } from '../core';
import { delayed, isNamespacePath, isExpr, isSpecRef } from '../utils';

var ExprOrPartialRefMapSpec = or(
  'expr', delayed( function() {
    return ExprSpec
  } ) //TODO
);


const NamespaceFnSpec = fspec( {
  args: or(
    'def', cat(
      'name', isNamespacePath,
      'val', ExprOrPartialRefMapSpec ),
    'get', cat( 'name', isNamespacePath )
  ),
  ret: or( isSpecRef, isExpr ),
} );

export { isSpecRef, NamespaceFnSpec, isNamespacePath };
