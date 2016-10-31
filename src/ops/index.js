var oAssign = require('object-assign');
var core = require('./core');
var { props, keys } = require('./objRelated');

var other = {
  and: require('./and'),
  any: require('./any'),
  fspec: require('./fspec'),
};

var r = oAssign({}, core, { props, keys }, other);

module.exports = r;
