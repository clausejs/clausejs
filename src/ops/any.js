var Spec = require('../models/Spec');
var identity = require('../utils/identity');
var SPEC_TYPE_ANY = 'ANY';

function any() {
  return new Spec(SPEC_TYPE_ANY, [], identity, null);
};

module.exports = any;
