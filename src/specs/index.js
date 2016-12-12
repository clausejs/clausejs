import S, { fspec, cat, props, isStr, isBool, isArray, isFn, and } from '../';
import { any, ExprSpec, CatFnSpec, OrFnSpec,
  CollOfSpec,
  ZeroOrMoreFnSpec, OneOrMoreFnSpec, ZeroOrOneFnSpec } from '../core';
import { AndSpec } from '../core/and';
import { WallFnSpec } from '../core/wall';
import { PropsSpec } from '../core/objRelated';
import { isNamespacePath, NamespaceFnSpec, NamespaceObjSpec } from './namespace.types';


// TODO
// const S = Specky.withRegistry(nsObj);

const DescribeFnSpec = fspec( {
  args: cat( S( 'specky.types/Expression' ) ),
  ret: isStr,
} );

const SingleArgPredSpec = () => fspec( {
  args: cat( 'x', any() ),
  ret: isBool,
} );

const FspecFnSpec = fspec( {
  args: cat( 'fspecFields', props( {
    optional: {
      args: and( isArray, S( 'specky.types/Expression' ) ),
      ret: S( 'specky.types/Expression' ),
      fn: isFn,
    }
  } ) ),
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
S( 'specky.core/wall', WallFnSpec );
S( 'specky.core/fspec', FspecFnSpec );

S( 'specky.utils/describe', DescribeFnSpec );

S( 'specky.preds/isObj', SingleArgPredSpec() );
S( 'specky.preds/isStr', SingleArgPredSpec() );
S( 'specky.preds/isArray', SingleArgPredSpec() );
S( 'specky.preds/isDate', SingleArgPredSpec() );
S( 'specky.preds/isNull', SingleArgPredSpec() );
S( 'specky.preds/isUndefined', SingleArgPredSpec() );
S( 'specky.preds/notEmpty', SingleArgPredSpec() );
S( 'specky.preds/isBool', SingleArgPredSpec() );
S( 'specky.preds/isFn', SingleArgPredSpec() );
S( 'specky.preds/isNum', SingleArgPredSpec() );
S( 'specky.preds/isInt', SingleArgPredSpec() );
S( 'specky.preds/isNatInt', SingleArgPredSpec() );

S( 'specky.types/NamespaceObj', NamespaceObjSpec );
S( 'specky.types/NamespacePath', isNamespacePath );
S( 'specky.types/Expression', ExprSpec );

export default S.getRegistry();
