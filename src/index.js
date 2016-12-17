
var oAssign = require( 'object-assign' );
import namespaceFn from './namespace';

var ops = require( './core' );
var utils = require( './utils' );

var predicates = require( './preds' );

var models = {
  Problem: require( './models/Problem' ),
  Spec: require( './models/Spec' ),
};

var r = oAssign( namespaceFn, ops, utils, models, predicates );

module.exports = r;
export default r;
