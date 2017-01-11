(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["C"] = factory();
	else
		root["C"] = factory();
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
/******/ 	return __webpack_require__(__webpack_require__.s = 86);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

"use strict";


var Problem = __webpack_require__(2);

function isProblem(x) {
  return x instanceof Problem;
}

module.exports = isProblem;

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

"use strict";


function Clause(_ref) {
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
    throw new Error('Expressions are required when constructing a clause.');
  }

  this.exprs = exprs;
}

module.exports = Clause;

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

"use strict";


var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var PAREN_PAIRS = '❰❮❬❨❪﹙₍₎﹚❫❩❭❯❱';
var stringifyWithFnName = __webpack_require__(36);

function Problem(val, failsPredicate, subproblems, msg) {
  var _this = this;

  this.isProblem = true;

  if (arguments.length !== 4) {
    throw 'Problem arg len err';
  }

  this.val = val;
  this.name = 'Problem';
  this.failsPredicate = failsPredicate;
  // this.stack = (new Error()).stack;
  this.shortMessage = msg;
  this.subproblems = subproblems;

  this.message = _constructMessage(this, 0);
  this.toString = function () {
    return _this.message;
  };
}

function _constructMessage(_ref, lvl) {
  var subproblems = _ref.subproblems,
      val = _ref.val,
      shortMessage = _ref.shortMessage;

  if (Array.isArray(subproblems)) {
    var reasons;
    if (subproblems.length === 0) {
      return shortMessage + '; val: ' + stringifyWithFnName(val, null, 2);
    } else {
      reasons = subproblems.map(function (r) {
        return '' + _open(lvl) + _constructMessage(r, lvl + 1) + _close(lvl);
      });
      return shortMessage + ', because\n' + _repeatStr(' ', lvl * 2) + ' ' + reasons.join(', ');
    }
  } else if ((typeof subproblems === 'undefined' ? 'undefined' : _typeof(subproblems)) === 'object') {
    reasons = [];
    for (var name in subproblems) {
      if (subproblems.hasOwnProperty(name)) {
        reasons.push('-> ' + name + ': ' + _open(lvl) + ' ' + _constructMessage(subproblems[name], lvl + 1) + _close(lvl));
      }
    }
    return shortMessage + ', because\n' + _repeatStr(' ', lvl * 2) + ' ' + reasons.join(', ');
  }
}

function _repeatStr(str, n) {
  var r = '';
  for (var i = 0; i < n; i += 1) {
    r += str;
  }
  return r;
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
/* 3 */
/***/ function(module, exports, __webpack_require__) {

"use strict";


// stolen from https://github.com/Xotic750/get-function-name-x/blob/master/index.js

var isFunction = __webpack_require__(11);
var _getFnName;

if (function test() {}.name !== 'test') {
  var STRIP_COMMENTS = /((\/\/.*$)|(\/\*[\s\S]*?\*\/))/mg;
  var fToString = Function.prototype.toString;
  var pMatch = String.prototype.match;
  var pReplace = String.prototype.replace;
  var s = __webpack_require__(83).ws;
  var reName = new RegExp('^[' + s + ']*(?:function|class)[' + s + ']*\\*?[' + s + ']+([\\w\\$]+)[' + s + ']*', 'i');
  _getFnName = function getName(fn) {
    var name = pMatch.call(pReplace.call(fToString.call(fn), STRIP_COMMENTS, ' '), reName);
    return name && name[1] !== 'anonymous' ? name[1] : '';
  };
} else {
  /*jshint evil:true */
  if (new Function().name === 'anonymous') {
    _getFnName = function getName(fn) {
      return fn.name && fn.name !== 'anonymous' ? fn.name : '';
    };
  }
}

function getFunctionName(fn) {
  if (!isFunction(fn)) {
    return null;
  }
  if (fn.__predToString) {
    return fn.__predToString();
  }
  return _getFnName ? _getFnName(fn) : fn.name;
}

module.exports = getFunctionName;

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


var Clause = __webpack_require__(1);

function isClause(x) {
  return x instanceof Clause;
}

module.exports = isClause;

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

"use strict";


function isString(x) {
  return x !== null && x !== undefined && x.constructor === String;
}

module.exports = isString;

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

"use strict";


var coerceIntoClause = __webpack_require__(10);

module.exports = function clauseFromAlts(alts) {
  if (!alts) {
    console.error(alts);
    throw '!';
  }
  if (alts.clause) {
    return alts.clause;
  } else if (alts.pred) {
    return coerceIntoClause(alts.pred);
  } else if (alts.clauseRef) {
    return alts.clauseRef;
  } else if (alts.delayedClause) {
    return alts.delayedClause;
  } else {
    console.error('unsupported:', alts);
    throw 'Not implemented';
  }
};

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

"use strict";


var isFn = __webpack_require__(11);

function isPred(x) {
  return isFn(x);
}

module.exports = isPred;

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

"use strict";


var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var oAssign = __webpack_require__(4);
var Clause = __webpack_require__(1);
var isClause = __webpack_require__(5);
var isPred = __webpack_require__(8);
var isExpr = __webpack_require__(35);
var clauseFromAlts = __webpack_require__(7);
var isProblem = __webpack_require__(0);
var isClauseName = __webpack_require__(61);
var namedFn = __webpack_require__(14);
var isClauseRef = __webpack_require__(13);
var isDelayedClause = __webpack_require__(21);
var c = __webpack_require__(45);
var coerceIntoClause = __webpack_require__(10);
var fclause = __webpack_require__(18);
var walk = __webpack_require__(16);

var isObj = __webpack_require__(19);
var isStr = __webpack_require__(6);
var oneOf = __webpack_require__(32);
var not = __webpack_require__(31);

var clauseClause = coerceIntoClause(isClause);
var nameClause = coerceIntoClause(isClauseName);

var catOp = genMultiArgOp(c.CAT);
var orOp = genMultiArgOp(c.OR);
var zeroOrMoreOp = genSingleArgOp(c.Z_OR_M);
var oneOrMoreOp = genSingleArgOp(c.O_OR_M);
var zeroOrOneOp = genSingleArgOp(c.Z_OR_O);
var collOfOp = genSingleArgOp(c.COLL_OF);

var ClauseClause = coerceIntoClause(isClause);
var ClauseRefClause = coerceIntoClause(isClauseRef);
var DelayedClauseClause = coerceIntoClause(isDelayedClause);
var PredClause = coerceIntoClause(isPred);

// helper method for constructing labelled structure
function _labelled() {
  var arr = Array.prototype.slice.call(arguments);
  return {
    expressions: {
      withLabels: arr.map(function (_ref) {
        var _ref2 = _slicedToArray(_ref, 3),
            name = _ref2[0],
            type = _ref2[1],
            v = _ref2[2];

        return { name: name, expr: _defineProperty({}, type, v) };
      })
    }
  };
}

function _unlabelled() {
  var arr = Array.prototype.slice.call(arguments);
  return {
    expressions: {
      withoutLabels: arr.map(function (_ref3) {
        var _ref4 = _slicedToArray(_ref3, 2),
            type = _ref4[0],
            v = _ref4[1];

        return _defineProperty({}, type, v);
      })
    }
  };
}

var ExprClause = orOp(_labelled(['clause', 'clause', ClauseClause], ['pred', 'clause', PredClause], ['delayedClause', 'clause', DelayedClauseClause], ['clauseRef', 'clause', ClauseRefClause]));

var NameExprOptionalComment = catOp(_labelled(['name', 'clause', nameClause], ['comment', 'clause', zeroOrOneOp({ expr: { pred: isStr } })], ['expr', 'clause', ExprClause]));

var MultipleArgClause = catOp(_labelled(['expressions', 'clause', orOp(_labelled(['withLabels', 'clause', orOp(_unlabelled(['clause', zeroOrMoreOp({
  expr: { clause: NameExprOptionalComment }
})], ['clause', collOfOp({
  expr: { clause: NameExprOptionalComment }
})]))], ['withoutLabels', 'clause', zeroOrMoreOp({
  expr: { clause: ExprClause }
})]))], ['options', 'clause', zeroOrOneOp({
  expr: { pred: isOptionObject }
})]));

function isOptionObject(x) {
  return isObj(x) && !isExpr(x);
}

function andOp(exprs) {
  var andS = new Clause({
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

var multipleArgNoDupeClause = andOp([{ clause: MultipleArgClause }, { pred: noDupelicateLabels }]);

function noDupelicateLabels(_ref6) {
  var withLabels = _ref6.expressions.withLabels;

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

var AndFnClause = fclause({
  args: oneOrMoreOp({ expr: { clause: ExprClause }
  }),
  ret: isClause
});

var multipleArgOpClause = {
  args: multipleArgNoDupeClause,
  ret: clauseClause
};

var singleArgOpClauseFn = function singleArgOpClauseFn(optClauseAlts) {
  return {
    args: catOp(_labelled(['expr', 'clause', ExprClause], ['opts', 'clause', zeroOrOneOp({ expr: optClauseAlts })])),
    ret: clauseClause
  };
};

function genMultiArgOp(type) {
  return namedFn(type, function _(_ref7) {
    var _ref7$expressions = _ref7.expressions,
        withLabels = _ref7$expressions.withLabels,
        withoutLabels = _ref7$expressions.withoutLabels,
        options = _ref7.options;

    var exprs;
    if (withLabels) {
      exprs = withLabels;

      var coercedExprs = exprs.map(function (p) {
        var alts = p.expr;
        var s = clauseFromAlts(alts);

        return oAssign({}, p, {
          expr: s,
          clause: undefined, pred: undefined,
          clauseRef: undefined, delayedClause: undefined });
      });

      var opts = oAssign({}, options, {
        named: true
      });
      var s = new Clause({
        type: type,
        exprs: coercedExprs,
        opts: opts
      });

      s.conform = function conform(x) {
        return walk(s, x, { conform: true });
      };
      return s;
    } else if (withoutLabels) {
      exprs = withoutLabels;
      coercedExprs = exprs.map(function (p) {
        var s;
        if (p.clause) {
          s = p.clause;
          return oAssign({}, p, { expr: s, clause: undefined });
        } else if (p.pred) {
          s = coerceIntoClause(p.pred);
          return oAssign({}, p, { expr: s, pred: undefined });
        } else if (p.clauseRef) {
          s = p.clauseRef;
          return oAssign({}, p, { expr: s, clauseRef: undefined });
        } else if (p.delayedClause) {
          s = p.delayedClause;
          return oAssign({}, p, { expr: s, delayedClause: undefined });
        } else {
          console.error(p);
          throw '!';
        }
      });

      var _opts = oAssign({}, options, {
        named: false
      });

      s = new Clause({
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
      s = new Clause({
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

    if (p.clause) {
      expr = p.clause;
    } else if (p.pred) {
      expr = coerceIntoClause(p.pred);
    } else if (p.clauseRef) {
      expr = p.clauseRef;
    } else if (p.delayedClause) {
      expr = p.delayedClause;
    } else {
      console.error(p);
      throw 'internal err';
    }
    var sureClause = coerceIntoClause(expr);
    var s = new Clause({
      type: type,
      exprs: [sureClause],
      opts: oAssign({}, opts, { enclosedClause: sureClause })
    });

    s.conform = function conform(x) {
      return walk(s, x, { conform: true });
    };
    return s;
  });
}

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
                  clause: coerceIntoClause(isStr)
                },
                valExpression: {
                  clause: orOp(_labelled(['valExpressionOnly', 'clause', ExprClause], ['keyValExprPair', 'clause', catOp(_labelled(['keyExpression', 'clause', ExprClause], ['valExpression', 'clause', ExprClause]))]))
                }
              }
            }
          }
        }
      }
    }
  }
});

var KeyOnlyArray = zeroOrMoreOp({
  expr: { pred: isPropName }
});

var KeyArrayOrFieldDefs = orOp(_labelled(['keyList', 'clause', KeyOnlyArray], ['fieldDefs', 'clause', FieldDefs]));

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
                  clause: KeyArrayOrFieldDefs
                }
              }
            },
            'optionalFields': {
              keyValExprPair: {
                keyExpression: {
                  pred: oneOf('opt', 'optional')
                },
                valExpression: {
                  clause: KeyArrayOrFieldDefs
                }
              }
            }
          }
        }
      }
    }
  }
});

var MapOfFnClause = fclause({
  args: catOp(_labelled(['keyExpression', 'clause', ExprClause], ['valExpression', 'clause', ExprClause])),
  ret: isClause
});

var ShapeFnClause = fclause({
  args: catOp(_labelled(['shapeArgs', 'clause', ShapeArgs])),
  ret: isClause
});

