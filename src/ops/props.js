var Spec = require('../models/Spec');
var isSpec = require('../utils/isSpec');
var keys = require('./keys');
var isObj = require('../preds/isObj');
var core = require('./core');
var cat = core.cat;
var or = core.or;
var fspec = require('./fspec');


var TYPE = 'PROPS';

var KeyDefs = isObj; //TODO
var FieldDefs = isObj;

var PropsSpec = fspec({
  args: cat(
    'keyDefs', KeyDefs,
    'fieldDefs', core.zeroOrOne(FieldDefs)
  ),
  ret: isSpec,
});

function props(cargs) {
  //TODO
  var keyDefs = cargs.keyDefs;
  var req = keyDefs.req;
  var opt = keyDefs.opt;

  return new Spec(TYPE, cargs, conformFn(req), null);
}

function conformFn(req) {
  return function tryConformProps(x) {
    //TODO
    return x;
  }
}

module.exports = PropsSpec.wrapConformedArgs(props);
