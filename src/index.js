
var oAssign = require( './utils/objectAssign' );
import namespaceFn, { resolve } from './namespace';

var ops = require( './core' );
var utils = require( './utils' );

var predicates = require( './preds' );

var models = {
  Problem: require( './models/Problem' ),
  Clause: require( './models/Clause' ),
};

var r = oAssign( namespaceFn,
  { resolve },
  ops, utils, models, predicates );

r.VERSION = require( '../package_version' );

module.exports = r;
export default r;
