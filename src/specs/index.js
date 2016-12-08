import S, { fspec, cat, isObj } from '../';
import { ExprSpec } from '../core';
import { isNamespacePath, NamespaceFnSpec } from './namespace.types';

// TODO
// const S = Specky.withRegistry(nsObj);

const DescribeFnSpec = fspec( {
  args: cat( S( 'specky.types/Expression' ) ),
  ret: isObj,
} );

S( '/specky', NamespaceFnSpec );
S( 'specky.types/NamespacePath', isNamespacePath );
S( 'specky.types/Expression', ExprSpec );
S( 'specky.utils/describe', DescribeFnSpec );

export default S.getRegistry();
