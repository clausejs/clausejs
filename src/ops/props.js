var Spec = require('../_Spec');
var fspec = require('../fspec');
var ops = require('./');
var isSpec = require('../utils/isSpec');
var keys = require('../keys');
var isObj = require('../preds/isObj');
var cat = ops.cat;
var or = ops.or;

var TYPE = 'PROPS';

var KeyDefs = isObj; //TODO
var FieldDefs = isObj;

var PropsSpec = fspec({
  args: cat(
    'keyDefs', KeyDefs,
    'fieldDefs', ops.zeroOrOne(FieldDefs)
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
