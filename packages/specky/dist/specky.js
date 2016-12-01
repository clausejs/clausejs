(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["S"] = factory();
	else
		root["S"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.l = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// identity function for calling harmory imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };

/******/ 	// define getter function for harmory exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		Object.defineProperty(exports, name, {
/******/ 			configurable: false,
/******/ 			enumerable: true,
/******/ 			get: getter
/******/ 		});
/******/ 	};

/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};

/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 20);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports) {

"use strict";
'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var PAREN_PAIRS = '❰❮❬❨❪﹙₍₎﹚❫❩❭❯❱';

function Problem(val, failsPredicate, subproblems, msg) {
  this.isProblem = true;

  if (arguments.length !== 4) {
    throw 'Problem arg len err';
  }

  this.val = val;
  this.name = 'Problem';
  this.failsPredicate = failsPredicate;
  // this.stack = (new Error()).stack;
  this.rawMsg = msg;
  this.subproblems = subproblems;

  this.constructMessage = function constructMessage(lvl) {
    if (Array.isArray(subproblems)) {
      if (subproblems.length === 0) {
        return msg + '; val: ' + JSON.stringify(val);
      } else {
        var reasons = subproblems.map(function (r) {
          return '' + _open(lvl) + r.constructMessage(lvl + 1) + _close(lvl);
        });
        return msg + ', because ' + reasons.join(', ');
      }
    } else if ((typeof subproblems === 'undefined' ? 'undefined' : _typeof(subproblems)) === 'object') {
      var reasons = [];
      for (var name in subproblems) {
        reasons.push('' + _open(lvl) + name + ': ' + subproblems[name].constructMessage(lvl + 1) + _close(lvl));
      }
      return msg + ', because ' + reasons.join(', ');
    }
  };

  this.message = this.constructMessage(0);
}

function _open(lvl) {
  return PAREN_PAIRS[lvl];
}

function _close(lvl) {
  return PAREN_PAIRS[PAREN_PAIRS.length - lvl - 1];
}

Problem.prototype = new Error();

module.exports = Problem;

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
'use strict';

var Problem = __webpack_require__(0);

function isProblem(x) {
  return x instanceof Problem;
}

module.exports = isProblem;

/***/ },
/* 2 */
/***/ function(module, exports) {

"use strict";
'use strict';

function Spec(type, exprs, opts, conformFn, generateFn) {

  if (arguments.length !== 5) {
    throw new Error('Wrong number of arguments (' + arguments.length + ') passed to Spec constructor');
  }

  if (!Array.isArray(exprs)) {
    throw new Error('Expect an array of specs');
  }

  this.type = type;

  if (opts) {
    this.opts = opts;
  }

  if (conformFn) {
    this.conform = conformFn;
  }

  if (generateFn) {
    this.generate = generateFn;
  }

  this.exprs = exprs;
}

module.exports = Spec;

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
'use strict';

var Spec = __webpack_require__(2);

function isSpec(x) {
  if (!x) {
    return false;
  } else {
    return x instanceof Spec;
  }
}

module.exports = isSpec;

/***/ },
/* 4 */
/***/ function(module, exports) {

"use strict";
'use strict';
/* eslint-disable no-unused-vars */
var hasOwnProperty = Object.prototype.hasOwnProperty;
var propIsEnumerable = Object.prototype.propertyIsEnumerable;

function toObject(val) {
	if (val === null || val === undefined) {
		throw new TypeError('Object.assign cannot be called with null or undefined');
	}

	return Object(val);
}

function shouldUseNative() {
	try {
		if (!Object.assign) {
			return false;
		}

		// Detect buggy property enumeration order in older V8 versions.

		// https://bugs.chromium.org/p/v8/issues/detail?id=4118
		var test1 = new String('abc');  // eslint-disable-line
		test1[5] = 'de';
		if (Object.getOwnPropertyNames(test1)[0] === '5') {
			return false;
		}

		// https://bugs.chromium.org/p/v8/issues/detail?id=3056
		var test2 = {};
		for (var i = 0; i < 10; i++) {
			test2['_' + String.fromCharCode(i)] = i;
		}
		var order2 = Object.getOwnPropertyNames(test2).map(function (n) {
			return test2[n];
		});
		if (order2.join('') !== '0123456789') {
			return false;
		}

		// https://bugs.chromium.org/p/v8/issues/detail?id=3056
		var test3 = {};
		'abcdefghijklmnopqrst'.split('').forEach(function (letter) {
			test3[letter] = letter;
		});
		if (Object.keys(Object.assign({}, test3)).join('') !==
				'abcdefghijklmnopqrst') {
			return false;
		}

		return true;
	} catch (e) {
		// We don't expect any of the above to throw, but better to be safe.
		return false;
	}
}

module.exports = shouldUseNative() ? Object.assign : function (target, source) {
	var from;
	var to = toObject(target);
	var symbols;

	for (var s = 1; s < arguments.length; s++) {
		from = Object(arguments[s]);

		for (var key in from) {
			if (hasOwnProperty.call(from, key)) {
				to[key] = from[key];
			}
		}

		if (Object.getOwnPropertySymbols) {
			symbols = Object.getOwnPropertySymbols(from);
			for (var i = 0; i < symbols.length; i++) {
				if (propIsEnumerable.call(from, symbols[i])) {
					to[symbols[i]] = from[symbols[i]];
				}
			}
		}
	}

	return to;
};


/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
'use strict';

var isPred = __webpack_require__(7);
var isSpec = __webpack_require__(3);
var isSpecRef = __webpack_require__(11);
var isDelayedSpec = __webpack_require__(29);
var Spec = __webpack_require__(2);
var Problem = __webpack_require__(0);
var fnName = __webpack_require__(18);

var SPEC_TYPE = 'PRED';

function coerceIntoSpec(expr) {
  if (isSpec(expr) || isSpecRef(expr) || isDelayedSpec(expr)) {
    return expr;
  } else if (isPred(expr)) {
    return _wrap(expr);
  } else {

    throw new Error('Expression must either be a Spec object or a predication function that returns true or false. ');
  }
}

function _wrap(pred) {
  return new Spec(SPEC_TYPE, [pred], null, predConformer(pred), null);
}

function predConformer(pred) {
  return function conformPred(x) {
    if (pred(x)) {
      return x;
    } else {
      return new Problem(x, pred, [], 'Predicate ' + fnName(pred) + ' returns false');
    }
  };
}

module.exports = coerceIntoSpec;

/***/ },
/* 6 */
/***/ function(module, exports) {

"use strict";
"use strict";

function isStr(x) {
  return x !== null && x !== undefined && x.constructor === String;
}

module.exports = isStr;

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
'use strict';

var isFn = __webpack_require__(16);
var Spec = __webpack_require__(2);

function isPred(x) {
  return isFn(x);
}

module.exports = isPred;

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
'use strict';

var oAssign = __webpack_require__(4);
var nfaWalker = __webpack_require__(59);
var predWalker = __webpack_require__(60);
var fspecWalker = __webpack_require__(58);
var propsWalker = __webpack_require__(61);
var andWalker = __webpack_require__(55);
var collOfWalker = __webpack_require__(56);
var specRefWalker = __webpack_require__(62);
var delayedSpecWalker = __webpack_require__(57);
var coerceIntoSpec = __webpack_require__(5);
var isProblem = __webpack_require__(1);

function walk(spec, x, opts) {
  var phase = opts.phase,
      conform = opts.conform,
      instrument = opts.instrument;

  var walker = _getWalker(spec);

  if (!phase) {
    // 2-pass algorithm:

    // in Pass 1 we just need to know if x validates to spec, and if so, how
    var intermediate = walker.trailblaze(x, oAssign({ phase: 'trailblaze' }, opts));
    if (isProblem(intermediate)) {
      return intermediate;
    } else {
      // in Pass 2 we return conformed and/or instrumented results
      return walker.reconstruct(intermediate, oAssign({ phase: 'reconstruct' }, opts));
    }
  } else if (walker[phase]) {
    return walker[phase](x, opts);
  } else {
    throw '!';
  }
}

function _getWalker(expr) {
  var walker;
  var spec = coerceIntoSpec(expr);
  if (['OR', 'CAT', 'Z_OR_M', 'O_OR_M', 'Z_OR_O'].indexOf(spec.type) >= 0) {
    walker = nfaWalker;
  } else if (['COLL_OF'].indexOf(spec.type) >= 0) {
    walker = collOfWalker;
  } else if (spec.type === 'PRED') {
    walker = predWalker;
  } else if (spec.type === 'PROPS') {
    walker = propsWalker;
  } else if (spec.type === 'AND') {
    walker = andWalker;
  } else if (spec.type === 'SpecRef') {
    walker = specRefWalker;
  } else if (spec.type === 'Delayed') {
    walker = delayedSpecWalker;
  } else if (spec.type === 'FSPEC') {
    walker = fspecWalker;
  } else {
    throw 'unsupported type ' + spec.type;
  }

  var r = walker(spec, walk);
  return r;
}

module.exports = walk;

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
'use strict';

var Spec = __webpack_require__(2);
var walk = __webpack_require__(8);

function fspec(fnSpec) {
  var spec = new Spec('FSPEC', [], fnSpec, null, null);
  spec.instrumentConformed = function instrumentConformed(fn) {
    return walk(spec, fn, { conform: true, instrument: true });
  };
  spec.instrument = function instrument(fn) {
    return walk(spec, fn, { conform: false, instrument: true });
  };

  return spec;
}

module.exports = fspec;

/***/ },
/* 10 */
/***/ function(module, exports) {

"use strict";
"use strict";

module.exports = function isUndefined(x) {
  return x === undefined;
};

/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
'use strict';

var SpecRef = __webpack_require__(23);

//TODO
module.exports = function isSpecRef(x) {
  return x instanceof SpecRef;
};

/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
'use strict';

var oAssign = __webpack_require__(4);
var regex = __webpack_require__(15);

var _require = __webpack_require__(21),
    props = _require.props,
    keys = _require.keys;

var other = {
  and: __webpack_require__(34),
  any: __webpack_require__(35),
  fspec: __webpack_require__(9)
};

var r = oAssign({}, regex, { props: props, keys: keys }, other);

module.exports = r;

/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
'use strict';

var isNum = __webpack_require__(25);
var isNatInt = __webpack_require__(45);
var isInt = __webpack_require__(24);
var isBool = __webpack_require__(43);
var isFn = __webpack_require__(16);
var isObj = __webpack_require__(26);
var equals = __webpack_require__(41);
var oneOf = __webpack_require__(27);
var isStr = __webpack_require__(6);
var isDate = __webpack_require__(44);
var instanceOf = __webpack_require__(42);
var isUuid = __webpack_require__(47);
var isArray = Array.isArray;

var e = {
  isNull: __webpack_require__(46),
  isUndefined: __webpack_require__(10),
  notEmpty: __webpack_require__(48),
  isBool: isBool, isBoolean: isBool,
  isFn: isFn, isFunction: isFn,
  isNum: isNum, isNumber: isNum,
  isNatInt: isNatInt, isNaturalNumber: isNatInt,
  isInt: isInt, isInteger: isInt,
  isObj: isObj, isObject: isObj,
  isStr: isStr, isString: isStr,
  isArray: isArray, isArr: isArray,
  equals: equals, equalsTo: equals,
  oneOf: oneOf,
  isDate: isDate,
  instanceOf: instanceOf,
  isUuid: isUuid, isUUID: isUuid
};

e.default = e;
module.exports = e;

/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
'use strict';

module.exports = {
  conform: __webpack_require__(17),
  isValid: __webpack_require__(54),
  isNamespacePath: __webpack_require__(52),
  identity: __webpack_require__(28),
  isProblem: __webpack_require__(1),
  delayed: __webpack_require__(50),
  enforce: __webpack_require__(51),
  isExpr: __webpack_require__(30),
  isSpec: __webpack_require__(3),
  isSpecRef: __webpack_require__(11)
};

/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
'use strict';

var oAssign = __webpack_require__(4);

var Spec = __webpack_require__(2);
var isSpec = __webpack_require__(3);
var isPred = __webpack_require__(7);
var specFromAlts = __webpack_require__(19);
var isObj = __webpack_require__(26);
var isStr = __webpack_require__(6);
var isSpecName = __webpack_require__(53);
var namedFn = __webpack_require__(31);
var isSpecRef = __webpack_require__(11);
var isDelayedSpec = __webpack_require__(29);
var c = __webpack_require__(36);
var coerceIntoSpec = __webpack_require__(5);
var fspec = __webpack_require__(9);
var walk = __webpack_require__(8);
var specSpec = coerceIntoSpec(isSpec);
var nameSpec = coerceIntoSpec(isSpecName);

var catOp = genMultiArgOp(c.CAT);
var orOp = genMultiArgOp(c.OR);
var zeroOrMoreOp = genSingleArgOp(c.Z_OR_M);
var oneOrMoreOp = genSingleArgOp(c.O_OR_M);
var zeroOrOneOp = genSingleArgOp(c.Z_OR_O);
var collOfOp = genSingleArgOp(c.COLL_OF);

var ExprSpec = orOp({
  named: [{ name: 'specRef', expr: {
      spec: isSpecRef
    } }, { name: 'pred', expr: {
      pred: isPred
    } }, { name: 'delayedSpec', expr: {
      spec: isDelayedSpec
    } }, { name: 'spec', expr: {
      pred: isSpec
    } }]
});

var NameExprSeq = catOp({
  named: [{ name: 'name', expr: {
      spec: nameSpec
    } }, { name: 'expr', expr: {
      spec: ExprSpec
    } }]
});

var NameCommentExprSeq = catOp({
  named: [{ name: 'name', expr: {
      spec: nameSpec
    } }, { name: 'comment', expr: {
      spec: isStr
    } }, { name: 'expr', expr: {
      spec: ExprSpec
    } }]
});

var NameExprOptionalComment = orOp({
  unnamed: [{ spec: NameExprSeq }, { spec: NameCommentExprSeq }]
});

var MultipleArgSpec = orOp({
  named: [{
    name: 'named',
    expr: {
      spec: orOp({
        unnamed: [{
          spec: zeroOrMoreOp({
            expr: {
              spec: NameExprOptionalComment
            }
          })
        }, {
          spec: collOfOp({
            expr: {
              spec: NameExprOptionalComment
            }
          })
        }]
      })
    }
  }, {
    name: 'unnamed',
    expr: {
      spec: zeroOrMoreOp({
        expr: {
          spec: ExprSpec
        }
      })
    }
  }]
});

var multipleArgOpSpec = {
  args: MultipleArgSpec,
  ret: specSpec
};

var singleArgOpSpec = {
  args: catOp({
    named: [{
      name: 'expr',
      expr: {
        spec: ExprSpec
      }
    }, {
      name: 'opts',
      expr: {
        spec: zeroOrOneOp({
          expr: {
            pred: isObj
          }
        })
      }
    }]
  }),
  ret: specSpec
};

function genMultiArgOp(type) {
  return namedFn(type, function (conformedArgs) {
    var exprs;
    if (conformedArgs.named) {
      exprs = conformedArgs.named;

      var coercedExprs = exprs.map(function (p) {
        var alts = p.expr;
        var s = specFromAlts(alts);

        return oAssign({}, p, {
          expr: s,
          spec: undefined, pred: undefined,
          specRef: undefined, delayedSpec: undefined });
      });

      var s = new Spec(type, coercedExprs, null, null, null);

      s.conform = function conform(x) {
        return walk(s, x, { conform: true });
      };
      return s;
    } else if (conformedArgs.unnamed) {
      exprs = conformedArgs.unnamed;

      var coercedExprs = exprs.map(function (p) {
        if (p.spec) {
          var s = p.spec;
          return oAssign({}, p, { expr: s, spec: undefined });
        } else if (p.pred) {
          var s = coerceIntoSpec(p.pred);
          return oAssign({}, p, { expr: s, pred: undefined });
        } else if (p.specRef) {
          var s = p.specRef;
          return oAssign({}, p, { expr: s, specRef: undefined });
        } else if (p.delayedSpec) {
          var s = p.delayedSpec;
          return oAssign({}, p, { expr: s, delayedSpec: undefined });
        } else {
          console.error(p);
          throw 'Not implemented';
        }
      });

      var s = new Spec(type, coercedExprs, null, null, null);

      s.conform = function conform(x) {
        return walk(s, x, { conform: true });
      };
      return s;
    }
  });
}

function genSingleArgOp(type) {
  return namedFn(type, function (conformedArgs) {
    var p = conformedArgs.expr;
    var opts = conformedArgs.opts;
    var expr;

    if (p.spec) {
      expr = p.spec;
    } else if (p.pred) {
      expr = coerceIntoSpec(p.pred);
    } else if (p.specRef) {
      expr = p.specRef;
    } else if (p.delayedSpec) {
      expr = p.delayedSpec;
    } else {
      throw 'internal err';
    }

    var s = new Spec(type, [coerceIntoSpec(expr)], opts, null, null);

    s.conform = function conform(x) {
      return walk(s, x, { conform: true });
    };
    return s;
  });
}

var collOf = fspec(singleArgOpSpec).instrumentConformed(collOfOp);

var core = {
  cat: fspec(multipleArgOpSpec).instrumentConformed(catOp),
  or: fspec(multipleArgOpSpec).instrumentConformed(orOp),
  zeroOrMore: fspec(singleArgOpSpec).instrumentConformed(zeroOrMoreOp),
  zeroOrOne: fspec(singleArgOpSpec).instrumentConformed(zeroOrOneOp),
  oneOrMore: fspec(singleArgOpSpec).instrumentConformed(oneOrMoreOp),
  ExprSpec: ExprSpec,
  collOf: collOf,
  arrayOf: collOf
};

core['alt'] = core.or;
core['*'] = core.zeroOrMore;
core['+'] = core.oneOrMore;
core['?'] = core.zeroOrOne;

module.exports = core;

// // //
var TestSpec = orOp({
  named: [{
    name: 'named',
    expr: {
      spec: orOp({
        unnamed: [{
          spec: zeroOrMoreOp({
            expr: {
              spec: NameExprOptionalComment
            }
          })
        }, {
          spec: collOfOp({
            expr: {
              spec: NameExprOptionalComment
            }
          })
        }]
      })
    }
  }, {
    name: 'unnamed',
    expr: {
      spec: zeroOrMoreOp({
        expr: {
          spec: ExprSpec
        }
      })
    }
  }]
});

/***/ },
/* 16 */
/***/ function(module, exports) {

"use strict";
'use strict';

function isFunction(x) {
  var getType = {};
  // (x || false) guarantees returning of boolean type
  return (x || false) && getType.toString.call(x) === '[object Function]';
}

module.exports = isFunction;

/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
'use strict';

var isSpec = __webpack_require__(3);

function conform(spec, x) {
  if (spec && isSpec(spec)) {
    var r = spec.conform(x);
    return r;
  } else {
    throw new Error('Expression needs to be of type Spec. expression: ' + spec + ', offending value: ' + x);
  }
}

module.exports = conform;

/***/ },
/* 18 */
/***/ function(module, exports) {

"use strict";
'use strict';

//extrapolates the name of a function
function functionName(fun) {
  var ret = fun.toString();
  ret = ret.substr('function '.length);
  ret = ret.substr(0, ret.indexOf('('));
  return ret;
}

module.exports = functionName;

/***/ },
/* 19 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
'use strict';

var coerceIntoSpec = __webpack_require__(5);

module.exports = function specFromAlts(alts) {
  if (!alts) {}
  if (alts.spec) {
    return alts.spec;
  } else if (alts.pred) {
    return coerceIntoSpec(alts.pred);
  } else if (alts.specRef) {
    return alts.specRef;
  } else if (alts.delayedSpec) {
    return alts.delayedSpec;
  } else {
    console.error(alts);
    throw 'Not implemented';
  }
};

/***/ },
/* 20 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
'use strict';

var _namespace = __webpack_require__(33);

var _namespace2 = _interopRequireDefault(_namespace);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var oAssign = __webpack_require__(4);


var ops = __webpack_require__(12);
var utils = __webpack_require__(14);

var predicates = __webpack_require__(13);

var models = {
  Problem: __webpack_require__(0),
  Spec: __webpack_require__(2)
};

var r = oAssign(_namespace2.default, ops, utils, models, predicates);
r.default = r;

module.exports = r;

/***/ },
/* 21 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
'use strict';

var Spec = __webpack_require__(2);
var isSpec = __webpack_require__(3);
var isStr = __webpack_require__(6);
var isFn = __webpack_require__(16);
var oneOf = __webpack_require__(27);
var coerceIntoSpec = __webpack_require__(5);

var _require = __webpack_require__(15),
    cat = _require.cat,
    or = _require.or,
    zeroOrMore = _require.zeroOrMore,
    ExprSpec = _require.ExprSpec;

var walk = __webpack_require__(8);
var fspec = __webpack_require__(9);

function isPropName(x) {
  return isStr(x);
}

var TYPE_PROPS = 'PROPS';

var FieldDefs = propsOp({
  propArgs: {
    optionalFields: {
      opt: {
        fieldDefs: {
          fields: {
            'fields': {
              keyValExprPair: {
                keySpecAlts: {
                  spec: coerceIntoSpec(isStr)
                },
                valSpecAlts: {
                  spec: or('valSpecAltsOnly', ExprSpec, 'keyValExprPair', cat('keySpecAlts', ExprSpec, 'valSpecAlts', ExprSpec))
                }
              }
            }
          }
        }
      }
    }
  }
});

var KeyOnlyArray = zeroOrMore(isPropName);
var KeyArrayOrFieldDefs = or('keyList', KeyOnlyArray, 'fieldDefs', FieldDefs);

var PropArgs = propsOp({
  propArgs: {
    optionalFields: {
      opt: {
        fieldDefs: {
          fields: {
            'requiredFields': {
              keyValExprPair: {
                keySpecAlts: {
                  pred: oneOf('req', 'required')
                },
                valSpecAlts: {
                  spec: KeyArrayOrFieldDefs
                }
              }
            },
            'optionalFields': {
              keyValExprPair: {
                keySpecAlts: {
                  pred: oneOf('opt', 'optional')
                },
                valSpecAlts: {
                  spec: KeyArrayOrFieldDefs
                }
              }
            }
          }
        }
      }
    }
  }
});

var PropsSpec = fspec({
  args: cat('propArgs', PropArgs),
  ret: isSpec
});

function propsOp(cargs) {
  var s = new Spec(TYPE_PROPS, [cargs], null, null, null);
  s.conform = function propsConform(x) {
    return walk(s, x, { conform: true });
  };
  return s;
}

var props = PropsSpec.instrumentConformed(propsOp);

module.exports = {
  props: props,
  keys: props
};

// // // // //

// var TestSpec = propsOp({
//   propArgs: {
//     req: {
//       fieldDefs: {
//         fields: {
//           'a': { valSpecAltsOnly: { pred: isStr } }
//         }
//       }
//     }
//   }
// });
// //
// var r = TestSpec.conform({a: 's'});
// console.log(r);

/***/ },
/* 22 */
/***/ function(module, exports) {

"use strict";
'use strict';

function DelayedSpec(_ref) {
  var getFn = _ref.getFn;

  this.type = 'Delayed';
  this.get = getFn;
  var _this = this;

  ['conform', 'instrument'].forEach(function (mName) {
    _this[mName] = function (x) {
      var Spec = getFn();
      return Spec[mName].call(this, x);
    };
  });
}

module.exports = DelayedSpec;

/***/ },
/* 23 */
/***/ function(module, exports) {

"use strict";
'use strict';

function SpecRef(_ref) {
  var ref = _ref.ref,
      getFn = _ref.getFn,
      conformFn = _ref.conformFn;

  this.type = 'SpecRef';
  this.get = getFn;
  this.conform = conformFn;
  this.ref = ref;
}

module.exports = SpecRef;

/***/ },
/* 24 */
/***/ function(module, exports) {

"use strict";
'use strict';

function isInt(x) {
  if (typeof x !== 'number') {
    return false;
  } else {
    return Math.floor(x) === x && x !== Infinity;
  }
}

module.exports = isInt;

/***/ },
/* 25 */
/***/ function(module, exports) {

"use strict";
'use strict';

function isNum(x) {
  return typeof x === 'number';
}

module.exports = isNum;

/***/ },
/* 26 */
/***/ function(module, exports) {

"use strict";
'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

function isObject(x) {
  return (typeof x === 'undefined' ? 'undefined' : _typeof(x)) === 'object' && x !== null;
}

module.exports = isObject;

/***/ },
/* 27 */
/***/ function(module, exports) {

"use strict";
'use strict';

module.exports = function oneOf(items) {
  var items;

  if (arguments.length === 1 && Array.isArray(arguments[0])) {
    items = arguments[0];
  } else if (arguments.length > 0) {
    items = Array.from(arguments);
  } else {
    throw new Error('Items list is required.');
  }
  return function (x) {
    return items.indexOf(x) >= 0;
  };
};

/***/ },
/* 28 */
/***/ function(module, exports) {

"use strict";
"use strict";

function identity(x) {
  return x;
}

module.exports = identity;

/***/ },
/* 29 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
'use strict';

var DelayedSpec = __webpack_require__(22);

//TODO
module.exports = function isSpecRef(x) {
  return x instanceof DelayedSpec;
};

/***/ },
/* 30 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
'use strict';

var isPred = __webpack_require__(7);
var isSpec = __webpack_require__(3);
var isSpecRef = __webpack_require__(11);

function isExpr(x) {
  return isPred(x) || isSpec(x) || isSpecRef(x);
}

module.exports = isExpr;

/***/ },
/* 31 */
/***/ function(module, exports) {

"use strict";
'use strict';

function getNamedFn(fnName, fn, suffix) {
  if (fnName) {
    return new Function('action', 'return function ' + fnName + (suffix || '') + '(){ return action.apply(this, arguments); };')(fn);
  } else {
    return fn;
  }
}

module.exports = getNamedFn;

/***/ },
/* 32 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MetaFnSpec = exports.isNamespacePath = exports.NamespaceFnSpec = exports.isSpecRef = undefined;

var _core = __webpack_require__(12);

var _utils = __webpack_require__(14);

var _preds = __webpack_require__(13);

var ExprOrPartialRefMapSpec = (0, _core.or)('expr', (0, _utils.delayed)(function () {
  return _core.ExprSpec;
}) //TODO
);

var NamespaceFnSpec = (0, _core.fspec)({
  args: (0, _core.or)('register', (0, _core.cat)('path', _utils.isNamespacePath, 'val', ExprOrPartialRefMapSpec), 'retrieve', (0, _core.cat)('path', _utils.isNamespacePath)),
  ret: (0, _core.or)(_utils.isSpecRef, _utils.isExpr)
});

var MetaFnSpec = (0, _core.fspec)({
  args: (0, _core.cat)('source', (0, _core.or)('namespacePath', _utils.isNamespacePath, 'expression', _utils.isExpr), 'metaObj', _preds.isObj),
  ret: _utils.isExpr
});

exports.isSpecRef = _utils.isSpecRef;
exports.NamespaceFnSpec = NamespaceFnSpec;
exports.isNamespacePath = _utils.isNamespacePath;
exports.MetaFnSpec = MetaFnSpec;

/***/ },
/* 33 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _core = __webpack_require__(12);

var _utils = __webpack_require__(14);

var _ns = __webpack_require__(32);

var oPath = __webpack_require__(63);
var oAssign = __webpack_require__(4);
var SpecRef = __webpack_require__(23);

var _require = __webpack_require__(21),
    props = _require.props;

var isSpec = __webpack_require__(3);
var isPred = __webpack_require__(7);
var isUndefined = __webpack_require__(10);
var walk = __webpack_require__(8);

var reg;

var _get = (0, _core.fspec)({
  args: (0, _core.cat)(_utils.isNamespacePath),
  ret: _utils.isSpecRef
}).instrument(_getUnchecked);

function _getUnchecked(ref) {
  var getFn = function getFn(prefix) {
    var path = reg;
    if (prefix) {
      path = prefix + ref;
    } else {
      path = ref;
    }
    var nObj = oPath.get(reg, path);

    if (nObj) {
      return nObj.expr;
    } else {
      return undefined;
    }
  };

  var sr = new SpecRef({ ref: ref, getFn: getFn, conformFn: null });
  sr.conform = function specRefConform(x) {
    var ss = getFn();
    return walk(ss, x, { conform: true });
  };
  return sr;
}

// var PartialRefMapSpec = props({
//   req: {
//     'refDefs': [isNamespacePath, ExprOrPartialRefMapSpec]
//   }
// });

function speckyNamespace(cargs) {
  var retVal;

  if (cargs['register']) {
    var _cargs$register = cargs['register'],
        path = _cargs$register.path,
        val = _cargs$register.val;

    retVal = _processVal(path, val);
  } else if (cargs['retrieve']) {
    var _path = cargs['retrieve'].path;

    var nameObj = _get(_path);
    retVal = nameObj;
  }

  return retVal;
}

function _processVal(prefix, val) {
  if (val.expr) {
    var e = val.expr;
    if (e.spec || e.pred) {
      var expr = e.spec || e.pred;
      _set(prefix, { expr: expr });
      return expr;
    } else {
      console.error(e);
      throw 'internal erro';
    }
  } else if (val.partialRefMap) {
    var refDefs = val.partialRefMap.refDefs;

    for (var k in refDefs) {
      if (refDefs.hasOwnProperty(k)) {
        var retVal = _processVal(refDefs[k]);
      }
    }
  } else {
    console.error(val);
    throw 'no impl';
  }
}

var NameObjSpec = props({
  req: { 'expr': (0, _core.or)(isSpec, isPred) }
});

var _set = (0, _core.fspec)({
  args: (0, _core.cat)(_utils.isNamespacePath, NameObjSpec),
  ret: isUndefined
}).instrument(function _set(n, nObj) {
  _maybeInitRegistry();
  var existing = oPath.get(reg, n);
  oPath.set(reg, n, oAssign({}, existing, nObj));
});

var K = '___SPECKY_REGISTRY';

function _maybeInitRegistry() {
  if (!reg) {
    clearRegistry();
  }
  return reg;
}

function clearRegistry() {
  reg = global[K] = {};
}

var meta = _ns.MetaFnSpec.instrumentConformed(function meta(_ref) {
  var _ref$source = _ref.source,
      namespacePath = _ref$source.namespacePath,
      expression = _ref$source.expression,
      metaObj = _ref.metaObj;

  if (namespacePath) {
    return _get(namespacePath);
  } else if (expression) {
    return expression;
  }
});

_maybeInitRegistry();

var specedSpeckyNamespace = _ns.NamespaceFnSpec.instrumentConformed(speckyNamespace);
specedSpeckyNamespace.clearRegistry = clearRegistry;
specedSpeckyNamespace.getRegistry = function () {
  return reg;
};
specedSpeckyNamespace.meta = meta;

exports.default = specedSpeckyNamespace;
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(64)))

/***/ },
/* 34 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
'use strict';

var _require = __webpack_require__(13),
    isBool = _require.isBool,
    isFn = _require.isFn;

var isExpr = __webpack_require__(30);
var isSpec = __webpack_require__(3);
var isProblem = __webpack_require__(1);
var Spec = __webpack_require__(2);
var Problem = __webpack_require__(0);

var _require2 = __webpack_require__(15),
    oneOrMore = _require2.oneOrMore,
    zeroOrOne = _require2.zeroOrOne,
    or = _require2.or,
    cat = _require2.cat,
    ExprSpec = _require2.ExprSpec;

var fspec = __webpack_require__(9);
var walk = __webpack_require__(8);

var AndSpec = fspec({
  args: cat('exprs', oneOrMore(ExprSpec)),
  ret: isSpec
});

function andOp(conformedArgs) {
  var exprs = conformedArgs.exprs;


  var andS = new Spec('AND', exprs, null, null, null);
  andS.conform = function andConform(x) {
    return walk(andS, x, { conform: true });
  };
  return andS;
}

module.exports = AndSpec.instrumentConformed(andOp);

/***/ },
/* 35 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
'use strict';

var Spec = __webpack_require__(2);
var identity = __webpack_require__(28);
var SPEC_TYPE_ANY = 'ANY';

function any() {
  return new Spec(SPEC_TYPE_ANY, [], null, identity, null);
}

module.exports = any;

/***/ },
/* 36 */
/***/ function(module, exports) {

"use strict";
'use strict';

module.exports = {
  CAT: 'CAT',
  OR: 'OR',
  Z_OR_M: 'Z_OR_M',
  Z_OR_O: 'Z_OR_O',
  O_OR_M: 'O_OR_M',
  PRED: 'PRED',
  COLL_OF: 'COLL_OF',
  PAREN_PAIRS: '❴❰❮❬❨❪﹙₍₎﹚❫❩❭❯❱❵'
};

/***/ },
/* 37 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
'use strict';

var fragment = __webpack_require__(38);
var Spec = __webpack_require__(2);

var indexedFragmentStates = function indexedFragmentStates(fragment) {
  var nextIndex = 0;
  var frontier = [fragment.head];
  var states = [];
  while (frontier.length > 0) {
    var state = frontier.pop();
    if (state.index === null) {
      state.index = nextIndex;
      nextIndex++;
      state.transitions.forEach(function (transition) {
        frontier.push(transition.target);
      });
      states.push(state);
    }
  }
  return states;
};

var evalFunctions = {};

function evalSpec(spec) {
  var evalFn;

  if (spec.type === null) {
    throw 'Spec has no type: ' + spec;
  } else if (!(spec.type in evalFunctions)) {
    evalFn = evalFunctions.PRED;
  } else {
    evalFn = evalFunctions[spec.type];
  }
  var r = evalFn(spec);
  return r;
}

var evalChildThen = function evalChildThen(wrapper) {
  return function (spec) {
    var childFrag = evalSpec(spec.exprs[0]);
    return wrapper(childFrag);
  };
};

var evalChildrenThen = function evalChildrenThen(wrapper) {
  return function (spec) {
    var childFrags = spec.exprs.map(function (child) {
      var s = evalSpec(child.expr);
      s.name = child.name;
      return s;
    });
    return wrapper(childFrags);
  };
};

['ROOT', 'Z_OR_M', 'O_OR_M', 'Z_OR_O'].forEach(function (fragName) {
  evalFunctions[fragName] = evalChildThen(fragment[fragName]);
});

['OR', 'CAT'].forEach(function (fragName) {
  evalFunctions[fragName] = evalChildrenThen(fragment[fragName]);
});

evalFunctions.PRED = function (x) {
  return fragment['PRED'](x);
};

function wrapRoot(expr) {
  return new Spec('ROOT', [expr], null, null, null);
}

var compile = function compile(expr) {
  var rootedExpr = wrapRoot(expr);
  var fragment = evalSpec(rootedExpr);
  var states = indexedFragmentStates(fragment);
  var numStates = states.length;
  var nfaTransitions = {};
  var finalState;
  states.forEach(function (state) {
    if (state.transitions.length === 0) {
      finalState = state.index;
    }
    var outTrans = {};
    state.transitions.forEach(function (fragTrans) {
      outTrans[fragTrans.target.index] = fragTrans.spec;
    });
    nfaTransitions[state.index.toString()] = outTrans;
  });
  return {
    initialState: 0,
    numStates: numStates,
    finalState: finalState,
    transitions: nfaTransitions,
    expression: expr
  };
};

module.exports = compile;

/***/ },
/* 38 */
/***/ function(module, exports) {

"use strict";
'use strict';

var fragmentState = function fragmentState(transitions, index) {
  return {
    transitions: transitions === null ? [] : transitions,
    index: index || null
  };
};

var fragmentTransition = function fragmentTransition(spec, target) {
  return {
    spec: spec,
    target: target
  };
};

var fragment = function fragment(head, tails) {
  return {
    head: head,
    tails: tails
  };
};

var namedFragment = function namedFragment(name, head, tails) {
  var f = fragment(head, tails);
  f.name = name;
  return f;
};

function patch(tails, state) {
  tails.forEach(function (tail) {
    tail.target = state;
  });
}

function epsilonState() {
  return {
    isEpsilon: true
  };
}

function namedEpsilonState(dir, name, op, group) {
  var s = epsilonState();
  s.name = name;
  s.op = op;
  s.group = group;
  s.dir = dir;
  return s;
}

function frontWithState(state, f) {
  var transIn = fragmentTransition(state, f.head);
  var newHead = fragmentState([transIn]);
  var newF = fragment(newHead, f.tails);
  return newF;
}

function rearWithState(state, f) {
  var newTrans = fragmentTransition(state, null);
  var newS = fragmentState([newTrans], null);
  patch(f.tails, newS);
  var r = fragment(f.head, [newTrans]);
  return r;
}

var build = {};

build.PRED = function (spec) {
  var trans = fragmentTransition(spec, null);
  var head = fragmentState([trans], null);
  var tails = [trans];
  var f = fragment(head, tails);
  return f;
};

build.CAT = function (frags) {

  var binaryConcat = function binaryConcat(frag1, currFrag) {
    patch(frag1.tails, currFrag.head);
    var head = frag1.head;
    var tails = currFrag.tails;
    var newF = fragment(head, tails);
    return newF;
  };

  frags = frags.map(function addEpsilonState(f) {
    var trans = fragmentTransition(namedEpsilonState('out', f.name, 'CAT'), null);
    var nameOutState = fragmentState([trans]);
    patch(f.tails, nameOutState);

    var nameInTranstions = f.head.transitions.map(function (t) {
      var s = fragmentState([t]);
      var namedInTrans = fragmentTransition(namedEpsilonState('in', f.name, 'CAT'), s);
      return namedInTrans;
    });
    var newHead = fragmentState(nameInTranstions);

    var newF = namedFragment(f.name, newHead, [trans]);
    return newF;
  });
  var r;
  if (frags.length > 0) {
    r = frags.reduce(binaryConcat);
  } else {
    var s = epsilonState();
    var t = fragmentTransition(s, null);
    var ss = fragmentState([t]);
    r = fragment(ss, [t]);
  }
  r = frontWithState(namedEpsilonState('multi_enter', null, 'CAT', 'in'), r);
  r = rearWithState(namedEpsilonState('multi_exit', null, 'CAT', 'out'), r);
  return r;
};

build.OR = function (frags) {
  frags = frags.map(function (f) {
    var outState = namedEpsilonState('out', f.name, 'OR');
    var trans = fragmentTransition(outState, null);
    var nameOutState = fragmentState([trans]);
    patch(f.tails, nameOutState);
    var transIn = fragmentTransition(namedEpsilonState('in', f.name, 'OR'), f.head);
    var newHead = fragmentState([transIn]);
    var newF = namedFragment(f.name, newHead, [trans]);
    return newF;
  });
  var binaryAlt = function binaryAlt(frag1, frag2) {
    var combinedTransitions = frag1.head.transitions.concat(frag2.head.transitions);
    var head = fragmentState(combinedTransitions);
    var tails = frag1.tails.concat(frag2.tails);
    var acc = namedFragment(frag1.name, head, tails);
    return acc;
  };

  var newF = frags.reduce(binaryAlt);
  newF = frontWithState(namedEpsilonState('enter', null, 'OR'), newF);
  newF = rearWithState(namedEpsilonState('exit', null, 'OR'), newF);

  return newF;
};

build.Z_OR_M = function (frag) {
  var l = 'Z_OR_M';
  var loopTrans = fragmentTransition(namedEpsilonState('loop', null, l), frag.head);
  var breakTrans = fragmentTransition(epsilonState(), null);
  var head = fragmentState([loopTrans, breakTrans]);
  patch(frag.tails, head);
  var newF = fragment(head, [breakTrans]);

  var nameInTranstions = newF.head.transitions.map(function (t) {
    var s = fragmentState([t]);
    var namedInTrans = fragmentTransition(epsilonState(), s);
    return namedInTrans;
  });
  var newHead = fragmentState(nameInTranstions);

  newF = fragment(newHead, newF.tails);
  newF = frontWithState(namedEpsilonState('maybe_enter', null, l, 'in'), newF);
  newF = rearWithState(namedEpsilonState('maybe_exit', null, l, 'out'), newF);

  return newF;
};

build.O_OR_M = function (frag) {
  var l = 'O_OR_M';
  var loopTrans = fragmentTransition(namedEpsilonState('loop', null, l), frag.head);
  var breakTrans = fragmentTransition(epsilonState(), null);
  var state = fragmentState([loopTrans, breakTrans]);
  patch(frag.tails, state);

  var newF = fragment(frag.head, [breakTrans]);
  newF = frontWithState(namedEpsilonState('maybe_enter', null, l, 'in'), newF);
  newF = rearWithState(namedEpsilonState('maybe_exit', null, l, 'out'), newF);

  return newF;
};

build.Z_OR_O = function (frag) {
  var l = 'Z_OR_O';
  var matchTrans = fragmentTransition(namedEpsilonState('loop', null, l), frag.head);
  var skipTrans = fragmentTransition(epsilonState(), null);
  var head = fragmentState([matchTrans, skipTrans]);
  var tails = frag.tails.concat([skipTrans]);

  var newF = fragment(head, tails);
  newF = frontWithState(namedEpsilonState('maybe_single_enter', null, l), newF);
  newF = rearWithState(namedEpsilonState('maybe_single_exit', null, l), newF);

  return newF;
};

build.ROOT = function (frag) {
  var finalState = fragmentState(null, null);
  patch(frag.tails, finalState);
  return fragment(frag.head, []);
};

module.exports = build;

/***/ },
/* 39 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
'use strict';

var oAssign = __webpack_require__(4);
var Problem = __webpack_require__(0);
var isUndefined = __webpack_require__(10);

var FOLD = function FOLD() {};
var ENTER = function ENTER() {};
var MULTI_ENTER = function MULTI_ENTER() {};
var MAYBE_ENTER = function MAYBE_ENTER() {};
var MAYBE_SINGLE_ENTER = function MAYBE_SINGLE_ENTER() {};

var Name = function Name(n) {
  this.value = n;
};
var ArrayFragment = function ArrayFragment(val) {
  this.value = val;
};

function getMatch(chain, walkFn, walkOpts) {
  var conform = walkOpts.conform;

  if (!chain || !chain.forEach) {}
  var valStack = [];
  var r = {};

  chain.forEach(function (curr) {
    if (curr.move) {
      switch (curr.move.dir) {
        case 'enter':
          {
            valStack.push(ENTER);
          }break;
        case 'multi_enter':
          {
            valStack.push(MULTI_ENTER);
          }break;
        case 'maybe_enter':
          {
            valStack.push(MAYBE_ENTER);
          }break;
        case 'maybe_single_enter':
          {
            valStack.push(MAYBE_SINGLE_ENTER);
          }break;
        case 'in':
          {
            valStack.push(new Name(curr.move.name));
          }break;
        case 'loop':
          {
            if (valStack[valStack.length - 1] !== null) {
              valStack.push(FOLD);
            }
          }break;
        case 'pred':
          {
            var conformed = walkFn(curr.spec, curr.guide, walkOpts);
            valStack.push(conformed);
          }break;
        case 'out':
          {
            var val = valStack.pop();
            if (!(val instanceof Name)) {
              var name = valStack.pop().value;
              var newAcc;
              if (name === null || name === undefined || !conform) {
                newAcc = new ArrayFragment(val);
              } else {
                newAcc = {};
                if (!isUndefined(val)) {
                  newAcc[name] = val;
                }
              }
              valStack.push(newAcc);
            }
          }break;
        case 'maybe_single_exit':
          {
            var c = valStack.pop();
            var acc = null;
            while (c !== MAYBE_SINGLE_ENTER) {
              if (c !== FOLD) {
                acc = c;
              }
              c = valStack.pop();
            }
            if (acc === null) {
              acc = undefined;
            }
            valStack.push(acc);
          }break;
        case 'maybe_exit':
          {
            var c = valStack.pop();
            var acc = null;
            while (c !== MAYBE_ENTER) {
              if (c !== FOLD) {
                acc = _foldIn(acc, c);
              }
              c = valStack.pop();
            }
            if (acc === null) {
              acc = [];
            }
            valStack.push(acc);
          }break;
        case 'multi_exit':
          {
            var c = valStack.pop();
            var acc = null;
            while (c !== MULTI_ENTER) {
              if (c instanceof ArrayFragment) {
                if (acc === null) {
                  acc = [c.value];
                } else {
                  acc = [c.value].concat(acc);
                }
              } else {
                acc = oAssign({}, c, acc);
              }
              c = valStack.pop();
            }
            if (acc === null) {
              acc = [];
            }
            valStack.push(acc);
          }break;
        case 'exit':
          {
            var c = valStack.pop();
            var acc = null;
            while (c !== ENTER) {
              if (c instanceof ArrayFragment) {
                if (acc === null) {
                  acc = c.value;
                } else {
                  acc = [c.value].concat(acc);
                }
              } else {
                acc = oAssign({}, c, acc);
              }
              c = valStack.pop();
            }
            if (acc === null) {
              acc = [];
            }
            valStack.push(acc);
          }break;
        default:
          console.error(curr);throw 'FUUU';
      }
    }
  });
  if (valStack.length !== 1) {
    console.error('valStack', valStack);
    throw '!valStack.length';
  }
  var r = valStack.pop();
  return r;
}

function _foldIn(acc, val) {
  var r;
  if (acc === null) {
    r = [val];
  } else if (!Array.isArray(acc)) {
    r = [val, acc];
  } else {
    r = [val].concat(acc);
  }
  return r;
}

module.exports = getMatch;

/***/ },
/* 40 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
'use strict';

var isProblem = __webpack_require__(1);

function simulate(nfa, rawInput, walkFn, walkOpts) {
  var input;

  var r = {
    matched: false,
    chain: null
  };

  var initial = { state: 0, offset: 0, leftOff: 0, input: [rawInput], groupCount: 0, arrayed: false };
  var frontier = [initial];
  while (frontier.length > 0) {
    var current = frontier.shift();
    var currentOffset = current.offset,
        leftOff = current.leftOff,
        input = current.input,
        groupCount = current.groupCount,
        arrayed = current.arrayed;

    if (current.state === nfa.finalState && currentOffset === input.length) {
      r.matched = true;
      r.chain = _getChain(nfa, current, walkFn, walkOpts);
      return r;
    }
    for (var nextStateStr in nfa.transitions[current.state]) {
      var nextState = parseInt(nextStateStr);
      var observed = input[currentOffset];
      var transition = nfa.transitions[current.state][nextState];

      if (transition.group === 'in') {
        if (groupCount === 0) {
          if (Array.isArray(input[0])) {
            input = input[0];
            currentOffset = 0;
            arrayed = true;
          }
        }
        groupCount += 1;
      } else if (transition.group === 'out') {
        groupCount -= 1;
        if (groupCount === 0) {
          if (arrayed) {
            if (currentOffset === input.length) {
              currentOffset = 1;
            } else {
              currentOffset = 0;
            }
            input = [input];
          }
          arrayed = false;
        }
      }

      var nextOffset;
      var move;
      if (!transition.isEpsilon) {
        nextOffset = currentOffset + 1;
      } else {
        nextOffset = currentOffset;
      }

      var validateResult, next;
      if (nextOffset <= input.length) {
        if (transition.isEpsilon) {
          if (transition.dir) {
            move = { dir: transition.dir, name: transition.name, op: transition.op, group: transition.group };
          } else {
            move = null;
          }
          next = {
            input: input, groupCount: groupCount, arrayed: arrayed, leftOff: leftOff,
            state: nextState,
            offset: nextOffset,
            move: move,
            spec: transition,
            prev: current,
            isEpsilon: true
          };

          frontier.push(next);
        } else {
          validateResult = walkFn(transition, observed, walkOpts);
          // validateResult = walkFn(transition, observed, walkOpts);
          if (!isProblem(validateResult)) {
            if (currentOffset < input.length) {
              move = { dir: 'pred' };
              next = {
                input: input, groupCount: groupCount, arrayed: arrayed, leftOff: leftOff,
                state: nextState,
                offset: nextOffset,
                move: move,
                prev: current,
                isEpsilon: false,
                spec: transition,
                guide: validateResult
              };
              frontier.push(next);
            }
          } else {
            r.lastProblem = validateResult;
          }
        }
      }
    }
  }
  return r;
}

function _getChain(nfa, finalState, walkFn, walkOpts) {
  var chain = [];
  var curr = finalState;
  var prev;
  while (curr) {
    if (!prev || curr.state !== prev.state && curr.move) {
      var o = {
        isEpsilon: curr.isEpsilon,
        move: curr.move,
        state: curr.state
      };
      if (!curr.isEpsilon) {
        o.guide = curr.guide;
        o.spec = curr.spec;
      }
      chain.unshift(o);
    }
    prev = curr;
    curr = curr.prev;
  }
  return chain;
}

module.exports = simulate;

/***/ },
/* 41 */
/***/ function(module, exports) {

"use strict";
"use strict";

module.exports = function equals(test) {
  return function (x) {
    return x === test;
  };
};

/***/ },
/* 42 */
/***/ function(module, exports) {

"use strict";
"use strict";

module.exports = function instanceOf(t) {
  return function instanceOfT(x) {
    return x instanceof t;
  };
};

/***/ },
/* 43 */
/***/ function(module, exports) {

"use strict";
'use strict';

function isBool(x) {
  return typeof x === 'boolean';
}

module.exports = isBool;

/***/ },
/* 44 */
/***/ function(module, exports) {

"use strict";
"use strict";

module.exports = function isDate(date) {
  return date && date instanceof Date && !isNaN(date.valueOf());
};

/***/ },
/* 45 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
'use strict';

var isInt = __webpack_require__(24);

function isNatInt(x) {
  return isInt(x) && x >= 0.0;
}

module.exports = isNatInt;

/***/ },
/* 46 */
/***/ function(module, exports) {

"use strict";
"use strict";

function isNull(x) {
  return x === null;
}

module.exports = isNull;

/***/ },
/* 47 */
/***/ function(module, exports) {

"use strict";
"use strict";

module.exports = function isUuid(x) {
  return !!/^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(x);
};

/***/ },
/* 48 */
/***/ function(module, exports) {

"use strict";
"use strict";

module.exports = function notEmpty(x) {
  if (!x) {
    return false;
  } else if (x.length === 0) {
    return false;
  } else {
    return true;
  }
};

/***/ },
/* 49 */
/***/ function(module, exports) {

"use strict";
"use strict";

function betterThrow(problem) {
  // console.log( '----------------------' );
  // console.error( problem.message, problem );
  // console.log( '----------------------' );
  throw problem;
}

module.exports = betterThrow;

/***/ },
/* 50 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
'use strict';

var DelayedSpec = __webpack_require__(22);

function delayed(getFn) {
  return new DelayedSpec({ getFn: getFn });
}

module.exports = delayed;

/***/ },
/* 51 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
'use strict';

var isProblem = __webpack_require__(1);
var conform = __webpack_require__(17); // TODO : replace with checkProblem

module.exports = function enforce(spec, x) {
  var r = conform(spec, x);
  if (isProblem(r)) {
    throw r;
  }
};

/***/ },
/* 52 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
'use strict';

var _isStr = __webpack_require__(6);

var _isStr2 = _interopRequireDefault(_isStr);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function isNamespacePath(x) {
  return (0, _isStr2.default)(x); // TODO
}

module.exports = isNamespacePath;

/***/ },
/* 53 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
'use strict';

var isStr = __webpack_require__(6);

//TODO
module.exports = function isSpecName(x) {
  return isStr(x);
};

/***/ },
/* 54 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
'use strict';

var Problem = __webpack_require__(0);
var isProblem = __webpack_require__(1);
var isPred = __webpack_require__(7);
var isSpec = __webpack_require__(3);
var conform = __webpack_require__(17);

function isValid(pred, x) {
  if (!pred) {
    throw new Error('Spec is required');
  } else if (isSpec(pred)) {
    return !isProblem(conform(pred, x));
  } else if (isPred(pred)) {
    return pred(x);
  } else {
    return true;
  }
}

module.exports = isValid;

/***/ },
/* 55 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
'use strict';

var Problem = __webpack_require__(0);
var isProblem = __webpack_require__(1);
var specFromAlts = __webpack_require__(19);

function andWalker(spec, walkFn) {
  var exprs = spec.exprs.map(specFromAlts);

  return {
    trailblaze: andTrailblaze,
    reconstruct: andReconstruct
  };

  function andTrailblaze(data, walkOpts) {
    var trailblaze = walkOpts.trailblaze;


    var r = data;
    var problems = [];

    for (var i = 0; i < exprs.length; i += 1) {
      r = walkFn(exprs[i], data, walkOpts);
      if (isProblem(r)) {
        problems.push(r);
        break; //TODO: better handle this
      }
    }

    if (!problems || problems.length === 0) {
      return r;
    } else {
      return new Problem(data, exprs, problems, 'One or more expressions failed AND test');
    }
  }

  function andReconstruct(guide, walkOpts) {
    //TODO: implement conformed AND
    return guide;
  }
}

module.exports = andWalker;

/***/ },
/* 56 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
'use strict';

var coerceIntoSpec = __webpack_require__(5);
var Problem = __webpack_require__(0);
var isProblem = __webpack_require__(1);
var isNum = __webpack_require__(25);

function collOfWalker(spec, walkFn) {
  var expr = spec.exprs[0];
  var opts = spec.opts;

  return {
    trailblaze: collOfTrailblaze,
    reconstruct: collOfReconstruct
  };

  function collOfTrailblaze(x, walkOpts) {
    if (!Array.isArray(x)) {
      return new Problem(x, spec, [], 'collOf expects an array');
    } else {

      if (opts) {
        var maxCount = opts.maxCount,
            minCount = opts.minCount;


        if (isNum(maxCount) && x.length > maxCount) {
          return new Problem(x, spec, problems, 'collOf: collection size ' + x.length + ' exceeds maxCount ' + maxCount + '.');
        }

        if (isNum(minCount) && x.length < minCount) {
          return new Problem(x, spec, problems, 'collOf: collection size ' + x.length + ' is less than minCount ' + minCount + '.');
        }
      }

      var guides = [],
          problems = [];

      for (var i = 0; i < x.length; i += 1) {
        var guide = walkFn(expr, x[i], walkOpts);
        if (isProblem(guide)) {
          problems.push(guide);
          break; //TODO
        } else {
          guides.push(guide);
        }
      }

      if (problems.length > 0) {
        return new Problem(x, spec, problems, 'One or more elements failed collOf test');
      } else {
        return guides;
      }
    }
  }

  function collOfReconstruct(guides, walkOpts) {
    var results = [];

    for (var i = 0; i < guides.length; i += 1) {
      var r = walkFn(expr, guides[i], walkOpts);
      results.push(r);
    }

    return results;
  }
}

module.exports = collOfWalker;

/***/ },
/* 57 */
/***/ function(module, exports) {

"use strict";
"use strict";

function delayedSpecWalker(delayedSpec, walkFn) {
  return {
    trailblaze: walkDelayedSpec,
    reconstruct: walkDelayedSpec
  };

  function walkDelayedSpec(x, walkOpts) {
    var s = delayedSpec.get();
    if (s) {
      return walkFn(s, x, walkOpts);
    }
  }
}

module.exports = delayedSpecWalker;

/***/ },
/* 58 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
'use strict';

var isProblem = __webpack_require__(1);
var Problem = __webpack_require__(0);
var functionName = __webpack_require__(18);
var namedFn = __webpack_require__(31);
var betterThrow = __webpack_require__(49);
var oAssign = __webpack_require__(4);

function fspecWalker(spec, walkFn) {
  var _spec$opts = spec.opts,
      argsSpec = _spec$opts.args,
      retSpec = _spec$opts.ret,
      validateFn = _spec$opts.fn;


  return {
    trailblaze: fspecTrailblaze,
    reconstruct: fspecReconstruct
  };

  function fspecTrailblaze(fn) {
    return fn;
  }

  function fspecReconstruct(fn, walkOpts) {
    if (fn) {
      var conform = walkOpts.conform,
          instrument = walkOpts.instrument;


      if (conform && instrument) {
        return instrumentConformed(fn, walkOpts);
      } else if (instrument) {
        return _instrument(fn, walkOpts);
      }
    } else {
      return new Problem(fn, spec, [], 'function is not specified');
    }
  }

  function _instrument(fn, walkOpts) {
    var fnName = functionName(fn);
    var instrumentedFn = getInstrumentedFn(fnName, fn, walkOpts);
    var namedSpecedFn = namedFn(fnName, instrumentedFn, '__instrumented');
    return namedSpecedFn;
  }

  function instrumentConformed(fn, walkOpts) {
    var fnName = functionName(fn);
    var argConformedFn = getArgConformedInstrumentedFn(fnName, fn, walkOpts);
    var namedArgConformedFn = namedFn(fnName, argConformedFn, '__conformed');

    return namedArgConformedFn;
  }

  function getInstrumentedFn(fnName, fn) {
    return function () {
      var args = Array.from(arguments);
      var instrumentedArgs = checkArgs(fn, fnName, args);
      var retVal = fn.apply(this, instrumentedArgs);
      var instrumentedRetVal = checkRet(fn, fnName, retVal);

      // TODO optimize
      var conformedArgs = walkFn(argsSpec, args, { conform: true, instrument: true });
      var conformedRetVal = void 0;
      if (retSpec) {
        conformedRetVal = walkFn(retSpec, retVal, { conform: true, instrument: true });
      } else {
        conformedRetVal = retVal;
      }

      checkFnRelation(fnName, fn, validateFn, conformedArgs, conformedRetVal);
      return instrumentedRetVal;
    };
  }

  function checkFnRelation(fnName, fn, validateFn, conformedArgs, retVal) {
    if (validateFn) {
      var r = validateFn.call(null, conformedArgs, retVal);
      if (!r) {
        var p = new Problem(fn, spec, [], 'Function ' + fnName + ' failed valiation on argument-return value relation');
        betterThrow(p);
      }
    }
  }

  function checkArgs(fn, fnName, args) {
    if (argsSpec) {
      var instrumentedArgs = walkFn(argsSpec, args, { phase: 'trailblaze' });
      if (isProblem(instrumentedArgs)) {
        var p = new Problem(args, spec, [instrumentedArgs], 'Arguments ' + JSON.stringify(args) + ' for function ' + fnName + ' failed validation');
        betterThrow(p);
      } else {
        return walkFn(argsSpec, instrumentedArgs, { phase: 'reconstruct', conform: false, instrument: true });
      }
    } else {
      return args;
    }
  }

  function checkRet(fn, fnName, retVal) {
    if (retSpec) {
      var instrumentedRetVal = walkFn(retSpec, retVal, { phase: 'trailblaze' });
      if (isProblem(instrumentedRetVal)) {
        var p = new Problem(retVal, spec, [instrumentedRetVal], 'Return value ' + retVal + ' for function ' + fnName + ' is not valid.');
        betterThrow(p);
      } else {
        var r = walkFn(retSpec, instrumentedRetVal, { phase: 'reconstruct', instrument: true, conform: false });
        return r;
      }
    } else {
      return retVal;
    }
  }

  function getArgConformedInstrumentedFn(fnName, fn) {
    return function () {
      var args = Array.from(arguments);

      var conformedArgs = walkFn(argsSpec, args, { conform: true, instrument: true });
      if (isProblem(conformedArgs)) {
        var p = new Problem(args, argsSpec, [conformedArgs], 'Arguments ' + JSON.stringify(args) + ' for function ' + fnName + ' is not valid');
        betterThrow(p);
      }

      var retVal = fn.call(this, conformedArgs);
      var conformedRetVal = walkFn(retSpec, retVal, { conform: true, instrument: true });
      checkRet(fn, fnName, retVal);
      checkFnRelation(fnName, fn, validateFn, conformedArgs, conformedRetVal);
      return retVal;
    };
  }
}

module.exports = fspecWalker;

/***/ },
/* 59 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
'use strict';

var simulate = __webpack_require__(40);
var getMatch = __webpack_require__(39);
var compile = __webpack_require__(37);
var Problem = __webpack_require__(0);
var isProblem = __webpack_require__(1);

function nfaWalker(spec, walkFn) {
  var nfa;

  return {
    trailblaze: nfaTrailblaze,
    reconstruct: nfaReconstruct
  };

  function nfaTrailblaze(x, walkOpts) {

    if (!nfa) {
      nfa = compile(spec); //lazy
    }

    var _simulate = simulate(nfa, x, walkFn, walkOpts),
        chain = _simulate.chain,
        matched = _simulate.matched,
        lastProblem = _simulate.lastProblem;

    if (matched === true) {
      return chain;
    } else {
      var subproblems = [];
      if (lastProblem) {
        subproblems.push(lastProblem);
      }
      return new Problem(x, spec, subproblems, 'Spec ' + spec.type + ' did not match value');
    }
  }

  function nfaReconstruct(chain, walkOpts) {
    var result = getMatch(chain, walkFn, walkOpts);
    return result;
  }
}

module.exports = nfaWalker;

/***/ },
/* 60 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
'use strict';

var fnName = __webpack_require__(18);
var Problem = __webpack_require__(0);

function predWalker(spec, walkFn) {
  return {
    trailblaze: predTraiblaze,
    reconstruct: predReconstruct
  };

  function predTraiblaze(x, opts) {
    var conform = opts.conform,
        instrument = opts.instrument,
        trailblaze = opts.trailblaze;

    var predFn = spec.exprs[0];
    if (!predFn(x)) {
      return new Problem(x, spec, [], 'Predicate ' + fnName(predFn) + '() returns false');
    } else {
      return x;
    }
  }

  function predReconstruct(x, opts) {
    return x;
  }
}

module.exports = predWalker;

/***/ },
/* 61 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
'use strict';

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var isProblem = __webpack_require__(1);
var isUndefined = __webpack_require__(10);
var oAssign = __webpack_require__(4);
var Problem = __webpack_require__(0);
var coerceIntoSpec = __webpack_require__(5);
var specFromAlts = __webpack_require__(19);

function propsWalker(spec, walkFn) {
  var keyConformer;
  var _spec$exprs$0$propArg = spec.exprs[0].propArgs,
      requiredFields = _spec$exprs$0$propArg.requiredFields,
      optionalFields = _spec$exprs$0$propArg.optionalFields;


  var reqSpecs, optSpecs;
  if (requiredFields) {
    reqSpecs = requiredFields.req || requiredFields.required;
  }
  if (optionalFields) {
    optSpecs = optionalFields.opt || optionalFields.optional;
  }

  return {
    trailblaze: propsTrailblaze,
    reconstruct: propsReconstruct
  };

  function propsTrailblaze(x, walkOpts) {

    if (!keyConformer) {
      keyConformer = _genKeyConformer(reqSpecs, optSpecs, walkFn, walkOpts); //lazy
    }
    var keyConformedR = keyConformer(x);

    if (isProblem(keyConformedR)) {
      return keyConformedR;
    }
    var problems = [];

    var guide = { val: x, groups: [], singles: [] };

    var reqFieldDefs, keyList;
    if (reqSpecs) {
      reqFieldDefs = reqSpecs.fieldDefs;
      keyList = reqSpecs.keyList;
    }

    if (reqFieldDefs) {
      processFieldDefs_mut(reqFieldDefs);
    }

    var optFieldDefs, optKeyList;
    if (optSpecs) {
      optFieldDefs = optSpecs.fieldDefs;
      optKeyList = optSpecs.keyList;
    }
    if (optFieldDefs) {
      processFieldDefs_mut(optFieldDefs);
    }

    if (problems.length > 0) {
      var problemMap = {};
      var failedNames = [];
      for (var i = 0; i < problems.length; i++) {
        var _problems$i = _slicedToArray(problems[i], 2),
            n = _problems$i[0],
            p = _problems$i[1];

        failedNames.push(n);
        problemMap[n] = p;
      }
      var newP = new Problem(x, spec, problemMap, 'At least one property failed validation: ' + failedNames.join(', '));
      return newP;
    } else {
      return guide;
    }

    function processFieldDefs_mut(fieldDefs) {
      fieldLoop: for (var name in fieldDefs.fields) {
        if (fieldDefs.fields.hasOwnProperty(name)) {
          var keyValAlts = fieldDefs.fields[name];

          var _getFieldGuide = getFieldGuide(x, name, keyValAlts, walkFn, walkOpts),
              noop = _getFieldGuide.noop,
              problem = _getFieldGuide.problem,
              singleMatch = _getFieldGuide.singleMatch,
              groupMatch = _getFieldGuide.groupMatch;

          if (problem) {
            problems.push([name, problem]);
            break fieldLoop; //TODO: improve this;
          } else if (singleMatch) {
            guide.singles.push(singleMatch);
          } else if (groupMatch) {
            if (groupMatch.matchedKeys.length > 0) {
              guide.groups.push(groupMatch);
            }
          } else if (noop) {} else {
            throw '!';
          }
        }
      }
    }
  }

  function propsReconstruct(_ref, walkOpts) {
    var val = _ref.val,
        singles = _ref.singles,
        groups = _ref.groups;


    var conform = { walkOpts: walkOpts };

    var instrument = walkOpts.instrument;

    var fieldDefs, keyList;
    if (reqSpecs) {
      fieldDefs = reqSpecs.fieldDefs;
      keyList = reqSpecs.keyList;
    }

    var conformed;

    if (instrument) {
      conformed = val;
    } else {
      conformed = oAssign({}, val);
    }

    singles.forEach(function (fieldGuide) {
      restoreField_mut(conformed, fieldGuide, walkFn, walkOpts);
    });

    groups.forEach(function (_ref2) {
      var name = _ref2.name,
          matchedKeys = _ref2.matchedKeys;

      if (conform) {
        conformed[name] = {};
        var keysToDel = [];
        matchedKeys.forEach(function (fieldGuide) {
          restoreField_mut(conformed[name], fieldGuide, walkFn, walkOpts);
          keysToDel.push(fieldGuide.key);
        });
        _deleteKeys(conformed, keysToDel);
      } else {
        matchedKeys.forEach(function (fieldGuide) {
          restoreField_mut(conformed, fieldGuide, walkFn, walkOpts);
        });
      }
    });

    return conformed;
  }
}

function restoreField_mut(x, _ref3, walkFn, walkOpts) {
  var key = _ref3.key,
      spec = _ref3.spec,
      guide = _ref3.guide;

  x[key] = walkFn(spec, guide, walkOpts);
}

function _genKeyConformer(reqSpecs, optSpec, walkFn, walkOpts) {
  return function tryConformKeys(x) {
    if (reqSpecs) {
      var reqProblems = [],
          missingKeys = [];
      var fieldDefs = reqSpecs.fieldDefs,
          keyList = reqSpecs.keyList;

      var reqNames;

      if (fieldDefs) {
        reqNames = [];
        for (var name in fieldDefs.fields) {
          if (fieldDefs.fields.hasOwnProperty(name)) {
            reqNames.push(name);
          }
        }
      } else if (keyList) {
        reqNames = [].concat(keyList);
      } else {
        throw 'unsupported';
      }

      for (var i = 0; i < reqNames.length; i++) {
        var name = reqNames[i];
        if (fieldDefs && fieldDefs.fields[name].keyValExprPair) {
          //key spec
          var found = false;
          keyTrav: for (var kk in x) {
            if (x.hasOwnProperty(kk)) {
              var rr = _conformNamedOrExpr(kk, fieldDefs.fields[name].keyValExprPair.keySpecAlts, walkFn, walkOpts);
              if (!isProblem(rr)) {
                //found a match
                found = true;
                break keyTrav;
              }
            }
          }
          if (!found) {
            missingKeys.push(name);
          }
        } else if (fieldDefs && fieldDefs.fields[name].valSpecAltsOnly) {
          //key spec
          if (x.hasOwnProperty(name)) {
            var rr = _conformNamedOrExpr(x[name], fieldDefs.fields[name].valSpecAltsOnly, walkFn, walkOpts);
            if (isProblem(rr)) {
              //found a match
              missingKeys.push(name);
            }
          } else {
            missingKeys.push(name);
          }
        } else if (keyList) {
          //plain string key
          if (x[name] === undefined) {
            missingKeys.push(name);
          }
        }
      }
      if (missingKeys.length > 0) {
        return new Problem(x, reqSpecs, [], 'req: keys required: ' + missingKeys.join(', '));
      }
    }

    return x;
  };
}

function _deleteKeys(subject, keys) {
  for (var i = 0; i < keys.length; i++) {
    delete subject[[keys[i]]];
  }
}

function getFieldGuide(x, name, keyValAlts, walkFn, walkOpts) {
  var valSpecAltsOnly = keyValAlts.valSpecAltsOnly,
      keyValExprPair = keyValAlts.keyValExprPair;

  var r;
  if (keyValExprPair) {
    var matchedKeys = [];

    var keySpecAlts = keyValExprPair.keySpecAlts,
        valSpecAlts = keyValExprPair.valSpecAlts;

    r = undefined;
    keysExamine: for (var k in x) {
      var keyResult = _conformNamedOrExpr(k, keySpecAlts, walkFn, walkOpts);
      if (!isProblem(keyResult)) {
        if (x === x[k]) {
          // single string char case, where name = 0 and x = ''
          continue keysExamine;
        }
        var valGuide = _conformNamedOrExpr(x[k], valSpecAlts, walkFn, walkOpts);
        if (isProblem(valGuide)) {
          return { problem: valGuide }; //TODO: improve
        } else {
          matchedKeys.push({ key: k, spec: specFromAlts(valSpecAlts), guide: valGuide });
        }
      }
    }
    return { groupMatch: { name: name, matchedKeys: matchedKeys } };
  } else if (valSpecAltsOnly) {
    var v = x[name];
    if (!isUndefined(v) && x[name] !== x) {
      // single string char case, name = 0
      var g = _conformNamedOrExpr(v, valSpecAltsOnly, walkFn, walkOpts);
      if (isProblem(g)) {
        return { problem: g };
      } else {
        return { singleMatch: { key: name, spec: specFromAlts(valSpecAltsOnly), guide: g } };
      }
    } else {
      return { noop: true };
    }
  } else {
    throw '!!';
  }
}

function _conformNamedOrExpr(x, alts, walkFn, walkOpts) {
  var s = specFromAlts(alts);
  var r = walkFn(s, x, walkOpts);
  return r;
}

module.exports = propsWalker;

/***/ },
/* 62 */
/***/ function(module, exports) {

"use strict";
"use strict";

function specRefWalker(specRef, walkFn) {

  return {
    trailblaze: walkSpecRef,
    reconstruct: walkSpecRef
  };

  function walkSpecRef(x, walkOpts) {
    var s = specRef.get();
    if (s) {
      return walkFn(s, x, walkOpts);
    }
  }
}

module.exports = specRefWalker;

/***/ },
/* 63 */
/***/ function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;(function (root, factory){
  'use strict';

  /*istanbul ignore next:cant test*/
  if (typeof module === 'object' && typeof module.exports === 'object') {
    module.exports = factory();
  } else if (true) {
    // AMD. Register as an anonymous module.
    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory), __WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ? (__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
  } else {
    // Browser globals
    root.objectPath = factory();
  }
})(this, function(){
  'use strict';

  var toStr = Object.prototype.toString;
  function hasOwnProperty(obj, prop) {
    if(obj == null) {
      return false
    }
    //to handle objects with null prototypes (too edge case?)
    return Object.prototype.hasOwnProperty.call(obj, prop)
  }

  function isEmpty(value){
    if (!value) {
      return true;
    }
    if (isArray(value) && value.length === 0) {
        return true;
    } else if (typeof value !== 'string') {
        for (var i in value) {
            if (hasOwnProperty(value, i)) {
                return false;
            }
        }
        return true;
    }
    return false;
  }

  function toString(type){
    return toStr.call(type);
  }

  function isObject(obj){
    return typeof obj === 'object' && toString(obj) === "[object Object]";
  }

  var isArray = Array.isArray || function(obj){
    /*istanbul ignore next:cant test*/
    return toStr.call(obj) === '[object Array]';
  }

  function isBoolean(obj){
    return typeof obj === 'boolean' || toString(obj) === '[object Boolean]';
  }

  function getKey(key){
    var intKey = parseInt(key);
    if (intKey.toString() === key) {
      return intKey;
    }
    return key;
  }

  function factory(options) {
    options = options || {}

    var objectPath = function(obj) {
      return Object.keys(objectPath).reduce(function(proxy, prop) {
        if(prop === 'create') {
          return proxy;
        }

        /*istanbul ignore else*/
        if (typeof objectPath[prop] === 'function') {
          proxy[prop] = objectPath[prop].bind(objectPath, obj);
        }

        return proxy;
      }, {});
    };

    function getShallowProperty(obj, prop) {
      if (options.includeInheritedProps || (typeof prop === 'number' && Array.isArray(obj)) || hasOwnProperty(obj, prop)) {
        return obj[prop];
      }
    }

    function set(obj, path, value, doNotReplace){
      if (typeof path === 'number') {
        path = [path];
      }
      if (!path || path.length === 0) {
        return obj;
      }
      if (typeof path === 'string') {
        return set(obj, path.split('.').map(getKey), value, doNotReplace);
      }
      var currentPath = path[0];
      var currentValue = getShallowProperty(obj, currentPath);
      if (path.length === 1) {
        if (currentValue === void 0 || !doNotReplace) {
          obj[currentPath] = value;
        }
        return currentValue;
      }

      if (currentValue === void 0) {
        //check if we assume an array
        if(typeof path[1] === 'number') {
          obj[currentPath] = [];
        } else {
          obj[currentPath] = {};
        }
      }

      return set(obj[currentPath], path.slice(1), value, doNotReplace);
    }

    objectPath.has = function (obj, path) {
      if (typeof path === 'number') {
        path = [path];
      } else if (typeof path === 'string') {
        path = path.split('.');
      }

      if (!path || path.length === 0) {
        return !!obj;
      }

      for (var i = 0; i < path.length; i++) {
        var j = getKey(path[i]);

        if((typeof j === 'number' && isArray(obj) && j < obj.length) ||
          (options.includeInheritedProps ? (j in Object(obj)) : hasOwnProperty(obj, j))) {
          obj = obj[j];
        } else {
          return false;
        }
      }

      return true;
    };

    objectPath.ensureExists = function (obj, path, value){
      return set(obj, path, value, true);
    };

    objectPath.set = function (obj, path, value, doNotReplace){
      return set(obj, path, value, doNotReplace);
    };

    objectPath.insert = function (obj, path, value, at){
      var arr = objectPath.get(obj, path);
      at = ~~at;
      if (!isArray(arr)) {
        arr = [];
        objectPath.set(obj, path, arr);
      }
      arr.splice(at, 0, value);
    };

    objectPath.empty = function(obj, path) {
      if (isEmpty(path)) {
        return void 0;
      }
      if (obj == null) {
        return void 0;
      }

      var value, i;
      if (!(value = objectPath.get(obj, path))) {
        return void 0;
      }

      if (typeof value === 'string') {
        return objectPath.set(obj, path, '');
      } else if (isBoolean(value)) {
        return objectPath.set(obj, path, false);
      } else if (typeof value === 'number') {
        return objectPath.set(obj, path, 0);
      } else if (isArray(value)) {
        value.length = 0;
      } else if (isObject(value)) {
        for (i in value) {
          if (hasOwnProperty(value, i)) {
            delete value[i];
          }
        }
      } else {
        return objectPath.set(obj, path, null);
      }
    };

    objectPath.push = function (obj, path /*, values */){
      var arr = objectPath.get(obj, path);
      if (!isArray(arr)) {
        arr = [];
        objectPath.set(obj, path, arr);
      }

      arr.push.apply(arr, Array.prototype.slice.call(arguments, 2));
    };

    objectPath.coalesce = function (obj, paths, defaultValue) {
      var value;

      for (var i = 0, len = paths.length; i < len; i++) {
        if ((value = objectPath.get(obj, paths[i])) !== void 0) {
          return value;
        }
      }

      return defaultValue;
    };

    objectPath.get = function (obj, path, defaultValue){
      if (typeof path === 'number') {
        path = [path];
      }
      if (!path || path.length === 0) {
        return obj;
      }
      if (obj == null) {
        return defaultValue;
      }
      if (typeof path === 'string') {
        return objectPath.get(obj, path.split('.'), defaultValue);
      }

      var currentPath = getKey(path[0]);
      var nextObj = getShallowProperty(obj, currentPath)
      if (nextObj === void 0) {
        return defaultValue;
      }

      if (path.length === 1) {
        return nextObj;
      }

      return objectPath.get(obj[currentPath], path.slice(1), defaultValue);
    };

    objectPath.del = function del(obj, path) {
      if (typeof path === 'number') {
        path = [path];
      }

      if (obj == null) {
        return obj;
      }

      if (isEmpty(path)) {
        return obj;
      }
      if(typeof path === 'string') {
        return objectPath.del(obj, path.split('.'));
      }

      var currentPath = getKey(path[0]);
      var currentVal = getShallowProperty(obj, currentPath);
      if(currentVal == null) {
        return currentVal;
      }

      if(path.length === 1) {
        if (isArray(obj)) {
          obj.splice(currentPath, 1);
        } else {
          delete obj[currentPath];
        }
      } else {
        if (obj[currentPath] !== void 0) {
          return objectPath.del(obj[currentPath], path.slice(1));
        }
      }

      return obj;
    }

    return objectPath;
  }

  var mod = factory();
  mod.create = factory;
  mod.withInheritedProps = factory({includeInheritedProps: true})
  return mod;
});


/***/ },
/* 64 */
/***/ function(module, exports) {

var g;

// This works in non-strict mode
g = (function() { return this; })();

try {
	// This works if eval is allowed (see CSP)
	g = g || Function("return this")() || (1,eval)("this");
} catch(e) {
	// This works if the window reference is available
	if(typeof window === "object")
		g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }
/******/ ])
});
;