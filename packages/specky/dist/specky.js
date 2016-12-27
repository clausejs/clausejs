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

/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };

/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
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
/******/ 	return __webpack_require__(__webpack_require__.s = 46);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

"use strict";


function Spec(_ref) {
  var type = _ref.type,
      exprs = _ref.exprs,
      opts = _ref.opts,
      fragments = _ref.fragments,
      conformFn = _ref.conformFn,
      generateFn = _ref.generateFn;


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

  if (!exprs) {
    throw new Error('Expressions are required when constructing a spec.');
  }

  this.exprs = exprs;
}

module.exports = Spec;

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

"use strict";


var Problem = __webpack_require__(3);

function isProblem(x) {
  return x instanceof Problem;
}

module.exports = isProblem;

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

"use strict";


var Spec = __webpack_require__(0);

function isSpec(x) {
  return x instanceof Spec;
}

module.exports = isSpec;

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

"use strict";


var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var PAREN_PAIRS = '❰❮❬❨❪﹙₍₎﹚❫❩❭❯❱';

function Problem(val, failsPredicate, subproblems, msg) {
  var _this = this;

  this.isProblem = true;

  if (arguments.length !== 4) {
    throw 'Problem arg len err';
  }

  this.val = val;
  this.valStringified = JSON.stringify(val, function (key, val) {
    if (typeof val === 'function') {
      // implicitly `toString` it
      return val.name + '()';
    }
    return val;
  });
  this.name = 'Problem';
  this.failsPredicate = failsPredicate;
  // this.stack = (new Error()).stack;
  this.rawMsg = msg;
  this.subproblems = subproblems;

  this.message = _constructMessage(this, 0);
  this.toString = function () {
    return _this.message;
  };
}

function _constructMessage(_ref, lvl) {
  var subproblems = _ref.subproblems,
      val = _ref.val,
      valStringified = _ref.valStringified,
      rawMsg = _ref.rawMsg;

  if (Array.isArray(subproblems)) {
    var reasons;
    if (subproblems.length === 0) {
      return rawMsg + '; val: ' + valStringified;
    } else {
      reasons = subproblems.map(function (r) {
        return '' + _open(lvl) + _constructMessage(r, lvl + 1) + _close(lvl);
      });
      return rawMsg + ', because ' + reasons.join(', ');
    }
  } else if ((typeof subproblems === 'undefined' ? 'undefined' : _typeof(subproblems)) === 'object') {
    reasons = [];
    for (var name in subproblems) {
      reasons.push('' + _open(lvl) + name + ': ' + _constructMessage(subproblems[name], lvl + 1) + _close(lvl));
    }
    return rawMsg + ', because ' + reasons.join(', ');
  }
}

function _open(lvl) {
  return PAREN_PAIRS[lvl];
}

function _close(lvl) {
  return PAREN_PAIRS[PAREN_PAIRS.length - lvl - 1];
}

// Problem.prototype = new Error;

module.exports = Problem;

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

"use strict";

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


function isString(x) {
  return x !== null && x !== undefined && x.constructor === String;
}

module.exports = isString;

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

"use strict";


var isFn = __webpack_require__(28);

function isPred(x) {
  return isFn(x);
}

module.exports = isPred;

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

"use strict";


var isPred = __webpack_require__(6);
var isSpec = __webpack_require__(2);
var isSpecRef = __webpack_require__(14);
var isDelayedSpec = __webpack_require__(36);
var Spec = __webpack_require__(0);
var Problem = __webpack_require__(3);
var fnName = __webpack_require__(8);

