import S, { fspec, cat, or, shape, isStr, isBool,
  isArray, isFn, and, isNum, isNull, isUndefined, isSpec, isDelayedSpec, isProblem } from '../';
import { any, ExprSpec, CatFnSpec, OrFnSpec,
  CollOfSpec, collOf,
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
  args: any(),
  ret: isSpec,
} );

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
  ret: fspec( {
    args: cat( 'x', any() ),
    ret: isBool,
  } )
} );

const EqualsFnSpec = fspec( {
  args: cat( 'valueToCompare', any() ),
  ret: fspec( {
    args: cat( 'x', any() ),
    ret: isBool,
  } )
} );

const OneOfFnSpec = fspec( {
  args: cat( 'values', collOf( S( 'specky.types/Primitive' ) ) ),
  ret: isBool,
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
    args: any(),
    ret: ExprSpec,
  } ) ),
  ret: isDelayedSpec,
} );

S( '/specky', NamespaceFnSpec );

S( 'specky.core/cat', CatFnSpec );
S( 'specky.core/or', OrFnSpec );
S( 'specky.core/zeroOrMore', ZeroOrMoreFnSpec );
S( 'specky.core/oneOrMore', OneOrMoreFnSpec );
S( 'specky.core/zeroOrOne', ZeroOrOneFnSpec );
S( 'specky.core/and', AndSpec );
S( 'specky.core/collOf', CollOfSpec );
S( 'specky.core/mapOf', MapOfFnSpec );
S( 'specky.core/shape', ShapeFnSpec );
S( 'specky.core/any', AnySpec );
S( 'specky.core/wall', WallFnSpec );
S( 'specky.core/fspec', FspecFnSpec );

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
S( 'specky.types/Problem', isProblem );
S( 'specky.types/NamespaceObj', NamespaceObjSpec );
S( 'specky.types/NamespacePath', isNamespacePath );
S( 'specky.types/Primitive', PrimitiveSpec );

export default S.getRegistry();
