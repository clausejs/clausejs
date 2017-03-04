import C, { fclause, cat, or, shape, isStr, mapOf, isBool, isObj,
  isFclause, isClauseName, isFn, isNum, isNull, isUndefined, isProblem, isPlainObj } from '../';
import { any, ExprClause, CatFnClause, OrFnClause, AndFnClause,
  CollOfClause, collOf, ClauseClause, DelayedClauseClause, ClauseRefClause,
  ZeroOrMoreFnClause, OneOrMoreFnClause, ZeroOrOneFnClause } from '../core';
import { WallFnClause } from '../core/wall';
import { ShapeFnClause, MapOfFnClause } from '../core/regex';
import { isNamespacePath, GetNSFnClause, NamespaceFnClause,
  GetMetaFnClause, SetMetaFnClause, SetNSFnClause,
   NamespaceObjClause, ResolveFnClause } from './namespace.types';
import { SExpressionClause } from '../utils/sExpression';

// TODO
// const C = Clause.withRegistry(nsObj);

const PredClause = fclause( {
  args: cat( 'x', any() ),
  ret: isBool
} );

const DescribeFnClause = fclause( {
  args: cat(
     'expression', C( 'clause.types/Expression' ),
    'replacer', C.zeroOrOne( fclause( {
      args: cat( ExprClause ),
      ret: or( isUndefined, isNull, collOf( isStr ) ),
    } ) ),
    'space', C.zeroOrOne( C.isNatInt ) ),
  ret: isStr,
} );

const SExpressionFnClause = fclause( {
  args: cat( 'expression', C( 'clause.types/Expression' ) ),
  ret: SExpressionClause
} );

const MatchFnClause = fclause( {
  args: cat(
    'keyValMap', isObj,
    'handlers', mapOf( isStr, fclause( {
      args: cat( 'val', any ),
      ret: any,
    } ) )
  )
} );

const SingleArgPredClause = () => fclause( {
  args: cat( 'x', any() ),
  ret: isBool,
} );

const IsUuidFnClause = fclause( {
  args: cat( 'x', isStr ),
  ret: isBool,
} );

const AnyClause = fclause( {
  ret: ClauseClause,
} );

const FclauseClause = isFclause;

const SCatFnClause = fclause( {
  args: cat( 'string', isStr ),
  ret: ClauseClause,
} );

const FclauseFnClause = fclause( {
  args: cat( shape( {
    optional: {
      'args': C( 'clause.types/Expression' ),
      'ret': C( 'clause.types/Expression' ),
      'fn': fclause( {
        args: cat(
          'conformedArguments', any,
          'conformedReturnValue', any
        ),
        ret: any
      } ),
    }
  } ) ),
} );

const clauseTransformFnClause = () => fclause( {
  args: cat( ExprClause ),
  ret: ClauseClause,
} );

const InstanceOfFnClause = fclause( {
  args: cat( 'instanceType', isFn ),
  ret: SingleArgPredClause(),
} );

const NotFnClause = fclause( {
  args: cat( 'predicateToNegate', C( 'clause.types/Predicate' ) ),
  ret: SingleArgPredClause(),
} );

const EqualsFnClause = fclause( {
  args: cat( 'valueToCompareWith', any() ),
  ret: SingleArgPredClause(),
} );

const OneOfFnClause = fclause( {
  args: cat( 'valueOptions', collOf( C( 'clause.types/Primitive' ) ) ),
  ret: SingleArgPredClause(),
} );

const PrimitiveClause = or( isStr, isNum, isBool, isNull, isUndefined );

const EnforceFnClause = fclause( {
  args: cat( 'expression', ExprClause, 'valueToCheck', any() ),
  ret: isUndefined
} );

const ConformFnClause = fclause( {
  args: cat( 'expression', ExprClause, 'valueToConform', any() ),
  ret: or( 'conformedValue', any(), 'problem', C( 'clause.types/Problem' ) ),
} );

const DelayedFnClause = fclause( {
  args: cat( 'getFn', fclause( {
    args: cat(),
    ret: ExprClause,
  } ) ),
  ret: DelayedClauseClause,
} );

