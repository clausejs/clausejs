

var Spec = require('./models/Spec');
var identity = require('./identity');
var SPEC_TYPE_ANY = 'ANY';

function any() {
  return new Spec(SPEC_TYPE_ANY, null, identity, null);
};

module.exports = any;
