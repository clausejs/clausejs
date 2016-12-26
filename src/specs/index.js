import S, { fspec, cat, or, shape, isStr, isBool,
  isFspec,
  isArray, isFn, and, isNum, isNull, isUndefined, isProblem } from '../';
import { any, ExprSpec, CatFnSpec, OrFnSpec,
  CollOfSpec, collOf, SpecSpec, PredSpec, DelayedSpecSpec, SpecRefSpec,
  ZeroOrMoreFnSpec, OneOrMoreFnSpec, ZeroOrOneFnSpec } from '../core';
import { AndSpec } from '../core/and';
import { WallFnSpec } from '../core/wall';
import { ShapeFnSpec, MapOfFnSpec } from '../core/objRelated';
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

const AnySpec = fspec( {
  ret: SpecSpec,
} );

const FspecSpec = and(
  isFspec
);

const FspecFnSpec = fspec( {
  args: cat( 'fspecFields', shape( {
    optional: {
      args: and( isArray, S( 'specky.types/Expression' ) ),
      ret: S( 'specky.types/Expression' ),
      fn: isFn,
    }
  } ) ),
} );

const InstanceOfFnSpec = fspec( {
  args: cat( 'type', isFn ),
  ret: SingleArgPredSpec(),
} );

const EqualsFnSpec = fspec( {
  args: cat( 'valueToCompare', any() ),
  ret: SingleArgPredSpec(),
} );

const OneOfFnSpec = fspec( {
  args: cat( 'values', collOf( S( 'specky.types/Primitive' ) ) ),
  ret: SingleArgPredSpec(),
} );

const PrimitiveSpec = or( isStr, isNum, isBool, isNull, isUndefined );

const EnforceFnSpec = fspec( {
  args: cat( 'expression', ExprSpec, 'valueToCheck', any() ),
  ret: isUndefined
} );

const ConformFnSpec = fspec( {
  args: cat( 'expression', ExprSpec, 'valueToConform', any() ),
  ret: or( 'conformedValue', any(), 'problem', S( 'specky.types/Problem' ) ),
} );

const DelayedFnSpec = fspec( {
  args: cat( 'getFn', fspec( {
    ret: ExprSpec,
  } ) ),
  ret: DelayedSpecSpec,
} );

S( '/specky', NamespaceFnSpec );

S( 'specky.compose/cat', CatFnSpec );
S( 'specky.compose/or', OrFnSpec );
S( 'specky.compose/zeroOrMore', ZeroOrMoreFnSpec );
S( 'specky.compose/oneOrMore', OneOrMoreFnSpec );
S( 'specky.compose/zeroOrOne', ZeroOrOneFnSpec );
S( 'specky.compose/and', AndSpec );
S( 'specky.compose/collOf', CollOfSpec );
S( 'specky.compose/mapOf', MapOfFnSpec );
S( 'specky.compose/shape', ShapeFnSpec );
S( 'specky.compose/any', AnySpec );
S( 'specky.compose/wall', WallFnSpec );
S( 'specky.compose/fspec', FspecFnSpec );

S( 'specky.utils/enforce', EnforceFnSpec );
S( 'specky.utils/conform', ConformFnSpec );
S( 'specky.utils/delayed', DelayedFnSpec );
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
S( 'specky.preds/isUuid', SingleArgPredSpec() );
S( 'specky.preds/oneOf', OneOfFnSpec );
S( 'specky.preds/equals', EqualsFnSpec );
S( 'specky.preds/instanceOf', InstanceOfFnSpec );

S( 'specky.types/Expression', ExprSpec );
S( 'specky.types/Spec', SpecSpec );
S( 'specky.types/FSpec', FspecSpec );
S( 'specky.types/Predicate', PredSpec );
S( 'specky.types/DelayedSpec', DelayedSpecSpec );
S( 'specky.types/SpecReference', SpecRefSpec );
S( 'specky.types/Problem', isProblem );
S( 'specky.types/NamespaceObj', NamespaceObjSpec );
S( 'specky.types/NamespacePath', isNamespacePath );
S( 'specky.types/Primitive', PrimitiveSpec );

export default S.getRegistry();