var SPEC_TYPE_PRED = 'PRED';

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
  return new Spec({
    type: SPEC_TYPE_PRED,
    exprs: [pred],
    fragments: [pred],
    opts: {
      predicate: pred
    },
    conformFn: predConformer(pred)
  });
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
/* 8 */
/***/ function(module, exports, __webpack_require__) {

"use strict";


//extrapolates the name of a function
function functionName(fun) {
  // ES6 fn name
  if (fun && fun.name) {
    return fun.name;
  }
  var ret = fun.toString();
  ret = ret.substr('function '.length);
  ret = ret.substr(0, ret.indexOf('('));
  return ret;
}

module.exports = functionName;

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

"use strict";


var oAssign = __webpack_require__(4);

var Spec = __webpack_require__(0);
var isSpec = __webpack_require__(2);
var isPred = __webpack_require__(6);
var specFromAlts = __webpack_require__(11);
var isObj = __webpack_require__(32);
var isStr = __webpack_require__(5);
var isSpecName = __webpack_require__(72);
var namedFn = __webpack_require__(37);
var isSpecRef = __webpack_require__(14);
var isDelayedSpec = __webpack_require__(36);
var c = __webpack_require__(52);
var coerceIntoSpec = __webpack_require__(7);
var fspec = __webpack_require__(12);
var walk = __webpack_require__(10);
var specSpec = coerceIntoSpec(isSpec);
var nameSpec = coerceIntoSpec(isSpecName);

var catOp = genMultiArgOp(c.CAT);
var orOp = genMultiArgOp(c.OR);
var zeroOrMoreOp = genSingleArgOp(c.Z_OR_M);
var oneOrMoreOp = genSingleArgOp(c.O_OR_M);
var zeroOrOneOp = genSingleArgOp(c.Z_OR_O);
var collOfOp = genSingleArgOp(c.COLL_OF);

var SpecSpec = coerceIntoSpec(isSpec);
var SpecRefSpec = coerceIntoSpec(isSpecRef);
var DelayedSpecSpec = coerceIntoSpec(isDelayedSpec);
var PredSpec = coerceIntoSpec(isPred);

var ExprSpec = orOp({
  withLabels: [{ name: 'spec', expr: {
      spec: SpecSpec
    } }, { name: 'pred', expr: {
      spec: PredSpec
    } }, { name: 'delayedSpec', expr: {
      spec: DelayedSpecSpec
    } }, { name: 'specRef', expr: {
      spec: SpecRefSpec
    } }]
});

var NameExprOptionalComment = catOp({
  withLabels: [{ name: 'name', expr: {
      spec: nameSpec
    } }, { name: 'comment', expr: {
      spec: zeroOrOneOp({
        expr: {
          pred: isStr
        }
      })
    } }, { name: 'expr', expr: {
      spec: ExprSpec
    } }]
});

var MultipleArgSpec = orOp({
  withLabels: [{
    name: 'withLabels',
    expr: {
      spec: orOp({
        withoutLabels: [{
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
    name: 'withoutLabels',
    expr: {
      spec: zeroOrMoreOp({
        expr: {
          spec: ExprSpec
        }
      })
    }
  }]
});

function andOp(exprs) {
  var andS = new Spec({
    type: 'AND',
    exprs: [],
    fragments: exprs,
    opts: { conformedExprs: exprs }
  });
  andS.conform = function andConform(x) {
    return walk(andS, x, { conform: true });
  };
  return andS;
}

var multipleArgNoDupeSpec = andOp([{ spec: MultipleArgSpec }, { pred: noDupelicateLabels }]);

function noDupelicateLabels(_ref) {
  var withLabels = _ref.withLabels;

  if (withLabels) {
    var byFar = [];
    for (var i = 0; i < withLabels.length; i += 1) {
      var lbl = withLabels[i].name;
      if (byFar.indexOf(lbl) >= 0) {
        throw new Error('Duplicate label detected: ' + lbl);
      }
      byFar.push(lbl);
    }
  }
  return true;
}

var AndFnSpec = fspec({
  args: oneOrMoreOp({ expr: { spec: ExprSpec }
  }),
  ret: isSpec
});

var multipleArgOpSpec = {
  args: multipleArgNoDupeSpec,
  ret: specSpec
};

var singleArgOpSpecFn = function singleArgOpSpecFn(optSpec) {
  return {
    args: catOp({
      withLabels: [{
        name: 'expr',
        expr: {
          spec: ExprSpec
        }
      }, {
        name: 'opts',
        expr: {
          spec: zeroOrOneOp({
            expr: optSpec
          })
        }
      }]
    }),
    ret: specSpec
  };
};

function genMultiArgOp(type) {
  return namedFn(type, function _(conformedArgs) {
    var exprs;
    if (conformedArgs.withLabels) {
      exprs = conformedArgs.withLabels;

      var coercedExprs = exprs.map(function (p) {
        var alts = p.expr;
        var s = specFromAlts(alts);

        return oAssign({}, p, {
          expr: s,
          spec: undefined, pred: undefined,
          specRef: undefined, delayedSpec: undefined });
      });

      var opts = {
        named: true
      };
      var s = new Spec({
        type: type,
        exprs: coercedExprs,
        opts: opts
      });

      s.conform = function conform(x) {
        return walk(s, x, { conform: true });
      };
      return s;
    } else if (conformedArgs.withoutLabels) {
      exprs = conformedArgs.withoutLabels;

      coercedExprs = exprs.map(function (p) {
        var s;
        if (p.spec) {
          s = p.spec;
          return oAssign({}, p, { expr: s, spec: undefined });
        } else if (p.pred) {
          s = coerceIntoSpec(p.pred);
          return oAssign({}, p, { expr: s, pred: undefined });
        } else if (p.specRef) {
          s = p.specRef;
          return oAssign({}, p, { expr: s, specRef: undefined });
        } else if (p.delayedSpec) {
          s = p.delayedSpec;
          return oAssign({}, p, { expr: s, delayedSpec: undefined });
        } else {
          console.error(p);
          throw '!';
        }
      });

      var _opts = {
        named: false
      };

      s = new Spec({
        type: type,
        exprs: coercedExprs,
        opts: _opts
      });

      s.conform = function conform(x) {
        return walk(s, x, { conform: true });
      };
      return s;
    } else {
      // empty case
      s = new Spec({
        type: type,
        exprs: [] });
      s.conform = function conform(x) {
        return walk(s, x, { conform: true });
      };
      return s;
    }
  });
}

function genSingleArgOp(type) {
  return namedFn(type, function _(conformedArgs) {
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
      console.error(p);
      throw 'internal err';
    }
    var sureSpec = coerceIntoSpec(expr);
    var s = new Spec({
      type: type,
      exprs: [sureSpec],
      opts: oAssign({}, opts, { enclosedSpec: sureSpec })
    });

    s.conform = function conform(x) {
      return walk(s, x, { conform: true });
    };
    return s;
  });
}

var CollOfSpec = fspec(singleArgOpSpecFn({ pred: isObj }));
var collOf = CollOfSpec.instrumentConformed(collOfOp);

var CatFnSpec = fspec(multipleArgOpSpec);
var OrFnSpec = fspec(multipleArgOpSpec);
var ZeroOrMoreFnSpec = fspec(singleArgOpSpecFn({ pred: isObj }));
var OneOrMoreFnSpec = fspec(singleArgOpSpecFn({ pred: isObj }));
var ZeroOrOneFnSpec = fspec(singleArgOpSpecFn({ pred: isObj }));
var and = AndFnSpec.instrumentConformed(andOp);

var core = {
  cat: CatFnSpec.instrumentConformed(catOp),
  or: OrFnSpec.instrumentConformed(orOp),
  zeroOrMore: ZeroOrMoreFnSpec.instrumentConformed(zeroOrMoreOp),
  zeroOrOne: ZeroOrOneFnSpec.instrumentConformed(zeroOrOneOp),
  oneOrMore: OneOrMoreFnSpec.instrumentConformed(oneOrMoreOp),
  ExprSpec: ExprSpec, SpecSpec: SpecSpec, PredSpec: PredSpec, DelayedSpecSpec: DelayedSpecSpec, SpecRefSpec: SpecRefSpec,
  CatFnSpec: CatFnSpec,
  AndFnSpec: AndFnSpec,
  OrFnSpec: OrFnSpec,
  ZeroOrMoreFnSpec: ZeroOrMoreFnSpec, OneOrMoreFnSpec: OneOrMoreFnSpec, ZeroOrOneFnSpec: ZeroOrOneFnSpec,
  CollOfSpec: CollOfSpec,
  collOf: collOf,
  and: and
};

core['alt'] = core.or;
core['*'] = core.zeroOrMore;
core['+'] = core.oneOrMore;
core['?'] = core.zeroOrOne;

module.exports = core;

// // //
//
// var isStr = require( '../preds/isStr' );
// var isObj = require( '../preds/isObj' );
// var isNum = require( '../preds/isNum' );
// var isBool = require( '../preds/isBool' );

// var NestedSpec = catOp( {
//   withoutLabels: [
//     { spec: catOp( {
//       withoutLabels: [
//         { pred: isNum },
//         { pred: isBool }
//       ]
//     } ) },
//     { spec: catOp( {
//       withoutLabels: [
//         { spec: zeroOrMoreOp( {
//           expr: {
//             pred: isNum
//           },
//         } ) },
//         { spec: catOp( {
//           withoutLabels: [
//             { pred: isBool }
//           ]
//         } ) },
//         { spec: oneOrMoreOp( {
//           expr: {
//             pred: isNum
//           },
//         } ) },
//         { spec: zeroOrOneOp( {
//           expr: {
//             pred: isObj
//           },
//         } ) },
//       ]
//     } ) }
//   ]
// } );


// var NestedSpec = catOp( {
//   withoutLabels: [
//     { spec: catOp( {
//       withoutLabels: [
//         { pred: isNum },
//         { pred: isBool }
//       ]
//     } ) },
//     { spec: orOp( {
//       withoutLabels: [
//         { spec: zeroOrMoreOp( {
//           expr: {
//             pred: isNum
//           },
//         } ) },
//         { spec: catOp( {
//           withoutLabels: [
//             { pred: isBool }
//           ]
//         } ) },
//         { spec: oneOrMoreOp( {
//           expr: {
//             pred: isStr
//           },
//         } ) },
//         { spec: zeroOrOneOp( {
//           expr: {
//             pred: isObj
//           },
//         } ) },
//       ]
//     } ) }
//   ]
// } );

// var NestedSpec = catOp( {
//   withLabels: [
//     { name: 'first',
//       expr: { spec: catOp( {
//         withoutLabels: [
//         { pred: isNum },
//         { pred: isBool }
//         ]
//       } ) }
//     },
//     { name: 'second',
//       expr: { spec: orOp( {
//         withLabels: [
//           { name: 'second1', expr: { pred: isStr } },
//           { name: 'second2', expr: { pred: isBool } }
//         ]
//       } ) }
//     },
//   ]
// } );

// var NestedSpec = catOp( {
//   withLabels: [
//     { name: 'first',
//       expr: { spec: catOp( {
//         withoutLabels: [
//         { pred: isNum },
//         { pred: isBool }
//         ]
//       } ) }
//     },
//     { name: 'second',
//       expr: { spec: catOp( {
//         withoutLabels: [
//         { pred: isStr },
//         { pred: isBool }
//         ]
//       } ) }
//     },
//     // {
//     //   name: 'sepody',
//     //   expr: { spec: orOp( {
//     //     withoutLabels: [
//     //       { spec: zeroOrMoreOp( {
//     //         expr: {
//     //           pred: isNum
//     //         },
//     //       } ) },
//     //       { spec: catOp( {
//     //         withoutLabels: [
//     //           { pred: isBool }
//     //         ]
//     //       } ) },
//     //       { spec: oneOrMoreOp( {
//     //         expr: {
//     //           pred: isStr
//     //         },
//     //       } ) },
//     //       { spec: zeroOrOneOp( {
//     //         expr: {
//     //           pred: isObj
//     //         },
//     //       } ) },
//     //     ]
//     //   } ) }
//     // }
//   ]
// } );

// var data = [ 22, true,
//   'ss',
//   // { sss: 1 }
// ];
// var r = NestedSpec.conform( data );

// console.log( r );

// var CCSpec = catOp( {
//   withoutLabels: [
//     { pred: isStr },
//     { spec: zeroOrOneOp( {
//       expr: {
//         pred: isStr
//       }
//     } ) }
//   ]
// } );
// var TestSpec1 = orOp( {
//   withoutLabels: [
//     {
//       spec: CCSpec,
//     },
//     {
//       pred: isStr,
//     }
//   ],
// } );
// var TestSpec2 = orOp( {
//   withoutLabels: [
//     {
//       spec: isNum,
//     },
//     {
//       pred: isBool,
//     },
//     {
//       pred: isStr,
//     },
//   ],
// } );
// var TS3 = orOp( {
//   withLabels: [
//     {
//       name: 'hello',
//       expr: {
//         pred: isStr
//       }
//     },
//     {
//       name: 'zeeExpr',
//       expr: {
//         pred: isPred
//       }
//     }
//   ]
// } );

// console.log( TestSpec2 )

// var r = TS3.conform( 'hellolllllllllllllllllll' );
// console.log( r )
// var TestSpec = orOp( {
//   withLabels: [""
//     {
//       name: 'withLabels',
//       expr: {
//         spec: orOp( {
//           withoutLabels: [
//             {
//               spec: zeroOrMoreOp( {
//                 expr: {
//                   spec: NameExprOptionalComment,
//                 },
//               } )
//             },
//             {
//               spec: collOfOp( {
//                 expr: {
//                   spec: NameExprOptionalComment,
//                 },
//               } )
//             },
//           ]
//         } ),
//       },
//     },
//     {
//       name: 'withoutLabels',
//       expr: {
//         spec: zeroOrMoreOp( {
//           expr: {
//             spec: ExprSpec,
//           },
//         } ),
//       },
//     },
//   ],
// } );

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

"use strict";


var oAssign = __webpack_require__(4);
var nfaWalker = __webpack_require__(80);
var anyWalker = __webpack_require__(75);
var predWalker = __webpack_require__(81);
var wallWalker = __webpack_require__(84);
var fspecWalker = __webpack_require__(78);
var shapeWalker = __webpack_require__(82);
var andWalker = __webpack_require__(74);
var collOfWalker = __webpack_require__(76);
var mapOfWalker = __webpack_require__(79);
var specRefWalker = __webpack_require__(83);
var delayedSpecWalker = __webpack_require__(77);
var coerceIntoSpec = __webpack_require__(7);
var isProblem = __webpack_require__(1);

function walk(spec, x, opts) {
  var phase = opts.phase;

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

var walkerMap = {
  'OR': nfaWalker,
  'CAT': nfaWalker,
  'COLL_OF': collOfWalker,
  'ANY': anyWalker,
  'Z_OR_M': nfaWalker,
  'O_OR_M': nfaWalker,
  'Z_OR_O': nfaWalker,
  'PRED': predWalker,
  'WALL': wallWalker,
  'SHAPE': shapeWalker,
  'AND': andWalker,
  'SPEC_REF': specRefWalker,
  'DELAYED': delayedSpecWalker,
  'FSPEC': fspecWalker,
  'MAP_OF': mapOfWalker
};

function _getWalker(expr) {

  var spec = coerceIntoSpec(expr);
  var walker = walkerMap[spec.type];

  if (!walker) {
    throw 'unsupported type ' + spec.type;
  }

  var r = walker(spec, walk);
  return r;
}

module.exports = walk;

/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

"use strict";


var coerceIntoSpec = __webpack_require__(7);

module.exports = function specFromAlts(alts) {
  if (!alts) {
    console.error(alts);
    throw '!';
  }
  if (alts.spec) {
    return alts.spec;
  } else if (alts.pred) {
    return coerceIntoSpec(alts.pred);
  } else if (alts.specRef) {
    return alts.specRef;
  } else if (alts.delayedSpec) {
    return alts.delayedSpec;
  } else {
    console.error('unsupported:', alts);
    throw 'Not implemented';
  }
};

/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

"use strict";


var Spec = __webpack_require__(0);
var walk = __webpack_require__(10);
var fnName = __webpack_require__(8);

function fspec(fnSpec) {
  var args = fnSpec.args,
      ret = fnSpec.ret,
      fn = fnSpec.fn;

  var spec = new Spec({
    type: 'FSPEC',
    exprs: [],
    opts: fnSpec
  });
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
/* 13 */
/***/ function(module, exports, __webpack_require__) {

"use strict";


module.exports = function isUndefined(x) {
  return x === undefined;
};

/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

"use strict";


var SpecRef = __webpack_require__(27);
// TODO
function isSpecRef(x) {
  return x instanceof SpecRef;
}
module.exports = isSpecRef;

/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

"use strict";


var oAssign = __webpack_require__(4);
var regex = __webpack_require__(9);

var _require = __webpack_require__(21),
    shape = _require.shape,
    keys = _require.keys,
    mapOf = _require.mapOf;

var nullable = __webpack_require__(57);
var undefinable = __webpack_require__(58);

var _require2 = __webpack_require__(47),
    wall = _require2.wall;

var other = {
  any: __webpack_require__(51),
  fspec: __webpack_require__(12),
  wall: wall, spec: wall,
  nullable: nullable, undefinable: undefinable
};

var r = oAssign({}, regex, { shape: shape, keys: keys, mapOf: mapOf }, other);
module.exports = r;

/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

"use strict";


module.exports = {
  conform: __webpack_require__(17),
  isValid: __webpack_require__(73),
  isNamespacePath: __webpack_require__(71),
  identity: __webpack_require__(35),
  isProblem: __webpack_require__(1),
  delayed: __webpack_require__(67),
  enforce: __webpack_require__(68),
  isExpr: __webpack_require__(69),
  isSpec: __webpack_require__(2),
  isFspec: __webpack_require__(70),
  isSpecRef: __webpack_require__(14),
  describe: __webpack_require__(48),
  deref: __webpack_require__(22)
};

/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

"use strict";


var isSpec = __webpack_require__(2);

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
/***/ function(module, exports, __webpack_require__) {

"use strict";


var keys = __webpack_require__(96);
var foreach = __webpack_require__(90);
var hasSymbols = typeof Symbol === 'function' && typeof Symbol() === 'symbol';

var toStr = Object.prototype.toString;

var isFunction = function (fn) {
	return typeof fn === 'function' && toStr.call(fn) === '[object Function]';
};

var arePropertyDescriptorsSupported = function () {
	var obj = {};
	try {
		Object.defineProperty(obj, 'x', { enumerable: false, value: obj });
        /* eslint-disable no-unused-vars, no-restricted-syntax */
        for (var _ in obj) { return false; }
        /* eslint-enable no-unused-vars, no-restricted-syntax */
		return obj.x === obj;
	} catch (e) { /* this is IE 8. */
		return false;
	}
};
var supportsDescriptors = Object.defineProperty && arePropertyDescriptorsSupported();

var defineProperty = function (object, name, value, predicate) {
	if (name in object && (!isFunction(predicate) || !predicate())) {
		return;
	}
	if (supportsDescriptors) {
		Object.defineProperty(object, name, {
			configurable: true,
			enumerable: false,
			value: value,
			writable: true
		});
	} else {
		object[name] = value;
	}
};

var defineProperties = function (object, map) {
	var predicates = arguments.length > 2 ? arguments[2] : {};
	var props = keys(map);
	if (hasSymbols) {
		props = props.concat(Object.getOwnPropertySymbols(map));
	}
	foreach(props, function (name) {
		defineProperty(object, name, map[name], predicates[name]);
	});
};

defineProperties.supportsDescriptors = !!supportsDescriptors;

module.exports = defineProperties;


/***/ },
/* 19 */
/***/ function(module, exports, __webpack_require__) {

"use strict";


var fnToStr = Function.prototype.toString;

var constructorRegex = /^\s*class /;
var isES6ClassFn = function isES6ClassFn(value) {
	try {
		var fnStr = fnToStr.call(value);
		var singleStripped = fnStr.replace(/\/\/.*\n/g, '');
		var multiStripped = singleStripped.replace(/\/\*[.\s\S]*\*\//g, '');
		var spaceStripped = multiStripped.replace(/\n/mg, ' ').replace(/ {2}/g, ' ');
		return constructorRegex.test(spaceStripped);
	} catch (e) {
		return false; // not a function
	}
};

var tryFunctionObject = function tryFunctionObject(value) {
	try {
		if (isES6ClassFn(value)) { return false; }
		fnToStr.call(value);
		return true;
	} catch (e) {
		return false;
	}
};
var toStr = Object.prototype.toString;
var fnClass = '[object Function]';
var genClass = '[object GeneratorFunction]';
var hasToStringTag = typeof Symbol === 'function' && typeof Symbol.toStringTag === 'symbol';

module.exports = function isCallable(value) {
	if (!value) { return false; }
	if (typeof value !== 'function' && typeof value !== 'object') { return false; }
	if (hasToStringTag) { return tryFunctionObject(value); }
	if (isES6ClassFn(value)) { return false; }
	var strClass = toStr.call(value);
	return strClass === fnClass || strClass === genClass;
};


/***/ },
/* 20 */
/***/ function(module, exports, __webpack_require__) {

"use strict";


var isNum = __webpack_require__(31);
var isNatInt = __webpack_require__(63);
var isInt = __webpack_require__(29);
var isBool = __webpack_require__(61);
var isFn = __webpack_require__(28);
var isObj = __webpack_require__(32);
var equals = __webpack_require__(59);
var oneOf = __webpack_require__(33);
var isStr = __webpack_require__(5);
var isDate = __webpack_require__(62);
var instanceOf = __webpack_require__(60);
var isUuid = __webpack_require__(64);
var isArray = Array.isArray;

var e = {
  isNull: __webpack_require__(30),
  isUndefined: __webpack_require__(13),
  notEmpty: __webpack_require__(65),
  isBool: isBool, isBoolean: isBool,
  isFn: isFn, isFunction: isFn,
  isNum: isNum, isNumber: isNum,
  isNatInt: isNatInt, isNaturalNumber: isNatInt,
  isInt: isInt, isInteger: isInt,
  isObj: isObj, isObject: isObj,
  isStr: isStr, isString: isStr,
  isArray: isArray, isArr: isArray,
  equal: equals, equals: equals, equalsTo: equals, eq: equals,
  oneOf: oneOf,
  isDate: isDate,
  instanceOf: instanceOf,
  isUuid: isUuid, isUUID: isUuid
};

e.default = e;
module.exports = e;

/***/ },
/* 21 */
/***/ function(module, exports, __webpack_require__) {

"use strict";


var Spec = __webpack_require__(0);
var isSpec = __webpack_require__(2);
var isStr = __webpack_require__(5);
var oneOf = __webpack_require__(33);
var isProblem = __webpack_require__(1);
var coerceIntoSpec = __webpack_require__(7);

var _require = __webpack_require__(9),
    cat = _require.cat,
    or = _require.or,
    zeroOrMore = _require.zeroOrMore,
    ExprSpec = _require.ExprSpec;

var walk = __webpack_require__(10);
var fspec = __webpack_require__(12);

function isPropName(x) {
  return isStr(x);
}

var TYPE_SHAPE = 'SHAPE';
var TYPE_MAP_OF = 'MAP_OF';

var FieldDefs = shapeOp({
  shapeArgs: {
    optionalFields: {
      opt: {
        fieldDefs: {
          fields: {
            'fields': {
              keyValExprPair: {
                keyExpression: {
                  spec: coerceIntoSpec(isStr)
                },
                valExpression: {
                  spec: or('valExpressionOnly', ExprSpec, 'keyValExprPair', cat('keyExpression', ExprSpec, 'valExpression', ExprSpec))
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

var ShapeArgs = shapeOp({
  shapeArgs: {
    optionalFields: {
      opt: {
        fieldDefs: {
          fields: {
            'requiredFields': {
              keyValExprPair: {
                keyExpression: {
                  pred: oneOf('req', 'required')
                },
                valExpression: {
                  spec: KeyArrayOrFieldDefs
                }
              }
            },
            'optionalFields': {
              keyValExprPair: {
                keyExpression: {
                  pred: oneOf('opt', 'optional')
                },
                valExpression: {
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

var MapOfFnSpec = fspec({
  args: cat('keyExpression', ExprSpec, 'valExpression', ExprSpec),
  ret: isSpec
});

var ShapeFnSpec = fspec({
  args: cat('shapeArgs', ShapeArgs),
  ret: isSpec
});

function mapOfOp(cargs) {
  if (isProblem(cargs)) {
    throw cargs;
  }
  var keyExpression = cargs.keyExpression,
      valExpression = cargs.valExpression;


  var s = new Spec({
    type: TYPE_MAP_OF,
    exprs: [],
    opts: { keyExpression: keyExpression, valExpression: valExpression }
  });

  s.conform = function mapOfConform(x) {
    return walk(s, x, { conform: true });
  };

  return s;
}

function shapeOp(cargs) {
  if (isProblem(cargs)) {
    throw cargs;
  }
  // const { shapeArgs: { requiredFields, optionalFields } } = cargs;

  var s = new Spec({
    type: TYPE_SHAPE,
    exprs: [],
    // TODO: do fragments
    fragments: [],
    opts: { conformedArgs: cargs }
  });
  s.conform = function shapeConform(x) {
    return walk(s, x, { conform: true });
  };
  return s;
}

var shape = ShapeFnSpec.instrumentConformed(shapeOp);
var mapOf = MapOfFnSpec.instrumentConformed(mapOfOp);

module.exports = {
  shape: shape,
  keys: shape,
  mapOf: mapOf,
  ShapeFnSpec: ShapeFnSpec,
  MapOfFnSpec: MapOfFnSpec
};

// // // // //

// var TestSpec = shapeOp({
//   shapeArgs: {
//     req: {
//       fieldDefs: {
//         fields: {
//           'a': { valExpressionOnly: { pred: isStr } }
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
/***/ function(module, exports, __webpack_require__) {

"use strict";


module.exports = function deref(spec) {
  var result = spec;
  while (result.get) {
    result = result.get();
  }

  return result;
};

/***/ },
/* 23 */
/***/ function(module, exports, __webpack_require__) {

"use strict";

var ES = __webpack_require__(38);
var supportsDescriptors = __webpack_require__(18).supportsDescriptors;

/*! https://mths.be/array-from v0.2.0 by @mathias */
module.exports = function from(arrayLike) {
	var defineProperty = supportsDescriptors ? Object.defineProperty : function put(object, key, descriptor) {
		object[key] = descriptor.value;
	};
	var C = this;
	if (arrayLike === null || typeof arrayLike === 'undefined') {
		throw new TypeError('`Array.from` requires an array-like object, not `null` or `undefined`');
	}
	var items = ES.ToObject(arrayLike);

	var mapFn, T;
	if (typeof arguments[1] !== 'undefined') {
		mapFn = arguments[1];
		if (!ES.IsCallable(mapFn)) {
			throw new TypeError('When provided, the second argument to `Array.from` must be a function');
		}
		if (arguments.length > 2) {
			T = arguments[2];
		}
	}

	var len = ES.ToLength(items.length);
	var A = ES.IsCallable(C) ? ES.ToObject(new C(len)) : new Array(len);
	var k = 0;
	var kValue, mappedValue;
	while (k < len) {
		kValue = items[k];
		if (mapFn) {
			mappedValue = typeof T === 'undefined' ? mapFn(kValue, k) : ES.Call(mapFn, T, [kValue, k]);
		} else {
			mappedValue = kValue;
		}
		defineProperty(A, k, {
			'configurable': true,
			'enumerable': true,
			'value': mappedValue,
			'writable': true
		});
		k += 1;
	}
	A.length = len;
	return A;
};


/***/ },
/* 24 */
/***/ function(module, exports, __webpack_require__) {

"use strict";


var define = __webpack_require__(18);

var implementation = __webpack_require__(23);
var getPolyfill = __webpack_require__(25);
var shim = __webpack_require__(50);

// eslint-disable-next-line no-unused-vars
var boundFromShim = function from(array) {
    // eslint-disable-next-line no-invalid-this
	return implementation.apply(this || Array, arguments);
};

define(boundFromShim, {
	'getPolyfill': getPolyfill,
	'implementation': implementation,
	'shim': shim
});

module.exports = boundFromShim;


/***/ },
/* 25 */
/***/ function(module, exports, __webpack_require__) {

"use strict";


var ES = __webpack_require__(38);
var implementation = __webpack_require__(23);

var tryCall = function (fn) {
	try {
		fn();
		return true;
	} catch (e) {
		return false;
	}
};

module.exports = function getPolyfill() {
	var implemented = ES.IsCallable(Array.from)
		&& tryCall(function () { Array.from({ 'length': -Infinity }); })
		&& !tryCall(function () { Array.from([], undefined); });

	return implemented ? Array.from : implementation;
};


/***/ },
/* 26 */
/***/ function(module, exports, __webpack_require__) {

"use strict";


var Spec = __webpack_require__(0);

function DelayedSpec(_ref) {
  var getFn = _ref.getFn;

  this.type = 'DELAYED';
  this.get = getFn;
  var _this = this;

  _this.instrument = function instrumentDelayed(x) {
    var Spec = getFn();
    return Spec.instrument(x);
  };

  _this.instrumentConformed = function instrumentConformedDelayed(x) {
    var Spec = getFn();
    return Spec.instrumentConformed(x);
  };

  _this.conform = function conformDelayed(x) {
    var Spec = getFn();
    return Spec.conform(x);
  };
}

DelayedSpec.prototype = Object.create(Spec.prototype);

module.exports = DelayedSpec;

/***/ },
/* 27 */
/***/ function(module, exports, __webpack_require__) {

"use strict";


var Spec = __webpack_require__(0);

function SpecRef(_ref) {
  var ref = _ref.ref,
      getFn = _ref.getFn,
      conformFn = _ref.conformFn;

  this.type = 'SPEC_REF';
  this.get = getFn;
  this.conform = conformFn;
  this.ref = ref;
}

SpecRef.prototype = Object.create(Spec.prototype);

module.exports = SpecRef;

/***/ },
/* 28 */
/***/ function(module, exports, __webpack_require__) {

"use strict";


function isFunction(x) {
  var getType = {};
  // (x || false) guarantees returning of boolean type
  return (x || false) && getType.toString.call(x) === '[object Function]';
}

module.exports = isFunction;

/***/ },
/* 29 */
/***/ function(module, exports, __webpack_require__) {

"use strict";


function isInt(x) {
  if (typeof x !== 'number') {
    return false;
  } else {
    return Math.floor(x) === x && x !== Infinity;
  }
}

module.exports = isInt;

/***/ },
/* 30 */
/***/ function(module, exports, __webpack_require__) {

"use strict";


function isNull(x) {
  return x === null;
}

module.exports = isNull;

/***/ },
/* 31 */
/***/ function(module, exports, __webpack_require__) {

"use strict";


function isNum(x) {
  return typeof x === 'number';
}

module.exports = isNum;

/***/ },
/* 32 */
/***/ function(module, exports, __webpack_require__) {

"use strict";


var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

function isObject(x) {
  return (typeof x === 'undefined' ? 'undefined' : _typeof(x)) === 'object' && x !== null;
}

module.exports = isObject;

/***/ },
/* 33 */
/***/ function(module, exports, __webpack_require__) {

"use strict";


var arrayFrom = __webpack_require__(24);

module.exports = function oneOf() {
  var items;

  if (arguments.length === 1 && Array.isArray(arguments[0])) {
    items = arguments[0];
  } else if (arguments.length > 0) {
    items = arrayFrom(arguments);
  } else {
    throw new Error('Items list is required.');
  }
  return function oneOfItems(x) {
    return items.indexOf(x) >= 0;
  };
};

/***/ },
/* 34 */
/***/ function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.NamespaceObjSpec = exports.MetaFnSpec = exports.isNamespacePath = exports.NamespaceFnSpec = exports.isSpecRef = undefined;

var _core = __webpack_require__(15);

var _utils = __webpack_require__(16);

var _preds = __webpack_require__(20);

var ExprOrPartialRefMapSpec =
// or(
//  'expression',
(0, _utils.delayed)(function () {
  //TODO
  return _core.ExprSpec;
});
// );

var NamespaceFnSpec = (0, _core.fspec)({
  args: (0, _core.or)('register', (0, _core.cat)('nsPath', _utils.isNamespacePath, 'expression', ExprOrPartialRefMapSpec), 'retrieve', (0, _core.cat)('nsPath', _utils.isNamespacePath)),
  ret: _core.ExprSpec
});

var MetaFnSpec = (0, _core.fspec)({
  args: (0, _core.cat)('source', (0, _core.or)('namespacePath', _utils.isNamespacePath, 'expression', _utils.isExpr), 'metaObj', _preds.isObj),
  ret: _utils.isExpr
});

function isNamespaceFragment(x) {
  return !!/^[^.@%\&\*#]+/.test(x);
}

var NamespaceObjSpec = (0, _core.shape)({
  optional: {
    subNamespaces: [isNamespaceFragment, (0, _utils.delayed)(function () {
      return NamespaceObjSpec;
    })],
    '.meta': _preds.isObj,
    '.expr': _utils.isExpr
  }
});

exports.isSpecRef = _utils.isSpecRef;
exports.NamespaceFnSpec = NamespaceFnSpec;
exports.isNamespacePath = _utils.isNamespacePath;
exports.MetaFnSpec = MetaFnSpec;
exports.NamespaceObjSpec = NamespaceObjSpec;

/***/ },
/* 35 */
/***/ function(module, exports, __webpack_require__) {

"use strict";


function identity(x) {
  return x;
}

module.exports = identity;

/***/ },
/* 36 */
/***/ function(module, exports, __webpack_require__) {

"use strict";


var DelayedSpec = __webpack_require__(26);

//TODO
module.exports = function isDelayedSpec(x) {
  return x instanceof DelayedSpec;
};

/***/ },
/* 37 */
/***/ function(module, exports, __webpack_require__) {

"use strict";


function getNamedFn(fnName, fn, suffix) {
  if (fnName) {
    return new Function('action', 'return function ' + fnName + (suffix || '') + '(){ return action.apply(this, arguments); };')(fn);
  } else {
    return fn;
  }
}

module.exports = getNamedFn;

/***/ },
/* 38 */
/***/ function(module, exports, __webpack_require__) {

"use strict";


var toStr = Object.prototype.toString;
var hasSymbols = typeof Symbol === 'function' && typeof Symbol.iterator === 'symbol';
var symbolToStr = hasSymbols ? Symbol.prototype.toString : toStr;

var $isNaN = __webpack_require__(40);
var $isFinite = __webpack_require__(39);
var MAX_SAFE_INTEGER = Number.MAX_SAFE_INTEGER || Math.pow(2, 53) - 1;

var assign = __webpack_require__(86);
var sign = __webpack_require__(42);
var mod = __webpack_require__(41);
var isPrimitive = __webpack_require__(87);
var toPrimitive = __webpack_require__(89);
var parseInteger = parseInt;
var bind = __webpack_require__(92);
var strSlice = bind.call(Function.call, String.prototype.slice);
var isBinary = bind.call(Function.call, RegExp.prototype.test, /^0b[01]+$/i);
var isOctal = bind.call(Function.call, RegExp.prototype.test, /^0o[0-7]+$/i);
var nonWS = ['\u0085', '\u200b', '\ufffe'].join('');
var nonWSregex = new RegExp('[' + nonWS + ']', 'g');
var hasNonWS = bind.call(Function.call, RegExp.prototype.test, nonWSregex);
var invalidHexLiteral = /^[\-\+]0x[0-9a-f]+$/i;
var isInvalidHexLiteral = bind.call(Function.call, RegExp.prototype.test, invalidHexLiteral);

// whitespace from: http://es5.github.io/#x15.5.4.20
// implementation from https://github.com/es-shims/es5-shim/blob/v3.4.0/es5-shim.js#L1304-L1324
var ws = [
	'\x09\x0A\x0B\x0C\x0D\x20\xA0\u1680\u180E\u2000\u2001\u2002\u2003',
	'\u2004\u2005\u2006\u2007\u2008\u2009\u200A\u202F\u205F\u3000\u2028',
	'\u2029\uFEFF'
].join('');
var trimRegex = new RegExp('(^[' + ws + ']+)|([' + ws + ']+$)', 'g');
var replace = bind.call(Function.call, String.prototype.replace);
var trim = function (value) {
	return replace(value, trimRegex, '');
};

var ES5 = __webpack_require__(85);

var hasRegExpMatcher = __webpack_require__(94);

// https://people.mozilla.org/~jorendorff/es6-draft.html#sec-abstract-operations
var ES6 = assign(assign({}, ES5), {

	// https://people.mozilla.org/~jorendorff/es6-draft.html#sec-call-f-v-args
	Call: function Call(F, V) {
		var args = arguments.length > 2 ? arguments[2] : [];
		if (!this.IsCallable(F)) {
			throw new TypeError(F + ' is not a function');
		}
		return F.apply(V, args);
	},

	// https://people.mozilla.org/~jorendorff/es6-draft.html#sec-toprimitive
	ToPrimitive: toPrimitive,

	// https://people.mozilla.org/~jorendorff/es6-draft.html#sec-toboolean
	// ToBoolean: ES5.ToBoolean,

	// http://www.ecma-international.org/ecma-262/6.0/#sec-tonumber
	ToNumber: function ToNumber(argument) {
		var value = isPrimitive(argument) ? argument : toPrimitive(argument, 'number');
		if (typeof value === 'symbol') {
			throw new TypeError('Cannot convert a Symbol value to a number');
		}
		if (typeof value === 'string') {
			if (isBinary(value)) {
				return this.ToNumber(parseInteger(strSlice(value, 2), 2));
			} else if (isOctal(value)) {
				return this.ToNumber(parseInteger(strSlice(value, 2), 8));
			} else if (hasNonWS(value) || isInvalidHexLiteral(value)) {
				return NaN;
			} else {
				var trimmed = trim(value);
				if (trimmed !== value) {
					return this.ToNumber(trimmed);
				}
			}
		}
		return Number(value);
	},

	// https://people.mozilla.org/~jorendorff/es6-draft.html#sec-tointeger
	// ToInteger: ES5.ToNumber,

	// https://people.mozilla.org/~jorendorff/es6-draft.html#sec-toint32
	// ToInt32: ES5.ToInt32,

	// https://people.mozilla.org/~jorendorff/es6-draft.html#sec-touint32
	// ToUint32: ES5.ToUint32,

	// https://people.mozilla.org/~jorendorff/es6-draft.html#sec-toint16
	ToInt16: function ToInt16(argument) {
		var int16bit = this.ToUint16(argument);
		return int16bit >= 0x8000 ? int16bit - 0x10000 : int16bit;
	},

	// https://people.mozilla.org/~jorendorff/es6-draft.html#sec-touint16
	// ToUint16: ES5.ToUint16,

	// https://people.mozilla.org/~jorendorff/es6-draft.html#sec-toint8
	ToInt8: function ToInt8(argument) {
		var int8bit = this.ToUint8(argument);
		return int8bit >= 0x80 ? int8bit - 0x100 : int8bit;
	},

	// https://people.mozilla.org/~jorendorff/es6-draft.html#sec-touint8
	ToUint8: function ToUint8(argument) {
		var number = this.ToNumber(argument);
		if ($isNaN(number) || number === 0 || !$isFinite(number)) { return 0; }
		var posInt = sign(number) * Math.floor(Math.abs(number));
		return mod(posInt, 0x100);
	},

	// https://people.mozilla.org/~jorendorff/es6-draft.html#sec-touint8clamp
	ToUint8Clamp: function ToUint8Clamp(argument) {
		var number = this.ToNumber(argument);
		if ($isNaN(number) || number <= 0) { return 0; }
		if (number >= 0xFF) { return 0xFF; }
		var f = Math.floor(argument);
		if (f + 0.5 < number) { return f + 1; }
		if (number < f + 0.5) { return f; }
		if (f % 2 !== 0) { return f + 1; }
		return f;
	},

	// https://people.mozilla.org/~jorendorff/es6-draft.html#sec-tostring
	ToString: function ToString(argument) {
		if (typeof argument === 'symbol') {
			throw new TypeError('Cannot convert a Symbol value to a string');
		}
		return String(argument);
	},

	// https://people.mozilla.org/~jorendorff/es6-draft.html#sec-toobject
	ToObject: function ToObject(value) {
		this.RequireObjectCoercible(value);
		return Object(value);
	},

	// https://people.mozilla.org/~jorendorff/es6-draft.html#sec-topropertykey
	ToPropertyKey: function ToPropertyKey(argument) {
		var key = this.ToPrimitive(argument, String);
		return typeof key === 'symbol' ? symbolToStr.call(key) : this.ToString(key);
	},

	// https://people.mozilla.org/~jorendorff/es6-draft.html#sec-tolength
	ToLength: function ToLength(argument) {
		var len = this.ToInteger(argument);
		if (len <= 0) { return 0; } // includes converting -0 to +0
		if (len > MAX_SAFE_INTEGER) { return MAX_SAFE_INTEGER; }
		return len;
	},

	// http://www.ecma-international.org/ecma-262/6.0/#sec-canonicalnumericindexstring
	CanonicalNumericIndexString: function CanonicalNumericIndexString(argument) {
		if (toStr.call(argument) !== '[object String]') {
			throw new TypeError('must be a string');
		}
		if (argument === '-0') { return -0; }
		var n = this.ToNumber(argument);
		if (this.SameValue(this.ToString(n), argument)) { return n; }
		return void 0;
	},

	// https://people.mozilla.org/~jorendorff/es6-draft.html#sec-requireobjectcoercible
	RequireObjectCoercible: ES5.CheckObjectCoercible,

	// https://people.mozilla.org/~jorendorff/es6-draft.html#sec-isarray
	IsArray: Array.isArray || function IsArray(argument) {
		return toStr.call(argument) === '[object Array]';
	},

	// https://people.mozilla.org/~jorendorff/es6-draft.html#sec-iscallable
	// IsCallable: ES5.IsCallable,

	// https://people.mozilla.org/~jorendorff/es6-draft.html#sec-isconstructor
	IsConstructor: function IsConstructor(argument) {
		return typeof argument === 'function' && !!argument.prototype; // unfortunately there's no way to truly check this without try/catch `new argument`
	},

	// https://people.mozilla.org/~jorendorff/es6-draft.html#sec-isextensible-o
	IsExtensible: function IsExtensible(obj) {
		if (!Object.preventExtensions) { return true; }
		if (isPrimitive(obj)) {
			return false;
		}
		return Object.isExtensible(obj);
	},

	// https://people.mozilla.org/~jorendorff/es6-draft.html#sec-isinteger
	IsInteger: function IsInteger(argument) {
		if (typeof argument !== 'number' || $isNaN(argument) || !$isFinite(argument)) {
			return false;
		}
		var abs = Math.abs(argument);
		return Math.floor(abs) === abs;
	},

	// https://people.mozilla.org/~jorendorff/es6-draft.html#sec-ispropertykey
	IsPropertyKey: function IsPropertyKey(argument) {
		return typeof argument === 'string' || typeof argument === 'symbol';
	},

	// http://www.ecma-international.org/ecma-262/6.0/#sec-isregexp
	IsRegExp: function IsRegExp(argument) {
		if (!argument || typeof argument !== 'object') {
			return false;
		}
		if (hasSymbols) {
			var isRegExp = argument[Symbol.match];
			if (typeof isRegExp !== 'undefined') {
				return ES5.ToBoolean(isRegExp);
			}
		}
		return hasRegExpMatcher(argument);
	},

	// https://people.mozilla.org/~jorendorff/es6-draft.html#sec-samevalue
	// SameValue: ES5.SameValue,

	// https://people.mozilla.org/~jorendorff/es6-draft.html#sec-samevaluezero
	SameValueZero: function SameValueZero(x, y) {
		return (x === y) || ($isNaN(x) && $isNaN(y));
	},

	Type: function Type(x) {
		if (typeof x === 'symbol') {
			return 'Symbol';
		}
		return ES5.Type(x);
	},

	// http://www.ecma-international.org/ecma-262/6.0/#sec-speciesconstructor
	SpeciesConstructor: function SpeciesConstructor(O, defaultConstructor) {
		if (this.Type(O) !== 'Object') {
			throw new TypeError('Assertion failed: Type(O) is not Object');
		}
		var C = O.constructor;
		if (typeof C === 'undefined') {
			return defaultConstructor;
		}
		if (this.Type(C) !== 'Object') {
			throw new TypeError('O.constructor is not an Object');
		}
		var S = hasSymbols && Symbol.species ? C[Symbol.species] : undefined;
		if (S == null) {
			return defaultConstructor;
		}
		if (this.IsConstructor(S)) {
			return S;
		}
		throw new TypeError('no constructor found');
	}
});

delete ES6.CheckObjectCoercible; // renamed in ES6 to RequireObjectCoercible

module.exports = ES6;


/***/ },
/* 39 */
/***/ function(module, exports) {

var $isNaN = Number.isNaN || function (a) { return a !== a; };

module.exports = Number.isFinite || function (x) { return typeof x === 'number' && !$isNaN(x) && x !== Infinity && x !== -Infinity; };


/***/ },
/* 40 */
/***/ function(module, exports) {

module.exports = Number.isNaN || function isNaN(a) {
	return a !== a;
};


/***/ },
/* 41 */
/***/ function(module, exports) {

module.exports = function mod(number, modulo) {
	var remain = number % modulo;
	return Math.floor(remain >= 0 ? remain : remain + modulo);
};


/***/ },
/* 42 */
/***/ function(module, exports) {

module.exports = function sign(number) {
	return number >= 0 ? 1 : -1;
};


/***/ },
/* 43 */
/***/ function(module, exports) {

module.exports = function isPrimitive(value) {
	return value === null || (typeof value !== 'function' && typeof value !== 'object');
};


/***/ },
/* 44 */
/***/ function(module, exports, __webpack_require__) {

"use strict";


module.exports = '0.0.21';

/***/ },
/* 45 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.meta = exports.clearRegistry = exports.getRegistry = undefined;

var _core = __webpack_require__(15);

var _utils = __webpack_require__(16);

var _namespace = __webpack_require__(34);

var oPath = __webpack_require__(98);
var oAssign = __webpack_require__(4);
var SpecRef = __webpack_require__(27);

var _require = __webpack_require__(21),
    shape = _require.shape;

var isSpec = __webpack_require__(2);
var isPred = __webpack_require__(6);
var isUndefined = __webpack_require__(13);
var walk = __webpack_require__(10);
var coerceIntoSpec = __webpack_require__(7);

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
    var nObj = oPath.get(reg, _slashToDot(path));

    if (nObj) {
      return oAssign(nObj['.expr'], nObj['.meta']);
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

function _slashToDot(p) {
  return p.replace(/^(.+)(\/)(.+)$/, '$1.$3').replace(/^\//, '');
}

// var PartialRefMapSpec = shape({
//   req: {
//     'refDefs': [isNamespacePath, ExprOrPartialRefMapSpec]
//   }
// });

function speckyNamespace(cargs) {
  var retVal;

  if (cargs['register']) {
    var _cargs$register = cargs['register'],
        nsPath = _cargs$register.nsPath,
        expression = _cargs$register.expression;

    retVal = _processVal(nsPath, expression);
  } else if (cargs['retrieve']) {
    var _nsPath = cargs['retrieve'].nsPath;

    var nameObj = _get(_nsPath);
    retVal = nameObj;
  }

  return retVal;
}

function _processVal(prefix, expression) {
  if (expression) {
    if (expression.spec || expression.pred) {
      var expr = expression.spec || expression.pred;
      _set(prefix, { '.expr': expr });
      return expr;
    } else {
      console.error(expression);
      throw '!';
    }
    // TODO
    // } else if ( val.partialRefMap ) {
    //   var { refDefs } = val.partialRefMap;
    //   for ( var k in refDefs ) {
    //     if ( refDefs.hasOwnProperty( k ) ) {
    //       var retVal = _processVal( refDefs[ k ] );
    //     }
    //   }
  } else {
    console.error(expression);
    throw '!';
  }
}

var NameObjSpec = shape({
  req: { '.expr': (0, _core.or)(isSpec, isPred) }
});

var _set = (0, _core.fspec)({
  args: (0, _core.cat)(_utils.isNamespacePath, NameObjSpec),
  ret: isUndefined
}).instrument(function _set(n, nObj) {
  _maybeInitRegistry();
  var existing = oPath.get(reg, _slashToDot(n));
  oPath.set(reg, _slashToDot(n), oAssign({}, existing, nObj));
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

var meta = _namespace.MetaFnSpec.instrumentConformed(function meta(_ref) {
  var _ref$source = _ref.source,
      namespacePath = _ref$source.namespacePath,
      expression = _ref$source.expression,
      metaObj = _ref.metaObj;

  if (namespacePath) {
    var nObj = oPath.get(reg, _slashToDot(namespacePath));
    var currMeta = nObj && nObj['.meta'];
    oPath.set(reg, _slashToDot(namespacePath), oAssign({}, nObj, { '.meta': oAssign({}, currMeta, metaObj) }));
    return _get(namespacePath);
  } else if (expression) {
    var spec = coerceIntoSpec(expression);
    spec.meta = oAssign(spec.meta, metaObj);
  }
});

_maybeInitRegistry();

var getRegistry = function getRegistry() {
  return reg;
};

var specedSpeckyNamespace = _namespace.NamespaceFnSpec.instrumentConformed(speckyNamespace);
specedSpeckyNamespace.clearRegistry = clearRegistry;
specedSpeckyNamespace.getRegistry = getRegistry;
specedSpeckyNamespace.meta = meta;

exports.getRegistry = getRegistry;
exports.clearRegistry = clearRegistry;
exports.meta = meta;
exports.default = specedSpeckyNamespace;
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(49)))

/***/ },
/* 46 */
/***/ function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _namespace = __webpack_require__(45);

var _namespace2 = _interopRequireDefault(_namespace);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var oAssign = __webpack_require__(4);


var ops = __webpack_require__(15);
var utils = __webpack_require__(16);

var predicates = __webpack_require__(20);

var models = {
  Problem: __webpack_require__(3),
  Spec: __webpack_require__(0)
};

var r = oAssign(_namespace2.default, ops, utils, models, predicates);

r.VERSION = __webpack_require__(44);

module.exports = r;
exports.default = r;

/***/ },
/* 47 */
/***/ function(module, exports, __webpack_require__) {

"use strict";


var Spec = __webpack_require__(0);
var coerceIntoSpec = __webpack_require__(7);

var _require = __webpack_require__(9),
    cat = _require.cat,
    ExprSpec = _require.ExprSpec;

var fspec = __webpack_require__(12);
var walk = __webpack_require__(10);

var WallFnSpec = fspec({
  args: cat(ExprSpec),
  ret: ExprSpec
});

function wallOp(expr) {
  var spec = coerceIntoSpec(expr);
  var wallS = new Spec({
    type: 'WALL',
    exprs: [spec],
    opts: { enclosedSpec: spec }
  });
  wallS.conform = function andConform(x) {
    return walk(wallS, x, { conform: true });
  };
  return wallS;
}

var wall = WallFnSpec.instrument(wallOp);

module.exports = {
  WallFnSpec: WallFnSpec, wall: wall
};

/***/ },
/* 48 */
/***/ function(module, exports, __webpack_require__) {

"use strict";


var isPred = __webpack_require__(6);
var isSpec = __webpack_require__(2);
var fnName = __webpack_require__(8);
var isStr = __webpack_require__(5);

var multipleArgFragmenter = function multipleArgFragmenter(_ref) {
  var named = _ref.opts.named,
      exprs = _ref.exprs;

  if (exprs.length === 0) {
    //empty case
    return [];
  } else if (named) {
    return exprs.reduce(function (curr, _ref2, idx) {
      var name = _ref2.name,
          expr = _ref2.expr;
      return curr.concat(['"' + name + '"', ', ', expr]).concat(idx < exprs.length - 1 ? [', '] : []);
    }, []);
  } else {
    return exprs.reduce(function (curr, _ref3, idx) {
      var expr = _ref3.expr;
      return curr.concat([expr]).concat(idx < exprs.length - 1 ? [', '] : []);
    }, []);
  }
};

var singleArgFragmenter = function singleArgFragmenter(_ref4) {
  var enclosedSpec = _ref4.opts.enclosedSpec;
  return [enclosedSpec];
};

var Fragmenters = {
  'PRED': function PRED(_ref5) {
    var predicate = _ref5.opts.predicate;
    return [pred];
  },
  'WALL': function WALL(_ref6) {
    var enclosedSpec = _ref6.opts.enclosedSpec;
    return [enclosedSpec];
  },
  // TODO
  'AND': function AND(_ref7) {
    var exprs = _ref7.exprs;
    return exprs;
  },
  'CAT': multipleArgFragmenter,
  'OR': multipleArgFragmenter,
  'Z_OR_M': singleArgFragmenter,
  'O_OR_M': singleArgFragmenter,
  'Z_OR_O': singleArgFragmenter,
  'ANY': function ANY() {
    return [];
  },
  // TODO
  'MAP_OF': function MAP_OF() {
    return [];
  },
  // TODO
  'SHAPE': function SHAPE() {
    return [];
  },
  // TODO: fix comma
  'FSPEC': function FSPEC(_ref8) {
    var args = _ref8.args,
        ret = _ref8.ret,
        fn = _ref8.fn;
    return [].concat(args ? ['args: ', args] : []).concat(ret ? ['ret: ', ret] : []).concat(fn ? ['fn: ', fnName(fn), '()'] : []);
  }

};

function describe(expr, interceptor) {
  return _strFragments(expr, interceptor).join('');
}

function _strFragments(expr, interceptor) {
  if (interceptor) {
    var interceptR = interceptor(expr);
    if (interceptR) {
      return interceptR;
    }
  }
  if (isPred(expr)) {
    return [fnName(expr), '()'];
  } else if (expr.type === 'PRED') {
    return _strFragments(expr.opts.predicate, interceptor);
  } else if (isSpec(expr)) {
    if (expr.type === 'DELAYED' || expr.type === 'SPEC_REF') {
      return _strFragments(expr.get(), interceptor);
    } else {
      return [expr.type.toLowerCase(), '('].concat(_processInner(expr, interceptor)).concat([')']);
    }
  } else {
    console.error(expr);
    throw new Error('Argument must be an expression');
  }
}

function _processInner(spec, interceptor) {
  // TODO: remove first part
  var fragments = Fragmenters[spec.type](spec);
  return fragments.reduce(function (acc, piece) {
    return isStr(piece) ? acc.concat(piece) : acc.concat(_strFragments(piece, interceptor));
  }, []);
}

module.exports = describe;

/***/ },
/* 49 */
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


/***/ },
/* 50 */
/***/ function(module, exports, __webpack_require__) {

"use strict";


var define = __webpack_require__(18);
var getPolyfill = __webpack_require__(25);

module.exports = function shimArrayFrom() {
	var polyfill = getPolyfill();

	define(Array, { 'from': polyfill }, {
		'from': function () {
			return Array.from !== polyfill;
		}
	});

	return polyfill;
};


/***/ },
/* 51 */
/***/ function(module, exports, __webpack_require__) {

"use strict";


var Spec = __webpack_require__(0);
var identity = __webpack_require__(35);
var SPEC_TYPE_ANY = 'ANY';

function any() {
  return new Spec({
    type: SPEC_TYPE_ANY,
    exprs: [],
    conformFn: identity
  });
}

module.exports = any;

/***/ },
/* 52 */
/***/ function(module, exports, __webpack_require__) {

"use strict";


module.exports = {
  CAT: 'CAT',
  OR: 'OR',
  Z_OR_M: 'Z_OR_M',
  Z_OR_O: 'Z_OR_O',
  O_OR_M: 'O_OR_M',
  PRED: 'PRED',
  COLL_OF: 'COLL_OF'
};

/***/ },
/* 53 */
/***/ function(module, exports, __webpack_require__) {

"use strict";


var fragment = __webpack_require__(54);
var Spec = __webpack_require__(0);
var deref = __webpack_require__(22);

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
  spec = deref(spec);
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
  return function evalChildThenWrapped(spec) {
    var childFrag = evalSpec(spec.exprs[0]);
    return wrapper(childFrag);
  };
};

var evalChildrenThen = function evalChildrenThen(wrapper) {
  return function evalChildrenThenWrapped(spec) {
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
  return new Spec({
    type: 'ROOT',
    exprs: [expr]
  });
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
/* 54 */
/***/ function(module, exports, __webpack_require__) {

"use strict";


function fragmentState(transitions, index) {
  return {
    transitions: transitions === null ? [] : transitions,
    index: index || null
  };
}

function fragmentTransition(spec, target) {
  return {
    spec: spec,
    target: target
  };
}

function fragment(head, tails) {
  return {
    head: head,
    tails: tails
  };
}

function namedFragment(name, head, tails) {
  var f = fragment(head, tails);
  f.name = name;
  return f;
}

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

build.PRED = function PRED(spec) {
  var trans = fragmentTransition(spec, null);
  var head = fragmentState([trans], null);
  var tails = [trans];
  var f = fragment(head, tails);
  return f;
};

build.OR = function OR(frags) {
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
  newF = frontWithState(namedEpsilonState('enter', null, 'OR', 'para_in'), newF);
  newF = rearWithState(namedEpsilonState('exit', null, 'OR', 'para_out'), newF);

  return newF;
};

build.CAT = function CAT(frags) {

  var binaryConcat = function binaryConcat(frag1, currFrag) {
    patch(frag1.tails, currFrag.head);
    var head = frag1.head;
    var tails = currFrag.tails;
    var newF = fragment(head, tails);
    return newF;
  };

  frags = frags.map(function addEpsilonState(f) {
    var trans = fragmentTransition(namedEpsilonState('maybe_out', f.name, 'CAT'), null);
    var nameOutState = fragmentState([trans]);
    patch(f.tails, nameOutState);

    var nameInTranstions = f.head.transitions.map(function (t) {
      var s = fragmentState([t]);
      var namedInTrans = fragmentTransition(namedEpsilonState('maybe_in', f.name, 'CAT'), s);
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
  r = frontWithState(namedEpsilonState('maybe_enter', null, 'CAT', 'in'), r);
  r = rearWithState(namedEpsilonState('maybe_exit', null, 'CAT', 'out'), r);
  return r;
};

build.Z_OR_M = function Z_OR_M(frag) {
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

build.O_OR_M = function O_OR_M(frag) {
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

build.Z_OR_O = function Z_OR_O(frag) {
  var l = 'Z_OR_O';
  var matchTrans = fragmentTransition(namedEpsilonState('loop', null, l), frag.head);
  var skipTrans = fragmentTransition(epsilonState(), null);
  var head = fragmentState([matchTrans, skipTrans]);
  var tails = frag.tails.concat([skipTrans]);

  var newF = fragment(head, tails);
  newF = frontWithState(namedEpsilonState('maybe_single_enter', null, l, 'in'), newF);
  newF = rearWithState(namedEpsilonState('maybe_single_exit', null, l, 'out'), newF);

  return newF;
};

build.ROOT = function ROOT(frag) {
  var finalState = fragmentState(null, null);
  patch(frag.tails, finalState);
  return fragment(frag.head, []);
};

module.exports = build;

/***/ },
/* 55 */
/***/ function(module, exports, __webpack_require__) {

"use strict";


function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var oAssign = __webpack_require__(4);

/*eslint func-names: 0*/

function Value(val) {
  this.value = val;
}

function Piece(frag) {
  this.fragment = frag;
}
function GroupedPiece(frag) {
  this.fragment = frag;
}
function NamedPiece(name, frag) {
  this.fragment = frag;
  this.name = name;
}
function GroupedAltPiece(frag) {
  this.fragment = frag;
}
function NamedAltPiece(name, frag) {
  this.fragment = frag;
  this.name = name;
}
function Nothing() {}
function Empty() {}
function MaybeEnter() {}
function GroupName(name) {
  this.name = name;
}

function getMatch(chain, walkFn, walkOpts) {
  // console.log( JSON.stringify( chain, null, 2 ) );
  var conform = walkOpts.conform;
  var inputType = chain.inputType;


  var valStack = [];
  var r;

  chain.forEach(function (curr) {
    if (curr.move) {
      switch (curr.move.dir) {
        case 'maybe_enter':
          {
            valStack.push(new MaybeEnter());
          }break;
        case 'maybe_exit':
          {
            var c = void 0,
                acc = new Empty();
            while (!((c = valStack.pop()) instanceof MaybeEnter)) {
              acc = _foldLeft(inputType, conform, acc, c);
            }
            valStack.push(acc);
          }break;
        case 'maybe_single_enter':
          {
            valStack.push(new MaybeEnter());
          }break;
        case 'maybe_single_exit':
          {
            var top = valStack.pop(),
                _acc = void 0;
            if (top instanceof MaybeEnter) {
              _acc = new Nothing();
            } else {
              _acc = top;
              //get rid of MaybeEnter
              valStack.pop();
            }
            valStack.push(_acc);
          }break;
        case 'enter':
          {}break;
        case 'exit':
          {
            var _c = valStack.pop();
            var _acc2 = void 0;
            if (conform && _c instanceof NamedAltPiece) {
              _acc2 = new GroupedAltPiece(oAssign({}, _defineProperty({}, _c.name, _c.fragment)));
            } else {
              _acc2 = _c;
            }
            valStack.push(_acc2);
          }break;
        case 'maybe_in':
          {
            if (conform && curr.move.name) {
              valStack.push(new GroupName(curr.move.name));
            }
          }break;
        case 'loop':
          {}break;
        case 'maybe_out':
          {
            if (conform && curr.move.name) {
              var _c2 = valStack.pop();
              var gn = valStack.pop();
              valStack.push(_giveName(gn, _c2));
            }
          }break;
        case 'in':
          {
            if (conform && curr.move.name) {
              valStack.push(new GroupName(curr.move.name));
            }
          }break;
        case 'out':
          {
            if (conform && curr.move.name) {
              var _c3 = valStack.pop();
              var _gn = valStack.pop();
              valStack.push(_giveAltName(_gn, _c3));
            }
          }break;
        case 'spec':
          {
            var conformed = walkFn(curr.spec, curr.guide, walkOpts);
            valStack.push(new Value(conformed));
          }break;
        default:
          console.error(curr);throw 'FUUU';
      }
    }
    // console.log( curr.move.dir, `(${curr.move.name || ''})`, curr, [].concat( valStack ) );
  });
  if (valStack.length !== 1) {
    console.error('valStack', valStack);
    throw '!';
  }
  r = valStack.pop();

  var retVal = void 0;

  if (r instanceof Piece) {
    retVal = r.fragment;
  } else if (r instanceof GroupedPiece) {
    retVal = r.fragment;
  } else if (r instanceof GroupedAltPiece) {
    retVal = r.fragment;
  } else if (r instanceof Value) {
    retVal = r.value;
  } else if (r instanceof Empty) {
    retVal = _coerceToProperType(inputType, []);
  } else {
    retVal = r;
  }

  // console.log( 'r', r );
  return retVal;
}

function _giveName(groupName, c) {
  if (c instanceof Nothing) {
    return new NamedPiece(groupName.name, undefined);
  } else if (c instanceof GroupedPiece) {
    return new NamedPiece(groupName.name, c.fragment);
  } else if (c instanceof Piece || c instanceof GroupedAltPiece) {
    return new NamedPiece(groupName.name, c.fragment);
  } else if (c instanceof Value) {
    return new NamedPiece(groupName.name, c.value);
  } else if (c instanceof Empty) {
    return new Value({});
  } else {
    console.error(c);
    throw 'c!!!';
  }
}

function _giveAltName(groupName, c) {
  if (c instanceof Nothing) {
    return new NamedAltPiece(groupName.name, undefined);
  } else if (c instanceof GroupedAltPiece) {
    return new NamedAltPiece(groupName.name, c.fragment);
  } else if (c instanceof Piece) {
    return new NamedAltPiece(groupName.name, c.fragment);
  } else if (c instanceof GroupedPiece) {
    return new NamedAltPiece(groupName.name, c.fragment);
  } else if (c instanceof Value) {
    return new NamedAltPiece(groupName.name, c.value);
  } else if (c instanceof Empty) {
    return new Value({});
  } else {
    console.error(c);
    throw 'c!!!alt';
  }
}

function _foldLeft(inputType, conform, acc, c) {

  if (conform && c instanceof NamedPiece) {
    var rightArr = void 0;

    if (acc instanceof Nothing) {
      rightArr = {};
    } else if (!acc) {
      rightArr = {};
    } else if (acc instanceof Empty) {
      rightArr = {};
    } else if (acc instanceof GroupedPiece) {
      rightArr = acc.fragment;
    } else if (acc instanceof GroupedAltPiece) {
      rightArr = acc.fragment;
    } else {
      console.error(acc, c);
      throw '!!acc_fl_np';
    }
    return new GroupedPiece(oAssign({}, _defineProperty({}, c.name, c.fragment), rightArr));
  } else {
    var leftArr = void 0,
        _rightArr = void 0;
    if (acc instanceof Nothing) {
      _rightArr = [];
    } else if (!acc) {
      _rightArr = [];
    } else if (acc instanceof Piece) {
      _rightArr = acc.fragment;
    } else if (acc instanceof Empty) {
      _rightArr = [];
    } else {
      console.error(acc);
      throw '!!acc_fl';
    }

    if (c instanceof Value) {
      leftArr = [c.value];
    } else if (c instanceof Piece) {
      leftArr = c.fragment;
    } else if (c instanceof GroupedPiece) {
      leftArr = [c.fragment];
    } else if (c instanceof GroupedAltPiece) {
      leftArr = [c.fragment];
    } else if (c instanceof Nothing) {
      leftArr = [];
    } else if (c instanceof Empty) {
      leftArr = [];
    } else {
      console.error(c);
      throw 'cc!!';
    }
    var p = new Piece(_coerceToProperType(inputType, leftArr.concat(_rightArr)));
    return p;
  }
}

function _coerceToProperType(t, arr) {
  if (t === 'string' && Array.isArray(arr)) {
    return arr.join('');
  } else {
    return arr;
  }
}

module.exports = getMatch;

/***/ },
/* 56 */
/***/ function(module, exports, __webpack_require__) {

"use strict";


var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var isProblem = __webpack_require__(1);
var isStr = __webpack_require__(5);

function simulate(nfa, rawInput, walkFn, walkOpts) {

  var r = {
    matched: false,
    chain: null
  };

  var inputType = typeof rawInput === 'undefined' ? 'undefined' : _typeof(rawInput);

  var initial = {
    state: 0,
    offset: 0,
    input: [rawInput],
    groupCount: 0,
    arrayed: false };
  var frontier = [initial];
  while (frontier.length > 0) {
    var current = frontier.shift();
    var currentOffset = current.offset,
        input = current.input;

    if (current.state === nfa.finalState && currentOffset === input.length) {
      r.matched = true;
      r.chain = _getChain(nfa, current, inputType);
      return r;
    }
    for (var nextStateStr in nfa.transitions[current.state]) {
      var nextState = parseInt(nextStateStr);

      var m = _getNextMove(nfa, nextState, current, walkFn, walkOpts);

      if (isProblem(m)) {
        r.lastProblem = m;
      } else if (m) {
        frontier.push(m);
      }
    }
  }
  return r;
}

function _getNextMove(nfa, nextState, current, walkFn, walkOpts) {
  var input = current.input,
      currentOffset = current.offset,
      groupCount = current.groupCount,
      arrayed = current.arrayed;

  var observed = input[currentOffset];
  var transition = nfa.transitions[current.state][nextState];

  if (transition.group === 'in') {
    if (groupCount === 0) {
      if (Array.isArray(input[0]) || isStr(input[0])) {
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
        input: input, groupCount: groupCount, arrayed: arrayed,
        state: nextState,
        offset: nextOffset,
        move: move,
        spec: transition,
        prev: current,
        isEpsilon: true
      };
      return next;
    } else {
      validateResult = walkFn(transition, observed, walkOpts);
      // validateResult = walkFn(transition, observed, walkOpts);
      if (!isProblem(validateResult)) {
        if (currentOffset < input.length) {
          move = { dir: 'spec' };
          next = {
            input: input, groupCount: groupCount, arrayed: arrayed,
            state: nextState,
            offset: nextOffset,
            move: move,
            prev: current,
            isEpsilon: false,
            spec: transition,
            guide: validateResult
          };
          return next;
        }
      } else {
        return validateResult;
      }
    }
  }
}

function _getChain(nfa, finalState, inputType) {
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
  chain.inputType = inputType;
  return chain;
}

module.exports = simulate;

/***/ },
/* 57 */
/***/ function(module, exports, __webpack_require__) {

"use strict";


var _require = __webpack_require__(9),
    or = _require.or;

var isNull = __webpack_require__(30);

function nullable(spec) {
  return or(isNull, spec);
}

module.exports = nullable;

/***/ },
/* 58 */
/***/ function(module, exports, __webpack_require__) {

"use strict";


var _require = __webpack_require__(9),
    or = _require.or;

var isUndefined = __webpack_require__(13);

function undefinable(spec) {
  return or(isUndefined, spec);
}

module.exports = undefinable;

/***/ },
/* 59 */
/***/ function(module, exports, __webpack_require__) {

"use strict";


module.exports = function equals(test) {
  return function equalsVal(x) {
    return x === test;
  };
};

/***/ },
/* 60 */
/***/ function(module, exports, __webpack_require__) {

"use strict";


module.exports = function instanceOf(t) {
  return function instanceOfT(x) {
    return x instanceof t;
  };
};

/***/ },
/* 61 */
/***/ function(module, exports, __webpack_require__) {

"use strict";


function isBool(x) {
  return typeof x === 'boolean';
}

module.exports = isBool;

/***/ },
/* 62 */
/***/ function(module, exports, __webpack_require__) {

"use strict";


module.exports = function isDate(date) {
  return date && date instanceof Date && !isNaN(date.valueOf());
};

/***/ },
/* 63 */
/***/ function(module, exports, __webpack_require__) {

"use strict";


var isInt = __webpack_require__(29);

function isNatInt(x) {
  return isInt(x) && x >= 0.0;
}

module.exports = isNatInt;

/***/ },
/* 64 */
/***/ function(module, exports, __webpack_require__) {

"use strict";


module.exports = function isUuid(x) {
  return !!/^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(x);
};

/***/ },
/* 65 */
/***/ function(module, exports, __webpack_require__) {

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
/* 66 */
/***/ function(module, exports, __webpack_require__) {

"use strict";


function betterThrow(problem) {
  // console.log( '----------------------' );
  // console.error( problem.message, problem );
  // console.log( '----------------------' );
  throw problem;
}

module.exports = betterThrow;

/***/ },
/* 67 */
/***/ function(module, exports, __webpack_require__) {

"use strict";


var DelayedSpec = __webpack_require__(26);

function delayed(getFn) {
  return new DelayedSpec({ getFn: getFn });
}

module.exports = delayed;

/***/ },
/* 68 */
/***/ function(module, exports, __webpack_require__) {

"use strict";


var isProblem = __webpack_require__(1);
// TODO : replace with checkProblem
var conform = __webpack_require__(17);

module.exports = function enforce(spec, x) {
  var r = conform(spec, x);
  if (isProblem(r)) {
    throw r;
  }
  return undefined;
};

/***/ },
/* 69 */
/***/ function(module, exports, __webpack_require__) {

"use strict";


var isPred = __webpack_require__(6);
var isSpec = __webpack_require__(2);
var isSpecRef = __webpack_require__(14);

function isExpr(x) {
  return isPred(x) || isSpec(x) || isSpecRef(x);
}

module.exports = isExpr;

/***/ },
/* 70 */
/***/ function(module, exports, __webpack_require__) {

"use strict";


var isSpec = __webpack_require__(2);

function isFspec(x) {
  return isSpec(x) && x.type === 'FSPEC';
}

module.exports = isFspec;

/***/ },
/* 71 */
/***/ function(module, exports, __webpack_require__) {

"use strict";


var isStr = __webpack_require__(5);

function isNamespacePath(x) {
  return isStr(x) && /^[a-zA-Z0-9\-_\.]*\/([a-zA-Z0-9\-_]+)$/.test(x);
}

module.exports = isNamespacePath;

/***/ },
/* 72 */
/***/ function(module, exports, __webpack_require__) {

"use strict";


var isStr = __webpack_require__(5);

//TODO
module.exports = function isSpecName(x) {
  return isStr(x);
};

/***/ },
/* 73 */
/***/ function(module, exports, __webpack_require__) {

"use strict";


var isProblem = __webpack_require__(1);
var isPred = __webpack_require__(6);
var isSpec = __webpack_require__(2);
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
/* 74 */
/***/ function(module, exports, __webpack_require__) {

"use strict";


var Problem = __webpack_require__(3);
var isProblem = __webpack_require__(1);
var specFromAlts = __webpack_require__(11);
var oAssign = __webpack_require__(4);

function andWalker(spec, walkFn) {
  var exprs = spec.opts.conformedExprs.map(specFromAlts);

  return {
    trailblaze: andTrailblaze,
    reconstruct: andReconstruct
  };

  function andTrailblaze(data, walkOpts) {
    var r = data;
    var conforms = [];
    var problems = [];

    for (var i = 0; i < exprs.length; i += 1) {
      var currData = i === 0 ? data : conforms[i - 1];
      r = walkFn(exprs[i], currData, walkOpts);
      if (isProblem(r)) {
        problems.push(r);
        break;
      } else {
        var conformedR = walkFn(exprs[i], r, oAssign({}, walkOpts, { phase: 'reconstruct' }));
        conforms.push(conformedR);
      }
    }

    if (problems.length === 0) {
      return { conforms: conforms };
    } else {
      return new Problem(data, exprs, problems, 'One or more expressions failed AND test');
    }
  }

  function andReconstruct(_ref) {
    var conforms = _ref.conforms;

    //TODO: implement propagated conform. Perhaps as an option propagateConform
    // or as a separate spec construct such as "propagate"
    return conforms[exprs.length - 1];
  }
}

module.exports = andWalker;

/***/ },
/* 75 */
/***/ function(module, exports, __webpack_require__) {

"use strict";


function anyWalker() {
  return {
    trailblaze: walkThroughAny,
    reconstruct: walkThroughAny
  };
}

function walkThroughAny(x) {
  return x;
}

module.exports = anyWalker;

/***/ },
/* 76 */
/***/ function(module, exports, __webpack_require__) {

"use strict";


var Problem = __webpack_require__(3);
var isProblem = __webpack_require__(1);
var isNum = __webpack_require__(31);

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
          //TODO
          break;
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
/* 77 */
/***/ function(module, exports, __webpack_require__) {

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
/* 78 */
/***/ function(module, exports, __webpack_require__) {

"use strict";


var isProblem = __webpack_require__(1);
var Problem = __webpack_require__(3);
var functionName = __webpack_require__(8);
var namedFn = __webpack_require__(37);
var betterThrow = __webpack_require__(66);
var arrayFrom = __webpack_require__(24);

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
      throw new Error('A function must be specified for instrumentation.');
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
    return function __instrumented() {
      var args = arrayFrom(arguments);
      var instrumentedArgs = checkArgs(fn, fnName, args);
      var retVal = fn.apply(this, instrumentedArgs);
      var instrumentedRetVal = checkRet(fn, fnName, retVal);

      // TODO optimize
      var conformedArgs = argsSpec ? walkFn(argsSpec, args, { conform: true, instrument: true }) : args;
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
    return function __instrumentConformed() {
      var args = arrayFrom(arguments);

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
/* 79 */
/***/ function(module, exports, __webpack_require__) {

"use strict";


function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var specFromAlts = __webpack_require__(11);
var isProblem = __webpack_require__(1);
var Problem = __webpack_require__(3);

function mapOfWalker(spec, walkFn) {
  var _spec$opts = spec.opts,
      keyExpression = _spec$opts.keyExpression,
      valExpression = _spec$opts.valExpression;

  var keySpec = keyExpression && specFromAlts(keyExpression);
  var valSpec = valExpression && specFromAlts(valExpression);

  return {
    trailblaze: mapOfTrailblaze,
    reconstruct: mapOfReconstruct
  };

  function mapOfTrailblaze(x, walkOpts) {
    for (var key in x) {
      if (x.hasOwnProperty(key)) {
        if (keySpec) {
          var keyR = walkFn(keySpec, key, walkOpts);
          if (isProblem(keyR)) {
            return new Problem(x, spec, _defineProperty({}, key, keyR), 'mapOf: key ' + key + ' failed validation');
          }
        }

        if (valSpec) {
          var valR = walkFn(valSpec, x[key], walkOpts);
          if (isProblem(valR)) {
            return new Problem(x, spec, _defineProperty({}, key, valR), 'mapOf: value for key ' + key + ' failed validation');
          }
        }
      }
    }
    return { val: x };
  }

  function mapOfReconstruct(_ref3) {
    var val = _ref3.val;

    return val;
  }
}
module.exports = mapOfWalker;

/***/ },
/* 80 */
/***/ function(module, exports, __webpack_require__) {

"use strict";


var simulate = __webpack_require__(56);
var getMatch = __webpack_require__(55);
var compile = __webpack_require__(53);
var Problem = __webpack_require__(3);

function nfaWalker(spec, walkFn) {
  var nfa;

  return {
    trailblaze: nfaTrailblaze,
    reconstruct: nfaReconstruct
  };

  function nfaTrailblaze(x, walkOpts) {

    if (!nfa) {
      //lazy
      nfa = compile(spec);
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
/* 81 */
/***/ function(module, exports, __webpack_require__) {

"use strict";


var fnName = __webpack_require__(8);
var Problem = __webpack_require__(3);

function predWalker(spec) {
  return {
    trailblaze: predTraiblaze,
    reconstruct: predReconstruct
  };

  function predTraiblaze(x) {
    var predFn = spec.exprs[0];
    if (!predFn(x)) {
      return new Problem(x, spec, [], 'Predicate ' + fnName(predFn) + '() returns false');
    } else {
      return x;
    }
  }

  function predReconstruct(x) {
    return x;
  }
}

module.exports = predWalker;

/***/ },
/* 82 */
/***/ function(module, exports, __webpack_require__) {

"use strict";


var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var isProblem = __webpack_require__(1);
var isUndefined = __webpack_require__(13);
var oAssign = __webpack_require__(4);
var Problem = __webpack_require__(3);
var specFromAlts = __webpack_require__(11);

function shapeWalker(spec, walkFn) {
  var keyConformer;
  var _spec$opts$conformedA = spec.opts.conformedArgs.shapeArgs,
      requiredFields = _spec$opts$conformedA.requiredFields,
      optionalFields = _spec$opts$conformedA.optionalFields;


  var reqSpecs, optSpecs;
  if (requiredFields) {
    reqSpecs = requiredFields.req || requiredFields.required;
  }
  if (optionalFields) {
    optSpecs = optionalFields.opt || optionalFields.optional;
  }

  return {
    trailblaze: shapeTrailblaze,
    reconstruct: shapeReconstruct
  };

  function shapeTrailblaze(x, walkOpts) {
    if (['object', 'function'].indexOf(typeof x === 'undefined' ? 'undefined' : _typeof(x)) < 0) {
      return new Problem(x, spec, [], 'Value is not an object');
    }

    if (!keyConformer) {
      // lazy
      keyConformer = _genKeyConformer(reqSpecs, optSpecs, walkFn, walkOpts);
    }
    var keyConformedR = keyConformer(x);

    if (isProblem(keyConformedR)) {
      return keyConformedR;
    }
    var problems = [];

    var guide = { val: x, groups: [], singles: [] };

    var reqFieldDefs;
    if (reqSpecs) {
      reqFieldDefs = reqSpecs.fieldDefs;
    }

    if (reqFieldDefs) {
      processFieldDefs_mut(reqFieldDefs);
    }

    var optFieldDefs;
    if (optSpecs) {
      optFieldDefs = optSpecs.fieldDefs;
    }
    if (optFieldDefs) {
      processFieldDefs_mut(optFieldDefs, true);
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
            //TODO: improve this;
            break fieldLoop;
          } else if (singleMatch) {
            guide.singles.push(singleMatch);
          } else if (groupMatch) {
            if (groupMatch.matchedKeys.length > 0) {
              guide.groups.push(groupMatch);
            }
          } else if (!noop) {
            throw '!';
          }
        }
      }
    }
  }

  function shapeReconstruct(_ref, walkOpts) {
    var val = _ref.val,
        singles = _ref.singles,
        groups = _ref.groups;


    var conform = { walkOpts: walkOpts };

    var instrument = walkOpts.instrument;


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
      var missingKeys = [];
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
        var reqName = reqNames[i];
        //key spec
        if (fieldDefs && fieldDefs.fields[reqName].keyValExprPair) {
          var found = false;
          keyTrav: for (var kk in x) {
            if (x.hasOwnProperty(kk)) {
              var rr = _conformNamedOrExpr(kk, fieldDefs.fields[reqName].keyValExprPair.keyExpression, walkFn, walkOpts);
              if (!isProblem(rr)) {
                //found a match
                found = true;
                break keyTrav;
              }
            }
          }
          if (!found) {
            missingKeys.push(reqName);
          }
        } else if (fieldDefs && fieldDefs.fields[reqName].valExpressionOnly) {
          //key spec
          if (x.hasOwnProperty(reqName)) {
            var rrr = _conformNamedOrExpr(x[reqName], fieldDefs.fields[reqName].valExpressionOnly, walkFn, walkOpts);
            if (isProblem(rrr)) {
              //found a match
              missingKeys.push(reqName);
            }
          } else {
            missingKeys.push(reqName);
          }
        } else if (keyList) {
          //plain string key
          if (x[reqName] === undefined) {
            missingKeys.push(reqName);
          }
        } else {
          throw '!';
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
  var valExpressionOnly = keyValAlts.valExpressionOnly,
      keyValExprPair = keyValAlts.keyValExprPair;

  if (keyValExprPair) {
    var matchedKeys = [];

    var keyExpression = keyValExprPair.keyExpression,
        valExpression = keyValExprPair.valExpression;

    keysExamine: for (var k in x) {
      if (x.hasOwnProperty(k)) {
        var keyResult = _conformNamedOrExpr(k, keyExpression, walkFn, walkOpts);
        if (!isProblem(keyResult)) {
          // single string char case, where name = 0 and x = ''
          if (x === x[k]) {
            continue keysExamine;
          }
          var valGuide = _conformNamedOrExpr(x[k], valExpression, walkFn, walkOpts);
          if (isProblem(valGuide)) {
            //TODO: improve
            return { problem: valGuide };
          } else {
            matchedKeys.push({ key: k, spec: specFromAlts(valExpression), guide: valGuide });
          }
        }
      }
    }
    return { groupMatch: { name: name, matchedKeys: matchedKeys } };
  } else if (valExpressionOnly) {
    var v = x[name];
    // single string char case, name = 0
    if (!isUndefined(v) && x[name] !== x) {
      var g = _conformNamedOrExpr(v, valExpressionOnly, walkFn, walkOpts);
      if (isProblem(g)) {
        return { problem: g };
      } else {
        return { singleMatch: { key: name, spec: specFromAlts(valExpressionOnly), guide: g } };
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

module.exports = shapeWalker;

/***/ },
/* 83 */
/***/ function(module, exports, __webpack_require__) {

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
/* 84 */
/***/ function(module, exports, __webpack_require__) {

"use strict";


var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

function wallWalker(wallSpec, walkFn) {
  return {
    trailblaze: wallWalk,
    reconstruct: wallWalk
  };

  function wallWalk(x, opts) {
    var _wallSpec$exprs = _slicedToArray(wallSpec.exprs, 1),
        spec = _wallSpec$exprs[0];

    return walkFn(spec, x, opts);
  }
}

module.exports = wallWalker;

/***/ },
/* 85 */
/***/ function(module, exports, __webpack_require__) {

"use strict";


var $isNaN = __webpack_require__(40);
var $isFinite = __webpack_require__(39);

var sign = __webpack_require__(42);
var mod = __webpack_require__(41);

var IsCallable = __webpack_require__(19);
var toPrimitive = __webpack_require__(88);

// https://es5.github.io/#x9
var ES5 = {
	ToPrimitive: toPrimitive,

	ToBoolean: function ToBoolean(value) {
		return Boolean(value);
	},
	ToNumber: function ToNumber(value) {
		return Number(value);
	},
	ToInteger: function ToInteger(value) {
		var number = this.ToNumber(value);
		if ($isNaN(number)) { return 0; }
		if (number === 0 || !$isFinite(number)) { return number; }
		return sign(number) * Math.floor(Math.abs(number));
	},
	ToInt32: function ToInt32(x) {
		return this.ToNumber(x) >> 0;
	},
	ToUint32: function ToUint32(x) {
		return this.ToNumber(x) >>> 0;
	},
	ToUint16: function ToUint16(value) {
		var number = this.ToNumber(value);
		if ($isNaN(number) || number === 0 || !$isFinite(number)) { return 0; }
		var posInt = sign(number) * Math.floor(Math.abs(number));
		return mod(posInt, 0x10000);
	},
	ToString: function ToString(value) {
		return String(value);
	},
	ToObject: function ToObject(value) {
		this.CheckObjectCoercible(value);
		return Object(value);
	},
	CheckObjectCoercible: function CheckObjectCoercible(value, optMessage) {
		/* jshint eqnull:true */
		if (value == null) {
			throw new TypeError(optMessage || 'Cannot call method on ' + value);
		}
		return value;
	},
	IsCallable: IsCallable,
	SameValue: function SameValue(x, y) {
		if (x === y) { // 0 === -0, but they are not identical.
			if (x === 0) { return 1 / x === 1 / y; }
			return true;
		}
		return $isNaN(x) && $isNaN(y);
	},

	// http://www.ecma-international.org/ecma-262/5.1/#sec-8
	Type: function Type(x) {
		if (x === null) {
			return 'Null';
		}
		if (typeof x === 'undefined') {
			return 'Undefined';
		}
		if (typeof x === 'function' || typeof x === 'object') {
			return 'Object';
		}
		if (typeof x === 'number') {
			return 'Number';
		}
		if (typeof x === 'boolean') {
			return 'Boolean';
		}
		if (typeof x === 'string') {
			return 'String';
		}
	}
};

module.exports = ES5;


/***/ },
/* 86 */
/***/ function(module, exports) {

var has = Object.prototype.hasOwnProperty;
module.exports = Object.assign || function assign(target, source) {
	for (var key in source) {
		if (has.call(source, key)) {
			target[key] = source[key];
		}
	}
	return target;
};


/***/ },
/* 87 */
/***/ function(module, exports) {

module.exports = function isPrimitive(value) {
	return value === null || (typeof value !== 'function' && typeof value !== 'object');
};


/***/ },
/* 88 */
/***/ function(module, exports, __webpack_require__) {

"use strict";


var toStr = Object.prototype.toString;

var isPrimitive = __webpack_require__(43);

var isCallable = __webpack_require__(19);

// https://es5.github.io/#x8.12
var ES5internalSlots = {
	'[[DefaultValue]]': function (O, hint) {
		var actualHint = hint || (toStr.call(O) === '[object Date]' ? String : Number);

		if (actualHint === String || actualHint === Number) {
			var methods = actualHint === String ? ['toString', 'valueOf'] : ['valueOf', 'toString'];
			var value, i;
			for (i = 0; i < methods.length; ++i) {
				if (isCallable(O[methods[i]])) {
					value = O[methods[i]]();
					if (isPrimitive(value)) {
						return value;
					}
				}
			}
			throw new TypeError('No default value');
		}
		throw new TypeError('invalid [[DefaultValue]] hint supplied');
	}
};

// https://es5.github.io/#x9
module.exports = function ToPrimitive(input, PreferredType) {
	if (isPrimitive(input)) {
		return input;
	}
	return ES5internalSlots['[[DefaultValue]]'](input, PreferredType);
};


/***/ },
/* 89 */
/***/ function(module, exports, __webpack_require__) {

"use strict";


var hasSymbols = typeof Symbol === 'function' && typeof Symbol.iterator === 'symbol';

var isPrimitive = __webpack_require__(43);
var isCallable = __webpack_require__(19);
var isDate = __webpack_require__(93);
var isSymbol = __webpack_require__(95);

var ordinaryToPrimitive = function OrdinaryToPrimitive(O, hint) {
	if (typeof O === 'undefined' || O === null) {
		throw new TypeError('Cannot call method on ' + O);
	}
	if (typeof hint !== 'string' || (hint !== 'number' && hint !== 'string')) {
		throw new TypeError('hint must be "string" or "number"');
	}
	var methodNames = hint === 'string' ? ['toString', 'valueOf'] : ['valueOf', 'toString'];
	var method, result, i;
	for (i = 0; i < methodNames.length; ++i) {
		method = O[methodNames[i]];
		if (isCallable(method)) {
			result = method.call(O);
			if (isPrimitive(result)) {
				return result;
			}
		}
	}
	throw new TypeError('No default value');
};

var GetMethod = function GetMethod(O, P) {
	var func = O[P];
	if (func !== null && typeof func !== 'undefined') {
		if (!isCallable(func)) {
			throw new TypeError(func + ' returned for property ' + P + ' of object ' + O + ' is not a function');
		}
		return func;
	}
};

// http://www.ecma-international.org/ecma-262/6.0/#sec-toprimitive
module.exports = function ToPrimitive(input, PreferredType) {
	if (isPrimitive(input)) {
		return input;
	}
	var hint = 'default';
	if (arguments.length > 1) {
		if (PreferredType === String) {
			hint = 'string';
		} else if (PreferredType === Number) {
			hint = 'number';
		}
	}

	var exoticToPrim;
	if (hasSymbols) {
		if (Symbol.toPrimitive) {
			exoticToPrim = GetMethod(input, Symbol.toPrimitive);
		} else if (isSymbol(input)) {
			exoticToPrim = Symbol.prototype.valueOf;
		}
	}
	if (typeof exoticToPrim !== 'undefined') {
		var result = exoticToPrim.call(input, hint);
		if (isPrimitive(result)) {
			return result;
		}
		throw new TypeError('unable to convert exotic object to primitive');
	}
	if (hint === 'default' && (isDate(input) || isSymbol(input))) {
		hint = 'string';
	}
	return ordinaryToPrimitive(input, hint === 'default' ? 'number' : hint);
};


/***/ },
/* 90 */
/***/ function(module, exports) {


var hasOwn = Object.prototype.hasOwnProperty;
var toString = Object.prototype.toString;

module.exports = function forEach (obj, fn, ctx) {
    if (toString.call(fn) !== '[object Function]') {
        throw new TypeError('iterator must be a function');
    }
    var l = obj.length;
    if (l === +l) {
        for (var i = 0; i < l; i++) {
            fn.call(ctx, obj[i], i, obj);
        }
    } else {
        for (var k in obj) {
            if (hasOwn.call(obj, k)) {
                fn.call(ctx, obj[k], k, obj);
            }
        }
    }
};



/***/ },
/* 91 */
/***/ function(module, exports) {

var ERROR_MESSAGE = 'Function.prototype.bind called on incompatible ';
var slice = Array.prototype.slice;
var toStr = Object.prototype.toString;
var funcType = '[object Function]';

module.exports = function bind(that) {
    var target = this;
    if (typeof target !== 'function' || toStr.call(target) !== funcType) {
        throw new TypeError(ERROR_MESSAGE + target);
    }
    var args = slice.call(arguments, 1);

    var bound;
    var binder = function () {
        if (this instanceof bound) {
            var result = target.apply(
                this,
                args.concat(slice.call(arguments))
            );
            if (Object(result) === result) {
                return result;
            }
            return this;
        } else {
            return target.apply(
                that,
                args.concat(slice.call(arguments))
            );
        }
    };

    var boundLength = Math.max(0, target.length - args.length);
    var boundArgs = [];
    for (var i = 0; i < boundLength; i++) {
        boundArgs.push('$' + i);
    }

    bound = Function('binder', 'return function (' + boundArgs.join(',') + '){ return binder.apply(this,arguments); }')(binder);

    if (target.prototype) {
        var Empty = function Empty() {};
        Empty.prototype = target.prototype;
        bound.prototype = new Empty();
        Empty.prototype = null;
    }

    return bound;
};


/***/ },
/* 92 */
/***/ function(module, exports, __webpack_require__) {

var implementation = __webpack_require__(91);

module.exports = Function.prototype.bind || implementation;


/***/ },
/* 93 */
/***/ function(module, exports, __webpack_require__) {

"use strict";


var getDay = Date.prototype.getDay;
var tryDateObject = function tryDateObject(value) {
	try {
		getDay.call(value);
		return true;
	} catch (e) {
		return false;
	}
};

var toStr = Object.prototype.toString;
var dateClass = '[object Date]';
var hasToStringTag = typeof Symbol === 'function' && typeof Symbol.toStringTag === 'symbol';

module.exports = function isDateObject(value) {
	if (typeof value !== 'object' || value === null) { return false; }
	return hasToStringTag ? tryDateObject(value) : toStr.call(value) === dateClass;
};


/***/ },
/* 94 */
/***/ function(module, exports, __webpack_require__) {

"use strict";


var regexExec = RegExp.prototype.exec;
var tryRegexExec = function tryRegexExec(value) {
	try {
		regexExec.call(value);
		return true;
	} catch (e) {
		return false;
	}
};
var toStr = Object.prototype.toString;
var regexClass = '[object RegExp]';
var hasToStringTag = typeof Symbol === 'function' && typeof Symbol.toStringTag === 'symbol';

module.exports = function isRegex(value) {
	if (typeof value !== 'object') { return false; }
	return hasToStringTag ? tryRegexExec(value) : toStr.call(value) === regexClass;
};


/***/ },
/* 95 */
/***/ function(module, exports, __webpack_require__) {

"use strict";


var toStr = Object.prototype.toString;
var hasSymbols = typeof Symbol === 'function' && typeof Symbol() === 'symbol';

if (hasSymbols) {
	var symToStr = Symbol.prototype.toString;
	var symStringRegex = /^Symbol\(.*\)$/;
	var isSymbolObject = function isSymbolObject(value) {
		if (typeof value.valueOf() !== 'symbol') { return false; }
		return symStringRegex.test(symToStr.call(value));
	};
	module.exports = function isSymbol(value) {
		if (typeof value === 'symbol') { return true; }
		if (toStr.call(value) !== '[object Symbol]') { return false; }
		try {
			return isSymbolObject(value);
		} catch (e) {
			return false;
		}
	};
} else {
	module.exports = function isSymbol(value) {
		// this environment does not support Symbols.
		return false;
	};
}


/***/ },
/* 96 */
/***/ function(module, exports, __webpack_require__) {

"use strict";


// modified from https://github.com/es-shims/es5-shim
var has = Object.prototype.hasOwnProperty;
var toStr = Object.prototype.toString;
var slice = Array.prototype.slice;
var isArgs = __webpack_require__(97);
var isEnumerable = Object.prototype.propertyIsEnumerable;
var hasDontEnumBug = !isEnumerable.call({ toString: null }, 'toString');
var hasProtoEnumBug = isEnumerable.call(function () {}, 'prototype');
var dontEnums = [
	'toString',
	'toLocaleString',
	'valueOf',
	'hasOwnProperty',
	'isPrototypeOf',
	'propertyIsEnumerable',
	'constructor'
];
var equalsConstructorPrototype = function (o) {
	var ctor = o.constructor;
	return ctor && ctor.prototype === o;
};
var excludedKeys = {
	$console: true,
	$external: true,
	$frame: true,
	$frameElement: true,
	$frames: true,
	$innerHeight: true,
	$innerWidth: true,
	$outerHeight: true,
	$outerWidth: true,
	$pageXOffset: true,
	$pageYOffset: true,
	$parent: true,
	$scrollLeft: true,
	$scrollTop: true,
	$scrollX: true,
	$scrollY: true,
	$self: true,
	$webkitIndexedDB: true,
	$webkitStorageInfo: true,
	$window: true
};
var hasAutomationEqualityBug = (function () {
	/* global window */
	if (typeof window === 'undefined') { return false; }
	for (var k in window) {
		try {
			if (!excludedKeys['$' + k] && has.call(window, k) && window[k] !== null && typeof window[k] === 'object') {
				try {
					equalsConstructorPrototype(window[k]);
				} catch (e) {
					return true;
				}
			}
		} catch (e) {
			return true;
		}
	}
	return false;
}());
var equalsConstructorPrototypeIfNotBuggy = function (o) {
	/* global window */
	if (typeof window === 'undefined' || !hasAutomationEqualityBug) {
		return equalsConstructorPrototype(o);
	}
	try {
		return equalsConstructorPrototype(o);
	} catch (e) {
		return false;
	}
};

var keysShim = function keys(object) {
	var isObject = object !== null && typeof object === 'object';
	var isFunction = toStr.call(object) === '[object Function]';
	var isArguments = isArgs(object);
	var isString = isObject && toStr.call(object) === '[object String]';
	var theKeys = [];

	if (!isObject && !isFunction && !isArguments) {
		throw new TypeError('Object.keys called on a non-object');
	}

	var skipProto = hasProtoEnumBug && isFunction;
	if (isString && object.length > 0 && !has.call(object, 0)) {
		for (var i = 0; i < object.length; ++i) {
			theKeys.push(String(i));
		}
	}

	if (isArguments && object.length > 0) {
		for (var j = 0; j < object.length; ++j) {
			theKeys.push(String(j));
		}
	} else {
		for (var name in object) {
			if (!(skipProto && name === 'prototype') && has.call(object, name)) {
				theKeys.push(String(name));
			}
		}
	}

	if (hasDontEnumBug) {
		var skipConstructor = equalsConstructorPrototypeIfNotBuggy(object);

		for (var k = 0; k < dontEnums.length; ++k) {
			if (!(skipConstructor && dontEnums[k] === 'constructor') && has.call(object, dontEnums[k])) {
				theKeys.push(dontEnums[k]);
			}
		}
	}
	return theKeys;
};

keysShim.shim = function shimObjectKeys() {
	if (Object.keys) {
		var keysWorksWithArguments = (function () {
			// Safari 5.0 bug
			return (Object.keys(arguments) || '').length === 2;
		}(1, 2));
		if (!keysWorksWithArguments) {
			var originalKeys = Object.keys;
			Object.keys = function keys(object) {
				if (isArgs(object)) {
					return originalKeys(slice.call(object));
				} else {
					return originalKeys(object);
				}
			};
		}
	} else {
		Object.keys = keysShim;
	}
	return Object.keys || keysShim;
};

module.exports = keysShim;


/***/ },
/* 97 */
/***/ function(module, exports, __webpack_require__) {

"use strict";


var toStr = Object.prototype.toString;

module.exports = function isArguments(value) {
	var str = toStr.call(value);
	var isArgs = str === '[object Arguments]';
	if (!isArgs) {
		isArgs = str !== '[object Array]' &&
			value !== null &&
			typeof value === 'object' &&
			typeof value.length === 'number' &&
			value.length >= 0 &&
			toStr.call(value.callee) === '[object Function]';
	}
	return isArgs;
};


/***/ },
/* 98 */
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


/***/ }
/******/ ]);
});