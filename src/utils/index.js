import sExpression from './sExpression';

module.exports = {
  conform: require( './conform' ),
  isValid: require( './isValid' ),
  isNamespacePath: require( './isNamespacePath' ),
  identity: require( './identity' ),
  isProblem: require( './isProblem' ),
  delayed: require( './delayed' ),
  enforce: require( './enforce' ),
  isExpr: require( './isExpr' ),
  isClause: require( './isClause' ),
  isFclause: require( './isFclause' ),
  isClauseRef: require( './isClauseRef' ),
  describe: require( './describe' ),
  deref: require( './deref' ),
  isClauseName: require( './isClauseName' ),
  sExpression,
};