C( '/clause', NamespaceFnClause );

C( 'clause.compose.regex/cat', CatFnClause );
C( 'clause.compose.regex/or', OrFnClause );
C( 'clause.compose.regex/zeroOrMore', ZeroOrMoreFnClause );
C( 'clause.compose.regex/oneOrMore', OneOrMoreFnClause );
C( 'clause.compose.regex/zeroOrOne', ZeroOrOneFnClause );
C( 'clause.compose.string/scat', SCatFnClause );
C( 'clause.compose/and', AndFnClause );
C( 'clause.compose/collOf', CollOfClause );
C( 'clause.compose/mapOf', MapOfFnClause );
C( 'clause.compose/shape', ShapeFnClause );
C( 'clause.compose/any', AnyClause );
C( 'clause.compose/wall', WallFnClause );
C( 'clause.compose/fclause', FclauseFnClause );
C( 'clause.compose/delayed', DelayedFnClause );
C( 'clause.compose/nullable', clauseTransformFnClause() );
C( 'clause.compose/undefinable', clauseTransformFnClause() );
C( 'clause.compose/maybe', clauseTransformFnClause() );

C( 'clause.utils/enforce', EnforceFnClause );
C( 'clause.utils/conform', ConformFnClause );
C( 'clause.utils/describe', DescribeFnClause );
C( 'clause.utils/sExpression', SExpressionFnClause );
C( 'clause.utils/match', MatchFnClause );
C( 'clause.utils/isProblem', SingleArgPredClause() );

C( 'clause.preds/not', NotFnClause );
C( 'clause.preds/isObj', SingleArgPredClause() );
C( 'clause.preds/isPlainObj', SingleArgPredClause() );
C( 'clause.preds/isStr', SingleArgPredClause() );
C( 'clause.preds/isArray', SingleArgPredClause() );
C( 'clause.preds/isDate', SingleArgPredClause() );
C( 'clause.preds/isNull', SingleArgPredClause() );
C( 'clause.preds/isUndefined', SingleArgPredClause() );
C( 'clause.preds/notEmpty', SingleArgPredClause() );
C( 'clause.preds/isBool', SingleArgPredClause() );
C( 'clause.preds/isFn', SingleArgPredClause() );
C( 'clause.preds/isNum', SingleArgPredClause() );
C( 'clause.preds/isInt', SingleArgPredClause() );
C( 'clause.preds/isNatInt', SingleArgPredClause() );
C( 'clause.preds/isUuid', IsUuidFnClause );
C( 'clause.preds/oneOf', OneOfFnClause );
C( 'clause.preds/equals', EqualsFnClause );
C( 'clause.preds/instanceOf', InstanceOfFnClause );

C( '/clause.namespace/set', SetNSFnClause );
C( '/clause.namespace/get', GetNSFnClause );
C( '/clause.namespace/resolve', ResolveFnClause );
C( '/clause.namespace/setMeta', SetMetaFnClause );
C( '/clause.namespace/getMeta', GetMetaFnClause );

C( 'clause.types/Expression', ExprClause );
C( 'clause.types/Clause', ClauseClause );
C( 'clause.types/Problem', isProblem );
C( 'clause.types/FClause', FclauseClause );
C( 'clause.types/Predicate', PredClause );
C( 'clause.types/DelayedClause', DelayedClauseClause );
C( 'clause.types/ClauseReference', ClauseRefClause );
C( 'clause.types/NamespaceObj', NamespaceObjClause );
C( 'clause.types/NamespacePath', isNamespacePath );
C( 'clause.types/ClauseLabel', isClauseName );
C( 'clause.types/SExpression', SExpressionClause );
C( 'clause.types/Primitive', PrimitiveClause );
C( 'clause.types/String', isStr );
C( 'clause.types/Bool', isBool );
C( 'clause.types/Number', isNum );
C( 'clause.types/Object', isObj );
C( 'clause.types/PlainObject', isPlainObj );
C( 'clause.types/Undefined', isUndefined );
C( 'clause.types/Null', isNull );

export default C.getRegistry();
