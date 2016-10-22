var Spec = require('../models/Spec');
var Problem = require('../models/Problem');
var isSpec = require('../utils/isSpec');
var isObj = require('../preds/isObj');
var core = require('./core');
var cat = core.cat;
var or = core.or;
var fspec = require('./fspec');

var SPEC_TYPE_KEYS = 'KEYS';

function keys(params) {
  var reqSpecs = params.req;
  return new Spec(SPEC_TYPE_KEYS, params, _genKeyConformer(reqSpecs), null);
};

function _genKeyConformer(reqSpecs) {
  return function tryConformKeys(x) {
    var reqProblems = reqSpecs.filter(function doesNotHaveKey(r) { return x[r] === undefined; });
    if(reqProblems.length > 0) {
      return new Problem(x, reqProblems, 'req: keys required: ' + reqProblems.join(', ') );
    } else {
      return x;
    }
  }
}

var TYPE_PROPS = 'PROPS';

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

  return new Spec(TYPE_PROPS, cargs, _genPropsConformer(req), null);
}

function _genPropsConformer(req) {
  return function tryConformProps(x) {
    //TODO
    return x;
  }
}

module.exports = {
  keys: keys,
  props: PropsSpec.wrapConformedArgs(props),
};
