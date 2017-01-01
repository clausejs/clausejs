import C, { fclause, cat, or, shape, isStr, isBool,
  isFclause,
  isArray, isFn, and, isNum, isNull, isUndefined, isProblem } from '../';
import { any, ExprClause, CatFnClause, OrFnClause, AndFnClause,
  CollOfClause, collOf, ClauseClause, PredClause, DelayedClauseClause, ClauseRefClause,
  ZeroOrMoreFnClause, OneOrMoreFnClause, ZeroOrOneFnClause } from '../core';
import { WallFnClause } from '../core/wall';
import { ShapeFnClause, MapOfFnClause } from '../core/regex';
import { isNamespacePath, GetNSFnClause, NamespaceFnClause, MetaFnClause, SetNSFnClause, NamespaceObjClause } from './namespace.types';

// TODO
// const C = Clause.withRegistry(nsObj);

const DescribeFnClause = fclause( {
  args: cat( C( 'clausejs.types/Expression' ) ),
  ret: isStr,
} );

const SingleArgPredClause = () => fclause( {
  args: cat( 'x', any() ),
  ret: isBool,
} );

const AnyClause = fclause( {
  ret: ClauseClause,
} );

const FclauseClause = and(
  isFclause
);

const FclauseFnClause = fclause( {
  args: cat( 'fclauseFields', shape( {
    optional: {
      args: and( isArray, C( 'clausejs.types/Expression' ) ),
      ret: C( 'clausejs.types/Expression' ),
      fn: isFn,
    }
  } ) ),
} );

const NullableFnClause = fclause( {
  args: cat( ExprClause ),
} );

const UndefinableFnClause = fclause( {
  args: cat( ExprClause ),
} );

const InstanceOfFnClause = fclause( {
  args: cat( 'instanceType', isFn ),
  ret: SingleArgPredClause(),
} );

const NotFnClause = fclause( {
  args: cat( 'predicateToNegate', C( 'clausejs.types/Predicate' ) ),
  ret: SingleArgPredClause(),
} );

const EqualsFnClause = fclause( {
  args: cat( 'valueToCompareWith', any() ),
  ret: SingleArgPredClause(),
} );

const OneOfFnClause = fclause( {
  args: cat( 'valueOptions', collOf( C( 'clausejs.types/Primitive' ) ) ),
  ret: SingleArgPredClause(),
} );

const PrimitiveClause = or( isStr, isNum, isBool, isNull, isUndefined );

const EnforceFnClause = fclause( {
  args: cat( 'expression', ExprClause, 'valueToCheck', any() ),
  ret: isUndefined
} );

const ConformFnClause = fclause( {
  args: cat( 'expression', ExprClause, 'valueToConform', any() ),
  ret: or( 'conformedValue', any(), 'problem', C( 'clausejs.types/Problem' ) ),
} );

const DelayedFnClause = fclause( {
  args: cat( 'getFn', fclause( {
    ret: ExprClause,
  } ) ),
  ret: DelayedClauseClause,
} );

C( '/clausejs', NamespaceFnClause );

C( 'clausejs.compose/cat', CatFnClause );
C( 'clausejs.compose/or', OrFnClause );
C( 'clausejs.compose/zeroOrMore', ZeroOrMoreFnClause );
C( 'clausejs.compose/oneOrMore', OneOrMoreFnClause );
C( 'clausejs.compose/zeroOrOne', ZeroOrOneFnClause );
C( 'clausejs.compose/and', AndFnClause );
C( 'clausejs.compose/collOf', CollOfClause );
C( 'clausejs.compose/mapOf', MapOfFnClause );
C( 'clausejs.compose/shape', ShapeFnClause );
C( 'clausejs.compose/any', AnyClause );
C( 'clausejs.compose/wall', WallFnClause );
C( 'clausejs.compose/fclause', FclauseFnClause );
C( 'clausejs.compose/nullable', NullableFnClause );
C( 'clausejs.compose/undefinable', UndefinableFnClause );

C( 'clausejs.utils/enforce', EnforceFnClause );
C( 'clausejs.utils/conform', ConformFnClause );
C( 'clausejs.utils/delayed', DelayedFnClause );
C( 'clausejs.utils/describe', DescribeFnClause );

C( 'clausejs.preds/not', NotFnClause );
C( 'clausejs.preds/isObj', SingleArgPredClause() );
C( 'clausejs.preds/isStr', SingleArgPredClause() );
C( 'clausejs.preds/isArray', SingleArgPredClause() );
C( 'clausejs.preds/isDate', SingleArgPredClause() );
C( 'clausejs.preds/isNull', SingleArgPredClause() );
C( 'clausejs.preds/isUndefined', SingleArgPredClause() );
C( 'clausejs.preds/notEmpty', SingleArgPredClause() );
C( 'clausejs.preds/isBool', SingleArgPredClause() );
C( 'clausejs.preds/isFn', SingleArgPredClause() );
C( 'clausejs.preds/isNum', SingleArgPredClause() );
C( 'clausejs.preds/isInt', SingleArgPredClause() );
C( 'clausejs.preds/isNatInt', SingleArgPredClause() );
C( 'clausejs.preds/isUuid', SingleArgPredClause() );
C( 'clausejs.preds/oneOf', OneOfFnClause );
C( 'clausejs.preds/equals', EqualsFnClause );
C( 'clausejs.preds/instanceOf', InstanceOfFnClause );

C( '/clausejs.namespace/set', SetNSFnClause );
C( '/clausejs.namespace/get', GetNSFnClause );
C( '/clausejs.namespace/meta', MetaFnClause );

C( 'clausejs.types/Expression', ExprClause );
C( 'clausejs.types/Clause', ClauseClause );
C( 'clausejs.types/FClause', FclauseClause );
C( 'clausejs.types/Predicate', PredClause );
C( 'clausejs.types/DelayedClause', DelayedClauseClause );
C( 'clausejs.types/ClauseReference', ClauseRefClause );
C( 'clausejs.types/Problem', isProblem );
C( 'clausejs.types/NamespaceObj', NamespaceObjClause );
C( 'clausejs.types/NamespacePath', isNamespacePath );
C( 'clausejs.types/Primitive', PrimitiveClause );

export default C.getRegistry();
