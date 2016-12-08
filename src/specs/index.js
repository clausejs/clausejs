import S, { fspec, cat, isObj } from '../';
import { ExprSpec } from '../core';
import { isNamespacePath, NamespaceFnSpec, NamespaceObjSpec } from './namespace.types';

// TODO
// const S = Specky.withRegistry(nsObj);

const DescribeFnSpec = fspec( {
  args: cat( S( 'specky.types/Expression' ) ),
  ret: S( 'specky.utils/SpecDescription' ),
} );

S( '/specky', NamespaceFnSpec );
S( 'specky.types/NamespaceObj', NamespaceObjSpec );
S( 'specky.types/NamespacePath', isNamespacePath );
S( 'specky.utils/SpecDescription', isObj );
S( 'specky.types/Expression', ExprSpec );
S( 'specky.utils/describe', DescribeFnSpec );

export default S.getRegistry();
