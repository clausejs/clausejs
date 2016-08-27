'use strict';

var or = require('./or');
var cat = require('./cat');
var fspec = require('./fspec');
var isComp = require('./utils/isComp');

var UnnamedArgSpec;

var OrSpec = fspec({
  args: cat(),
  ret: isComp
});

module.exports = OrSpec(or);
