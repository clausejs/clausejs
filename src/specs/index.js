import S, { fspec, cat, isObj, isStr } from '../';
import { ExprSpec } from '../core';
import { isNamespacePath, NamespaceFnSpec, NamespaceObjSpec } from './namespace.types';

// TODO
// const S = Specky.withRegistry(nsObj);

const DescribeFnSpec = fspec( {
  args: cat( S( 'specky.types/Expression' ) ),
  ret: isStr,
} );

S( '/specky', NamespaceFnSpec );
S( 'specky.types/NamespaceObj', NamespaceObjSpec );
S( 'specky.types/NamespacePath', isNamespacePath );
S( 'specky.types/Expression', ExprSpec );
S( 'specky.utils/describe', DescribeFnSpec );

export default S.getRegistry();
