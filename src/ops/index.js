var oAssign = require('object-assign');
var core = require('./core');
var objRelated = require('./objRelated');

var other = {
  and: require('./and'),
  fspec: require('./fspec'),
};

var r = oAssign({}, core, objRelated, other);

module.exports = r;
