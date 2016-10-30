var Spec = require('../models/Spec');
var oAssign = require('object-assign');
var Problem = require('../models/Problem');
var isSpec = require('../utils/isSpec');
var isProblem = require('../utils/isProblem');
var isUndefined = require('../preds/isUndefined');
var isObj = require('../preds/isObj');
var isStr = require('../preds/isStr');
var isFn = require('../preds/isFn');
var core = require('./core');
var coerceIntoSpec = require('../utils/coerceIntoSpec');
var { cat, or, zeroOrMore, zeroOrOne, ExprSpec } = core;
var fspec = require('./fspec');
var any = require('./any');

function isPropName(x) {
  return isStr(x);
}

function _genKeyConformer(reqSpecs, optSpec, walker) {
  return function tryConformKeys(x) {
    if(reqSpecs) {
      var reqProblems = [];
      var found;
      var {fieldDefs, keyList } = reqSpecs;
      var reqNames;

      if(fieldDefs) {
        reqNames = [];
        for(var name in fieldDefs.fields) {
          if(fieldDefs.fields.hasOwnProperty(name)) {
            reqNames.push(name);
          }
        }
      } else if (keyList) {
        reqNames = keyList.concat([]);
      } else {
        throw 'unsupported';
      }

      for(var i = 0; i < reqNames.length; i++) {
        var name = reqNames[i];
        found = undefined;
        if(fieldDefs && fieldDefs.fields[name].keyValExprPair) { //key spec
          found = false;
          for (var kk in x) {
            if(x.hasOwnProperty(kk)) {
              var rr = _conformNamedOrExpr(kk, fieldDefs.fields[name].keyValExprPair.keySpec, walker);
              if(!isProblem(rr)) { //found a match
                found = true;
                break;
              }
            }
          }
        } else { //plain string key
          if(x[name] === undefined) {
            reqProblems.push(name);
          }
        }
      }
      if(reqProblems.length > 0 || found === false) {
        return new Problem(x, reqSpecs, [], 'req: keys required: ' + reqProblems.join(', ') );
      }
    }
    return x;
  }
}

var TYPE_PROPS = 'PROPS';

var FieldDefs = propsOp({
  propArgs: {
    opt: {
      fieldDefs: {
        fields: {
          'fields':
          {
            keyValExprPair: {
              keySpec: {
                spec: coerceIntoSpec(isStr),
              },
              valSpec: {
                spec: or(
                  'valExprOnly', ExprSpec,
                  'keyValExprPair', cat(
                    'keySpec', ExprSpec,
                    'valSpec', ExprSpec
                  )
                )
              },
            }
          },
        }
      }
    },
  }
});

var KeyOnlyArray = zeroOrMore(isPropName);
var KeyArrayOrFieldDefs = or('keyList', KeyOnlyArray, 'fieldDefs', FieldDefs);

var PropArgs = propsOp({
  propArgs: {
    opt: {
      fieldDefs: {
        fields: {
          'req': { valExprOnly: { spec: KeyArrayOrFieldDefs } },
          'opt': { valExprOnly: { spec: KeyArrayOrFieldDefs } },
        }
      }
    },
  }
});

var PropsSpec = fspec({
  args: cat('propArgs', PropArgs, 'walker', zeroOrOne(isFn)),
  ret: isSpec,
});

function propsOp(cargs) {

  // console.log('-------------------');
  // var util = require('util');
  // console.log(util.inspect(cargs, false, null));
  // console.log('-------------------');

  var {req, opt} = cargs.propArgs;
  var walker = function(spec, x) {
    return spec.conform(x);
  }
  // console.log(cargs);
  return new Spec(TYPE_PROPS, [cargs], _genPropsConformer(req, opt, walker), null);
}

function _genPropsConformer(reqSpecs, optSpecs, walker) {
  var keyConformer;
  return function tryConformProps(x) {
    // console.log(x);
    var fieldDefs;
    if(reqSpecs) {
      fieldDefs = reqSpecs.fieldDefs;
    }
    if (!keyConformer) {
      keyConformer = _genKeyConformer(reqSpecs, optSpecs, walker); //lazy
    }
    var conformed = keyConformer(x);
    // console.log(keyResult);

    if(isProblem(conformed)) {
      return conformed;
    }

    if(fieldDefs) {
      conformed = oAssign({}, x);
      for (var name in fieldDefs.fields) {
        if (fieldDefs.fields.hasOwnProperty(name)) {
          var defs = fieldDefs.fields[name];
          var {result, keysToDel} = parseFieldDef(x, name, defs, walker);
          if (isProblem(result)) {
            return result;
          }
          _deleteKeys(conformed, keysToDel);
          if(!isUndefined(result)) {
            conformed[name] = result;
          }
        }
      }
    }

    var optFieldDefs;
    if(optSpecs) {
      optFieldDefs = optSpecs.fieldDefs;
    }
    if(optFieldDefs) {
      for (var name in optFieldDefs.fields) {
        if(optFieldDefs.fields.hasOwnProperty(name)) {
          var defs = optFieldDefs.fields[name];
          var {result, keysToDel} = parseFieldDef(x, name, defs, walker);
          if (isProblem(result)) {
            // console.log(r.failsPredicate);
            return result;
          }
          _deleteKeys(conformed, keysToDel);
          if(!isUndefined(result)) {
            conformed[name] = result;
          }
        }
      }
    }

    // console.log('-------------------');
    // var util = require('util');
    // console.log(util.inspect(conformed, false, null));
    // console.log('-------------------');
    // console.log('conformed', conformed);
    return conformed;
  }
}

function _deleteKeys(subject, keys) {
  for (var i = 0; i < keys.length; i++) {
    delete subject[[keys[i]]];
  }
}

function parseFieldDef(x, name, defs, walker) {
  var { valExprOnly, keyValExprPair } = defs;
  // console.log(name, defs);
  var r;
  var keysToDel = [];
  if(keyValExprPair) {
    var { keySpec, valSpec } = keyValExprPair;
    r = undefined;
    for (var k in x) {
      var rr =_conformNamedOrExpr(k, keySpec, walker);
      if(x === x[rr]) {
        continue;
      }
      if(!isProblem(rr)) {
        // console.log(valSpec, x[rr]);
        keysToDel.push(rr);
        var rrr = _conformNamedOrExpr(x[rr], valSpec, walker);
        // console.log(rrr);
        if(isProblem(rrr)) {
          // console.log(rrr);
          return { result: rrr, keysToDel };
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
    if(!isUndefined(r) && x[name] !== x) {
      r = _conformNamedOrExpr(r, valSpec, walker);
    }
  }
  // console.log('======');
  // console.log(r);
  // console.log('======');
  return { result: r, keysToDel };
}

function _conformNamedOrExpr(x, nameOrExpr, walker) {
  if(nameOrExpr.spec) {
    var spec = nameOrExpr.spec;
    return walker(spec, x);
  } else if (nameOrExpr.pred) {
    var expr = coerceIntoSpec(nameOrExpr.pred);
    return walker(expr, x);
  } else {
    console.error(nameOrExpr);
    throw 'no impl';
  }
}
var props = PropsSpec.wrapConformedArgs(propsOp);
module.exports = {
  props: props,
  keys: props,
};
