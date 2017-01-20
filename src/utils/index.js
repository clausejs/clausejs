import sExpression from './sExpression';
import describe from './describe';

module.exports = {
  conform: require( './conform' ),
  isValid: require( './isValid' ),
  isNamespacePath: require( './isNamespacePath' ),
  identity: require( './identity' ),
  isProblem: require( './isProblem' ),
  delayed: require( './delayed' ),
  enforce: require( './enforce' ),
  isClause: require( './isClause' ),
  isFclause: require( './isFclause' ),
  isClauseRef: require( './isClauseRef' ),
  deref: require( './deref' ),
  isClauseName: require( './isClauseName' ),
  describe,
  sExpression,
  match: require( './match' ),
};
