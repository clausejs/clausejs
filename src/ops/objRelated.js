var Spec = require('../models/Spec');
var oAssign = require('object-assign');
var Problem = require('../models/Problem');
var isSpec = require('../utils/isSpec');
var isObj = require('../preds/isObj');
var isStr = require('../preds/isStr');
var isExpr = require('../utils/isExpr');
var core = require('./core');
var cat = core.cat;
var or = core.or;
var fspec = require('./fspec');

var SPEC_TYPE_KEYS = 'KEYS';

function keys(params) {
  var reqSpecs = params.req;
  var optSpecs = params.opt;
  return new Spec(SPEC_TYPE_KEYS, params, _genKeyConformer(reqSpecs), null);
};

function _genKeyConformer(reqSpecs, optSpec) {
  return function tryConformKeys(x) {
    if(reqSpecs) {
      var reqProblems = [];
      for(var k in reqSpecs) {
        if(x[k] === undefined) {
          reqProblems.push(x[k]);
        }
      }
      if(reqProblems.length > 0) {
        return new Problem(x, reqProblems, 'req: keys required: ' + reqProblems.join(', ') );
      }
    }
    return x;
  }
}

var TYPE_PROPS = 'PROPS';

var FieldDefs = propsOp({
  opt: {
    'fields':
    {
      keySpec: isExpr,
      valSpec: or(
        'expr', isExpr,
        'keyValExprPair', cat('keyExpr', isExpr, 'valExpr', isExpr)
      ),
    },
  },
});

var PropArgs = propsOp({
  opt: {
    req: { valSpec: FieldDefs },
    opt: { valSpec: FieldDefs },
  },
});

var PropsSpec = fspec({
  args: cat(FieldDefs),
  ret: isSpec,
});

function propsOp(cargs) {
  //TODO
  var req = cargs.req;
  var opt = cargs.opt;

  return new Spec(TYPE_PROPS, cargs, _genPropsConformer(req, opt), null);
}

function parseFieldDef(x, d, defs) {

}

function _genPropsConformer(reqSpecs, optSpecs) {
  var keyConformer;
  return function tryConformProps(x) {

    var r = {};

    if(reqSpecs) {
      for (var i = 0; i < reqSpecs.length; i++) {
        var defs = reqSpecs[i];
        r[defs.name] = parseFieldDef(x, defs);
      }
    }

    if(optSpecs) {
      r = oAssign(r, parseFieldDef());
    }

    if (!keyConformer) {
      keyConformer = _genKeyConformer(reqSpecs, optSpecs); //lazy
    }
    var keyResult = keyConformer(x);
    //TODO
    return keyResult;
  }
}

module.exports = {
  keys: keys,
  props: PropsSpec.wrapConformedArgs(propsOp),
};
