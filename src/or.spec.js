

var or = require('./or');
var cat = require('./cat');
var fspec = require('./fspec');
var isSpec = require('./utils/isSpec');

var UnnamedArgSpec;

var OrSpec = fspec({
  args: cat(),
  ret: isSpec
});

module.exports = OrSpec(or);
