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
/******/ 	return __webpack_require__(__webpack_require__.s = 85);
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
var stringifyWithFnName = __webpack_require__(23);

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
  var s = __webpack_require__(66);
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
var getOwnPropertySymbols = Object.getOwnPropertySymbols;
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
    var test1 = new String('abc'); // eslint-disable-line no-new-wrappers
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
    if (Object.keys(Object.assign({}, test3)).join('') !== 'abcdefghijklmnopqrst') {
      return false;
    }

    return true;
  } catch (err) {
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

    if (getOwnPropertySymbols) {
      symbols = getOwnPropertySymbols(from);
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


var coerceIntoClause = __webpack_require__(9);

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


var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var oAssign = __webpack_require__(4);
var Clause = __webpack_require__(1);
var isClause = __webpack_require__(5);
var isPred = __webpack_require__(10);
var isExpr = __webpack_require__(38);
var clauseFromAlts = __webpack_require__(7);
var isProblem = __webpack_require__(0);
var isClauseName = __webpack_require__(37);
var namedFn = __webpack_require__(14);
var isClauseRef = __webpack_require__(13);
var isDelayedClause = __webpack_require__(22);
var c = __webpack_require__(45);
var coerceIntoClause = __webpack_require__(9);
var fclause = __webpack_require__(18);
var walk = __webpack_require__(16);

var isObj = __webpack_require__(20);
var isStr = __webpack_require__(6);
var oneOf = __webpack_require__(34);
var not = __webpack_require__(33);

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
/* 9 */
/***/ function(module, exports, __webpack_require__) {

"use strict";


var isPred = __webpack_require__(10);
var isClause = __webpack_require__(5);
var isClauseRef = __webpack_require__(13);
var isDelayedClause = __webpack_require__(22);
var Clause = __webpack_require__(1);
var Problem = __webpack_require__(2);
var fnName = __webpack_require__(3);
var stringifyWithFnName = __webpack_require__(23);

var CLAUSE_TYPE_PRED = 'PRED';

function coerceIntoClause(expr) {
  if (isClause(expr) || isClauseRef(expr) || isDelayedClause(expr)) {
    return expr;
  } else if (isPred(expr)) {
    return _wrap(expr);
  } else {
    console.error(expr);
    throw new Error('\'Expression must either be a Clause object or a predication function that returns true or false. Given value: ' + stringifyWithFnName(expr) + '\'');
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
/* 10 */
/***/ function(module, exports, __webpack_require__) {

"use strict";


var isFn = __webpack_require__(11);

function isPred(x) {
  return isFn(x);
}

module.exports = isPred;

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


module.exports = function isUndefined(x) {
  return x === undefined;
};

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
var regex = __webpack_require__(8);

var _require = __webpack_require__(8),
    shape = _require.shape,
    keys = _require.keys,
    mapOf = _require.mapOf;

var nullable = __webpack_require__(51);
var undefinable = __webpack_require__(52);
var maybe = __webpack_require__(46);

var _require2 = __webpack_require__(43),
    wall = _require2.wall;

var equals = __webpack_require__(29);

var sCat = function sCat(str) {
  return regex.cat.apply(null, Array.prototype.slice.call(str).map(equals));
};

var other = {
  any: __webpack_require__(44),
  fclause: __webpack_require__(18),
  wall: wall, clause: wall,
  nullable: nullable, undefinable: undefinable, maybe: maybe,
  sCat: sCat
};

var r = oAssign({}, regex, { shape: shape, keys: keys, mapOf: mapOf }, other);
module.exports = r;

/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

"use strict";


var oAssign = __webpack_require__(4);
var nfaWalker = __webpack_require__(74);
var anyWalker = __webpack_require__(68);
var predWalker = __webpack_require__(75);
var wallWalker = __webpack_require__(77);
var fclauseWalker = __webpack_require__(72);
var shapeWalker = __webpack_require__(76);
var andWalker = __webpack_require__(67);
var collOfWalker = __webpack_require__(70);
var mapOfWalker = __webpack_require__(73);
var clauseRefWalker = __webpack_require__(69);
var delayedClauseWalker = __webpack_require__(71);
var coerceIntoClause = __webpack_require__(9);
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


var isNum = __webpack_require__(32);
var isNatInt = __webpack_require__(54);
var isInt = __webpack_require__(31);
var isBool = __webpack_require__(40);
var isFn = __webpack_require__(11);
var isObj = __webpack_require__(20);
var isPlainObj = __webpack_require__(55);
var equals = __webpack_require__(29);
var oneOf = __webpack_require__(34);
var isStr = __webpack_require__(6);
var isDate = __webpack_require__(53);
var not = __webpack_require__(33);
var instanceOf = __webpack_require__(30);
var isUuid = __webpack_require__(56);
var isArray = Array.isArray;

var e = {
  isNull: __webpack_require__(19),
  isUndefined: __webpack_require__(12),
  notEmpty: __webpack_require__(57),
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


function isNull(x) {
  return x === null;
}

module.exports = isNull;

/***/ },
/* 20 */
/***/ function(module, exports, __webpack_require__) {

"use strict";


var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

function isObject(x) {
  return (typeof x === 'undefined' ? 'undefined' : _typeof(x)) === 'object' && x !== null;
}

module.exports = isObject;

/***/ },
/* 21 */
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
/* 22 */
/***/ function(module, exports, __webpack_require__) {

"use strict";


var DelayedClause = __webpack_require__(28);
var instanceOf = __webpack_require__(30);

//TODO
module.exports = instanceOf(DelayedClause);

/***/ },
/* 23 */
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
/* 24 */
/***/ function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.NamespaceObjClause = exports.ResolveFnClause = exports.MetaFnClause = exports.isNamespacePath = exports.NamespaceFnClause = exports.GetNSFnClause = exports.SetNSFnClause = exports.isClauseRef = undefined;

var _core = __webpack_require__(15);

var _utils = __webpack_require__(26);

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

var ResolveFnClause = (0, _core.fclause)({
  args: (0, _core.cat)('expression', _core.ExprClause, 'registry', (0, _core.zeroOrOne)(_preds.isObj)),
  ret: _utils.isNamespacePath
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
exports.ResolveFnClause = ResolveFnClause;
exports.NamespaceObjClause = NamespaceObjClause;

/***/ },
/* 25 */
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
/* 26 */
/***/ function(module, exports, __webpack_require__) {

"use strict";


var _sExpression = __webpack_require__(27);

var _sExpression2 = _interopRequireDefault(_sExpression);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = {
  conform: __webpack_require__(21),
  isValid: __webpack_require__(64),
  isNamespacePath: __webpack_require__(63),
  identity: __webpack_require__(36),
  isProblem: __webpack_require__(0),
  delayed: __webpack_require__(35),
  enforce: __webpack_require__(59),
  isExpr: __webpack_require__(38),
  isClause: __webpack_require__(5),
  isFclause: __webpack_require__(62),
  isClauseRef: __webpack_require__(13),
  describe: __webpack_require__(41),
  deref: __webpack_require__(25),
  isClauseName: __webpack_require__(37),
  sExpression: _sExpression2.default
};

/***/ },
/* 27 */
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
    mapOf = _require.mapOf,
    maybe = _require.maybe;

var delayed = __webpack_require__(35);
var coerceIntoClause = __webpack_require__(9);

var _require2 = __webpack_require__(17),
    isStr = _require2.isStr,
    isPlainObj = _require2.isPlainObj,
    instanceOf = _require2.instanceOf;

function Recursive(expression) {
  this.isRecursive = true;
  this.expression = expression;
}

function QuotedParamsMap(map) {
  oAssign(this, map);
}

function UnquotedParamsMap(map) {
  oAssign(this, map);
}

var ParamsMapC = mapOf(any, maybe(or('keyList', zeroOrMore(delayed(function () {
  return ParamLabelClause;
})), 'singleParam', delayed(function () {
  return ParamItemClause;
}))));

var QuotedParamsMapC = and(instanceOf(QuotedParamsMap), ParamsMapC);

var UnquotedParamsMapC = and(instanceOf(UnquotedParamsMap), ParamsMapC);

var ParamItemClause = or('sExpression', delayed(function () {
  return SExpressionClause;
}), 'quotedParamsMap', QuotedParamsMapC, 'unquotedParamsMap', UnquotedParamsMapC, 'optionsObj', isPlainObj, 'recursive', instanceOf(Recursive));

var ParamLabelClause = isStr;

var SExpressionClause = wall(cat('head', ExprClause, 'params', or('labelled', zeroOrMore(cat('label', ParamLabelClause, 'item', ParamItemClause)), 'unlabelled', zeroOrMore(ParamItemClause))));

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
    var r = exprs.reduce(function (acc, _ref3) {
      var name = _ref3.name,
          expr = _ref3.expr;
      return acc.concat(['"' + name + '"', _createSExpr(repo, expr)]);
    }, []);
    return r;
  } else {
    return exprs.reduce(function (acc, _ref4) {
      var expr = _ref4.expr;
      return acc.concat([_createSExpr(repo, expr)]);
    }, []);
  }
};

var sParamsConverters = {
  'PRED': function PRED() {
    return [];
  },
  'WALL': function WALL(repo, _ref5) {
    var enclosedClause = _ref5.opts.enclosedClause;
    return [_createSExpr(repo, enclosedClause)];
  },
  'AND': function AND(repo, _ref6) {
    var conformedExprs = _ref6.opts.conformedExprs;
    return conformedExprs.map(clauseFromAlts).map(function (c) {
      return _createSExpr(repo, c);
    });
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
  'SHAPE': function SHAPE(repo, _ref7) {
    var _ref7$opts$conformedA = _ref7.opts.conformedArgs.shapeArgs,
        _ref7$opts$conformedA2 = _ref7$opts$conformedA.optionalFields;
    _ref7$opts$conformedA2 = _ref7$opts$conformedA2 === undefined ? {} : _ref7$opts$conformedA2;
    var opt = _ref7$opts$conformedA2.opt,
        optional = _ref7$opts$conformedA2.optional,
        _ref7$opts$conformedA3 = _ref7$opts$conformedA.requiredFields;
    _ref7$opts$conformedA3 = _ref7$opts$conformedA3 === undefined ? {} : _ref7$opts$conformedA3;
    var req = _ref7$opts$conformedA3.req,
        required = _ref7$opts$conformedA3.required;
    return oAssign(new UnquotedParamsMap(), req || required ? {
      required: _fieldDefToFrags(repo, req || required)
    } : {}, opt || optional ? {
      optional: _fieldDefToFrags(repo, opt || optional)
    } : {});
  },
  'FCLAUSE': function FCLAUSE(repo, _ref8) {
    var _ref8$opts = _ref8.opts,
        args = _ref8$opts.args,
        ret = _ref8$opts.ret,
        fn = _ref8$opts.fn;
    return oAssign(new UnquotedParamsMap(), args ? { args: _createSExpr(repo, args) } : {}, ret ? { ret: _createSExpr(repo, ret) } : {}, fn ? { fn: [fnName(fn) + '()'] } : {});
  }
};

function _fieldDefToFrags(repo, _ref9) {
  var _ref9$fieldDefs = _ref9.fieldDefs;
  _ref9$fieldDefs = _ref9$fieldDefs === undefined ? {} : _ref9$fieldDefs;
  var fields = _ref9$fieldDefs.fields,
      keyList = _ref9.keyList;

  if (fields) {
    var r = new QuotedParamsMap();
    for (var key in fields) {
      if (fields.hasOwnProperty(key)) {
        var _fields$key = fields[key],
            keyValExprPair = _fields$key.keyValExprPair,
            valExpressionOnly = _fields$key.valExpressionOnly;

        if (keyValExprPair) {
          var keyExpression = keyValExprPair.keyExpression,
              valExpression = keyValExprPair.valExpression;

          oAssign(r, _defineProperty({}, key, new UnquotedParamsMap({
            'keyExpression': _createSExpr(repo, clauseFromAlts(keyExpression)),
            'valExpression': _createSExpr(repo, clauseFromAlts(valExpression))
          })));
        } else if (valExpressionOnly) {
          oAssign(r, _defineProperty({}, key, _createSExpr(repo, clauseFromAlts(valExpressionOnly))));
        }
      }
    }
    return r;
  } else if (keyList) {
    return keyList;
  } else {
    throw '!w';
  }
}

function _params(repo, clause) {
  var converter = sParamsConverters[clause.type];
  if (!converter) {
    console.error(clause);
    throw new Error('Unsupported clause type ' + clause.type + '.');
  } else {
    var r = converter(repo, clause);
    return r;
  }
}

function _createSExpr(repo, expr) {
  if (_exists(repo, expr)) {
    return new Recursive(expr);
  }
  var coercedExpr = coerceIntoClause(expr),
      realExpr = void 0,
      newRepo = repo;
  if (coercedExpr.type === 'DELAYED' || coercedExpr.type === 'CLAUSE_REF') {
    realExpr = coercedExpr.get();
    return _createSExpr(repo, realExpr);
  } else {
    realExpr = coercedExpr;
    newRepo = _addToRepo(repo, coercedExpr);
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
exports.Recursive = Recursive;
exports.QuotedParamsMap = QuotedParamsMap;
exports.UnquotedParamsMap = UnquotedParamsMap;

/***/ },
/* 28 */
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
/* 29 */
/***/ function(module, exports, __webpack_require__) {

"use strict";


module.exports = function equals(test) {
  return function equalsVal(x) {
    return x === test;
  };
};

/***/ },
/* 30 */
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
    return 'instanceOf_' + (n || 'anonymous_type') + '_';
  };

  return fn;
};

/***/ },
/* 31 */
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
/* 32 */
/***/ function(module, exports, __webpack_require__) {

"use strict";


function isNum(x) {
  return typeof x === 'number';
}

module.exports = isNum;

/***/ },
/* 33 */
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
/* 34 */
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
/* 35 */
/***/ function(module, exports, __webpack_require__) {

"use strict";


var DelayedClause = __webpack_require__(28);

function delayed(getFn) {
  return new DelayedClause({ getFn: getFn });
}

module.exports = delayed;

/***/ },
/* 36 */
/***/ function(module, exports, __webpack_require__) {

"use strict";


function identity(x) {
  return x;
}

module.exports = identity;

/***/ },
/* 37 */
/***/ function(module, exports, __webpack_require__) {

"use strict";


var isStr = __webpack_require__(6);

//TODO
module.exports = function isClauseName(x) {
  return isStr(x);
};

/***/ },
/* 38 */
/***/ function(module, exports, __webpack_require__) {

"use strict";


var isPred = __webpack_require__(10);
var isClause = __webpack_require__(5);
var isClauseRef = __webpack_require__(13);
var isDelayedClause = __webpack_require__(22);

function isExpr(x) {
  return isPred(x) || isClause(x) || isClauseRef(x) || isDelayedClause(x);
}

module.exports = isExpr;

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


var _sExpression = __webpack_require__(27);

var _sExpression2 = _interopRequireDefault(_sExpression);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var humanReadable = __webpack_require__(61);
var isStr = __webpack_require__(6);
var isProblem = __webpack_require__(0);
var handle = __webpack_require__(60);
var clauseFromAlts = __webpack_require__(7);
var fnName = __webpack_require__(3);
var stringifyWithFnName = __webpack_require__(23);
var repeat = __webpack_require__(65);

var NEW_LINE = function NEW_LINE() {};
var INDENT_IN = function INDENT_IN() {};
var INDENT_OUT = function INDENT_OUT() {};

function describe(expr, replacer, space) {
  var sexpr = (0, _sExpression2.default)(expr);
  var cSexpr = _sExpression.SExpressionClause.conform(sexpr);
  if (isProblem(cSexpr)) {
    console.error(cSexpr);
    throw new Error('The given expression is not a valid expression.');
  }
  var strFragments = _strFragments(cSexpr, replacer);
  var level = 0;
  var r = _walkConcat(strFragments, level, space);

  return r;
}

function _strFragments(_ref, replacer) {
  var headAlt = _ref.head,
      params = _ref.params;

  var head = clauseFromAlts(headAlt);
  if (replacer) {
    var interceptR = replacer(head);
    if (interceptR) {
      return interceptR;
    }
  }
  if (head.type === 'PRED') {
    return ['' + fnName(head.opts.predicate)];
  }
  var label = humanReadable(head);
  var commaedParamFrags = void 0;

  if (params) {
    var labelled = params.labelled,
        unlabelled = params.unlabelled,
        keyList = params.keyList;

    if (labelled) {
      var paramFrags = labelled.reduce(function (acc, _ref2) {
        var label = _ref2.label,
            item = _ref2.item;
        return acc.concat([[label, ', ', _fragmentParamAlts(item, replacer)]]);
      }, []);
      commaedParamFrags = interpose(paramFrags, [', ', NEW_LINE]);
    } else if (unlabelled) {
      var _paramFrags = unlabelled.map(function (p) {
        return _fragmentParamAlts(p, replacer);
      });
      commaedParamFrags = interpose(_paramFrags, [', ']);
    } else if (keyList) {
      var _paramFrags2 = keyList;
      commaedParamFrags = interpose(_paramFrags2, [', ']);
    } else {
      // console.error( params );
      // throw '!z';
      commaedParamFrags = [];
    }
  } else {
    commaedParamFrags = [];
  }

  return [label, '('].concat(commaedParamFrags.length > 1 ? [INDENT_IN, NEW_LINE] : [' ']).concat(commaedParamFrags).concat(commaedParamFrags.length > 1 ? [INDENT_OUT, NEW_LINE] : [' ']).concat([')']);
}

function interpose(arr, interArr) {
  if (arr.length === 0) {
    return arr;
  } else {
    return arr.reduce(function (acc, curr, idx) {
      if (idx < arr.length - 1 && !_isSpecial(curr)) {
        return acc.concat([curr]).concat(interArr);
      } else {
        return acc.concat([curr]);
      }
    }, []);
  }
}

function _isSpecial(x) {
  return x === NEW_LINE || x === INDENT_IN || x === INDENT_OUT;
}

function _fragmentParamAlts(pAlts, replacer) {
  var r = handle(pAlts, {
    'label': function label(lbl) {
      return lbl;
    },
    'sExpression': function sExpression(expr) {
      return _strFragments(expr, replacer);
    },
    'quotedParamsMap': function quotedParamsMap(o) {
      return _fragmentParamsObj(o, replacer, true);
    },
    'unquotedParamsMap': function unquotedParamsMap(o) {
      return _fragmentParamsObj(o, replacer, false);
    },
    'optionsObj': function optionsObj(o) {
      return stringifyWithFnName(o);
    },
    'recursive': function recursive(_ref3) {
      var expression = _ref3.expression;
      return ['<recursive>: ', humanReadable(expression)];
    }
  }, function () {
    throw '!s';
  });
  return r;
}

function _fragmentParamsObj(pObj, replacer, quote) {
  var r = ['{', INDENT_IN, NEW_LINE];
  var body = [];
  for (var label in pObj) {
    if (pObj.hasOwnProperty(label)) {
      var item = [];
      item.push(quote ? '"' + label + '": ' : '<' + label + '>: ');
      var r1 = handle(pObj[label], {
        'keyList': function keyList(list) {
          return ['[ '].concat(interpose(list.map(function (i) {
            return '"' + i + '"';
          }), [', '])).concat(' ]');
        },
        'singleParam': function singleParam(p) {
          return _fragmentParamAlts(p, replacer);
        }
      }, function () {
        throw '!e';
      });
      if (r1) {
        item.push(r1);
        body.push(item);
      }
    }
  }
  body = interpose(body, [', ', NEW_LINE]);
  r = r.concat(body).concat([INDENT_OUT, NEW_LINE, '}']);
  return r;
}

function _walkConcat(frags, level, space) {
  var newLevel = level;
  var justNewLine = false;
  return frags.reduce(function (acc, f) {
    if (justNewLine) {
      justNewLine = false;
      acc = acc.concat(repeat(space * newLevel, ' ').join(''));
    }
    if (isStr(f)) {
      return acc.concat(f);
    } else if (Array.isArray(f)) {
      return acc.concat(_walkConcat(f, newLevel, space));
    } else if (f === NEW_LINE) {
      if (space > 0) {
        justNewLine = true;
        return acc.concat('\n');
      }
    } else if (f === INDENT_IN) {
      newLevel += 1;
    } else if (f === INDENT_OUT) {
      newLevel -= 1;
    } else {
      console.error(f);
      throw '!3';
    }
    return acc;
  }, '');
}

module.exports = describe;

/***/ },
/* 42 */
/***/ function(module, exports, __webpack_require__) {

"use strict";


var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _namespace = __webpack_require__(24);

var resolvedMaps = [];


function resolve(clauseRef, registry) {
  var map = _findFirst(resolvedMaps, function (_ref) {
    var _ref2 = _slicedToArray(_ref, 2),
        registryRef = _ref2[0],
        m = _ref2[1];

    if (registryRef === registry) {
      return m;
    }
  });

  if (!map) {
    map = _createResolveMap(registry);
    resolvedMaps.push([registry, map]);
  }

  return _resolveWithMap(map, clauseRef);
}

function getDefList(registry) {
  var map = _createResolveMap(registry);
  var groups = {};
  map.forEach(function (curr) {
    var _curr = _slicedToArray(curr, 1),
        p = _curr[0];

    if (!groups[p]) {
      groups[p] = [];
    }
    groups[p].push(curr);
  });
  return groups;
}

function _createResolveMap(registry) {
  var r = [];
  var conformedReg = _namespace.NamespaceObjClause.conform(registry);
  _walk(null, null, conformedReg, r);
  return r;
}

function _walk(prefix, currN, creg, r) {
  var currNs = prefix ? prefix + '.' + currN : currN;
  var subnamespaces = void 0;

  for (var key in creg) {
    if (creg.hasOwnProperty(key)) {
      switch (key) {
        case 'subNamespaces':
          subnamespaces = creg[key];
          for (var sns in subnamespaces) {
            if (subnamespaces.hasOwnProperty(sns)) {
              _walk(currNs, sns, subnamespaces[sns], r);
            }
          }
          break;
        case '.expr':
          r.push(['' + (prefix ? prefix : ''), '' + currN, creg['.expr']]);
          break;
        default:
          break;
      }
    }
  }
}

function _resolveWithMap(map, clauseRef) {
  var path = _findFirst(map, function (_ref3) {
    var _ref4 = _slicedToArray(_ref3, 3),
        p = _ref4[0],
        n = _ref4[1],
        r = _ref4[2];

    if (r === clauseRef || _tryStripPredClause(r) === _tryStripPredClause(clauseRef)) {
      return p + '/' + n;
    }
  });
  return path;
}

function _tryStripPredClause(expr) {
  if (expr.type === 'PRED') {
    return expr.opts.predicate;
  } else {
    return expr;
  }
}

function _findFirst(array, fn) {
  for (var i = 0; i < array.length; i++) {
    var r = fn(array[i]);
    if (r) {
      return r;
    }
  }
  return null;
}

module.exports = {
  resolve: resolve,
  getDefList: getDefList
};

/***/ },
/* 43 */
/***/ function(module, exports, __webpack_require__) {

"use strict";


var Clause = __webpack_require__(1);
var coerceIntoClause = __webpack_require__(9);

var _require = __webpack_require__(8),
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
/* 44 */
/***/ function(module, exports, __webpack_require__) {

"use strict";


var Clause = __webpack_require__(1);
var identity = __webpack_require__(36);
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


var _require = __webpack_require__(8),
    or = _require.or;

var isNull = __webpack_require__(19);
var isUndefined = __webpack_require__(12);

function maybe(clause) {
  return or(isNull, isUndefined, clause);
}

module.exports = maybe;

/***/ },
/* 47 */
/***/ function(module, exports, __webpack_require__) {

"use strict";


var fragment = __webpack_require__(48);
var Clause = __webpack_require__(1);
var deref = __webpack_require__(25);

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
/* 48 */
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
/* 49 */
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
/* 50 */
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
/* 51 */
/***/ function(module, exports, __webpack_require__) {

"use strict";


var _require = __webpack_require__(8),
    or = _require.or;

var isNull = __webpack_require__(19);

function nullable(clause) {
  return or(isNull, clause);
}

module.exports = nullable;

/***/ },
/* 52 */
/***/ function(module, exports, __webpack_require__) {

"use strict";


var _require = __webpack_require__(8),
    or = _require.or;

var isUndefined = __webpack_require__(12);

function undefinable(clause) {
  return or(isUndefined, clause);
}

module.exports = undefinable;

/***/ },
/* 53 */
/***/ function(module, exports, __webpack_require__) {

"use strict";


module.exports = function isDate(date) {
  return date && date instanceof Date && !isNaN(date.valueOf());
};

/***/ },
/* 54 */
/***/ function(module, exports, __webpack_require__) {

"use strict";


var isInt = __webpack_require__(31);

function isNatInt(x) {
  return isInt(x) && x >= 0.0;
}

module.exports = isNatInt;

/***/ },
/* 55 */
/***/ function(module, exports, __webpack_require__) {

"use strict";


var isObj = __webpack_require__(20);

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
/* 56 */
/***/ function(module, exports, __webpack_require__) {

"use strict";


module.exports = function isUuid(x) {
  return !!/^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(x);
};

/***/ },
/* 57 */
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
/* 58 */
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
/* 59 */
/***/ function(module, exports, __webpack_require__) {

"use strict";


var isProblem = __webpack_require__(0);
// TODO : replace with checkProblem
var conform = __webpack_require__(21);

module.exports = function enforce(clause, x) {
  var r = conform(clause, x);
  if (isProblem(r)) {
    throw r;
  }
  return undefined;
};

/***/ },
/* 60 */
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
/* 61 */
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
var isPred = __webpack_require__(10);
var isClause = __webpack_require__(5);
var conform = __webpack_require__(21);

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


function repeat(n, x) {
  var arr = [],
      i;
  for (i = 0; i < n; i++) {
    arr.push(x);
  }
  return arr;
}

module.exports = repeat;

/***/ },
/* 66 */
/***/ function(module, exports, __webpack_require__) {

"use strict";


var whiteSpaces = [0x0009, // Tab
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
];

module.exports = whiteSpaces.reduce(function (acc, item) {
  return acc + String.fromCharCode(item);
}, '');

/***/ },
/* 67 */
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
/* 68 */
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
/* 69 */
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
/* 70 */
/***/ function(module, exports, __webpack_require__) {

"use strict";


var Problem = __webpack_require__(2);
var isProblem = __webpack_require__(0);
var isNum = __webpack_require__(32);

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
/* 71 */
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
/* 72 */
/***/ function(module, exports, __webpack_require__) {

"use strict";


var isProblem = __webpack_require__(0);
var Problem = __webpack_require__(2);
var functionName = __webpack_require__(3);
var namedFn = __webpack_require__(14);
var betterThrow = __webpack_require__(58);

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
/* 73 */
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
/* 74 */
/***/ function(module, exports, __webpack_require__) {

"use strict";


function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var simulate = __webpack_require__(50);
var getMatch = __webpack_require__(49);
var compile = __webpack_require__(47);
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
/* 75 */
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
/* 76 */
/***/ function(module, exports, __webpack_require__) {

"use strict";


var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var isProblem = __webpack_require__(0);
var isUndefined = __webpack_require__(12);
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
/* 77 */
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
/* 78 */,
/* 79 */,
/* 80 */,
/* 81 */,
/* 82 */,
/* 83 */,
/* 84 */,
/* 85 */
/***/ function(module, exports, __webpack_require__) {

"use strict";


var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _namespace = __webpack_require__(24);

var _fnName2 = __webpack_require__(3);

var _fnName3 = _interopRequireDefault(_fnName2);

var _isPred = __webpack_require__(10);

var _isPred2 = _interopRequireDefault(_isPred);

var _isClause = __webpack_require__(5);

var _isClause2 = _interopRequireDefault(_isClause);

var _preds = __webpack_require__(17);

var _describe = __webpack_require__(41);

var _describe2 = _interopRequireDefault(_describe);

var _deref = __webpack_require__(25);

var _deref2 = _interopRequireDefault(_deref);

var _resolve = __webpack_require__(42);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var clauseFromAlts = __webpack_require__(7);

function gen(registry) {
  var conformedReg = _namespace.NamespaceObjClause.conform(registry);
  var docstr = _walk(registry, null, null, conformedReg);
  return docstr;
}

function genCot(registry) {
  var r = (0, _resolve.getDefList)(registry);
  var groups = Object.keys(r);
  return '<dl>\n    ' + groups.map(function (p) {
    return '\n    <dt>\n      ' + p + '\n    </dt>\n    <dd>\n      <ul>\n      ' + r[p].map(function (_ref) {
      var _ref2 = _slicedToArray(_ref, 3),
          p = _ref2[0],
          n = _ref2[1],
          ref = _ref2[2];

      return '<li>\n            ' + _clauseRefLink(p + '/' + n)(function (p) {
        return _stylizeName((0, _deref2.default)(ref), _unanbiguousName(p));
      }) + '\n          </li>';
    }).join('') + '\n      </ul>\n    </dd>\n    ';
  }).join('') + '\n  </dl>';
}

function _walk(globalReg, prefix, currentFrag, creg) {
  var currentNs = prefix ? prefix + '.' + currentFrag : currentFrag;
  var r = '';
  var subresults = [];
  var nsComment = void 0,
      exprResult = void 0,
      subNamespaces = void 0;
  for (var key in creg) {
    if (creg.hasOwnProperty(key)) {
      switch (key) {
        case 'subNamespaces':
          subNamespaces = creg[key];
          for (var subnamespace in subNamespaces) {
            if (subNamespaces.hasOwnProperty(subnamespace)) {
              var subresult = _walk(globalReg, currentNs, subnamespace, subNamespaces[subnamespace]);
              subresults.push(subresult);
            }
          }
          break;
        case '.nsComment':
          nsComment = '<p><i>' + creg[key] + '</i></p>';
          break;
        case '.expr':
          exprResult = _exprMeta(globalReg, currentFrag, creg['.expr'], creg['.meta']);
          break;
        default:
          break;
      }
    }
  }

  if (exprResult) {
    r += exprResult;
  }
  if (currentNs && (nsComment || _hasExprs(subNamespaces))) {
    r += '<h3>' + currentNs + '/</h3><hr />';
  }

  if (nsComment) {
    r += nsComment;
  }

  if (subresults.length > 0) {
    r += subresults.join('\n');
  }

  return r;
}

function _hasExprs(subNamespaces) {
  if (!subNamespaces) {
    return false;
  }
  return Object.keys(subNamespaces).filter(function (n) {
    return subNamespaces[n]['.expr'];
  }).length > 0;
}

function _exprMeta(globalReg, exprName, expr, meta) {
  if (!expr) {
    throw new Error('Expression ' + exprName + ' does not exist in the registry');
  }
  var docstr = void 0;
  docstr = genForExpression(globalReg, exprName, expr, meta);
  return docstr;
}

var typeTable = {
  'FCLAUSE': 'function',
  'PRED': 'predicate',
  'CAT': 'cat sequence'
};

function _stylizeName(expr, name) {
  if (expr.type === 'FCLAUSE') {
    return name + '()';
  } else {
    return name;
  }
}

function _type(expr) {
  if ((0, _isClause2.default)(expr)) {
    return typeTable[expr.type] || expr.type.toLowerCase();
  } else if ((0, _isPred2.default)(expr)) {
    return 'predicate';
  }
}

function genForExpression(globalReg, exprName, expr, meta) {
  var docstr = void 0;
  var path = (0, _resolve.resolve)(expr, globalReg);

  if (path && !exprName) {
    docstr = _genClauseRef(globalReg, exprName, path, expr, meta);
  } else if (expr.type === 'CLAUSE_REF') {
    docstr = _genClauseRef(globalReg, exprName, null, expr, meta);
  } else if (expr.type === 'DELAYED') {
    return genForExpression(globalReg, exprName, expr.get(), meta);
  } else if (expr.type === 'FCLAUSE') {
    docstr = _genFclause(globalReg, exprName, expr, path, meta);
  } else if (expr.type === 'OR') {
    docstr = _genOrClause(globalReg, exprName, path, expr, meta);
  } else if (expr.type === 'CAT') {
    docstr = _genCatClause(globalReg, exprName, path, expr, meta);
  } else if ((0, _isPred2.default)(expr) || expr.type === 'PRED') {
    docstr = _genPredClause(globalReg, exprName, expr, meta);
  } else if ((0, _isPred2.default)(expr) || expr.type === 'ANY') {
    docstr = _genAnyClause();
  } else if (expr.type === 'AND') {
    docstr = _genAndClause(globalReg, exprName, path, expr, meta);
  } else {
    docstr = _genUnknownClause(globalReg, exprName, path, expr, meta);
  }

  var name = meta && meta['name'] || exprName;
  var header = exprName && path ? '\n      <h6>' + _stylizeName(expr, name) + '</h6>&nbsp;\n        <span class="tag tag-primary">\n          ' + _type(expr) + '\n        </span>\n      ' : null;

  return '\n    ' + (exprName && path ? '<a name="' + path + '"></a>' : '') + '\n    ' + _wrapCard({
    header: header,
    legend: !path ? _tagFor(expr, globalReg, path) : '<span class="tag tag-info">[clause]</span>',
    borderlabel: _labelFor(expr)
  })(docstr);
}

function _wrapCard(_ref3) {
  var header = _ref3.header,
      legend = _ref3.legend,
      borderlabel = _ref3.borderlabel;

  if (header) {
    return function (body) {
      return '\n        <div class="card">\n          <div class="card-header inline-headers">\n            ' + header + '\n          </div>\n        ' + body + '\n        </div>\n      ';
    };
  } else if (legend) {
    return function (body) {
      return '\n    <fieldset class="card card-outline-' + (borderlabel || 'default') + '">\n    <legend class="clause-type">\n      ' + legend + '\n    </legend>\n    ' + body + '\n    </fieldset>\n    ';
    };
  }
}

function escapeHtml(text) {
  var map = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    '\'': '&#039;'
  };

  return text.replace(/[&<>"']/g, function (m) {
    return map[m];
  });
}

function _tagFor(expr, globalReg, path) {
  return '\n    <span \n      role="button"\n      data-toggle="popover"\n      data-trigger="focus hover"\n      data-html="true"\n      data-content="' + escapeHtml(_syntax(expr, globalReg, path)) + '"\n      data-container="body"\n      data-animation="false"\n      data-delay="500"\n      class="tag tag-' + _labelFor(expr) + '">\n      ' + _typeFor(expr) + '\n    </span>\n  ';
}

function _rawTypeFor(expr) {
  var lowerT = void 0;
  var derefedExpr = (0, _deref2.default)(expr);
  if ((0, _isPred2.default)(derefedExpr)) {
    lowerT = 'pred';
  } else {
    lowerT = derefedExpr.type.toLowerCase();
  }
  return lowerT;
}

function _typeFor(expr) {
  var lowerT = _rawTypeFor(expr);
  switch (lowerT) {
    case 'pred':
      return '[pred] satisfies predicate';
    case 'fclause':
      return '[fclause] a function';
    case 'z_or_m':
      return '[*] zero or more';
    case 'o_or_m':
      return '[+] one or more';
    case 'z_or_o':
      return '[?] optional';
    case 'coll_of':
      return '[collOf] a collection of';
    case 'cat':
      return '[cat] a sequence of';
    case 'or':
      return '[or] either one of';
    default:
      return '<span class="tag tag-info">[' + lowerT + ']</span>';
  }
}

function _labelFor(expr) {
  var lowerT = _rawTypeFor(expr);

  switch (lowerT) {
    case 'pred':
      return 'primary';
    case 'fclause':
      return 'info';
    case 'cat':case 'or':
      return 'info';
    default:
      return 'info';
  }
}

function _genAnyClause() {
  return '\n    <div class="card-block">Any value.</div>\n  ';
}

function _genClauseRef(globalReg, exprName, path, expr, meta) {
  var p = path || expr.ref;
  return '\n    <div class="card-block">\n      A value of type\n      ' + _clauseRefLink(p)(function (p) {
    return p;
  }) + '\n    </div>\n  ';
}

function _genAndClause(globalReg, exprName, path, expr, meta) {
  var example = meta && meta.example;
  var altDefs = expr.opts.conformedExprs.map(function (altE, idx) {
    return '\n        <fieldset class="list-group-item card-outline-' + _labelFor(expr) + '">\n          <legend class="clause-type">\n            <span class="tag tag-default">Condition ' + (idx + 1) + ' </span>\n          </legend>\n          <div class="row">\n            <div class="col-md-12">\n              ' + genForExpression(globalReg, null, clauseFromAlts(altE), null) + '\n            </div>\n          </div>\n        </fieldset>\n    ';
  });

  var r = '\n    <div class="card-block">\n      <p class="card-title">\n        Should satisfy <em>all</em> of the following expression:\n      </p>\n    </div>\n    <div class="list-group list-group-flush list-for-cat">\n      ' + altDefs.join(' ') + '\n    </div>\n  ';
  return r;
}

function _genCatClause(globalReg, exprName, path, expr, meta) {
  var example = meta && meta.example;
  var altDefs = expr.exprs.map(function (_ref4, idx) {
    var name = _ref4.name,
        altE = _ref4.expr;

    var comment = meta && meta[name] && meta[name].comment;
    return '\n        <fieldset class="list-group-item card card-outline-' + _labelFor(expr) + '">\n          <legend class="clause-type">\n          ' + (name ? '\n            <span class="tag tag-default">Part ' + (idx + 1) + '</span>\n            <span class="lead font-italic text-primary">\n              &ldquo;' + name + '&rdquo;</span>          \n          ' : '<span class="tag tag-default">Part ' + (idx + 1) + '</span>') + '\n          </legend>\n          <div class="row">\n            <div class="col-md-12">\n              ' + (comment ? '<span>' + comment + '</span>' : '') + '\n            </div>\n          </div>\n          <div class="row">\n            <div class="col-md-12">\n              ' + genForExpression(globalReg, null, altE, meta && meta[name]) + '\n            </div>\n          </div>\n        </fieldset>\n    ';
  });

  var r = '\n    <div class="card-block">\n      <p class="card-title">\n        Should be <em>an ordered list</em> of the following:\n      </p>\n    </div>\n    <div class="list-group list-group-flush list-for-cat">\n      ' + altDefs.join(' ') + '\n    </div>\n  ';
  return r;
}

// function _codeExample( code ) {
//   const r = `${code ? `
//     <blockquote class="blockquote">
//       <pre><code class="js">${ code }</code></pre>
//     </blockquote>` : ''}`
//   return r;
// }

function _synopsis(exprName, fclause, globalReg, meta) {
  var r = synopsisArray([], [], exprName, fclause, globalReg, meta, []);
  var h = _synopsisToHtml(r);
  return h;
}

function _synopsisToHtml(arr) {
  var h = void 0;
  if (Array.isArray(arr)) {
    h = arr.map(_synopsisToHtml).join('');
    h = '<ul>' + h + '</ul>';
  } else if ((0, _preds.isObj)(arr)) {
    var nameItemPairs = [];
    for (var name in arr) {
      nameItemPairs.push([name, arr[name]]);
    }
    h = nameItemPairs.map(function (_ref5) {
      var _ref6 = _slicedToArray(_ref5, 2),
          name = _ref6[0],
          item = _ref6[1];

      return '<li>&ldquo;' + name + '&rdquo;:<div>' + _synopsisToHtml(item) + '</div></li>';
    }).join('');
    h = '<ul>' + h + '</ul>';
  } else if ((0, _preds.isStr)(arr)) {
    h = arr;
  }
  return h;
}

function synopsisArray(prefixes, suffixes, exprName, clause, globalReg, meta, defs) {
  if (!clause) {
    return prefixes.concat(suffixes);
  } else if (clause.type == 'FCLAUSE') {
    var _fnName = meta && meta.name || exprName;

    return synopsisArray([_fnName, '('], [')'], null, clause.opts.args, globalReg, meta && meta.args, defs);
    // return {
    //   register: [
    //     'S(', 'nsPath', ', ', 'expression', ')'
    //   ],
    //   retrieve: [
    //     'var ', 'expression', ' = ', 'S(', 'nsPath', ', ', 'expression', ')'
    //   ],
    // };
  } else if (clause.type === 'OR') {
    var named = clause.opts.named;

    var obj = void 0;
    if (named) {
      obj = {};
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = clause.exprs[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var eAlt = _step.value;

          obj[eAlt.name] = synopsisArray(prefixes, suffixes, null, eAlt.expr, globalReg, meta && meta[eAlt.name], defs);
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator.return) {
            _iterator.return();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }
    } else {
      obj = [];
      var _iteratorNormalCompletion2 = true;
      var _didIteratorError2 = false;
      var _iteratorError2 = undefined;

      try {
        for (var _iterator2 = clause.exprs[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
          var _eAlt = _step2.value;

          obj.push(synopsisArray(prefixes, suffixes, null, _eAlt.expr, globalReg, meta && meta[_eAlt.name], defs));
        }
      } catch (err) {
        _didIteratorError2 = true;
        _iteratorError2 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion2 && _iterator2.return) {
            _iterator2.return();
          }
        } finally {
          if (_didIteratorError2) {
            throw _iteratorError2;
          }
        }
      }
    }
    return obj;
  } else if (clause.type === 'CAT') {
    var named = clause.opts.named;

    var _obj = [];

    var _loop = function _loop(i) {
      var eAlt = clause.exprs[i];
      var path = (0, _resolve.resolve)(eAlt.expr, globalReg);
      if (named) {
        _obj.push(path ? _clauseRefLink(path)(function () {
          return eAlt.name;
        }) : eAlt.name);
      } else {
        if (path) {
          _obj.push(_clauseRefLink(path)(_unanbiguousName));
        }
      }
      if (i < clause.exprs.length - 1) {
        _obj.push(', ');
      }
    };

    for (var i = 0; i < clause.exprs.length; i++) {
      _loop(i);
    }

    return ['<em>'].concat(prefixes).concat(_obj).concat(suffixes).concat(['</em>']);
  } else {
    console.error('Handler still missing for synopsis type ', clause);
    // throw '!';
    return clause.type;
  }
}

function _clauseRefLink(p) {
  return function (pGenFn) {
    return '<a href="#' + p + '" data-path="' + p + '">' + pGenFn(p) + '</a>';
  };
}

function _syntax(expr, globalReg, currPath) {
  // return ``;
  return '\n    <pre>' + unescape(_encode((0, _describe2.default)(expr, _refExprFn(globalReg, currPath), 2))) + '</pre>\n  ';
}

function _encode(str) {
  return str.split('<').join('&lt;').split('>').join('&gt;');
}

function _refExprFn(reg, currPath) {
  return function (expr) {
    var path = (0, _resolve.resolve)(expr, reg);
    if (path && path !== currPath) {
      var r = _clauseRefLink(path)(_unanbiguousName);
      r = escape(r);
      return [r];
    } else {
      return null;
    }
  };
}

function _unanbiguousName(path) {
  // TODO: make sure there are no duplicate names
  var name = path.substring(path.indexOf('/') + 1);
  return name;
}

function _genPredClause(globalReg, exprName, expr, meta) {
  var pred = expr.exprs ? expr.exprs[0] : expr;
  // const name = meta && meta[ 'name' ] || exprName;
  // const nameFrag = name ? `${name} ` : '';

  var r = '\n    <div class="card-block">\n      ' + _predSourcePopover('A value that satisfies ', pred) + '\n    </div>\n  ';
  return r;
}

function _predSourcePopover(prefix, pred) {
  var predName = (0, _fnName3.default)(pred);
  return '\n    <em>\n      ' + prefix + '\n      <span\n        data-toggle="popover"\n        data-trigger="hover click"\n        data-html="true"\n        role="button"\n        data-placement="top"\n        data-content="<pre>' + pred.toString() + '</pre>"\n        data-container="body"\n        data-animation="false"\n        data-delay="500">\n        ' + predName + '()\n      </span>\n    </em>\n  ';
}

function _genUnknownClause(globalReg, exprName, path, expr, meta) {
  var r = '\n    <div class="card-block">\n      ' + expr.exprs.map(function (exprAlts) {
    var name = exprAlts.name,
        expr = exprAlts.expr;

    if (expr) {
      return genForExpression(globalReg, name, expr, meta && meta[name]);
    } else {
      return genForExpression(globalReg, null, exprAlts, null);
    }
  }).join('') + '\n      TODO\n    </div>\n  ';
  return r;
}

function _genOrClause(globalReg, exprName, path, expr, meta) {
  if (!meta) {
    meta = {};
  }
  var altDefs = expr.exprs.map(function (_ref7, idx) {
    var name = _ref7.name,
        altE = _ref7.expr;

    var comment = meta[name] && meta[name].comment;
    var examples = meta[name] && meta[name].examples;
    if ((0, _preds.isStr)(examples)) {
      examples = [examples];
    }

    return '\n        <fieldset class="list-group-item card-outline-' + _labelFor(expr) + '">\n          <legend class="clause-type">\n            <span class="tag tag-default">\n                Option ' + (idx + 1) + '\n            </span>\n            ' + (name ? '\n                <span class="lead font-italic text-primary">\n                  &ldquo;' + name + '&rdquo;\n                </span>\n            ' : '') + '\n          </legend>\n          <div class="row">\n            <div class="col-md-12">\n            ' + (comment ? '<div>' + comment + '</div>' : '') + '\n            \n            ' + (examples ? '<h6>Examples: </h6>' + examples.map(function (e) {
      return '\n              <pre><code>' + e + '</code></pre>\n            ';
    }).join('\n') : '') + '\n            </div>\n          </div>\n          <div class="row">\n            <div class="col-md-12">\n              ' + genForExpression(globalReg, null, altE, meta && meta[name]) + '\n            </div>\n          </div>\n        </fieldset>\n    ';
  });

  var r = '\n    <div class="card-block">\n      <p class="card-title">\n      ' + (exprName ? '' : '\n      ') + '\n        Should be <em>one of</em> the following:\n      </p>\n    </div>\n    <div class="list-group list-group-flush list-for-or">\n      ' + altDefs.join('') + '\n    </div>\n  ';
  return r;
}

function toOrdinal(i) {
  var j = i % 10,
      k = i % 100;
  if (j == 1 && k != 11) {
    return i + 'st';
  }
  if (j == 2 && k != 12) {
    return i + 'nd';
  }
  if (j == 3 && k != 13) {
    return i + 'rd';
  }
  return i + 'th';
}

// NOTE: meta param is omitted at the end
function _genFclause(globalReg, exprName, clause, path) {
  var meta = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : {};

  var frags = [];

  var _ref8 = meta || {},
      comment = _ref8.comment,
      examples = _ref8.examples;

  if ((0, _preds.isStr)(examples)) {
    examples = [examples];
  }
  var _clause$opts = clause.opts,
      argsClause = _clause$opts.args,
      retClause = _clause$opts.ret,
      fn = _clause$opts.fn;

  if (comment) {
    frags.push([null, comment]);
  }
  if (exprName && path) {
    frags.push(['Syntax', '\n      <blockquote class="blockquote">\n        <small>\n          <em class="text-muted">\n            ' + _syntax(clause, globalReg, path) + '\n          </em>\n        </small>\n      </blockquote>\n    ']);
  }
  if (argsClause) {
    frags.push(['Synopsis', _synopsis(exprName, clause, globalReg, meta)]);
  }
  if (examples) {
    frags.push(['Examples', examples.map(function (e) {
      return '\n      <pre><code>' + e + '</code></pre>\n    ';
    }).join('\n')]);
  }
  if (argsClause) {
    frags.push(['Argument Clause', genForExpression(globalReg, null, argsClause, meta && meta.args)]);
  }
  if (retClause) {
    frags.push(['Return Value Clause', genForExpression(globalReg, null, retClause, meta && meta.ret)]);
  }if (fn) {
    frags.push(['Argument-return value relation', '<pre>' + (0, _fnName3.default)(fn) + '</pre>']);
  }
  var r = '\n    <dl class="card-block">\n    ' + frags.map(function (_ref9) {
    var _ref10 = _slicedToArray(_ref9, 2),
        name = _ref10[0],
        src = _ref10[1];

    var title = name ? '<dt>' + name + '</dt>' : '';
    var def = '<dd>' + src + '</dd>';
    return '' + title + def;
  }).join('\n') + '\n    </dl>\n  ';
  return r;
}

var fns = {
  gen: gen,
  genForExpression: genForExpression,
  genCot: genCot
};
module.exports = fns;
module.exports.default = fns;

/***/ }
/******/ ]);
});