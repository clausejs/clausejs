var Spec = require('../models/Spec');
var oAssign = require('object-assign');
var Problem = require('../models/Problem');
var isSpec = require('../utils/isSpec');
var isProblem = require('../utils/isProblem');
var isUndefined = require('../preds/isUndefined');
var isObj = require('../preds/isObj');
var isStr = require('../preds/isStr');
var core = require('./core');
var coerceIntoSpec = require('../utils/coerceIntoSpec');
var {cat, or, RefNameOrExprSpec, zeroOrMore} = core;
var fspec = require('./fspec');
var any = require('./any');

function isPropName(x) {
  return isStr(x);
}

function _genKeyConformer(reqSpecs, optSpec) {
  return function tryConformKeys(x) {
    if(reqSpecs) {
      var reqProblems = [];
      var found;
      var {fieldDefs, keyList } = reqSpecs;
      var reqNames;

      if(fieldDefs) {
        reqNames = [];
        for(var name in fieldDefs.fields) {
          reqNames.push(name);
        }
      } else if (keyList) {
        reqNames = keyList.concat([]);
      } else {
        throw 'unsupported';
      }

      for(var i = 0; i < reqNames.length; i++) {
        var name = reqNames[i];
        found = undefined;
        if(fieldDefs && fieldDefs.fields[name].keySpec) { //key spec
          found = false;
          for (var kk in x) {
            var rr = _conformNamedOrExpr(kk, fieldDefs.fields[name].keySpec);
            if(!isProblem(rr)) { //found a match
              found = true;
              break;
            }
          }
        } else { //plain string key
          if(x[name] === undefined) {
            reqProblems.push(name);
          }
        }
      }
      if(reqProblems.length > 0 || found === false) {
        return new Problem(x, reqProblems, 'req: keys required: ' + reqProblems.join(', ') );
      }
    }
    return x;
  }
}

var TYPE_PROPS = 'PROPS';

var FieldDefs = propsOp({
  opt: {
    fieldDefs: {
      fields: {
        'fields':
        {
          keyValExprPair: {
            keySpec: {
              expression: coerceIntoSpec(isStr),
            },
            valSpec: {
              expression: or(
                'valExprOnly', RefNameOrExprSpec,
                'keyValExprPair', cat(
                  'keySpec', RefNameOrExprSpec,
                  'valSpec', RefNameOrExprSpec
                )
              )
            },
          }
        },
      }
    }
  },
});

var KeyOnlyArray = zeroOrMore(isPropName);
var KeyArrayOrFieldDefs = or('keyList', KeyOnlyArray, 'fieldDefs', FieldDefs);

var PropArgs = propsOp({
  opt: {
    fieldDefs: {
      fields: {
        'req': { valExprOnly: { expression: KeyArrayOrFieldDefs } },
        'opt': { valExprOnly: { expression: KeyArrayOrFieldDefs } },
      }
    }
  },
});

var PropsSpec = fspec({
  args: cat(PropArgs),
  ret: isSpec,
});

function propsOp(cargs) {

  // console.log('-------------------');
  // var util = require('util');
  // console.log(util.inspect(cargs, false, null));
  // console.log('-------------------');

  var {req, opt} = cargs;
  // console.log(cargs);
  return new Spec(TYPE_PROPS, cargs, _genPropsConformer(req, opt), null);
}

function _genPropsConformer(reqSpecs, optSpecs) {
  var keyConformer;
  return function tryConformProps(x) {
    // console.log(x);
    var fieldDefs;
    if(reqSpecs) {
      fieldDefs = reqSpecs.fieldDefs;
    }
    if (!keyConformer) {
      keyConformer = _genKeyConformer(reqSpecs, optSpecs); //lazy
    }
    var conformed = keyConformer(x);
    // console.log(keyResult);

    if(isProblem(conformed)) {
      return conformed;
    }

    if(fieldDefs) {
      conformed = oAssign({}, x);
      for (var name in fieldDefs.fields) {
        var defs = fieldDefs.fields[name];
        var {result, keysToDelete} = parseFieldDef(x, name, defs);
        if (isProblem(result)) {
          return result;
        }
        _deleteKeys(conformed, keysToDelete);
        if(!isUndefined(result)) {
          conformed[name] = result;
        }
      }
    }

    var optFieldDefs;
    if(optSpecs) {
      optFieldDefs = optSpecs.fieldDefs;
    }
    if(optFieldDefs) {
      for (var name in optFieldDefs.fields) {
        var defs = optFieldDefs.fields[name];
        var {result, keysToDelete} = parseFieldDef(x, name, defs);
        if (isProblem(result)) {
          // console.log(r.falsePredicate);
          return result;
        }
        _deleteKeys(conformed, keysToDelete);
        if(!isUndefined(result)) {
          conformed[name] = result;
        }
      }
    }

    // console.log('-------------------');
    // var util = require('util');
    // console.log(util.inspect(conformed, false, null));
    // console.log('-------------------');

    return conformed;
  }
}

function _deleteKeys(subject, keys) {
  for (var i = 0; i < keys.length; i++) {
    delete subject[[keys[i]]];
  }
}

function parseFieldDef(x, name, defs) {
  var { valExprOnly, keyValExprPair } = defs;
  // console.log(name, defs);
  var r;
  var keysToDelete = [];
  if(keyValExprPair) {
    var { keySpec, valSpec } = keyValExprPair;
    r = undefined;
    for (var k in x) {
      var rr =_conformNamedOrExpr(k, keySpec);
      if(!isProblem(rr)) {
        // console.log(valSpec, x[rr]);
        keysToDelete.push(rr);
        var rrr = _conformNamedOrExpr(x[rr], valSpec);
        // console.log(rrr);
        if(isProblem(rrr)) {
          // console.log(rrr);
          return { result: rrr, keysToDelete };
        } else {
          if(r === undefined) {
            r = {};
          }
          r[k] = rrr;
        }
      }
    }
  } else if (valExprOnly) {
    var valSpec = valExprOnly;
    // console.log(valSpec);
    // console.log(r);
    r = x[name];
    // console.log(name, r);
    if(!isUndefined(r)) {
      r = _conformNamedOrExpr(r, valSpec);
    }
  }
  // console.log('======');
  // console.log(r);
  // console.log('======');
  return { result: r, keysToDelete };
}

function _conformNamedOrExpr(x, nameOrExpr) {
  if(nameOrExpr.expression) {
    var expr = coerceIntoSpec(nameOrExpr.expression);
    return expr.conform(x);
  } else {
    throw 'no impl';
  }
}
var props = PropsSpec.wrapConformedArgs(propsOp);
module.exports = {
  props: props,
  keys: props,
};
