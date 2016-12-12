import S, { fspec, cat, isObj, isStr } from '../';
import { ExprSpec, CatFnSpec, OrFnSpec,
  CollOfSpec,
  ZeroOrMoreFnSpec, OneOrMoreFnSpec, ZeroOrOneFnSpec } from '../core';
import { AndSpec } from '../core/and';
import { PropsSpec } from '../core/objRelated';
import { isNamespacePath, NamespaceFnSpec, NamespaceObjSpec } from './namespace.types';


// TODO
// const S = Specky.withRegistry(nsObj);

const DescribeFnSpec = fspec( {
  args: cat( S( 'specky.types/Expression' ) ),
  ret: isStr,
} );

S( '/specky', NamespaceFnSpec );

S( 'specky.core/cat', CatFnSpec );
S( 'specky.core/or', OrFnSpec );
S( 'specky.core/zeroOrMore', ZeroOrMoreFnSpec );
S( 'specky.core/oneOrMore', OneOrMoreFnSpec );
S( 'specky.core/zeroOrOne', ZeroOrOneFnSpec );
S( 'specky.core/collOf', CollOfSpec );
S( 'specky.core/and', AndSpec );
S( 'specky.core/props', PropsSpec );
S( 'specky.utils/describe', DescribeFnSpec );
S( 'specky.types/NamespaceObj', NamespaceObjSpec );
S( 'specky.types/NamespacePath', isNamespacePath );
S( 'specky.types/Expression', ExprSpec );

export default S.getRegistry();
