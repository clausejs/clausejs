var oAssign = require('object-assign');

var core = require('./core');

var other = {
  and: require('./and'),
  fspec: require('./fspec'),
  keys: require('./keys'),
  props: require('./props'),
};

var r = oAssign(other, core);

module.exports = r;