function mapOfOp(cargs) {
  if (isProblem(cargs)) {
    throw cargs;
  }
  var keyExpression = cargs.keyExpression,
      valExpression = cargs.valExpression;


  var s = new Clause({
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
  var s = new Clause({
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

var shape = ShapeFnClause.instrumentConformed(shapeOp);
var mapOf = MapOfFnClause.instrumentConformed(mapOfOp);

var CollOfClause = fclause(singleArgOpClauseFn({ pred: isObj }));
var collOf = CollOfClause.instrumentConformed(collOfOp);

var CatFnClause = fclause(multipleArgOpClause);
var OrFnClause = fclause(multipleArgOpClause);
var ZeroOrMoreFnClause = fclause(singleArgOpClauseFn({ pred: isObj }));
var OneOrMoreFnClause = fclause(singleArgOpClauseFn({ pred: isObj }));
var ZeroOrOneFnClause = fclause(singleArgOpClauseFn({ pred: isObj }));
var and = AndFnClause.instrumentConformed(andOp);

var core = {
  cat: CatFnClause.instrumentConformed(catOp),
  or: OrFnClause.instrumentConformed(orOp),
  zeroOrMore: ZeroOrMoreFnClause.instrumentConformed(zeroOrMoreOp),
  zeroOrOne: ZeroOrOneFnClause.instrumentConformed(zeroOrOneOp),
  oneOrMore: OneOrMoreFnClause.instrumentConformed(oneOrMoreOp),
  ExprClause: ExprClause, ClauseClause: ClauseClause, PredClause: PredClause, DelayedClauseClause: DelayedClauseClause, ClauseRefClause: ClauseRefClause,
  CatFnClause: CatFnClause,
  AndFnClause: AndFnClause,
  OrFnClause: OrFnClause,
  ZeroOrMoreFnClause: ZeroOrMoreFnClause, OneOrMoreFnClause: OneOrMoreFnClause, ZeroOrOneFnClause: ZeroOrOneFnClause,
  CollOfClause: CollOfClause,
  collOf: collOf,
  and: and,
  shape: shape,
  keys: shape,
  mapOf: mapOf,
  ShapeFnClause: ShapeFnClause,
  MapOfFnClause: MapOfFnClause
};

core['alt'] = core.or;
core['*'] = core.zeroOrMore;
core['+'] = core.oneOrMore;
core['?'] = core.zeroOrOne;

module.exports = core;

// // // // //

// var TestClause = shapeOp({
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
// var r = TestClause.conform({a: 's'});
// console.log(r);


// // //
//
// var isStr = require( '../preds/isStr' );
// var isObj = require( '../preds/isObj' );
// var isNum = require( '../preds/isNum' );
// var isBool = require( '../preds/isBool' );

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

"use strict";


var isPred = __webpack_require__(8);
var isClause = __webpack_require__(5);
var isClauseRef = __webpack_require__(13);
var isDelayedClause = __webpack_require__(21);
var Clause = __webpack_require__(1);
var Problem = __webpack_require__(2);
var fnName = __webpack_require__(3);

var CLAUSE_TYPE_PRED = 'PRED';

function coerceIntoClause(expr) {
  if (isClause(expr) || isClauseRef(expr) || isDelayedClause(expr)) {
    return expr;
  } else if (isPred(expr)) {
    return _wrap(expr);
  } else {
    console.error(expr);
    throw new Error('Expression must either be a Clause object or a predication function that returns true or false. ');
  }
}

function _wrap(pred) {
  return new Clause({
    type: CLAUSE_TYPE_PRED,
    exprs: [pred],
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

module.exports = coerceIntoClause;

/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

"use strict";


function isFunction(x) {
  var getType = {};
  // (x || false) guarantees returning of boolean type
  return (x || false) && ['[object Function]', '[object GeneratorFunction]'].indexOf(getType.toString.call(x)) >= 0;
}

module.exports = isFunction;

/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

"use strict";


var isClause = __webpack_require__(5);

function conform(clause, x, options) {
  if (clause && isClause(clause)) {
    var r = clause.conform(x);
    return r;
  } else {
    throw new Error('Expression needs to be of type Clause. expression: \n' + clause + '\n offending value: ' + x);
  }
}

module.exports = conform;

/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

"use strict";


var ClauseRef = __webpack_require__(39);
// TODO
function isClauseRef(x) {
  return x instanceof ClauseRef;
}
module.exports = isClauseRef;

/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

"use strict";


function getNamedFn(fnName, fn, suffix) {
  if (fnName) {
    var inner = 'return function ' + fnName + (suffix || '') + '(){ return action.apply(this, arguments); };';
    return new Function('action', inner)(fn);
  } else {
    return fn;
  }
}

module.exports = getNamedFn;

/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

"use strict";


var oAssign = __webpack_require__(4);
var regex = __webpack_require__(9);

var _require = __webpack_require__(9),
    shape = _require.shape,
    keys = _require.keys,
    mapOf = _require.mapOf;

var nullable = __webpack_require__(50);
var undefinable = __webpack_require__(51);

var _require2 = __webpack_require__(42),
    wall = _require2.wall;

var equals = __webpack_require__(26);

var sCat = function sCat(str) {
  return regex.cat.apply(null, Array.prototype.slice.call(str).map(equals));
};

var other = {
  any: __webpack_require__(44),
  fclause: __webpack_require__(18),
  wall: wall, clause: wall,
  nullable: nullable, undefinable: undefinable,
  sCat: sCat
};

var r = oAssign({}, regex, { shape: shape, keys: keys, mapOf: mapOf }, other);
module.exports = r;

/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

"use strict";


var oAssign = __webpack_require__(4);
var nfaWalker = __webpack_require__(73);
var anyWalker = __webpack_require__(67);
var predWalker = __webpack_require__(74);
var wallWalker = __webpack_require__(76);
var fclauseWalker = __webpack_require__(71);
var shapeWalker = __webpack_require__(75);
var andWalker = __webpack_require__(66);
var collOfWalker = __webpack_require__(69);
var mapOfWalker = __webpack_require__(72);
var clauseRefWalker = __webpack_require__(68);
var delayedClauseWalker = __webpack_require__(70);
var coerceIntoClause = __webpack_require__(10);
var isProblem = __webpack_require__(0);

function walk(clause, x, opts) {
  var phase = opts.phase;

  var walker = _getWalker(clause);
  if (!phase) {
    // 2-pass algorithm:

    // in Pass 1 we just need to know if x validates to clause, and if so, how
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
  'CLAUSE_REF': clauseRefWalker,
  'DELAYED': delayedClauseWalker,
  'FCLAUSE': fclauseWalker,
  'MAP_OF': mapOfWalker
};

function _getWalker(expr) {

  var clause = coerceIntoClause(expr);
  var walker = walkerMap[clause.type];

  if (!walker) {
    throw 'unsupported type ' + clause.type;
  }

  var r = walker(clause, walk);
  return r;
}

module.exports = walk;

/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

"use strict";


var isNum = __webpack_require__(30);
var isNatInt = __webpack_require__(53);
var isInt = __webpack_require__(28);
var isBool = __webpack_require__(40);
var isFn = __webpack_require__(11);
var isObj = __webpack_require__(19);
var isPlainObj = __webpack_require__(54);
var equals = __webpack_require__(26);
var oneOf = __webpack_require__(32);
var isStr = __webpack_require__(6);
var isDate = __webpack_require__(52);
var not = __webpack_require__(31);
var instanceOf = __webpack_require__(27);
var isUuid = __webpack_require__(55);
var isArray = Array.isArray;

var e = {
  isNull: __webpack_require__(29),
  isUndefined: __webpack_require__(20),
  notEmpty: __webpack_require__(56),
  isBool: isBool, isBoolean: isBool,
  isFn: isFn, isFunction: isFn,
  isNum: isNum, isNumber: isNum,
  isNatInt: isNatInt, isNaturalNumber: isNatInt,
  isInt: isInt, isInteger: isInt,
  isObj: isObj, isObject: isObj,
  isPlainObj: isPlainObj, isPlainObject: isPlainObj,
  isStr: isStr, isString: isStr,
  isArray: isArray, isArr: isArray,
  equal: equals, equals: equals, equalsTo: equals, eq: equals,
  oneOf: oneOf,
  not: not,
  isDate: isDate,
  instanceOf: instanceOf,
  isUuid: isUuid, isUUID: isUuid
};

e.default = e;
module.exports = e;

/***/ },
/* 18 */
/***/ function(module, exports, __webpack_require__) {

"use strict";


var Clause = __webpack_require__(1);
var walk = __webpack_require__(16);
var fnName = __webpack_require__(3);

function fclause(fnClause) {
  var args = fnClause.args,
      ret = fnClause.ret,
      fn = fnClause.fn;

  var clause = new Clause({
    type: 'FCLAUSE',
    exprs: [],
    opts: fnClause
  });
  clause.instrumentConformed = function instrumentConformed(fn) {
    return walk(clause, fn, { conform: true, instrument: true });
  };
  clause.instrument = function instrument(fn) {
    return walk(clause, fn, { conform: false, instrument: true });
  };

  return clause;
}

module.exports = fclause;

/***/ },
/* 19 */
/***/ function(module, exports, __webpack_require__) {

"use strict";


var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

function isObject(x) {
  return (typeof x === 'undefined' ? 'undefined' : _typeof(x)) === 'object' && x !== null;
}

module.exports = isObject;

/***/ },
/* 20 */
/***/ function(module, exports, __webpack_require__) {

"use strict";


module.exports = function isUndefined(x) {
  return x === undefined;
};

/***/ },
/* 21 */
/***/ function(module, exports, __webpack_require__) {

"use strict";


var DelayedClause = __webpack_require__(25);
var instanceOf = __webpack_require__(27);

//TODO
module.exports = instanceOf(DelayedClause);

/***/ },
/* 22 */
/***/ function(module, exports, __webpack_require__) {

"use strict";


module.exports = function deref(clause) {
  var result = clause;
  while (result.get) {
    result = result.get();
  }

  return result;
};

/***/ },
/* 23 */
/***/ function(module, exports, __webpack_require__) {

"use strict";


module.exports = {
  conform: __webpack_require__(12),
  isValid: __webpack_require__(64),
  isNamespacePath: __webpack_require__(63),
  identity: __webpack_require__(34),
  isProblem: __webpack_require__(0),
  delayed: __webpack_require__(33),
  enforce: __webpack_require__(58),
  isExpr: __webpack_require__(35),
  isClause: __webpack_require__(5),
  isFclause: __webpack_require__(62),
  isClauseRef: __webpack_require__(13),
  describe: __webpack_require__(41),
  deref: __webpack_require__(22)
};

/***/ },
/* 24 */
/***/ function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.NamespaceObjClause = exports.MetaFnClause = exports.isNamespacePath = exports.NamespaceFnClause = exports.GetNSFnClause = exports.SetNSFnClause = exports.isClauseRef = undefined;

var _core = __webpack_require__(15);

var _utils = __webpack_require__(23);

var _preds = __webpack_require__(17);

var ExprOrPartialRefMapClause =
// or(
//  'expression',
(0, _utils.delayed)(function () {
  //TODO
  return _core.ExprClause;
});
// );

var GetArgClause = (0, _core.cat)('nsPath', _utils.isNamespacePath);

var GetNSFnClause = (0, _core.fclause)({
  args: GetArgClause,
  ret: _core.ExprClause
});

var SetArgClause = (0, _core.cat)('nsPath', _utils.isNamespacePath, 'expression', ExprOrPartialRefMapClause);

var SetNSFnClause = (0, _core.fclause)({
  args: SetArgClause,
  ret: _preds.isBool
});

var NamespaceFnClause = (0, _core.fclause)({
  args: (0, _core.or)('register', SetArgClause, 'retrieve', GetArgClause)
});

var MetaFnClause = (0, _core.fclause)({
  args: (0, _core.cat)('source', (0, _core.or)('namespacePath', _utils.isNamespacePath, 'expression', _utils.isExpr), 'metaObj', _preds.isObj),
  ret: _utils.isExpr
});

function isNamespaceFragment(x) {
  return !!/^[^.@%\&\*#]+/.test(x);
}

var NamespaceObjClause = (0, _core.shape)({
  optional: {
    subNamespaces: [isNamespaceFragment, (0, _utils.delayed)(function () {
      return NamespaceObjClause;
    })],
    '.meta': _preds.isObj,
    '.expr': _utils.isExpr
  }
});

exports.isClauseRef = _utils.isClauseRef;
exports.SetNSFnClause = SetNSFnClause;
exports.GetNSFnClause = GetNSFnClause;
exports.NamespaceFnClause = NamespaceFnClause;
exports.isNamespacePath = _utils.isNamespacePath;
exports.MetaFnClause = MetaFnClause;
exports.NamespaceObjClause = NamespaceObjClause;

/***/ },
/* 25 */
/***/ function(module, exports, __webpack_require__) {

"use strict";


var Clause = __webpack_require__(1);

function DelayedClause(_ref) {
  var getFn = _ref.getFn;

  this.type = 'DELAYED';
  this.get = getFn;
  var _this = this;

  _this.instrument = function instrumentDelayed(x) {
    var Clause = getFn();
    return Clause.instrument(x);
  };

  _this.instrumentConformed = function instrumentConformedDelayed(x) {
    var Clause = getFn();
    return Clause.instrumentConformed(x);
  };

  _this.conform = function conformDelayed(x) {
    var Clause = getFn();
    return Clause.conform(x);
  };
}

DelayedClause.prototype = Object.create(Clause.prototype);

module.exports = DelayedClause;

/***/ },
/* 26 */
/***/ function(module, exports, __webpack_require__) {

"use strict";


module.exports = function equals(test) {
  return function equalsVal(x) {
    return x === test;
  };
};

/***/ },
/* 27 */
/***/ function(module, exports, __webpack_require__) {

"use strict";


var fnName = __webpack_require__(3);
var namedFn = __webpack_require__(14);

module.exports = function instanceOf(t) {
  var n = fnName(t);

  var fn = function instanceOfX(x) {
    return x instanceof t;
  };

  if (n) {
    fn = namedFn('instanceOf_' + n, fn);
  }

  fn.__predToString = function () {
    return 'instanceOf(' + (n || '(anonymous_type)') + ')';
  };

  return fn;
};

/***/ },
/* 28 */
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
/* 29 */
/***/ function(module, exports, __webpack_require__) {

"use strict";


function isNull(x) {
  return x === null;
}

module.exports = isNull;

/***/ },
/* 30 */
/***/ function(module, exports, __webpack_require__) {

"use strict";


function isNum(x) {
  return typeof x === 'number';
}

module.exports = isNum;

/***/ },
/* 31 */
/***/ function(module, exports, __webpack_require__) {

"use strict";


var fnName = __webpack_require__(3);
var namedFn = __webpack_require__(14);

function not(pred) {
  var n = fnName(pred);

  var negated = function negated(x) {
    return !pred(x);
  };

  if (n) {
    return namedFn('not_' + n, negated);
  } else {
    return negated;
  }
}

module.exports = not;

/***/ },
/* 32 */
/***/ function(module, exports, __webpack_require__) {

"use strict";


module.exports = function oneOf() {
  var items;

  if (arguments.length === 1 && Array.isArray(arguments[0])) {
    items = arguments[0];
  } else if (arguments.length > 0) {
    items = Array.prototype.slice.call(arguments);
  } else {
    throw new Error('Items list is required.');
  }
  var fn = function oneOf(x) {
    return items.indexOf(x) >= 0;
  };
  fn.__predToString = function () {
    return 'oneOf('.concat([items.map(JSON.stringify).join(', ')]).concat(')');
  };
  return fn;
};

/***/ },
/* 33 */
/***/ function(module, exports, __webpack_require__) {

"use strict";


var DelayedClause = __webpack_require__(25);

function delayed(getFn) {
  return new DelayedClause({ getFn: getFn });
}

module.exports = delayed;

/***/ },
/* 34 */
/***/ function(module, exports, __webpack_require__) {

"use strict";


function identity(x) {
  return x;
}

module.exports = identity;

/***/ },
/* 35 */
/***/ function(module, exports, __webpack_require__) {

"use strict";


var isPred = __webpack_require__(8);
var isClause = __webpack_require__(5);
var isClauseRef = __webpack_require__(13);
var isDelayedClause = __webpack_require__(21);

function isExpr(x) {
  return isPred(x) || isClause(x) || isClauseRef(x) || isDelayedClause(x);
}

module.exports = isExpr;

/***/ },
/* 36 */
/***/ function(module, exports, __webpack_require__) {

"use strict";


var isFn = __webpack_require__(11);
var fnName = __webpack_require__(3);

function stringifyWithFnName(subject, currTransform) {

  var newArgs = Array.prototype.slice.call(arguments);

  newArgs[1] = function (key, val) {
    var r;
    if (isFn(val)) {
      // implicitly `toString` it
      var n = fnName(val);
      if (n) {
        r = n + '()';
      } else {
        r = val.toString();
      }
    } else {
      r = val;
    }
    return currTransform ? currTransform(r) : r;
  };

  return JSON.stringify.apply(this, newArgs);
}

module.exports = stringifyWithFnName;

/***/ },
/* 37 */
/***/ function(module, exports) {

/**
 * @file
 * <a href="https://travis-ci.org/Xotic750/has-symbol-support-x"
 * title="Travis status">
 * <img
 * src="https://travis-ci.org/Xotic750/has-symbol-support-x.svg?branch=master"
 * alt="Travis status" height="18">
 * </a>
 * <a href="https://david-dm.org/Xotic750/has-symbol-support-x"
 * title="Dependency status">
 * <img src="https://david-dm.org/Xotic750/has-symbol-support-x.svg"
 * alt="Dependency status" height="18"/>
 * </a>
 * <a
 * href="https://david-dm.org/Xotic750/has-symbol-support-x#info=devDependencies"
 * title="devDependency status">
 * <img src="https://david-dm.org/Xotic750/has-symbol-support-x/dev-status.svg"
 * alt="devDependency status" height="18"/>
 * </a>
 * <a href="https://badge.fury.io/js/has-symbol-support-x" title="npm version">
 * <img src="https://badge.fury.io/js/has-symbol-support-x.svg"
 * alt="npm version" height="18">
 * </a>
 *
 * hasSymbolSupport module. Tests if `Symbol` exists and creates the correct
 * type.
 *
 * <h2>ECMAScript compatibility shims for legacy JavaScript engines</h2>
 * `es5-shim.js` monkey-patches a JavaScript context to contain all EcmaScript 5
 * methods that can be faithfully emulated with a legacy JavaScript engine.
 *
 * `es5-sham.js` monkey-patches other ES5 methods as closely as possible.
 * For these methods, as closely as possible to ES5 is not very close.
 * Many of these shams are intended only to allow code to be written to ES5
 * without causing run-time errors in older engines. In many cases,
 * this means that these shams cause many ES5 methods to silently fail.
 * Decide carefully whether this is what you want. Note: es5-sham.js requires
 * es5-shim.js to be able to work properly.
 *
 * `json3.js` monkey-patches the EcmaScript 5 JSON implimentation faithfully.
 *
 * `es6.shim.js` provides compatibility shims so that legacy JavaScript engines
 * behave as closely as possible to ECMAScript 6 (Harmony).
 *
 * @version 1.0.11
 * @author Xotic750 <Xotic750@gmail.com>
 * @copyright  Xotic750
 * @license {@link <https://opensource.org/licenses/MIT> MIT}
 * @module has-symbol-support-x
 */

/*jslint maxlen:80, es6:true, white:true */

/*jshint bitwise:true, camelcase:true, curly:true, eqeqeq:true, forin:true,
  freeze:true, futurehostile:true, latedef:true, newcap:true, nocomma:true,
  nonbsp:true, singleGroups:true, strict:true, undef:true, unused:true,
  es3:false, esnext:true, plusplus:true, maxparams:1, maxdepth:1,
  maxstatements:1, maxcomplexity:1 */

/*global module */

;(function () {
  'use strict';

  /**
   * Indicates if `Symbol`exists and creates the correct type.
   * `true`, if it exists and creates the correct type, otherwise `false`.
   *
   * @type boolean
   */
  module.exports = typeof Symbol === 'function' && typeof Symbol() === 'symbol';
}());


/***/ },
/* 38 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/**
*
*	VALIDATE: undefined
*
*
*	DESCRIPTION:
*		- Validates if a value is undefined.
*
*
*	NOTES:
*		[1]
*
*
*	TODO:
*		[1]
*
*
*	LICENSE:
*		MIT
*
*	Copyright (c) 2014. Athan Reines.
*
*
*	AUTHOR:
*		Athan Reines. kgryte@gmail.com. 2014.
*
*/



/**
* FUNCTION: isUndefined( value )
*	Validates if a value is undefined.
*
* @param {*} value - value to be validated
* @returns {Boolean} boolean indicating whether value is undefined
*/
function isUndefined( value ) {
	return value === void 0;
} // end FUNCTION isUndefined()


// EXPORTS //

module.exports = isUndefined;


/***/ },
/* 39 */
/***/ function(module, exports, __webpack_require__) {

"use strict";


var Clause = __webpack_require__(1);

function ClauseRef(_ref) {
  var ref = _ref.ref,
      getFn = _ref.getFn,
      conformFn = _ref.conformFn;

  this.type = 'CLAUSE_REF';
  this.get = getFn;
  this.conform = conformFn;
  this.ref = ref;
}

ClauseRef.prototype = Object.create(Clause.prototype);

module.exports = ClauseRef;

/***/ },
/* 40 */
/***/ function(module, exports, __webpack_require__) {

"use strict";


function isBool(x) {
  return typeof x === 'boolean';
}

module.exports = isBool;

/***/ },
/* 41 */
/***/ function(module, exports, __webpack_require__) {

"use strict";


var _sExpression = __webpack_require__(65);

var _sExpression2 = _interopRequireDefault(_sExpression);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var humanReadable = __webpack_require__(60);
var isStr = __webpack_require__(6);
var conform = __webpack_require__(12);
var isProblem = __webpack_require__(0);
var handle = __webpack_require__(59);
var clauseFromAlts = __webpack_require__(7);
var fnName = __webpack_require__(3);

function describe(expr, interceptor, indent) {
  var sexpr = (0, _sExpression2.default)(expr);
  var cSexpr = _sExpression.SExpressionClause.conform(sexpr);
  if (isProblem(cSexpr)) {
    console.error(cSexpr);
    throw new Error('The given expression is not a valid expression.');
  }
  var strFragments = _strFragments(cSexpr);
  var r = _walkConcat(strFragments);

  return r;
}

function _strFragments(_ref) {
  var headAlt = _ref.head,
      params = _ref.params;

  var head = clauseFromAlts(headAlt);
  if (head.type === 'PRED') {
    return fnName(head.opts.predicate) + '()';
  }
  var label = humanReadable(head);
  var paramFrags = void 0;
  if (params) {
    paramFrags = params.map(_fragmentParamAlts);
  } else {
    paramFrags = [];
  }

  var commaedParamFrags = interpose(paramFrags, [', ']);

  return [label, '( '].concat(commaedParamFrags).concat(' )');
}

function interpose(arr, interArr) {
  if (arr.length === 0) {
    return arr;
  } else {
    return arr.reduce(function (acc, curr, idx) {
      if (idx < arr.length - 1) {
        return acc.concat([curr]).concat(interArr);
      } else {
        return acc.concat([curr]);
      }
    }, []);
  }
}

function _fragmentParamAlts(pAlts) {
  var r = handle(pAlts, {
    'label': function label(lbl) {
      return lbl;
    },
    'sExpression': _strFragments,
    'paramsObj': _fragmentParamsObj,
    'optionsObj': function optionsObj(o) {
      return JSON.stringify(o);
    },
    'recursive': function recursive(_ref2) {
      var expression = _ref2.expression;
      return ['<recursive>: ', humanReadable(expression)];
    }
  }, function () {
    throw '!';
  });
  return r;
}

function _fragmentParamsObj(pObj) {
  var r = [];
  r.push('{ ');
  var body = [];
  for (var label in pObj) {
    if (pObj.hasOwnProperty(label)) {
      var item = [];
      item.push(label + ': ');
      var r1 = handle(pObj[label], {
        paramList: function paramList(list) {
          return ['[ '].concat(interpose(list.map(_fragmentParamAlts), [', '])).concat(' ]');
        },
        paramMap: _fragmentParamsObj
      }, function () {
        throw '!';
      });
      item.push(r1);
      body.push(item);
    }
  }
  body = interpose(body, ', ');
  r = r.concat(body).concat([' }']);
  return r;
}

function _walkConcat(frags) {
  return frags.map(function (f) {
    if (isStr(f)) {
      return f;
    } else if (Array.isArray(f)) {
      return _walkConcat(f);
    }
  }).join('');
}

module.exports = describe;

/***/ },
/* 42 */
/***/ function(module, exports, __webpack_require__) {

"use strict";


var Clause = __webpack_require__(1);
var coerceIntoClause = __webpack_require__(10);

var _require = __webpack_require__(9),
    cat = _require.cat,
    ExprClause = _require.ExprClause;

var fclause = __webpack_require__(18);
var walk = __webpack_require__(16);

var WallFnClause = fclause({
  args: cat(ExprClause),
  ret: ExprClause
});

function wallOp(expr) {
  var clause = coerceIntoClause(expr);
  var wallS = new Clause({
    type: 'WALL',
    exprs: [clause],
    opts: { enclosedClause: clause }
  });
  wallS.conform = function andConform(x) {
    return walk(wallS, x, { conform: true });
  };
  return wallS;
}

var wall = WallFnClause.instrument(wallOp);

module.exports = {
  WallFnClause: WallFnClause, wall: wall
};

/***/ },
/* 43 */
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
/* 44 */
/***/ function(module, exports, __webpack_require__) {

"use strict";


var Clause = __webpack_require__(1);
var identity = __webpack_require__(34);
var CLAUSE_TYPE_ANY = 'ANY';

function any() {
  return new Clause({
    type: CLAUSE_TYPE_ANY,
    exprs: [],
    conformFn: identity
  });
}

module.exports = any;

/***/ },
/* 45 */
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
/* 46 */
/***/ function(module, exports, __webpack_require__) {

"use strict";


var fragment = __webpack_require__(47);
var Clause = __webpack_require__(1);
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

function evalClause(clause) {
  clause = deref(clause);
  var evalFn;

  if (clause.type === null) {
    throw 'Clause has no type: ' + clause;
  } else if (!(clause.type in evalFunctions)) {
    evalFn = evalFunctions.PRED;
  } else {
    evalFn = evalFunctions[clause.type];
  }
  var r = evalFn(clause);
  return r;
}

var evalChildThen = function evalChildThen(wrapper) {
  return function evalChildThenWrapped(clause) {
    var childFrag = evalClause(clause.exprs[0]);
    return wrapper(childFrag);
  };
};

var evalChildrenThen = function evalChildrenThen(wrapper) {
  return function evalChildrenThenWrapped(clause) {
    var childFrags = clause.exprs.map(function (child) {
      var s = evalClause(child.expr);
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
  return new Clause({
    type: 'ROOT',
    exprs: [expr]
  });
}

var compile = function compile(expr) {
  var rootedExpr = wrapRoot(expr);
  var fragment = evalClause(rootedExpr);
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
      outTrans[fragTrans.target.index] = fragTrans.clause;
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
/* 47 */
/***/ function(module, exports, __webpack_require__) {

"use strict";


function fragmentState(transitions, index) {
  return {
    transitions: transitions === null ? [] : transitions,
    index: index || null
  };
}

function fragmentTransition(clause, target) {
  return {
    clause: clause,
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

build.PRED = function PRED(clause) {
  var trans = fragmentTransition(clause, null);
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
/* 48 */
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
              var interim = void 0;
              if (_c.fragment instanceof Empty) {
                interim = {};
              } else {
                interim = _defineProperty({}, _c.name, _c.fragment);
              }
              _acc2 = new GroupedAltPiece(interim);
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
        case 'clause':
          {
            var conformed = walkFn(curr.clause, curr.guide, walkOpts);
            valStack.push(new Value(conformed));
          }break;
        default:
          console.error(curr);throw 'FUUU';
      }
    }
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

  return retVal;
}

function _giveName(groupName, c) {
  if (c instanceof Nothing) {
    return new NamedPiece(groupName.name, new Empty());
  } else if (c instanceof GroupedPiece) {
    return new NamedPiece(groupName.name, c.fragment);
  } else if (c instanceof Piece || c instanceof GroupedAltPiece) {
    return new NamedPiece(groupName.name, c.fragment);
  } else if (c instanceof Value) {
    return new NamedPiece(groupName.name, c.value);
  } else if (c instanceof Empty) {
    return new NamedPiece(groupName.name, new Empty());
  } else {
    console.error(c);
    throw 'c!!!';
  }
}

function _giveAltName(groupName, c) {
  if (c instanceof Nothing) {
    return new NamedAltPiece(groupName.name, new Empty());
  } else if (c instanceof GroupedAltPiece) {
    return new NamedAltPiece(groupName.name, c.fragment);
  } else if (c instanceof Piece) {
    return new NamedAltPiece(groupName.name, c.fragment);
  } else if (c instanceof GroupedPiece) {
    return new NamedAltPiece(groupName.name, c.fragment);
  } else if (c instanceof Value) {
    return new NamedAltPiece(groupName.name, c.value);
  } else if (c instanceof Empty) {
    return new NamedAltPiece(groupName.name, new Empty());
  } else {
    console.error(c);
    throw 'c!!!alt';
  }
}

function _foldLeft(inputType, conform, acc, c) {

  if (conform && c instanceof NamedPiece) {
    var rightPart = void 0;

    if (acc instanceof Nothing) {
      rightPart = {};
    } else if (!acc) {
      rightPart = {};
    } else if (acc instanceof Empty) {
      rightPart = {};
    } else if (acc instanceof GroupedPiece) {
      rightPart = acc.fragment;
    } else if (acc instanceof Piece) {
      rightPart = acc.fragment;
    } else if (acc instanceof GroupedAltPiece) {
      rightPart = acc.fragment;
    } else {
      console.error(acc, c);
      throw '!!acc_fl_np';
    }
    var interim = void 0;
    if (c.fragment instanceof Empty) {
      interim = {};
    } else {
      interim = _defineProperty({}, c.name, c.fragment);
    }
    var gp = new GroupedPiece(oAssign({}, interim, rightPart));
    return gp;
  } else {
    var leftArr = void 0,
        rightArr1 = void 0;
    if (acc instanceof Nothing) {
      rightArr1 = [];
    } else if (!acc) {
      rightArr1 = [];
    } else if (acc instanceof Piece) {
      rightArr1 = acc.fragment;
    } else if (acc instanceof GroupedPiece) {
      rightArr1 = [acc.fragment];
    } else if (acc instanceof Empty) {
      rightArr1 = [];
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
    var p = new Piece(_coerceToProperType(inputType, leftArr.concat(rightArr1)));
    return p;
  }
}

function _coerceToProperType(t, arr) {
  if (t === 'string' && Array.isArray(arr)) {
    // var r = arr.reduce( ( acc, curr ) => {
    //   if ( typeof curr === 'string' && acc.length > 0 || typeof acc[ acc.length - 1 ] === 'string' ) {
    //     return acc.slice( 0, acc.length - 1 ).concat( acc[ acc.length - 1 ].concat( curr ) );
    //   } else {
    //     return acc.concat( [ curr ] );
    //   }
    // }, [] );
    // if ( !r ) {
    //   debugger;
    // }
    // if ( r.length === 1 && typeof r[ 0 ] === 'string' ) {
    // // pure string
    //   return r[ 0 ];
    // } else {
    //   return r;
    // }
    return arr.join('');
  } else {
    return arr;
  }
}

module.exports = getMatch;

/***/ },
/* 49 */
/***/ function(module, exports, __webpack_require__) {

"use strict";


var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var isProblem = __webpack_require__(0);
var isStr = __webpack_require__(6);

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
      if (m) {
        if (m.isProblem) {
          var name = m.name,
              problem = m.problem,
              position = m.position;

          r.lastProblem = { name: name, problem: problem, position: position };
        } else {
          frontier.push(m);
        }
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

  var name = transition.name || current.move && current.move.name;
  if (nextOffset <= input.length) {
    if (transition.isEpsilon) {
      if (transition.dir) {
        move = {
          dir: transition.dir,
          name: transition.name,
          op: transition.op,
          group: transition.group
        };
      } else {
        move = null;
      }
      next = {
        input: input, groupCount: groupCount, arrayed: arrayed,
        state: nextState,
        offset: nextOffset,
        move: move,
        clause: transition,
        prev: current,
        isEpsilon: true
      };
      return next;
    } else {
      validateResult = walkFn(transition, observed, walkOpts);
      // validateResult = walkFn(transition, observed, walkOpts);
      if (!isProblem(validateResult)) {
        if (currentOffset < input.length) {
          move = { dir: 'clause' };
          next = {
            input: input, groupCount: groupCount, arrayed: arrayed,
            state: nextState,
            offset: nextOffset,
            move: move,
            prev: current,
            isEpsilon: false,
            clause: transition,
            guide: validateResult
          };
          return next;
        }
      } else {
        return { isProblem: true, problem: validateResult, name: name, position: currentOffset };
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
        o.clause = curr.clause;
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
/* 50 */
/***/ function(module, exports, __webpack_require__) {

"use strict";


var _require = __webpack_require__(9),
    or = _require.or;

var isNull = __webpack_require__(29);

function nullable(clause) {
  return or(isNull, clause);
}

module.exports = nullable;

/***/ },
/* 51 */
/***/ function(module, exports, __webpack_require__) {

"use strict";


var _require = __webpack_require__(9),
    or = _require.or;

var isUndefined = __webpack_require__(20);

function undefinable(clause) {
  return or(isUndefined, clause);
}

module.exports = undefinable;

/***/ },
/* 52 */
/***/ function(module, exports, __webpack_require__) {

"use strict";


module.exports = function isDate(date) {
  return date && date instanceof Date && !isNaN(date.valueOf());
};

/***/ },
/* 53 */
/***/ function(module, exports, __webpack_require__) {

"use strict";


var isInt = __webpack_require__(28);

function isNatInt(x) {
  return isInt(x) && x >= 0.0;
}

module.exports = isNatInt;

/***/ },
/* 54 */
/***/ function(module, exports, __webpack_require__) {

"use strict";


var isObj = __webpack_require__(19);

function isPlainObject(x) {
  // Basic check for Type object that's not null
  if (isObj(x)) {

    // If Object.getPrototypeOf supported, use it
    if (typeof Object.getPrototypeOf == 'function') {
      var proto = Object.getPrototypeOf(x);
      return proto === Object.prototype || proto === null;
    }

    // Otherwise, use internal class
    // This should be reliable as if getPrototypeOf not supported, is pre-ES5
    return Object.prototype.toString.call(x) == '[object Object]';
  }

  // Not an object
  return false;
}

module.exports = isPlainObject;

/***/ },
/* 55 */
/***/ function(module, exports, __webpack_require__) {

"use strict";


module.exports = function isUuid(x) {
  return !!/^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(x);
};

/***/ },
/* 56 */
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
/* 57 */
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
/* 58 */
/***/ function(module, exports, __webpack_require__) {

"use strict";


var isProblem = __webpack_require__(0);
// TODO : replace with checkProblem
var conform = __webpack_require__(12);

module.exports = function enforce(clause, x) {
  var r = conform(clause, x);
  if (isProblem(r)) {
    throw r;
  }
  return undefined;
};

/***/ },
/* 59 */
/***/ function(module, exports, __webpack_require__) {

"use strict";


/**
 * convenient method used in conjunction with "and" and "or" conformation to handle labelled cases
 *
 */

function handle(alts, handlerMap, unknownCaseHandler) {
  for (var label in alts) {
    // should iterate only once
    if (alts.hasOwnProperty(label) && handlerMap.hasOwnProperty(label)) {
      return handlerMap[label](alts[label]);
    } else {
      return unknownCaseHandler(alts[label]);
    }
  }

  // only reach here if alts is empty
  console.error(alts);
  throw new Error('No cases present in the given object');
}

module.exports = handle;

/***/ },
/* 60 */
/***/ function(module, exports, __webpack_require__) {

"use strict";


var isStr = __webpack_require__(6);

var dict = {
  Z_OR_M: 'zeroOrMore',
  O_OR_M: 'oneOrMore',
  Z_OR_O: 'zeroOrOne',
  COLL_OF: 'collOf',
  MAP_OF: 'mapOf'
};

function humanReadable(expr) {
  if (isStr(expr)) {
    return expr;
  }
  if (!expr) {
    debugger;
  }
  if (expr.type) {
    if (dict[expr.type]) {
      return dict[expr.type];
    } else {
      return expr.type.toLowerCase();
    }
  } else {
    return expr.toString();
  }
}

module.exports = humanReadable;

/***/ },
/* 61 */
/***/ function(module, exports, __webpack_require__) {

"use strict";


var isStr = __webpack_require__(6);

//TODO
module.exports = function isClauseName(x) {
  return isStr(x);
};

/***/ },
/* 62 */
/***/ function(module, exports, __webpack_require__) {

"use strict";


var isClause = __webpack_require__(5);

function isFclause(x) {
  return isClause(x) && x.type === 'FCLAUSE';
}

module.exports = isFclause;

/***/ },
/* 63 */
/***/ function(module, exports, __webpack_require__) {

"use strict";


var isStr = __webpack_require__(6);

function isNamespacePath(x) {
  return isStr(x) && /^\/?[a-zA-Z0-9\-_\.]*\/([a-zA-Z0-9\-_]+)$/.test(x);
}

module.exports = isNamespacePath;

/***/ },
/* 64 */
/***/ function(module, exports, __webpack_require__) {

"use strict";


var isProblem = __webpack_require__(0);
var isPred = __webpack_require__(8);
var isClause = __webpack_require__(5);
var conform = __webpack_require__(12);

function isValid(pred, x) {
  if (!pred) {
    throw new Error('Clause is required');
  } else if (isClause(pred)) {
    return !isProblem(conform(pred, x));
  } else if (isPred(pred)) {
    return pred(x);
  } else {
    return true;
  }
}

module.exports = isValid;

/***/ },
/* 65 */
/***/ function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var fnName = __webpack_require__(3);
var clauseFromAlts = __webpack_require__(7);
var oAssign = __webpack_require__(4);

var _require = __webpack_require__(15),
    wall = _require.wall,
    any = _require.any,
    zeroOrMore = _require.zeroOrMore,
    and = _require.and,
    cat = _require.cat,
    or = _require.or,
    ExprClause = _require.ExprClause,
    mapOf = _require.mapOf;

var delayed = __webpack_require__(33);
var isPred = __webpack_require__(8);

var _require2 = __webpack_require__(17),
    isStr = _require2.isStr,
    isPlainObj = _require2.isPlainObj,
    instanceOf = _require2.instanceOf;

function Recursive(expression) {
  this.isRecursive = true;
  this.expression = expression;
}

function ParamsMap(map) {
  oAssign(this, map);
}

var ParamsMapC = and(instanceOf(ParamsMap), mapOf(any, or('paramList', zeroOrMore(delayed(function () {
  return ParamItemClause;
})), 'paramMap', delayed(function () {
  return ParamsMapC;
}))));

var ParamItemClause = or('label', isStr, 'sExpression', delayed(function () {
  return SExpressionClause;
}), 'paramsObj', ParamsMapC, 'optionsObj', isPlainObj, 'recursive', instanceOf(Recursive));

var SExpressionClause = wall(cat('head', ExprClause, 'params', zeroOrMore(ParamItemClause)));

var singleArgParamGenerator = function singleArgParamGenerator(repo, _ref) {
  var enclosedClause = _ref.opts.enclosedClause;
  return [_createSExpr(repo, enclosedClause)];
};

var multipleArgParamGenerator = function multipleArgParamGenerator(repo, _ref2) {
  var named = _ref2.opts.named,
      exprs = _ref2.exprs;

  if (exprs.length === 0) {
    //empty case
    return [];
  } else if (named) {
    return exprs.reduce(function (acc, _ref3) {
      var name = _ref3.name,
          expr = _ref3.expr;
      return acc.concat(['"' + name + '"', _createSExpr(repo, expr)]);
    }, []);
  } else {
    return exprs.reduce(function (acc, _ref4) {
      var expr = _ref4.expr;
      return acc.concat([_createSExpr(repo, expr)]);
    }, []);
  }
};

var sParamsConverters = {
  'PRED': function PRED(repo, _ref5) {
    var predicate = _ref5.opts.predicate;
    return [fnName(predicate) + '()'];
  },
  'WALL': function WALL(repo, _ref6) {
    var enclosedClause = _ref6.opts.enclosedClause;
    return [_createSExpr(repo, enclosedClause)];
  },
  'AND': function AND(repo, _ref7) {
    var conformedExprs = _ref7.opts.conformedExprs;
    return conformedExprs.map(clauseFromAlts);
  },
  'CAT': multipleArgParamGenerator,
  'OR': multipleArgParamGenerator,
  'Z_OR_M': singleArgParamGenerator,
  'O_OR_M': singleArgParamGenerator,
  'Z_OR_O': singleArgParamGenerator,
  'COLL_OF': singleArgParamGenerator,
  'ANY': function ANY() {
    return [];
  },
  // TODO
  'MAP_OF': function MAP_OF() {
    return [];
  },
  // TODO
  'SHAPE': function SHAPE(repo, _ref8) {
    var _ref8$opts$conformedA = _ref8.opts.conformedArgs.shapeArgs,
        _ref8$opts$conformedA2 = _ref8$opts$conformedA.optionalFields;
    _ref8$opts$conformedA2 = _ref8$opts$conformedA2 === undefined ? {} : _ref8$opts$conformedA2;
    var opt = _ref8$opts$conformedA2.opt,
        optional = _ref8$opts$conformedA2.optional,
        _ref8$opts$conformedA3 = _ref8$opts$conformedA.requiredFields;
    _ref8$opts$conformedA3 = _ref8$opts$conformedA3 === undefined ? {} : _ref8$opts$conformedA3;
    var req = _ref8$opts$conformedA3.req,
        required = _ref8$opts$conformedA3.required;
    return oAssign(new ParamsMap(), req || required ? {
      required: _fieldDefToFrags(repo, req || required)
    } : {}, opt || optional ? {
      optional: _fieldDefToFrags(repo, opt || optional)
    } : {});
  },
  'FCLAUSE': function FCLAUSE(repo, _ref9) {
    var _ref9$opts = _ref9.opts,
        args = _ref9$opts.args,
        ret = _ref9$opts.ret,
        fn = _ref9$opts.fn;
    return oAssign(new ParamsMap(), args ? { args: _createSExpr(repo, args) } : {}, ret ? { ret: _createSExpr(repo, ret) } : {}, fn ? { fn: fnName(fn) + '()' } : {});
  }
};

function _fieldDefToFrags(repo, _ref10) {
  var _ref10$fieldDefs = _ref10.fieldDefs;
  _ref10$fieldDefs = _ref10$fieldDefs === undefined ? {} : _ref10$fieldDefs;
  var fields = _ref10$fieldDefs.fields,
      keyList = _ref10.keyList;

  if (fields) {
    var r = new ParamsMap();
    for (var key in fields) {
      if (fields.hasOwnProperty(key)) {
        var _fields$key = fields[key],
            keyValExprPair = _fields$key.keyValExprPair,
            valExpressionOnly = _fields$key.valExpressionOnly;

        if (keyValExprPair) {
          var keyExpression = keyValExprPair.keyExpression,
              valExpression = keyValExprPair.valExpression;

          oAssign(r, _defineProperty({}, key, {
            '<keyExpression>': _createSExpr(repo, clauseFromAlts(keyExpression)),
            '<valExpression>': _createSExpr(repo, clauseFromAlts(valExpression))
          }));
        } else if (valExpressionOnly) {
          oAssign(r, _defineProperty({}, key, _createSExpr(repo, clauseFromAlts(valExpressionOnly))));
        }
      }
    }
    return r;
  } else if (keyList) {
    return keyList;
  } else {
    throw '!';
  }
}

function _params(repo, clause) {
  var converter = sParamsConverters[clause.type];
  if (!converter) {
    console.error(clause);
    throw new Error('Unsupported clause type ' + clause.type + '.');
  } else {
    return converter(repo, clause);
  }
}

function _createSExpr(repo, expr) {
  if (_exists(repo, expr)) {
    return new Recursive(expr);
  }
  var realExpr = void 0,
      newRepo = repo;
  if (isPred(expr)) {
    return fnName(expr) + '()';
  } else if (expr.type === 'DELAYED' || expr.type === 'CLAUSE_REF') {
    realExpr = expr.get();
    return _createSExpr(repo, realExpr);
  } else {
    realExpr = expr;
    newRepo = _addToRepo(repo, expr);
  }
  var params = _params(newRepo, realExpr);
  return [realExpr].concat(params);
}

function _addToRepo(repo, expr) {
  if (!_exists(repo, expr)) {
    return repo.concat([expr]);
  }
}

function _exists(repo, piece) {
  return repo.indexOf(piece) >= 0;
}

function sExpression(expr) {
  var repo = [];
  return _createSExpr(repo, expr);
}

exports.default = sExpression;
exports.SExpressionClause = SExpressionClause;
exports.ParamItemClause = ParamItemClause;

/***/ },
/* 66 */
/***/ function(module, exports, __webpack_require__) {

"use strict";


var Problem = __webpack_require__(2);
var isProblem = __webpack_require__(0);
var clauseFromAlts = __webpack_require__(7);
var oAssign = __webpack_require__(4);

function andWalker(clause, walkFn) {
  var exprs = clause.opts.conformedExprs.map(clauseFromAlts);

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
    // or as a separate clause construct such as "propagate"
    return conforms[exprs.length - 1];
  }
}

module.exports = andWalker;

/***/ },
/* 67 */
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
/* 68 */
/***/ function(module, exports, __webpack_require__) {

"use strict";


function clauseRefWalker(clauseRef, walkFn) {

  return {
    trailblaze: walkClauseRef,
    reconstruct: walkClauseRef
  };

  function walkClauseRef(x, walkOpts) {
    var s = clauseRef.get();
    if (s) {
      return walkFn(s, x, walkOpts);
    }
  }
}

module.exports = clauseRefWalker;

/***/ },
/* 69 */
/***/ function(module, exports, __webpack_require__) {

"use strict";


var Problem = __webpack_require__(2);
var isProblem = __webpack_require__(0);
var isNum = __webpack_require__(30);

function collOfWalker(clause, walkFn) {
  var expr = clause.exprs[0];
  var opts = clause.opts;

  return {
    trailblaze: collOfTrailblaze,
    reconstruct: collOfReconstruct
  };

  function collOfTrailblaze(x, walkOpts) {

    var guides = [],
        problems = [];

    if (!Array.isArray(x)) {
      return new Problem(x, clause, [], 'collOf expects an array');
    } else {

      if (opts) {
        var maxCount = opts.maxCount,
            minCount = opts.minCount;


        if (isNum(maxCount) && x.length > maxCount) {
          return new Problem(x, clause, problems, 'collOf: collection size ' + x.length + ' exceeds maxCount ' + maxCount + '.');
        }

        if (isNum(minCount) && x.length < minCount) {
          return new Problem(x, clause, problems, 'collOf: collection size ' + x.length + ' is less than minCount ' + minCount + '.');
        }
      }

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
        return new Problem(x, clause, problems, 'One or more elements failed collOf test');
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
/* 70 */
/***/ function(module, exports, __webpack_require__) {

"use strict";


function delayedClauseWalker(delayedClause, walkFn) {
  return {
    trailblaze: walkDelayedClause,
    reconstruct: walkDelayedClause
  };

  function walkDelayedClause(x, walkOpts) {
    var s = delayedClause.get();
    if (s) {
      return walkFn(s, x, walkOpts);
    }
  }
}

module.exports = delayedClauseWalker;

/***/ },
/* 71 */
/***/ function(module, exports, __webpack_require__) {

"use strict";


var isProblem = __webpack_require__(0);
var Problem = __webpack_require__(2);
var functionName = __webpack_require__(3);
var namedFn = __webpack_require__(14);
var betterThrow = __webpack_require__(57);
var stringifyWithFnName = __webpack_require__(36);

function fclauseWalker(clause, walkFn) {
  var _clause$opts = clause.opts,
      argsClause = _clause$opts.args,
      retClause = _clause$opts.ret,
      validateFn = _clause$opts.fn;


  return {
    trailblaze: fclauseTrailblaze,
    reconstruct: fclauseReconstruct
  };

  function fclauseTrailblaze(fn) {
    return fn;
  }

  function fclauseReconstruct(fn, walkOpts) {
    if (fn) {
      var conform = walkOpts.conform,
          instrument = walkOpts.instrument;


      if (conform && instrument) {
        return instrumentConformed(fn, walkOpts);
      } else if (instrument) {
        return _instrument(fn, walkOpts);
      }
    } else {
      throw new Error('A function must be clauseified for instrumentation.');
    }
  }

  function _instrument(fn, walkOpts) {
    var fnName = functionName(fn);
    var instrumentedFn = getInstrumentedFn(fnName, fn, walkOpts);
    var namedClauseedFn = namedFn(fnName, instrumentedFn, '__instrumented');
    return namedClauseedFn;
  }

  function instrumentConformed(fn, walkOpts) {
    var fnName = functionName(fn);
    var argConformedFn = getArgConformedInstrumentedFn(fnName, fn, walkOpts);
    var namedArgConformedFn = namedFn(fnName, argConformedFn, '__conformed');

    return namedArgConformedFn;
  }

  function getInstrumentedFn(fnName, fn) {
    return function __instrumented() {
      var args = Array.prototype.slice.call(arguments);
      var instrumentedArgs = checkArgs(fn, fnName, args);
      var retVal = fn.apply(this, instrumentedArgs);
      var instrumentedRetVal = checkRet(fn, fnName, retVal);

      // TODO optimize
      var conformedArgs = argsClause ? walkFn(argsClause, args, { conform: true, instrument: true }) : args;
      var conformedRetVal = void 0;
      if (retClause) {
        conformedRetVal = walkFn(retClause, retVal, { conform: true, instrument: true });
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
        var p = new Problem({ args: conformedArgs, ret: retVal }, clause, [], 'Function ' + fnName + ' failed valiation on argument-return value relation');
        betterThrow(p);
      }
    }
  }

  function checkArgs(fn, fnName, args) {
    var displayFnName = fnName || '<anonymous>';
    if (argsClause) {
      var instrumentedArgs = walkFn(argsClause, args, { phase: 'trailblaze' });
      if (isProblem(instrumentedArgs)) {
        var p = new Problem(args, clause, [instrumentedArgs], 'Arguments for function ' + displayFnName + '() is not valid');
        betterThrow(p);
      } else {
        return walkFn(argsClause, instrumentedArgs, { phase: 'reconstruct', conform: false, instrument: true });
      }
    } else {
      return args;
    }
  }

  function checkRet(fn, fnName, retVal) {
    var displayFnName = fnName || '<anonymous>';

    if (retClause) {
      var instrumentedRetVal = walkFn(retClause, retVal, { phase: 'trailblaze' });
      if (isProblem(instrumentedRetVal)) {
        var p = new Problem(retVal, clause, [instrumentedRetVal], 'Return value for function ' + displayFnName + '() is not valid');
        betterThrow(p);
      } else {
        var r = walkFn(retClause, instrumentedRetVal, { phase: 'reconstruct', instrument: true, conform: false });
        return r;
      }
    } else {
      return retVal;
    }
  }

  function getArgConformedInstrumentedFn(fnName, fn) {
    var displayFnName = fnName || '<anonymous>';

    return function __instrumentConformed() {
      var args = Array.prototype.slice.call(arguments);

      var conformedArgs = walkFn(argsClause, args, { conform: true, instrument: true });
      if (isProblem(conformedArgs)) {
        var p = new Problem(args, argsClause, [conformedArgs], 'Arguments for function ' + displayFnName + ' is not valid');
        betterThrow(p);
      }

      var retVal = fn.call(this, conformedArgs);

      checkRet(fn, fnName, retVal);

      if (validateFn) {
        var conformedRetVal;
        if (retClause) {
          conformedRetVal = walkFn(retClause, retVal, { conform: true, instrument: true });
        } else {
          conformedRetVal = retVal;
        }
        checkFnRelation(fnName, fn, validateFn, conformedArgs, conformedRetVal);
      }

      return retVal;
    };
  }
}

module.exports = fclauseWalker;

/***/ },
/* 72 */
/***/ function(module, exports, __webpack_require__) {

"use strict";


function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var clauseFromAlts = __webpack_require__(7);
var isProblem = __webpack_require__(0);
var Problem = __webpack_require__(2);

function mapOfWalker(clause, walkFn) {
  var _clause$opts = clause.opts,
      keyExpression = _clause$opts.keyExpression,
      valExpression = _clause$opts.valExpression;

  var keyClause = keyExpression && clauseFromAlts(keyExpression);
  var valClause = valExpression && clauseFromAlts(valExpression);

  return {
    trailblaze: mapOfTrailblaze,
    reconstruct: mapOfReconstruct
  };

  function mapOfTrailblaze(x, walkOpts) {
    var guide = {};
    for (var key in x) {
      if (x.hasOwnProperty(key)) {
        var keyR = walkFn(keyClause, key, walkOpts);
        if (isProblem(keyR)) {
          return new Problem(x, clause, _defineProperty({}, key, keyR), 'mapOf: key ' + key + ' failed validation');
        }

        var valR = walkFn(valClause, x[key], walkOpts);
        if (isProblem(valR)) {
          return new Problem(x, clause, _defineProperty({}, key, valR), 'mapOf: value for key ' + key + ' failed validation');
        }
        guide[key] = {
          expr: valClause,
          valGuide: valR
        };
      }
    }
    return guide;
  }

  function mapOfReconstruct(guide, walkOpts) {
    var r = {};
    for (var key in guide) {
      var _guide$key = guide[key],
          expr = _guide$key.expr,
          valGuide = _guide$key.valGuide;

      r[key] = walkFn(expr, valGuide, walkOpts);
    }
    return r;
  }
}
module.exports = mapOfWalker;

/***/ },
/* 73 */
/***/ function(module, exports, __webpack_require__) {

"use strict";


function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var simulate = __webpack_require__(49);
var getMatch = __webpack_require__(48);
var compile = __webpack_require__(46);
var Problem = __webpack_require__(2);

function nfaWalker(clause, walkFn) {
  var nfa;

  return {
    trailblaze: nfaTrailblaze,
    reconstruct: nfaReconstruct
  };

  function nfaTrailblaze(x, walkOpts) {

    if (!nfa) {
      //lazy
      nfa = compile(clause);
    }

    var _simulate = simulate(nfa, x, walkFn, walkOpts),
        chain = _simulate.chain,
        matched = _simulate.matched,
        lastProblem = _simulate.lastProblem;

    if (matched === true) {
      return { chain: chain };
    } else {
      var subproblems = void 0;

      if (lastProblem) {
        var name = lastProblem.name,
            position = lastProblem.position,
            problem = lastProblem.problem;

        subproblems = _defineProperty({}, name ? '"' + name + '"' : '<At position ' + position + '>', problem);
      } else {
        subproblems = [];
      }
      return new Problem(x, clause, subproblems, 'Clause ' + clause.type + ' did not match value');
    }
  }

  function nfaReconstruct(_ref, walkOpts) {
    var chain = _ref.chain;

    var result = getMatch(chain, walkFn, walkOpts);
    return result;
  }
}

module.exports = nfaWalker;

/***/ },
/* 74 */
/***/ function(module, exports, __webpack_require__) {

"use strict";


var fnName = __webpack_require__(3);
var Problem = __webpack_require__(2);

function predWalker(clause) {
  return {
    trailblaze: predTraiblaze,
    reconstruct: predReconstruct
  };

  function predTraiblaze(x) {
    var predFn = clause.exprs[0];
    if (!predFn(x)) {
      return new Problem(x, clause, [], 'Predicate ' + fnName(predFn) + '() returns false');
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
/* 75 */
/***/ function(module, exports, __webpack_require__) {

"use strict";


var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var isProblem = __webpack_require__(0);
var isUndefined = __webpack_require__(20);
var oAssign = __webpack_require__(4);
var Problem = __webpack_require__(2);
var clauseFromAlts = __webpack_require__(7);

function shapeWalker(clause, walkFn) {
  var keyConformer;
  var _clause$opts$conforme = clause.opts.conformedArgs.shapeArgs,
      requiredFields = _clause$opts$conforme.requiredFields,
      optionalFields = _clause$opts$conforme.optionalFields;


  var reqClauses, optClauses;
  if (requiredFields) {
    reqClauses = requiredFields.req || requiredFields.required;
  }
  if (optionalFields) {
    optClauses = optionalFields.opt || optionalFields.optional;
  }

  return {
    trailblaze: shapeTrailblaze,
    reconstruct: shapeReconstruct
  };

  function shapeTrailblaze(x, walkOpts) {
    if (['object', 'function'].indexOf(typeof x === 'undefined' ? 'undefined' : _typeof(x)) < 0) {
      return new Problem(x, clause, [], 'Value is not an object');
    }

    if (!keyConformer) {
      // lazy
      keyConformer = _genKeyConformer(reqClauses, optClauses, walkFn, walkOpts);
    }
    var keyConformedR = keyConformer(x);

    if (isProblem(keyConformedR)) {
      return keyConformedR;
    }
    var problems = [];

    var guide = { val: x, groups: [], singles: [] };

    var reqFieldDefs;
    if (reqClauses) {
      reqFieldDefs = reqClauses.fieldDefs;
    }

    if (reqFieldDefs) {
      processFieldDefs_mut(reqFieldDefs);
    }

    var optFieldDefs;
    if (optClauses) {
      optFieldDefs = optClauses.fieldDefs;
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
      var newP = new Problem(x, clause, problemMap, 'At least one property failed validation: ' + failedNames.join(', '));
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

    var mutate = walkOpts.mutate;


    var conformed;

    if (mutate) {
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
      clause = _ref3.clause,
      guide = _ref3.guide;

  x[key] = walkFn(clause, guide, walkOpts);
}

function _genKeyConformer(reqClauses, optClause, walkFn, walkOpts) {
  return function tryConformKeys(x) {
    if (reqClauses) {
      var missingKeys = [];
      var fieldDefs = reqClauses.fieldDefs,
          keyList = reqClauses.keyList;

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
        //key clause
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
          //key clause
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
        return new Problem(x, reqClauses, [], 'req: keys required: ' + missingKeys.join(', '));
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
            matchedKeys.push({ key: k, clause: clauseFromAlts(valExpression), guide: valGuide });
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
        return { singleMatch: { key: name, clause: clauseFromAlts(valExpressionOnly), guide: g } };
      }
    } else {
      return { noop: true };
    }
  } else {
    throw '!!';
  }
}

function _conformNamedOrExpr(x, alts, walkFn, walkOpts) {
  var s = clauseFromAlts(alts);
  var r = walkFn(s, x, walkOpts);
  return r;
}

module.exports = shapeWalker;

/***/ },
/* 76 */
/***/ function(module, exports, __webpack_require__) {

"use strict";


var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

function wallWalker(wallClause, walkFn) {
  return {
    trailblaze: wallWalk,
    reconstruct: wallWalk
  };

  function wallWalk(x, opts) {
    var _wallClause$exprs = _slicedToArray(wallClause.exprs, 1),
        clause = _wallClause$exprs[0];

    return walkFn(clause, x, opts);
  }
}

module.exports = wallWalker;

/***/ },
/* 77 */
/***/ function(module, exports, __webpack_require__) {

/**
 * @file
 * <a href="https://travis-ci.org/Xotic750/define-properties-x"
 * title="Travis status">
 * <img
 * src="https://travis-ci.org/Xotic750/define-properties-x.svg?branch=master"
 * alt="Travis status" height="18">
 * </a>
 * <a href="https://david-dm.org/Xotic750/define-properties-x"
 * title="Dependency status">
 * <img src="https://david-dm.org/Xotic750/define-properties-x.svg"
 * alt="Dependency status" height="18"/>
 * </a>
 * <a
 * href="https://david-dm.org/Xotic750/define-properties-x#info=devDependencies"
 * title="devDependency status">
 * <img src="https://david-dm.org/Xotic750/define-properties-x/dev-status.svg"
 * alt="devDependency status" height="18"/>
 * </a>
 * <a href="https://badge.fury.io/js/define-properties-x" title="npm version">
 * <img src="https://badge.fury.io/js/define-properties-x.svg"
 * alt="npm version" height="18">
 * </a>
 *
 * Based on the original work by Jordan Harband
 * {@link https://www.npmjs.com/package/define-properties `define-properties`}.
 *
 * <h2>ECMAScript compatibility shims for legacy JavaScript engines</h2>
 * `es5-shim.js` monkey-patches a JavaScript context to contain all EcmaScript 5
 * methods that can be faithfully emulated with a legacy JavaScript engine.
 *
 * `es5-sham.js` monkey-patches other ES5 methods as closely as possible.
 * For these methods, as closely as possible to ES5 is not very close.
 * Many of these shams are intended only to allow code to be written to ES5
 * without causing run-time errors in older engines. In many cases,
 * this means that these shams cause many ES5 methods to silently fail.
 * Decide carefully whether this is what you want. Note: es5-sham.js requires
 * es5-shim.js to be able to work properly.
 *
 * `json3.js` monkey-patches the EcmaScript 5 JSON implimentation faithfully.
 *
 * `es6.shim.js` provides compatibility shims so that legacy JavaScript engines
 * behave as closely as possible to ECMAScript 6 (Harmony).
 *
 * @version 1.1.4
 * @author Xotic750 <Xotic750@gmail.com>
 * @copyright  Xotic750
 * @license {@link <https://opensource.org/licenses/MIT> MIT}
 * @module define-properties-x
 */

/*jslint maxlen:80, es6:false, white:true */

/*jshint bitwise:true, camelcase:true, curly:true, eqeqeq:true, forin:true,
  freeze:true, futurehostile:true, latedef:true, newcap:true, nocomma:true,
  nonbsp:true, singleGroups:true, strict:true, undef:true, unused:true,
  es3:true, esnext:false, plusplus:true, maxparams:4, maxdepth:2,
  maxstatements:12, maxcomplexity:3 */

/*global module */

;(function () {
  'use strict';

  var hasSymbols = __webpack_require__(37);
  var isFunction = __webpack_require__(79);
  var isUndefined = __webpack_require__(38);
  var pConcat = Array.prototype.concat;
  var pForEach = Array.prototype.forEach;
  var $keys = Object.keys;
  var $getOwnPropertySymbols = isFunction(Object.getOwnPropertySymbols) &&
    Object.getOwnPropertySymbols;
  var $defineProperty = isFunction(Object.defineProperty) &&
    Object.defineProperty;
  var supportsDescriptors = Boolean($defineProperty) && (function (unused) {
    var obj = {};
    try {
      $defineProperty(obj, 'x', {
        enumerable: false,
        value: obj
      });
      for (unused in obj) {
        /*jshint forin:false */
        return false;
      }
      return obj.x === obj;
    } catch (e) { /* this is IE 8. */
      return false;
    }
  })();

  /**
   * Method `property`.
   *
   * @private
   * @param {Object} object The object on which to define the property.
   * @param {string|Symbol} prop The property name.
   * @param {*} value The value of the property.
   * @param {boolean} [force=false] If `true` then set property regardless.
   */
  function property(object, prop, value, force) {
    if (prop in object && !force) {
      return;
    }
    if (supportsDescriptors) {
      $defineProperty(object, prop, {
        configurable: true,
        enumerable: false,
        value: value,
        writable: true
      });
    } else {
      object[prop] = value;
    }
  }

  /**
   * Method `properties`.
   *
   * @private
   * @param {Object} object The object on which to define the property.
   * @param {Object} map The object of properties.
   * @param {Object} [predicates] The object of property predicates.
   */
  function properties(object, map, predicates) {
    var preds = isUndefined(predicates) ? {} : predicates;
    var props = $keys(map);
    if (hasSymbols && $getOwnPropertySymbols) {
      props = pConcat.call(props, $getOwnPropertySymbols(map));
    }
    pForEach.call(props, function (name) {
      var predicate = preds[name];
      property(
        object,
        name,
        map[name],
        isFunction(predicate) && predicate()
      );
    });
  }

  properties(module.exports, {
    /**
     * Just like `properties` but for defining a single non-enumerable
     * property. Useful in environments that do not
     * support `Computed property names`. This can be done
     * with `properties`, but this method can read a little cleaner.
     *
     * @function
     * @param {Object} object The object on which to define the property.
     * @param {string|Symbol} prop The property name.
     * @param {*} value The value of the property.
     * @param {boolean} [force=false] If `true` then set property regardless.
     * @example
     * var define = require('define-properties-x');
     * var myString = 'something';
     * define.property(obj, Symbol.iterator, function () {}, true);
     * define.property(obj, myString, function () {}, true);
     */
    property: property,
    /**
     * Define multiple non-enumerable properties at once.
     * Uses `Object.defineProperty` when available; falls back to standard
     * assignment in older engines. Existing properties are not overridden.
     * Accepts a map of property names to a predicate that, when true,
     * force-overrides.
     *
     * @function
     * @param {Object} object The object on which to define the property.
     * @param {Object} map The object of properties.
     * @param {Object} [predicates] The object of property predicates.
     * @example
     * var define = require('define-properties-x');
     * define.properties({
     *   a: 1,
     *   b: 2
     * }, {
     *   a: function () { return false; },
     *   b: function () { return true; }
     * });
     */
    properties: properties,
    /**
     * Boolean indicator as to whether the environments supports descriptors
     * or not.
     *
     * @type boolean
     * @example
     * var define = require('define-properties-x');
     * define.supportsDescriptors; // true or false
     */
    supportsDescriptors: supportsDescriptors
  });
}());


/***/ },
/* 78 */
/***/ function(module, exports, __webpack_require__) {

/**
 * @file
 * <a href="https://travis-ci.org/Xotic750/has-to-string-tag-x"
 * title="Travis status">
 * <img
 * src="https://travis-ci.org/Xotic750/has-to-string-tag-x.svg?branch=master"
 * alt="Travis status" height="18">
 * </a>
 * <a href="https://david-dm.org/Xotic750/has-to-string-tag-x"
 * title="Dependency status">
 * <img src="https://david-dm.org/Xotic750/has-to-string-tag-x.svg"
 * alt="Dependency status" height="18"/>
 * </a>
 * <a
 * href="https://david-dm.org/Xotic750/has-to-string-tag-x#info=devDependencies"
 * title="devDependency status">
 * <img src="https://david-dm.org/Xotic750/has-to-string-tag-x/dev-status.svg"
 * alt="devDependency status" height="18"/>
 * </a>
 * <a href="https://badge.fury.io/js/has-to-string-tag-x" title="npm version">
 * <img src="https://badge.fury.io/js/has-to-string-tag-x.svg"
 * alt="npm version" height="18">
 * </a>
 *
 * hasToStringTag tests if @@toStringTag is supported. `true` if supported.
 *
 * <h2>ECMAScript compatibility shims for legacy JavaScript engines</h2>
 * `es5-shim.js` monkey-patches a JavaScript context to contain all EcmaScript 5
 * methods that can be faithfully emulated with a legacy JavaScript engine.
 *
 * `es5-sham.js` monkey-patches other ES5 methods as closely as possible.
 * For these methods, as closely as possible to ES5 is not very close.
 * Many of these shams are intended only to allow code to be written to ES5
 * without causing run-time errors in older engines. In many cases,
 * this means that these shams cause many ES5 methods to silently fail.
 * Decide carefully whether this is what you want. Note: es5-sham.js requires
 * es5-shim.js to be able to work properly.
 *
 * `json3.js` monkey-patches the EcmaScript 5 JSON implimentation faithfully.
 *
 * `es6.shim.js` provides compatibility shims so that legacy JavaScript engines
 * behave as closely as possible to ECMAScript 6 (Harmony).
 *
 * @version 1.0.10
 * @author Xotic750 <Xotic750@gmail.com>
 * @copyright  Xotic750
 * @license {@link <https://opensource.org/licenses/MIT> MIT}
 * @module has-to-string-tag-x
 */

/*jslint maxlen:80, es6:true, white:true */

/*jshint bitwise:true, camelcase:true, curly:true, eqeqeq:true, forin:true,
  freeze:true, futurehostile:true, latedef:true, newcap:true, nocomma:true,
  nonbsp:true, singleGroups:true, strict:true, undef:true, unused:true,
  es3:false, esnext:true, plusplus:true, maxparams:1, maxdepth:1,
  maxstatements:1, maxcomplexity:1 */

/*global module */

;(function () {
  'use strict';

  /**
   * Indicates if `Symbol.toStringTag`exists and is the correct type.
   * `true`, if it exists and is the correct type, otherwise `false`.
   *
   * @type boolean
   */
  module.exports = __webpack_require__(37) &&
    typeof Symbol.toStringTag === 'symbol';
}());


/***/ },
/* 79 */
/***/ function(module, exports, __webpack_require__) {

/**
 * @file
 * <a href="https://travis-ci.org/Xotic750/is-function-x"
 * title="Travis status">
 * <img
 * src="https://travis-ci.org/Xotic750/is-function-x.svg?branch=master"
 * alt="Travis status" height="18">
 * </a>
 * <a href="https://david-dm.org/Xotic750/is-function-x"
 * title="Dependency status">
 * <img src="https://david-dm.org/Xotic750/is-function-x.svg"
 * alt="Dependency status" height="18"/>
 * </a>
 * <a
 * href="https://david-dm.org/Xotic750/is-function-x#info=devDependencies"
 * title="devDependency status">
 * <img src="https://david-dm.org/Xotic750/is-function-x/dev-status.svg"
 * alt="devDependency status" height="18"/>
 * </a>
 * <a href="https://badge.fury.io/js/is-function-x" title="npm version">
 * <img src="https://badge.fury.io/js/is-function-x.svg"
 * alt="npm version" height="18">
 * </a>
 *
 * isFunction module. Determine whether a given value is a function object.
 *
 * <h2>ECMAScript compatibility shims for legacy JavaScript engines</h2>
 * `es5-shim.js` monkey-patches a JavaScript context to contain all EcmaScript 5
 * methods that can be faithfully emulated with a legacy JavaScript engine.
 *
 * `es5-sham.js` monkey-patches other ES5 methods as closely as possible.
 * For these methods, as closely as possible to ES5 is not very close.
 * Many of these shams are intended only to allow code to be written to ES5
 * without causing run-time errors in older engines. In many cases,
 * this means that these shams cause many ES5 methods to silently fail.
 * Decide carefully whether this is what you want. Note: es5-sham.js requires
 * es5-shim.js to be able to work properly.
 *
 * `json3.js` monkey-patches the EcmaScript 5 JSON implimentation faithfully.
 *
 * `es6.shim.js` provides compatibility shims so that legacy JavaScript engines
 * behave as closely as possible to ECMAScript 6 (Harmony).
 *
 * @version 1.0.6
 * @author Xotic750 <Xotic750@gmail.com>
 * @copyright  Xotic750
 * @license {@link <https://opensource.org/licenses/MIT> MIT}
 * @module is-function-x
 */

/*jslint maxlen:80, es6:false, white:true */

/*jshint bitwise:true, camelcase:true, curly:true, eqeqeq:true, forin:true,
  freeze:true, futurehostile:true, latedef:true, newcap:true, nocomma:true,
  nonbsp:true, singleGroups:true, strict:true, undef:true, unused:true,
  es3:true, esnext:false, plusplus:true, maxparams:1, maxdepth:1,
  maxstatements:8, maxcomplexity:4 */

/*global module */

;(function () {
  'use strict';

  var fToString = Function.prototype.toString;
  var toStringTag = __webpack_require__(82);
  var hasToStringTag = __webpack_require__(78);
  var isPrimitive = __webpack_require__(80);
  var funcTag = '[object Function]';
  var genTag = '[object GeneratorFunction]';

  /**
   * Checks if `value` is classified as a `Function` object.
   *
   * @private
   * @param {*} value The value to check.
   * @return {boolean} Returns `true` if `value` is correctly classified,
   * else `false`.
   */
  function tryFunctionObject(value) {
    try {
      fToString.call(value);
      return true;
    } catch (ignore) {}
    return false;
  }

  /**
   * Checks if `value` is classified as a `Function` object.
   *
   * @param {*} value The value to check.
   * @return {boolean} Returns `true` if `value` is correctly classified,
   * else `false`.
   * @example
   * var isFunction = require('is-function-x');
   *
   * isFunction(); // false
   * isFunction(Number.MIN_VALUE); // false
   * isFunction('abc'); // false
   * isFunction(true); // false
   * isFunction({ name: 'abc' }); // false
   * isFunction(function () {}); // true
   * isFunction(new Function ()); // true
   * isFunction(function* test1() {}); // true
   * isFunction(function test2(a, b) {}); // true
   * isFunction(class Test {}); // true
   * isFunction((x, y) => {return this;}); // true
   */
  module.exports = function isFunction(value) {
    if (isPrimitive(value)) {
      return false;
    }
    if (hasToStringTag) {
      return tryFunctionObject(value);
    }
    var strTag = toStringTag(value);
    return strTag === funcTag || strTag === genTag;
  };
}());


/***/ },
/* 80 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/*!
 * is-primitive <https://github.com/jonschlinkert/is-primitive>
 *
 * Copyright (c) 2014-2015, Jon Schlinkert.
 * Licensed under the MIT License.
 */



// see http://jsperf.com/testing-value-is-primitive/7
module.exports = function isPrimitive(value) {
  return value == null || (typeof value !== 'function' && typeof value !== 'object');
};


/***/ },
/* 81 */
/***/ function(module, exports) {

/**
 * lodash 3.0.0 (Custom Build) <https://lodash.com/>
 * Build: `lodash modern modularize exports="npm" -o ./`
 * Copyright 2012-2015 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.7.0 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2015 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <https://lodash.com/license>
 */

/**
 * Checks if `value` is `null`.
 *
 * @static
 * @memberOf _
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is `null`, else `false`.
 * @example
 *
 * _.isNull(null);
 * // => true
 *
 * _.isNull(void 0);
 * // => false
 */
function isNull(value) {
  return value === null;
}

module.exports = isNull;


/***/ },
/* 82 */
/***/ function(module, exports, __webpack_require__) {

/**
 * @file
 * <a href="https://travis-ci.org/Xotic750/to-string-tag-x"
 * title="Travis status">
 * <img src="https://travis-ci.org/Xotic750/to-string-tag-x.svg?branch=master"
 * alt="Travis status" height="18">
 * </a>
 * <a href="https://david-dm.org/Xotic750/to-string-tag-x"
 * title="Dependency status">
 * <img src="https://david-dm.org/Xotic750/to-string-tag-x.svg"
 * alt="Dependency status" height="18"/>
 * </a>
 * <a href="https://david-dm.org/Xotic750/to-string-tag-x#info=devDependencies"
 * title="devDependency status">
 * <img src="https://david-dm.org/Xotic750/to-string-tag-x/dev-status.svg"
 * alt="devDependency status" height="18"/>
 * </a>
 * <a href="https://badge.fury.io/js/to-string-tag-x" title="npm version">
 * <img src="https://badge.fury.io/js/to-string-tag-x.svg"
 * alt="npm version" height="18">
 * </a>
 *
 * Get an object's @@toStringTag. Includes fixes to correct ES3 differences
 * for the following.
 * - undefined => '[object Undefined]'
 * - null => '[object Null]'
 *
 * No other fixes are included, so legacy `arguments` will
 * give `[object Object]`, and many older native objects
 * give `[object Object]`. There are also other environmental bugs
 * for example `RegExp` gives `[object Function]` and `Uint8Array`
 * gives `[object Object]` on certain engines. While these and more could
 * be fixed, it was decided that this should be a very raw version and it
 * is left to the coder to use other `is` implimentations for detection.
 * It is also worth noting that as of ES6 `Symbol.toStringTag` can be set on
 * an object and therefore can report any string that it wishes.
 *
 * <h2>ECMAScript compatibility shims for legacy JavaScript engines</h2>
 * `es5-shim.js` monkey-patches a JavaScript context to contain all EcmaScript 5
 * methods that can be faithfully emulated with a legacy JavaScript engine.
 *
 * `es5-sham.js` monkey-patches other ES5 methods as closely as possible.
 * For these methods, as closely as possible to ES5 is not very close.
 * Many of these shams are intended only to allow code to be written to ES5
 * without causing run-time errors in older engines. In many cases,
 * this means that these shams cause many ES5 methods to silently fail.
 * Decide carefully whether this is what you want. Note: es5-sham.js requires
 * es5-shim.js to be able to work properly.
 *
 * `json3.js` monkey-patches the EcmaScript 5 JSON implimentation faithfully.
 *
 * `es6.shim.js` provides compatibility shims so that legacy JavaScript engines
 * behave as closely as possible to ECMAScript 6 (Harmony).
 *
 * @version 1.0.11
 * @author Xotic750 <Xotic750@gmail.com>
 * @copyright  Xotic750
 * @license {@link <https://opensource.org/licenses/MIT> MIT}
 * @module to-string-tag-x
 */

/*jslint maxlen:80, es6:false, white:true */

/*jshint bitwise:true, camelcase:true, curly:true, eqeqeq:true, forin:true,
  freeze:true, futurehostile:true, latedef:true, newcap:true, nocomma:true,
  nonbsp:true, singleGroups:true, strict:true, undef:true, unused:true,
  es3:true, esnext:false, plusplus:true, maxparams:1, maxdepth:1,
  maxstatements:6, maxcomplexity:3 */

/*global module */

;(function () {
  'use strict';

  var pToString = Object.prototype.toString;
  var isNull = __webpack_require__(81);
  var isUndefined = __webpack_require__(38);
  var nullTag = '[object Null]';
  var undefTag = '[object Undefined]';

  /**
   * The `toStringTag` method returns "[object type]", where type is the
   * object type.
   *
   * @param {*} value The object of which to get the object type string.
   * @return {string} The object type string.
   * @example
   * var o = new Object();
   *
   * toStringTag(o); // returns '[object Object]'
   */
  module.exports = function toStringTag(value) {
    if (isNull(value)) {
      return nullTag;
    }
    if (isUndefined(value)) {
      return undefTag;
    }
    return pToString.call(value);
  };
}());


/***/ },
/* 83 */
/***/ function(module, exports, __webpack_require__) {

/**
 * @file
 * <a href="https://travis-ci.org/Xotic750/white-space-x"
 * title="Travis status">
 * <img src="https://travis-ci.org/Xotic750/white-space-x.svg?branch=master"
 * alt="Travis status" height="18">
 * </a>
 * <a href="https://david-dm.org/Xotic750/white-space-x"
 * title="Dependency status">
 * <img src="https://david-dm.org/Xotic750/white-space-x.svg"
 * alt="Dependency status" height="18"/>
 * </a>
 * <a href="https://david-dm.org/Xotic750/white-space-x#info=devDependencies"
 * title="devDependency status">
 * <img src="https://david-dm.org/Xotic750/white-space-x/dev-status.svg"
 * alt="devDependency status" height="18"/>
 * </a>
 * <a href="https://badge.fury.io/js/white-space-x" title="npm version">
 * <img src="https://badge.fury.io/js/white-space-x.svg"
 * alt="npm version" height="18">
 * </a>
 *
 * whitespace module.
 *
 * <h2>ECMAScript compatibility shims for legacy JavaScript engines</h2>
 * `es5-shim.js` monkey-patches a JavaScript context to contain all EcmaScript 5
 * methods that can be faithfully emulated with a legacy JavaScript engine.
 *
 * `es5-sham.js` monkey-patches other ES5 methods as closely as possible.
 * For these methods, as closely as possible to ES5 is not very close.
 * Many of these shams are intended only to allow code to be written to ES5
 * without causing run-time errors in older engines. In many cases,
 * this means that these shams cause many ES5 methods to silently fail.
 * Decide carefully whether this is what you want. Note: es5-sham.js requires
 * es5-shim.js to be able to work properly.
 *
 * `json3.js` monkey-patches the EcmaScript 5 JSON implimentation faithfully.
 *
 * `es6.shim.js` provides compatibility shims so that legacy JavaScript engines
 * behave as closely as possible to ECMAScript 6 (Harmony).
 *
 * @version 1.0.10
 * @author Xotic750 <Xotic750@gmail.com>
 * @copyright  Xotic750
 * @license {@link <https://opensource.org/licenses/MIT> MIT}
 * @module white-space-x
 */

/*jslint maxlen:80, es6:false, white:true */

/*jshint bitwise:true, camelcase:true, curly:true, eqeqeq:true, forin:true,
  freeze:true, futurehostile:true, latedef:true, newcap:true, nocomma:true,
  nonbsp:true, singleGroups:true, strict:true, undef:true, unused:true,
  es3:true, esnext:false, plusplus:true, maxparams:2, maxdepth:2,
  maxstatements:12, maxcomplexity:4 */

/*global module */

;(function () {
  'use strict';

  var define = __webpack_require__(77);

  /**
   * An array of the whitespace char codes.
   *
   * @name whiteSpaces
   * @type Array.<number>
   * @property {number} 0 0x0009 // Tab
   * @property {number} 1 0x000a // Line Feed
   * @property {number} 2 0x000b // Vertical Tab
   * @property {number} 3 0x000c // Form Feed
   * @property {number} 4 0x000d // Carriage Return
   * @property {number} 5 0x0020 // Space
   * @property {number} 6 0x00a0 // No-break space
   * @property {number} 7 0x1680 // Ogham space mark
   * @property {number} 8 0x180e // Mongolian vowel separator
   * @property {number} 9 0x2000 // En quad
   * @property {number} 10 0x2001 // Em quad
   * @property {number} 11 0x2002 // En space
   * @property {number} 12 0x2003 // Em space
   * @property {number} 13 0x2004 // Three-per-em space
   * @property {number} 14 0x2005 // Four-per-em space
   * @property {number} 15 0x2006 // Six-per-em space
   * @property {number} 16 0x2007 // Figure space
   * @property {number} 17 0x2008 // Punctuation space
   * @property {number} 18 0x2009 // Thin space
   * @property {number} 19 0x200a // Hair space
   * @property {number} 20 0x2028 // Line separator
   * @property {number} 21 0x2029 // Paragraph separator
   * @property {number} 22 0x202f // Narrow no-break space
   * @property {number} 23 0x205f // Medium mathematical space
   * @property {number} 24 0x3000 // Ideographic space
   * @property {number} 25 0xfeff // Byte Order Mark
   * @example
   * var lib = require('white-space-x');
   * var count = 0x110000;
   * var nws = ''; // A string of all the non-whitepaces
   * do {
   *   count -= 1;
   *   if (lib.whiteSpaces.indexOf(count) < 0) {
   *     nws = String.fromCodePoint(count) + nws;
   *   }
   * } while (count);
   */
  define.property(module.exports, 'whiteSpaces', [
    0x0009, // Tab
    0x000a, // Line Feed
    0x000b, // Vertical Tab
    0x000c, // Form Feed
    0x000d, // Carriage Return
    0x0020, // Space
    //0x0085, // Next line - Not ES5 whitespace
    0x00a0, // No-break space
    0x1680, // Ogham space mark
    0x180e, // Mongolian vowel separator
    0x2000, // En quad
    0x2001, // Em quad
    0x2002, // En space
    0x2003, // Em space
    0x2004, // Three-per-em space
    0x2005, // Four-per-em space
    0x2006, // Six-per-em space
    0x2007, // Figure space
    0x2008, // Punctuation space
    0x2009, // Thin space
    0x200a, // Hair space
    //0x200b, // Zero width space - Not ES5 whitespace
    0x2028, // Line separator
    0x2029, // Paragraph separator
    0x202f, // Narrow no-break space
    0x205f, // Medium mathematical space
    0x3000, // Ideographic space
    0xfeff // Byte Order Mark
  ]);

  /**
   * A string of the whitespace characters.
   *
   * @name ws
   * @type string
   * @default \u0009\u000a\u000b\u000c\u000d\u0020\u00a0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u2028\u2029\u202f\u205f\u3000\ufeff
   * @example
   * var lib = require('white-space-x');
   * var ws = '\u0009\u000a\u000b\u000c\u000d\u0020\u00a0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u2028\u2029\u202f\u205f\u3000\ufeff';
   * var re1 = new RegExp('^[' + lib.ws + ']+$)');
   * re1.test(ws); // true
   */
  define.property(module.exports, 'ws', module.exports.whiteSpaces.reduce(function (acc, item) {
      return acc + String.fromCharCode(item);
    }, '')
  );
}());


/***/ },
/* 84 */
/***/ function(module, exports, __webpack_require__) {

"use strict";


module.exports = '0.0.23';

/***/ },
/* 85 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {

Object.defineProperty(exports, "__esModule", {
  value: true
});
var oAssign = __webpack_require__(4);
var ClauseRef = __webpack_require__(39);

var _require = __webpack_require__(15),
    cat = _require.cat,
    or = _require.or,
    fclause = _require.fclause,
    shape = _require.shape;

var isClause = __webpack_require__(5);
var isPred = __webpack_require__(8);
var isBool = __webpack_require__(40);
var walk = __webpack_require__(16);
var coerceIntoClause = __webpack_require__(10);
var oPath = __webpack_require__(87);

var _require2 = __webpack_require__(23),
    isNamespacePath = _require2.isNamespacePath,
    isClauseRef = _require2.isClauseRef;

var _require3 = __webpack_require__(24),
    GetNSFnClause = _require3.GetNSFnClause,
    SetNSFnClause = _require3.SetNSFnClause,
    NamespaceFnClause = _require3.NamespaceFnClause,
    MetaFnClause = _require3.MetaFnClause;

var reg;

var _get = fclause({
  args: cat(isNamespacePath),
  ret: isClauseRef
}).instrument(_getUnchecked);

function _getUnchecked(ref) {
  function getFn(prefix) {
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
  }

  var sr = new ClauseRef({ ref: ref, getFn: getFn, conformFn: null });
  sr.conform = function clauseRefConform(x) {
    var ss = getFn();
    return walk(ss, x, { conform: true });
  };
  return sr;
}

function _slashToDot(p) {
  return p.replace(/^(.+)(\/)(.+)$/, '$1.$3').replace(/^\//, '');
}

// var PartialRefMapClause = shape({
//   req: {
//     'refDefs': [isNamespacePath, ExprOrPartialRefMapClause]
//   }
// });

function getNamespacePath(_ref) {
  var nsPath = _ref.nsPath;

  var retVal;

  var nameObj = _get(nsPath);
  retVal = nameObj;

  return retVal;
}

function setNamespacePath(_ref2) {
  var nsPath = _ref2.nsPath,
      expression = _ref2.expression;

  _processVal(nsPath, expression);
}

function _processVal(prefix, expression) {
  if (expression) {
    if (expression.clause || expression.pred) {
      var expr = expression.clause || expression.pred;
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

var NameObjClause = shape({
  req: { '.expr': or(isClause, isPred) }
});

var _set = fclause({
  args: cat(isNamespacePath, NameObjClause),
  ret: isBool
}).instrument(function _set(n, nObj) {
  _maybeInitRegistry();
  var existing = oPath.get(reg, _slashToDot(n));
  oPath.set(reg, _slashToDot(n), oAssign({}, existing, nObj));
  return true;
});

var K = '___CLAUSEJS_REGISTRY';

function _maybeInitRegistry() {
  if (!reg) {
    clearRegistry();
  }
  return reg;
}

function clearRegistry() {
  reg = global[K] = {};
}

var meta = MetaFnClause.instrumentConformed(function meta(_ref3) {
  var _ref3$source = _ref3.source,
      namespacePath = _ref3$source.namespacePath,
      expression = _ref3$source.expression,
      metaObj = _ref3.metaObj;

  if (namespacePath) {
    var nObj = oPath.get(reg, _slashToDot(namespacePath));
    var currMeta = nObj && nObj['.meta'];
    oPath.set(reg, _slashToDot(namespacePath), oAssign({}, nObj, { '.meta': oAssign({}, currMeta, metaObj) }));
    return _get(namespacePath);
  } else if (expression) {
    var clause = coerceIntoClause(expression);
    clause.meta = oAssign(clause.meta, metaObj);
  }
});

_maybeInitRegistry();

var getRegistry = function getRegistry() {
  return reg;
};

var namespaceGetOrSet = NamespaceFnClause.instrumentConformed(function namespaceGetOrSet(_ref4) {
  var register = _ref4.register,
      retrieve = _ref4.retrieve;

  if (register) {
    return setNamespacePath(register);
  } else if (retrieve) {
    return getNamespacePath(retrieve);
  }
});

namespaceGetOrSet.get = GetNSFnClause.instrumentConformed(getNamespacePath);
namespaceGetOrSet.set = SetNSFnClause.instrumentConformed(setNamespacePath);
namespaceGetOrSet.clearRegistry = clearRegistry;
namespaceGetOrSet.getRegistry = getRegistry;
namespaceGetOrSet.meta = meta;

exports.getRegistry = getRegistry;
exports.clearRegistry = clearRegistry;
exports.meta = meta;
exports.default = namespaceGetOrSet;
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(43)))

/***/ },
/* 86 */
/***/ function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _namespace = __webpack_require__(85);

var _namespace2 = _interopRequireDefault(_namespace);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var oAssign = __webpack_require__(4);


var ops = __webpack_require__(15);
var utils = __webpack_require__(23);

var predicates = __webpack_require__(17);

var models = {
  Problem: __webpack_require__(2),
  Clause: __webpack_require__(1)
};

var r = oAssign(_namespace2.default, ops, utils, models, predicates);

r.VERSION = __webpack_require__(84);

module.exports = r;
exports.default = r;

/***/ },
/* 87 */
/***/ function(module, exports, __webpack_require__) {

"use strict";


function get(obj, path, defaultValue) {
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
    return get(obj, path.split('.'), defaultValue);
  }

  var currentPath = getKey(path[0]);
  var nextObj = obj[currentPath];
  if (nextObj === void 0) {
    return defaultValue;
  }

  if (path.length === 1) {
    return nextObj;
  }

  return get(obj[currentPath], path.slice(1), defaultValue);
}

function set(obj, path, value) {
  if (typeof path === 'number') {
    path = [path];
  }
  if (!path || path.length === 0) {
    return obj;
  }
  if (typeof path === 'string') {
    return set(obj, path.split('.').map(getKey), value);
  }
  var currentPath = path[0];
  var currentValue = obj[currentPath];
  if (path.length === 1) {
    obj[currentPath] = value;
    return currentValue;
  }

  if (currentValue === void 0) {
    //check if we assume an array
    if (typeof path[1] === 'number') {
      obj[currentPath] = [];
    } else {
      obj[currentPath] = {};
    }
  }

  return set(obj[currentPath], path.slice(1), value);
}

function getKey(key) {
  var intKey = parseInt(key);
  if (intKey.toString() === key) {
    return intKey;
  }
  return key;
}

module.exports = { get: get, set: set };

/***/ }
/******/ ]);
});