import C, { fspec, cat, or, shape, isStr, isBool,
  isFspec,
  isArray, isFn, and, isNum, isNull, isUndefined, isProblem } from '../';
import { any, ExprSpec, CatFnSpec, OrFnSpec, AndFnSpec,
  CollOfSpec, collOf, SpecSpec, PredSpec, DelayedSpecSpec, SpecRefSpec,
  ZeroOrMoreFnSpec, OneOrMoreFnSpec, ZeroOrOneFnSpec } from '../core';
import { WallFnSpec } from '../core/wall';
import { ShapeFnSpec, MapOfFnSpec } from '../core/objRelated';
import { isNamespacePath, GetNSFnSpec, NamespaceFnSpec, MetaFnSpec, SetNSFnSpec, NamespaceObjSpec } from './namespace.types';

// TODO
// const C = Clause.withRegistry(nsObj);

const DescribeFnSpec = fspec( {
  args: cat( C( 'clausejs.types/Expression' ) ),
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
      args: and( isArray, C( 'clausejs.types/Expression' ) ),
      ret: C( 'clausejs.types/Expression' ),
      fn: isFn,
    }
  } ) ),
} );

const NullableFnSpec = fspec( {
  args: cat( ExprSpec ),
} );

const UndefinableFnSpec = fspec( {
  args: cat( ExprSpec ),
} );

const InstanceOfFnSpec = fspec( {
  args: cat( 'instanceType', isFn ),
  ret: SingleArgPredSpec(),
} );

const NotFnSpec = fspec( {
  args: cat( 'predicateToNegate', C( 'clausejs.types/Predicate' ) ),
  ret: SingleArgPredSpec(),
} );

const EqualsFnSpec = fspec( {
  args: cat( 'valueToCompareWith', any() ),
  ret: SingleArgPredSpec(),
} );

const OneOfFnSpec = fspec( {
  args: cat( 'valueOptions', collOf( C( 'clausejs.types/Primitive' ) ) ),
  ret: SingleArgPredSpec(),
} );

const PrimitiveSpec = or( isStr, isNum, isBool, isNull, isUndefined );

const EnforceFnSpec = fspec( {
  args: cat( 'expression', ExprSpec, 'valueToCheck', any() ),
  ret: isUndefined
} );

const ConformFnSpec = fspec( {
  args: cat( 'expression', ExprSpec, 'valueToConform', any() ),
  ret: or( 'conformedValue', any(), 'problem', C( 'clausejs.types/Problem' ) ),
} );

const DelayedFnSpec = fspec( {
  args: cat( 'getFn', fspec( {
    ret: ExprSpec,
  } ) ),
  ret: DelayedSpecSpec,
} );

C( '/clausejs', NamespaceFnSpec );

C( 'clausejs.compose/cat', CatFnSpec );
C( 'clausejs.compose/or', OrFnSpec );
C( 'clausejs.compose/zeroOrMore', ZeroOrMoreFnSpec );
C( 'clausejs.compose/oneOrMore', OneOrMoreFnSpec );
C( 'clausejs.compose/zeroOrOne', ZeroOrOneFnSpec );
C( 'clausejs.compose/and', AndFnSpec );
C( 'clausejs.compose/collOf', CollOfSpec );
C( 'clausejs.compose/mapOf', MapOfFnSpec );
C( 'clausejs.compose/shape', ShapeFnSpec );
C( 'clausejs.compose/any', AnySpec );
C( 'clausejs.compose/wall', WallFnSpec );
C( 'clausejs.compose/fspec', FspecFnSpec );
C( 'clausejs.compose/nullable', NullableFnSpec );
C( 'clausejs.compose/undefinable', UndefinableFnSpec );

C( 'clausejs.utils/enforce', EnforceFnSpec );
C( 'clausejs.utils/conform', ConformFnSpec );
C( 'clausejs.utils/delayed', DelayedFnSpec );
C( 'clausejs.utils/describe', DescribeFnSpec );

C( 'clausejs.preds/not', NotFnSpec );
C( 'clausejs.preds/isObj', SingleArgPredSpec() );
C( 'clausejs.preds/isStr', SingleArgPredSpec() );
C( 'clausejs.preds/isArray', SingleArgPredSpec() );
C( 'clausejs.preds/isDate', SingleArgPredSpec() );
C( 'clausejs.preds/isNull', SingleArgPredSpec() );
C( 'clausejs.preds/isUndefined', SingleArgPredSpec() );
C( 'clausejs.preds/notEmpty', SingleArgPredSpec() );
C( 'clausejs.preds/isBool', SingleArgPredSpec() );
C( 'clausejs.preds/isFn', SingleArgPredSpec() );
C( 'clausejs.preds/isNum', SingleArgPredSpec() );
C( 'clausejs.preds/isInt', SingleArgPredSpec() );
C( 'clausejs.preds/isNatInt', SingleArgPredSpec() );
C( 'clausejs.preds/isUuid', SingleArgPredSpec() );
C( 'clausejs.preds/oneOf', OneOfFnSpec );
C( 'clausejs.preds/equals', EqualsFnSpec );
C( 'clausejs.preds/instanceOf', InstanceOfFnSpec );

C( '/clausejs.namespace/set', SetNSFnSpec );
C( '/clausejs.namespace/get', GetNSFnSpec );
C( '/clausejs.namespace/meta', MetaFnSpec );

C( 'clausejs.types/Expression', ExprSpec );
C( 'clausejs.types/Spec', SpecSpec );
C( 'clausejs.types/FSpec', FspecSpec );
C( 'clausejs.types/Predicate', PredSpec );
C( 'clausejs.types/DelayedSpec', DelayedSpecSpec );
C( 'clausejs.types/SpecReference', SpecRefSpec );
C( 'clausejs.types/Problem', isProblem );
C( 'clausejs.types/NamespaceObj', NamespaceObjSpec );
C( 'clausejs.types/NamespacePath', isNamespacePath );
C( 'clausejs.types/Primitive', PrimitiveSpec );

export default C.getRegistry();
