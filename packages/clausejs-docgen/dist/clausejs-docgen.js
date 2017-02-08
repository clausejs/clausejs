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
/******/ 	return __webpack_require__(__webpack_require__.s = 87);
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
var stringifyWithFnName = __webpack_require__(20);
var lazyDefine = __webpack_require__(69);

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

  lazyDefine(this, 'message', function () {
    return _constructMessage(_this, 0);
  });

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

var isFunction = __webpack_require__(13);
var _getFnName;

if (function test() {}.name !== 'test') {
  var STRIP_COMMENTS = /((\/\/.*$)|(\/\*[\s\S]*?\*\/))/mg;
  var fToString = Function.prototype.toString;
  var pMatch = String.prototype.match;
  var pReplace = String.prototype.replace;
  var s = __webpack_require__(71);
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
var instanceOf = __webpack_require__(22);

var isClause = instanceOf(Clause);

module.exports = isClause;

/***/ },
/* 6 */
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
  } else {
    console.error('unsupported:', alts);
    throw 'Not implemented';
  }
};

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

"use strict";


function isString(x) {
  return x !== null && x !== undefined && x.constructor === String;
}

module.exports = isString;

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
var clauseFromAlts = __webpack_require__(6);
var isProblem = __webpack_require__(0);
var isClauseName = __webpack_require__(42);
var namedFn = __webpack_require__(16);
var isClauseRef = __webpack_require__(15);
var isDelayedClause = __webpack_require__(26);
var c = __webpack_require__(48);
var coerceIntoClause = __webpack_require__(9);
var fclause = __webpack_require__(21);
var walk = __webpack_require__(17);

var isObj = __webpack_require__(24);
var isStr = __webpack_require__(7);
var oneOf = __webpack_require__(39);
var isPlainObj = __webpack_require__(38);

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

var ExprClause = orOp(_labelled(['clause', 'clause', ClauseClause], ['pred', 'clause', PredClause]));

var NameExprOptionalComment = catOp(_labelled(['name', 'clause', nameClause], ['comment', 'clause', zeroOrOneOp({ expr: { pred: isStr } })], ['expr', 'clause', ExprClause]));

var MultipleArgClause = catOp(_labelled(['expressions', 'clause', orOp(_labelled(['withLabels', 'clause', orOp(_unlabelled(['clause', zeroOrMoreOp({
  expr: { clause: NameExprOptionalComment }
})], ['clause', collOfOp({
  expr: { clause: NameExprOptionalComment }
})]))], ['withoutLabels', 'clause', zeroOrMoreOp({
  expr: { clause: ExprClause }
})]))], ['options', 'clause', zeroOrOneOp({
  expr: { pred: isPlainObj }
})]));

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
        exprs: [], opts: {} });
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

var FieldDefs = mapOfOp({
  keyExpression: {
    clause: coerceIntoClause(isStr)
  },
  valExpression: {
    clause: orOp(_labelled(['valExpressionOnly', 'clause', ExprClause], ['keyValExprPair', 'clause', catOp(_labelled(['keyExpression', 'clause', ExprClause], ['valExpression', 'clause', ExprClause]))]))
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
});

var MapOfFnClause = fclause({
  args: catOp(_labelled(['keyExpression', 'clause', ExprClause], ['valExpression', 'clause', ExprClause])),
  ret: isClause
});

var TestClause = shapeOp({
  shapeArgs: {
    optionalFields: {
      opt: {
        fieldDefs: {
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
//         'a': { valExpressionOnly: { pred: isStr } }
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
var isClauseRef = __webpack_require__(15);
var isDelayedClause = __webpack_require__(26);
var Clause = __webpack_require__(1);
var Problem = __webpack_require__(2);
var fnName = __webpack_require__(3);
var stringifyWithFnName = __webpack_require__(20);

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


var isFn = __webpack_require__(13);

function isPred(x) {
  return isFn(x);
}

module.exports = isPred;

/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

"use strict";


var oAssign = __webpack_require__(4);
var regex = __webpack_require__(8);

var _require = __webpack_require__(8),
    shape = _require.shape,
    keys = _require.keys,
    mapOf = _require.mapOf,
    cat = _require.cat,
    fclause = _require.fclause;

var nullable = __webpack_require__(54);
var undefinable = __webpack_require__(55);
var maybe = __webpack_require__(49);

var _require2 = __webpack_require__(46),
    wall = _require2.wall;

var equals = __webpack_require__(34);

var cstr = function cstr(str) {
  return cat.apply(null, Array.prototype.slice.call(str).map(equals));
};

var other = {
  any: __webpack_require__(47),
  fclause: __webpack_require__(21),
  wall: wall, clause: wall,
  nullable: nullable, undefinable: undefinable, maybe: maybe,
  cstr: cstr
};

var r = oAssign({}, regex, {
  shape: shape, keys: keys, mapOf: mapOf,
  fspec: fclause
}, other);
module.exports = r;

/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

"use strict";


var isNum = __webpack_require__(37);
var isNatInt = __webpack_require__(58);
var isInt = __webpack_require__(36);
var isBool = __webpack_require__(35);
var isFn = __webpack_require__(13);
var isObj = __webpack_require__(24);
var isPlainObj = __webpack_require__(38);
var equals = __webpack_require__(34);
var oneOf = __webpack_require__(39);
var isStr = __webpack_require__(7);
var isDate = __webpack_require__(57);
var not = __webpack_require__(60);
var instanceOf = __webpack_require__(22);
var isUuid = __webpack_require__(59);
var isArray = Array.isArray;

var e = {
  isNull: __webpack_require__(23),
  isUndefined: __webpack_require__(14),
  notEmpty: __webpack_require__(61),
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
/* 13 */
/***/ function(module, exports, __webpack_require__) {

"use strict";


function isFunction(x) {
  var getType = {};
  // (x || false) guarantees returning of boolean type
  return (x || false) && ['[object Function]', '[object GeneratorFunction]'].indexOf(getType.toString.call(x)) >= 0;
}

module.exports = isFunction;

/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

"use strict";


module.exports = function isUndefined(x) {
  return x === undefined;
};

/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

"use strict";


var ClauseRef = __webpack_require__(32);
// TODO
function isClauseRef(x) {
  return x instanceof ClauseRef;
}
module.exports = isClauseRef;

/***/ },
/* 16 */
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
/* 17 */
/***/ function(module, exports, __webpack_require__) {

"use strict";


var oAssign = __webpack_require__(4);
var nfaWalker = __webpack_require__(79);
var anyWalker = __webpack_require__(73);
var predWalker = __webpack_require__(80);
var wallWalker = __webpack_require__(82);
var fclauseWalker = __webpack_require__(77);
var shapeWalker = __webpack_require__(81);
var andWalker = __webpack_require__(72);
var collOfWalker = __webpack_require__(75);
var mapOfWalker = __webpack_require__(78);
var clauseRefWalker = __webpack_require__(74);
var delayedClauseWalker = __webpack_require__(76);
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
/* 18 */
/***/ function(module, exports, __webpack_require__) {

"use strict";


var _sExpression = __webpack_require__(28);

var _sExpression2 = _interopRequireDefault(_sExpression);

var _describe = __webpack_require__(30);

var _describe2 = _interopRequireDefault(_describe);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = {
  conform: __webpack_require__(25),
  isValid: __webpack_require__(68),
  isNamespacePath: __webpack_require__(67),
  identity: __webpack_require__(41),
  isProblem: __webpack_require__(0),
  delayed: __webpack_require__(40),
  enforce: __webpack_require__(63),
  isClause: __webpack_require__(5),
  isFclause: __webpack_require__(66),
  isClauseRef: __webpack_require__(15),
  deref: __webpack_require__(29),
  isClauseName: __webpack_require__(42),
  describe: _describe2.default,
  sExpression: _sExpression2.default,
  match: __webpack_require__(19)
};

/***/ },
/* 19 */
/***/ function(module, exports, __webpack_require__) {

"use strict";


/**
 * convenient method used in conjunction with "and" and "or" conformation to handle labelled cases
 *
 */

function match(alts, handlerMap, unknownCaseHandler) {
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

module.exports = match;

/***/ },
/* 20 */
/***/ function(module, exports, __webpack_require__) {

"use strict";


var isFn = __webpack_require__(13);
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
/* 21 */
/***/ function(module, exports, __webpack_require__) {

"use strict";


var Clause = __webpack_require__(1);
var walk = __webpack_require__(17);
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
/* 22 */
/***/ function(module, exports, __webpack_require__) {

"use strict";


var fnName = __webpack_require__(3);
var namedFn = __webpack_require__(16);

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
/* 23 */
/***/ function(module, exports, __webpack_require__) {

"use strict";


function isNull(x) {
  return x === null;
}

module.exports = isNull;

/***/ },
/* 24 */
/***/ function(module, exports, __webpack_require__) {

"use strict";


var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

function isObject(x) {
  return (typeof x === 'undefined' ? 'undefined' : _typeof(x)) === 'object' && x !== null;
}

module.exports = isObject;

/***/ },
/* 25 */
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
/* 26 */
/***/ function(module, exports, __webpack_require__) {

"use strict";


var DelayedClause = __webpack_require__(33);
var instanceOf = __webpack_require__(22);

//TODO
module.exports = instanceOf(DelayedClause);

/***/ },
/* 27 */
/***/ function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.NamespaceObjClause = exports.ResolveFnClause = exports.GetMetaFnClause = exports.SetMetaFnClause = exports.isNamespacePath = exports.NamespaceFnClause = exports.GetNSFnClause = exports.SetNSFnClause = exports.isClauseRef = undefined;

var _core = __webpack_require__(11);

var _utils = __webpack_require__(18);

var _preds = __webpack_require__(12);

var isExpr = __webpack_require__(65);

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
  ret: _utils.isClauseRef
});

var SetArgClause = (0, _core.cat)('nsPath', _utils.isNamespacePath, 'expression', ExprOrPartialRefMapClause);

var SetNSFnClause = (0, _core.fclause)({
  args: SetArgClause,
  ret: _preds.isBool
});

var NamespaceArgsCLause = (0, _core.or)('register', SetArgClause, 'retrieve', GetArgClause);

var NamespaceFnClause = (0, _core.fclause)({
  args: NamespaceArgsCLause,
  ret: (0, _core.or)(_preds.isUndefined, _utils.isClauseRef)
});

var SetMetaFnClause = (0, _core.fclause)({
  args: (0, _core.cat)('source', (0, _core.or)('namespacePath', _utils.isNamespacePath, 'expression', _core.ExprClause), 'metaObj', _preds.isObj, 'registry', (0, _core.zeroOrOne)(_preds.isObj)),
  ret: _preds.isUndefined
});

var GetMetaFnClause = (0, _core.fclause)({
  args: (0, _core.cat)('source', (0, _core.or)('namespacePath', _utils.isNamespacePath, 'expression', _core.ExprClause), 'registry', (0, _core.zeroOrOne)(_preds.isObj)),
  ret: (0, _core.maybe)(_preds.isObj)
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
    '.expr': isExpr
  }
});

exports.isClauseRef = _utils.isClauseRef;
exports.SetNSFnClause = SetNSFnClause;
exports.GetNSFnClause = GetNSFnClause;
exports.NamespaceFnClause = NamespaceFnClause;
exports.isNamespacePath = _utils.isNamespacePath;
exports.SetMetaFnClause = SetMetaFnClause;
exports.GetMetaFnClause = GetMetaFnClause;
exports.ResolveFnClause = ResolveFnClause;
exports.NamespaceObjClause = NamespaceObjClause;

/***/ },
/* 28 */
/***/ function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var fnName = __webpack_require__(3);
var clauseFromAlts = __webpack_require__(6);
var oAssign = __webpack_require__(4);

var _require = __webpack_require__(11),
    wall = _require.wall,
    any = _require.any,
    zeroOrMore = _require.zeroOrMore,
    and = _require.and,
    cat = _require.cat,
    or = _require.or,
    ExprClause = _require.ExprClause,
    mapOf = _require.mapOf,
    maybe = _require.maybe;

var delayed = __webpack_require__(40);
var match = __webpack_require__(19);
var coerceIntoClause = __webpack_require__(9);

var _require2 = __webpack_require__(12),
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

function Quoted(val) {
  this.value = val;
}

var ParamLabelClause = or('str', isStr, 'quoted', instanceOf(Quoted));

function genClauses(headClause) {
  var paramItemC = or('sExpression', delayed(function () {
    return sExprC;
  }), 'quotedParamsMap', delayed(function () {
    return QuotedParamsMapC;
  }), 'unquotedParamsMap', delayed(function () {
    return UnquotedParamsMapC;
  }), 'optionsObj', isPlainObj, 'recursive', instanceOf(Recursive));
  var sExprC = wall(cat('head', headClause, 'params', or('labelled', zeroOrMore(cat('label', ParamLabelClause, 'item', delayed(function () {
    return paramItemC;
  }))), 'unlabelled', zeroOrMore(cat('item', delayed(function () {
    return paramItemC;
  }))))));
  var ParamsMapC = mapOf(any, maybe(or('keyList', zeroOrMore(delayed(function () {
    return ParamLabelClause;
  })), 'singleParam', delayed(function () {
    return paramItemC;
  }))));

  var QuotedParamsMapC = and(instanceOf(QuotedParamsMap), delayed(function () {
    return ParamsMapC;
  }));

  var UnquotedParamsMapC = and(instanceOf(UnquotedParamsMap), delayed(function () {
    return ParamsMapC;
  }));

  return [sExprC, paramItemC];
}

var _genClauses = genClauses(ExprClause),
    _genClauses2 = _slicedToArray(_genClauses, 2),
    SExpressionClause = _genClauses2[0],
    ParamItemClause = _genClauses2[1];

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
      return acc.concat([new Quoted(name), _createSExpr(repo, expr)]);
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
  'MAP_OF': function MAP_OF(repo, _ref7) {
    var opts = _ref7.opts;
    return _handleKeyValExprPair(repo, opts);
  },
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
    return oAssign(new UnquotedParamsMap(), req || required ? {
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
    return oAssign(new UnquotedParamsMap(), args ? { args: _createSExpr(repo, args) } : {}, ret ? { ret: _createSExpr(repo, ret) } : {}, fn ? { fn: [fnName(fn) + '()'] } : {});
  }
};

function _fieldDefToFrags(repo, _ref10) {
  var fieldDefs = _ref10.fieldDefs,
      keyList = _ref10.keyList;

  if (fieldDefs) {
    var r = new QuotedParamsMap();
    for (var key in fieldDefs) {
      if (fieldDefs.hasOwnProperty(key)) {
        var val = match(fieldDefs[key], {
          'keyValExprPair': function keyValExprPair(pair) {
            return _handleKeyValExprPair(repo, pair);
          },
          'valExpressionOnly': function valExpressionOnly(expr) {
            return _createSExpr(repo, clauseFromAlts(expr));
          }
        }, function () {
          throw '!g';
        });
        oAssign(r, _defineProperty({}, key, val));
      }
    }
    return r;
  } else if (keyList) {
    return keyList;
  } else {
    throw '!w';
  }
}

function _handleKeyValExprPair(repo, _ref11) {
  var keyExpression = _ref11.keyExpression,
      valExpression = _ref11.valExpression;

  return new UnquotedParamsMap({
    'key': _createSExpr(repo, clauseFromAlts(keyExpression)),
    'val': _createSExpr(repo, clauseFromAlts(valExpression))
  });
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
exports.genClauses = genClauses;

/***/ },
/* 29 */
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
/* 30 */
/***/ function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isSpecial = exports.interpose = exports.INDENT_OUT = exports.INDENT_IN = exports.NEW_LINE = exports.fragsToStr = exports.humanReadable = undefined;

var _sExpression = __webpack_require__(28);

var _sExpression2 = _interopRequireDefault(_sExpression);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var humanReadable = __webpack_require__(64);
var isStr = __webpack_require__(7);
var isProblem = __webpack_require__(0);
var match = __webpack_require__(19);
var clauseFromAlts = __webpack_require__(6);
var fnName = __webpack_require__(3);
var stringifyWithFnName = __webpack_require__(20);
var repeat = __webpack_require__(70);

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
  var r = fragsToStr(strFragments, level, space);

  return r;
}

function _strFragments(cSExpr, replacer) {
  return strFragments(function (_ref) {
    var headAlts = _ref.head,
        params = _ref.params;

    return { head: clauseFromAlts(headAlts), params: params };
  }, cSExpr, replacer);
}

function strFragments(headAltsHandler, cNode, replacer) {
  var _headAltsHandler = headAltsHandler(cNode),
      head = _headAltsHandler.head,
      params = _headAltsHandler.params;

  if (!head) {
    return [];
  }
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
        return acc.concat([[_processLabel(label), ', ', _fragmentParamAlts(headAltsHandler, item, replacer)]]);
      }, []);
      commaedParamFrags = interpose(paramFrags, [', ', NEW_LINE]);
    } else if (unlabelled) {
      var _paramFrags = unlabelled.map(function (_ref3) {
        var item = _ref3.item;
        return _fragmentParamAlts(headAltsHandler, item, replacer);
      });
      commaedParamFrags = interpose(_paramFrags, [', ', NEW_LINE]);
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

  return [label, '('].concat(commaedParamFrags.length > 1 ? [INDENT_IN, NEW_LINE] : [commaedParamFrags.length === 0 ? '' : ' ']).concat(commaedParamFrags).concat(commaedParamFrags.length > 1 ? [INDENT_OUT, NEW_LINE] : [commaedParamFrags.length === 0 ? '' : ' ']).concat([')']);
}

function interpose(arr, interArr) {
  if (arr.length === 0) {
    return arr;
  } else {
    return arr.reduce(function (acc, curr, idx) {
      if (idx < arr.length - 1 && !isSpecial(curr)) {
        return acc.concat([curr]).concat(interArr);
      } else {
        return acc.concat([curr]);
      }
    }, []);
  }
}

function isSpecial(x) {
  return x === NEW_LINE || x === INDENT_IN || x === INDENT_OUT;
}

function _fragmentParamAlts(headAltsHandler, pAlts, replacer) {
  var r = match(pAlts, {
    'label': _processLabel,
    'sExpression': function sExpression(expr) {
      return strFragments(headAltsHandler, expr, replacer);
    },
    'quotedParamsMap': function quotedParamsMap(o) {
      return _fragmentParamsObj(headAltsHandler, o, replacer, true);
    },
    'unquotedParamsMap': function unquotedParamsMap(o) {
      return _fragmentParamsObj(headAltsHandler, o, replacer, false);
    },
    'optionsObj': function optionsObj(o) {
      return stringifyWithFnName(o);
    },
    'recursive': function recursive(_ref4) {
      var expression = _ref4.expression;
      return ['<recursive>: ', humanReadable(expression)];
    }
  }, function () {
    throw '!s';
  });
  return r;
}

function _processLabel(_ref5) {
  var str = _ref5.str,
      quoted = _ref5.quoted;

  if (str) {
    return str;
  } else if (quoted) {
    return '"' + quoted.value + '"';
  }
}

function _fragmentParamsObj(headAltsHandler, pObj, replacer, quote) {
  var r = ['{', INDENT_IN, NEW_LINE];
  var body = [];
  for (var label in pObj) {
    if (pObj.hasOwnProperty(label)) {
      var item = [];
      item.push(quote ? '"' + label + '": ' : '<' + label + '>: ');
      var r1 = match(pObj[label], {
        'keyList': function keyList(list) {
          return ['[ '].concat(interpose(list.map(function (i) {
            return '"' + i + '"';
          }), [', '])).concat(' ]');
        },
        'singleParam': function singleParam(p) {
          return _fragmentParamAlts(headAltsHandler, p, replacer);
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

function fragsToStr(frags, level, space) {
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
      return acc.concat(fragsToStr(f, newLevel, space));
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

exports.default = describe;
exports.humanReadable = humanReadable;
exports.fragsToStr = fragsToStr;
exports.NEW_LINE = NEW_LINE;
exports.INDENT_IN = INDENT_IN;
exports.INDENT_OUT = INDENT_OUT;
exports.interpose = interpose;
exports.isSpecial = isSpecial;

/***/ },
/* 31 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {

Object.defineProperty(exports, "__esModule", {
  value: true
});
var oAssign = __webpack_require__(4);
var ClauseRef = __webpack_require__(32);

var _require = __webpack_require__(11),
    cat = _require.cat,
    or = _require.or,
    fclause = _require.fclause,
    shape = _require.shape;

var isClause = __webpack_require__(5);
var isPred = __webpack_require__(10);
var isBool = __webpack_require__(35);
var walk = __webpack_require__(17);
var resolveWithRegistry = __webpack_require__(43);
var coerceIntoClause = __webpack_require__(9);
var oPath = __webpack_require__(56);

var _require2 = __webpack_require__(18),
    isNamespacePath = _require2.isNamespacePath,
    isClauseRef = _require2.isClauseRef;

var _require3 = __webpack_require__(27),
    GetNSFnClause = _require3.GetNSFnClause,
    SetNSFnClause = _require3.SetNSFnClause,
    NamespaceFnClause = _require3.NamespaceFnClause,
    SetMetaFnClause = _require3.SetMetaFnClause,
    GetMetaFnClause = _require3.GetMetaFnClause;

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

var setMeta = SetMetaFnClause.instrumentConformed(function setMeta(_ref3) {
  var _ref3$source = _ref3.source,
      namespacePath = _ref3$source.namespacePath,
      expression = _ref3$source.expression,
      metaObj = _ref3.metaObj,
      registry = _ref3.registry;

  if (!registry) {
    registry = reg;
  }
  if (namespacePath) {
    var nObj = oPath.get(registry, _slashToDot(namespacePath));
    var currMeta = nObj && nObj['.meta'];
    oPath.set(registry, _slashToDot(namespacePath), oAssign({}, nObj, { '.meta': oAssign({}, currMeta, metaObj) }));
  } else if (expression) {
    var clause = coerceIntoClause(expression);
    clause.meta = oAssign(clause.meta, metaObj);
  }
});

var getMeta = GetMetaFnClause.instrumentConformed(function getMeta(_ref4) {
  var _ref4$source = _ref4.source,
      namespacePath = _ref4$source.namespacePath,
      expression = _ref4$source.expression,
      registry = _ref4.registry;

  if (!registry) {
    registry = reg;
  }
  if (namespacePath) {
    var nObj = oPath.get(registry, _slashToDot(namespacePath));
    var meta = nObj && nObj['.meta'];
    return meta;
  } else if (expression) {
    var clause = coerceIntoClause(expression);
    return clause.meta;
  }
});

function resolve(expr, reg) {
  if (!reg) {
    return resolveWithRegistry(expr, getRegistry());
  } else {
    return resolveWithRegistry(expr, reg);
  }
}

_maybeInitRegistry();

var getRegistry = function getRegistry() {
  return reg;
};

var namespaceGetOrSet = NamespaceFnClause.instrumentConformed(function namespaceGetOrSet(_ref5) {
  var register = _ref5.register,
      retrieve = _ref5.retrieve;

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
namespaceGetOrSet.setMeta = setMeta;

exports.getRegistry = getRegistry;
exports.clearRegistry = clearRegistry;
exports.setMeta = setMeta;
exports.getMeta = getMeta;
exports.resolve = resolve;
exports.default = namespaceGetOrSet;
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(83)))

/***/ },
/* 32 */
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
/* 33 */
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
/* 34 */
/***/ function(module, exports, __webpack_require__) {

"use strict";


module.exports = function equals(test) {
  return function equalsVal(x) {
    return x === test;
  };
};

/***/ },
/* 35 */
/***/ function(module, exports, __webpack_require__) {

"use strict";


function isBool(x) {
  return typeof x === 'boolean';
}

module.exports = isBool;

/***/ },
/* 36 */
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
/* 37 */
/***/ function(module, exports, __webpack_require__) {

"use strict";


function isNum(x) {
  return typeof x === 'number';
}

module.exports = isNum;

/***/ },
/* 38 */
/***/ function(module, exports, __webpack_require__) {

"use strict";


var isObj = __webpack_require__(24);

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
/* 39 */
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
/* 40 */
/***/ function(module, exports, __webpack_require__) {

"use strict";


var DelayedClause = __webpack_require__(33);

function delayed(getFn) {
  return new DelayedClause({ getFn: getFn });
}

module.exports = delayed;

/***/ },
/* 41 */
/***/ function(module, exports, __webpack_require__) {

"use strict";


function identity(x) {
  return x;
}

module.exports = identity;

/***/ },
/* 42 */
/***/ function(module, exports, __webpack_require__) {

"use strict";


var isStr = __webpack_require__(7);

//TODO
module.exports = function isClauseName(x) {
  return isStr(x);
};

/***/ },
/* 43 */
/***/ function(module, exports, __webpack_require__) {

"use strict";


var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _namespace = __webpack_require__(27);

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
/* 44 */
/***/ function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _namespace = __webpack_require__(31);

var _namespace2 = _interopRequireDefault(_namespace);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var oAssign = __webpack_require__(4);


var ops = __webpack_require__(11);
var utils = __webpack_require__(18);

var predicates = __webpack_require__(12);

var models = {
  Problem: __webpack_require__(2),
  Clause: __webpack_require__(1)
};

var r = oAssign(_namespace2.default, { resolve: _namespace.resolve }, ops, utils, models, predicates);

r.VERSION = __webpack_require__(45);

module.exports = r;
exports.default = r;

/***/ },
/* 45 */
/***/ function(module, exports, __webpack_require__) {

"use strict";


module.exports = '0.1.0';

/***/ },
/* 46 */
/***/ function(module, exports, __webpack_require__) {

"use strict";


var Clause = __webpack_require__(1);
var coerceIntoClause = __webpack_require__(9);

var _require = __webpack_require__(8),
    cat = _require.cat,
    ExprClause = _require.ExprClause;

var fclause = __webpack_require__(21);
var walk = __webpack_require__(17);

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
/* 47 */
/***/ function(module, exports, __webpack_require__) {

"use strict";


var Clause = __webpack_require__(1);
var identity = __webpack_require__(41);
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
/* 48 */
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
/* 49 */
/***/ function(module, exports, __webpack_require__) {

"use strict";


var _require = __webpack_require__(8),
    or = _require.or;

var isNull = __webpack_require__(23);
var isUndefined = __webpack_require__(14);

function maybe(clause) {
  return or(isNull, isUndefined, clause);
}

module.exports = maybe;

/***/ },
/* 50 */
/***/ function(module, exports, __webpack_require__) {

"use strict";


var fragment = __webpack_require__(51);
var Clause = __webpack_require__(1);
var deref = __webpack_require__(29);

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
/* 51 */
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
/* 52 */
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
  } else if (r instanceof Nothing) {
    retVal = null;
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
/* 53 */
/***/ function(module, exports, __webpack_require__) {

"use strict";


var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var isProblem = __webpack_require__(0);
var isStr = __webpack_require__(7);

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
/* 54 */
/***/ function(module, exports, __webpack_require__) {

"use strict";


var _require = __webpack_require__(8),
    or = _require.or;

var isNull = __webpack_require__(23);

function nullable(clause) {
  return or(isNull, clause);
}

module.exports = nullable;

/***/ },
/* 55 */
/***/ function(module, exports, __webpack_require__) {

"use strict";


var _require = __webpack_require__(8),
    or = _require.or;

var isUndefined = __webpack_require__(14);

function undefinable(clause) {
  return or(isUndefined, clause);
}

module.exports = undefinable;

/***/ },
/* 56 */
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

/***/ },
/* 57 */
/***/ function(module, exports, __webpack_require__) {

"use strict";


module.exports = function isDate(date) {
  return date && date instanceof Date && !isNaN(date.valueOf());
};

/***/ },
/* 58 */
/***/ function(module, exports, __webpack_require__) {

"use strict";


var isInt = __webpack_require__(36);

function isNatInt(x) {
  return isInt(x) && x >= 0.0;
}

module.exports = isNatInt;

/***/ },
/* 59 */
/***/ function(module, exports, __webpack_require__) {

"use strict";


module.exports = function isUuid(x) {
  return !!/^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(x);
};

/***/ },
/* 60 */
/***/ function(module, exports, __webpack_require__) {

"use strict";


var fnName = __webpack_require__(3);
var namedFn = __webpack_require__(16);

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
/* 61 */
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
/* 62 */
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
/* 63 */
/***/ function(module, exports, __webpack_require__) {

"use strict";


var isProblem = __webpack_require__(0);
// TODO : replace with checkProblem
var conform = __webpack_require__(25);

module.exports = function enforce(clause, x) {
  var r = conform(clause, x);
  if (isProblem(r)) {
    throw r;
  }
  return undefined;
};

/***/ },
/* 64 */
/***/ function(module, exports, __webpack_require__) {

"use strict";


var isStr = __webpack_require__(7);

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
/* 65 */
/***/ function(module, exports, __webpack_require__) {

"use strict";


var isPred = __webpack_require__(10);
var isClause = __webpack_require__(5);
var isClauseRef = __webpack_require__(15);
var isDelayedClause = __webpack_require__(26);

function isExpr(x) {
  return isPred(x) || isClause(x) || isClauseRef(x) || isDelayedClause(x);
}

module.exports = isExpr;

/***/ },
/* 66 */
/***/ function(module, exports, __webpack_require__) {

"use strict";


var isClause = __webpack_require__(5);

function isFclause(x) {
  return isClause(x) && x.type === 'FCLAUSE';
}

module.exports = isFclause;

/***/ },
/* 67 */
/***/ function(module, exports, __webpack_require__) {

"use strict";


var isStr = __webpack_require__(7);

function isNamespacePath(x) {
  return isStr(x) && /^\/?[a-zA-Z0-9\-_\.]*\/([a-zA-Z0-9\-_]+)$/.test(x);
}

module.exports = isNamespacePath;

/***/ },
/* 68 */
/***/ function(module, exports, __webpack_require__) {

"use strict";


var isProblem = __webpack_require__(0);
var isPred = __webpack_require__(10);
var isClause = __webpack_require__(5);
var conform = __webpack_require__(25);

function isValid(expr, x) {
  if (!expr) {
    throw new Error('Clause is required');
  } else if (isClause(expr)) {
    return !isProblem(conform(expr, x));
  } else if (isPred(expr)) {
    return expr(x);
  } else {
    return true;
  }
}

module.exports = isValid;

/***/ },
/* 69 */
/***/ function(module, exports, __webpack_require__) {

"use strict";


module.exports = function (obj, prop, fn) {
  var define = function define(value) {
    return Object.defineProperty(obj, prop, { value: value, enumerable: true, writable: true });
  };

  Object.defineProperty(obj, prop, {
    configurable: true,
    enumerable: true,
    get: function get() {
      var ret = fn();
      define(ret);
      return ret;
    },
    set: function set(val) {
      define(val);
    }
  });

  return obj;
};

/***/ },
/* 70 */
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
/* 71 */
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
/* 72 */
/***/ function(module, exports, __webpack_require__) {

"use strict";


var Problem = __webpack_require__(2);
var isProblem = __webpack_require__(0);
var clauseFromAlts = __webpack_require__(6);
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
/* 73 */
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
/* 74 */
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
/* 75 */
/***/ function(module, exports, __webpack_require__) {

"use strict";


var Problem = __webpack_require__(2);
var isProblem = __webpack_require__(0);
var isNum = __webpack_require__(37);

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
/* 76 */
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
/* 77 */
/***/ function(module, exports, __webpack_require__) {

"use strict";


var isProblem = __webpack_require__(0);
var Problem = __webpack_require__(2);
var functionName = __webpack_require__(3);
var namedFn = __webpack_require__(16);
var betterThrow = __webpack_require__(62);

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
/* 78 */
/***/ function(module, exports, __webpack_require__) {

"use strict";


function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var clauseFromAlts = __webpack_require__(6);
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
/* 79 */
/***/ function(module, exports, __webpack_require__) {

"use strict";


function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var simulate = __webpack_require__(53);
var getMatch = __webpack_require__(52);
var compile = __webpack_require__(50);
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
/* 80 */
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
/* 81 */
/***/ function(module, exports, __webpack_require__) {

"use strict";


var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var isProblem = __webpack_require__(0);
var isUndefined = __webpack_require__(14);
var oAssign = __webpack_require__(4);
var Problem = __webpack_require__(2);
var clauseFromAlts = __webpack_require__(6);

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
      fieldLoop: for (var name in fieldDefs) {
        if (fieldDefs.hasOwnProperty(name)) {
          var keyValAlts = fieldDefs[name];

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
        for (var name in fieldDefs) {
          if (fieldDefs.hasOwnProperty(name)) {
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
        if (fieldDefs && fieldDefs[reqName].keyValExprPair) {
          var found = false;
          keyTrav: for (var kk in x) {
            if (x.hasOwnProperty(kk)) {
              var rr = _conformNamedOrExpr(kk, fieldDefs[reqName].keyValExprPair.keyExpression, walkFn, walkOpts);
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
        } else if (fieldDefs && fieldDefs[reqName].valExpressionOnly) {
          //key clause
          if (x.hasOwnProperty(reqName)) {
            var rrr = _conformNamedOrExpr(x[reqName], fieldDefs[reqName].valExpressionOnly, walkFn, walkOpts);
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
/* 82 */
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
/* 83 */
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
/* 84 */,
/* 85 */
/***/ function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _sExpression = __webpack_require__(28);

var _sExpression2 = _interopRequireDefault(_sExpression);

var _describe = __webpack_require__(30);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toArray(arr) { return Array.isArray(arr) ? arr : Array.from(arr); }

var _require = __webpack_require__(11),
    cat = _require.cat,
    or = _require.or,
    shape = _require.shape,
    zeroOrOne = _require.zeroOrOne,
    maybe = _require.maybe,
    oneOrMore = _require.oneOrMore,
    fclause = _require.fclause,
    any = _require.any,
    and = _require.and,
    wall = _require.wall,
    ExprClause = _require.ExprClause,
    collOf = _require.collOf;

var _require2 = __webpack_require__(12),
    isStr = _require2.isStr,
    isFn = _require2.isFn,
    isNum = _require2.isNum,
    isInt = _require2.isInt,
    isObj = _require2.isObj,
    isBool = _require2.isBool,
    instanceOf = _require2.instanceOf;

var _require3 = __webpack_require__(18),
    conform = _require3.conform,
    isClause = _require3.isClause,
    deref = _require3.deref,
    delayed = _require3.delayed;

var C = __webpack_require__(44);
var oAssign = __webpack_require__(4);
var clauseFromAlts = __webpack_require__(6);
var fnName = __webpack_require__(3);
var stringifyWithFnName = __webpack_require__(20);

var match = __webpack_require__(19);

//     ----'first'-----  --------'second'---------
// fn( (isStr, isBool)+, (isObj | (isNum, isBool)) )

//     -----'first'----  ---second--
//                        -(objOpt)-
// fn( (isStr, isBool)+,    isObj     )
//     -----'first'----  ----second----
//                       ---(showNum)--
// fn( (isStr, isBool)+, isNum, isBool )


// fn( { <required>: [ 'propA': isNum, <propB: beginsWithS>: any ], <optional>: [  ] } )

// cat('first', oneOrMore(cat (isStr, isBool), 'second': {...}  ))

// console.log( conform( sample, [ 'hello', true, 'abc', false, 32, false ] ) );

function AltHeadNode(label, clause, enclosed) {
  this.label = label;
  this.clause = clause;
  this.enclosed = enclosed;
}

var _genClauses = (0, _sExpression.genClauses)(or('expression', ExprClause, 'altNode', and(instanceOf(AltHeadNode), C.shape({
  required: {
    clause: _isPivot,
    enclosed: delayed(function () {
      return PartialableParamItemClause;
    })
  }
})))),
    _genClauses2 = _slicedToArray(_genClauses, 2),
    PartialableSExprClause = _genClauses2[0],
    PartialableParamItemClause = _genClauses2[1];

var synopsis = fclause({
  args: cat(ExprClause, zeroOrOne(isInt), zeroOrOne(maybe(isFn)))
}).instrument(function synopsis(clause) {
  var limit = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 20;
  var replacer = arguments[2];

  var sExpr = (0, _sExpression2.default)(clause);
  var cSExpr = conform(_sExpression.ParamItemClause, sExpr);
  var pivots = _findPivots(cSExpr, replacer);

  var expanded = pivots.reduce(function (cases, pivot) {
    var r = cases.reduce(function (acc, currCase) {
      if (acc.length > limit) {
        return acc;
      } else {
        var _expand2 = _expand(currCase, pivot),
            _cases = _expand2.cases;

        return acc.concat(_cases);
      }
    }, []);
    return r;
  }, [sExpr]);
  var results = expanded.map(function (cc) {
    return _describeCase(cc, replacer);
  });
  return results;
});

function _strFragments(label, cNode, replacer) {
  var result = [];

  if (label) {
    result = result.concat([label, ': ']);
  }

  var _handler2 = _handler(cNode),
      head = _handler2.head,
      params = _handler2.params;

  if (!head) {
    return [];
  }
  if (replacer) {
    var interceptR = replacer(head);
    if (interceptR) {
      return result.concat(interceptR);
    }
  }
  if (head.type === 'PRED') {
    return ['' + fnName(head.opts.predicate)];
  }
  var nodeLabel = (0, _describe.humanReadable)(head);

  var commaedParamFrags = void 0;
  if (head.type === 'FCLAUSE') {
    var _params$unlabelled = _slicedToArray(params.unlabelled, 1),
        _params$unlabelled$0$ = _params$unlabelled[0].item.unquotedParamsMap,
        _params$unlabelled$0$2 = _params$unlabelled$0$.args;

    _params$unlabelled$0$2 = _params$unlabelled$0$2 === undefined ? {} : _params$unlabelled$0$2;
    var args = _params$unlabelled$0$2.singleParam,
        _params$unlabelled$0$3 = _params$unlabelled$0$.ret;
    _params$unlabelled$0$3 = _params$unlabelled$0$3 === undefined ? {} : _params$unlabelled$0$3;
    var ret = _params$unlabelled$0$3.singleParam;

    return [].concat(args ? _fragmentParamAlts(null, args, replacer) : []).concat([' → ']).concat(ret ? _fragmentParamAlts(null, ret, replacer) : ['any']);
  } else if (head.type === 'CAT') {
    var labelled = params.labelled,
        unlabelled = params.unlabelled;

    var _commaedParamFrags = [];
    if (labelled) {
      var paramFrags = labelled.reduce(function (acc, _ref) {
        var label = _ref.label,
            item = _ref.item;

        var lblStr = _processLabel(label);
        return acc.concat([[_fragmentParamAlts(lblStr, item, replacer)]]);
      }, []);
      _commaedParamFrags = (0, _describe.interpose)(paramFrags, [', ', _describe.NEW_LINE]);
    } else if (unlabelled) {
      var _paramFrags = unlabelled.map(function (_ref2) {
        var item = _ref2.item;
        return _fragmentParamAlts(null, item, replacer);
      });
      _commaedParamFrags = (0, _describe.interpose)(_paramFrags, [', ', _describe.NEW_LINE]);
    }
    return result.concat(['( ']).concat(_commaedParamFrags).concat([' )']);
  } else if (head.type === 'OR') {
    var _labelled = params.labelled,
        _unlabelled = params.unlabelled;

    var _commaedParamFrags2 = [];
    if (_labelled) {
      var _paramFrags2 = _labelled.reduce(function (acc, _ref3) {
        var item = _ref3.item;

        return acc.concat([[_fragmentParamAlts(null, item, replacer)]]);
      }, []);
      _commaedParamFrags2 = (0, _describe.interpose)(_paramFrags2, [' | ', _describe.NEW_LINE]);
    } else if (_unlabelled) {
      var _paramFrags3 = _unlabelled.map(function (_ref4) {
        var item = _ref4.item;
        return _fragmentParamAlts(null, item, replacer);
      });
      _commaedParamFrags2 = (0, _describe.interpose)(_paramFrags3, [' | ', _describe.NEW_LINE]);
    }
    return result.concat(['{ ']).concat(_commaedParamFrags2).concat([' }']);
  } else if (head.type === 'Z_OR_M') {
    var _params$unlabelled2 = _slicedToArray(params.unlabelled, 1),
        item = _params$unlabelled2[0].item;

    var processed = _fragmentParamAlts(null, item, replacer);
    return ['( '].concat(result).concat([processed, ' )*']);
  } else if (head.type === 'O_OR_M') {
    var _params$unlabelled3 = _slicedToArray(params.unlabelled, 1),
        _item = _params$unlabelled3[0].item;

    var _processed = _fragmentParamAlts(null, _item, replacer);
    return ['( '].concat(result).concat([_processed, ' )+']);
  } else if (head.type === 'Z_OR_O') {
    var _params$unlabelled4 = _slicedToArray(params.unlabelled, 1),
        _item2 = _params$unlabelled4[0].item;

    var _processed2 = _fragmentParamAlts(null, _item2, replacer);
    return ['( '].concat(result).concat([_processed2, ' )?']);
  } else if (head.type === 'COLL_OF') {
    var _params$unlabelled5 = _slicedToArray(params.unlabelled, 1),
        _item3 = _params$unlabelled5[0].item;

    var _processed3 = _fragmentParamAlts(null, _item3, replacer);
    return ['[ '].concat(result).concat([_processed3, ' ]*']);
  } else if (head.type === 'ANY') {
    return result.concat(['any']);
  } else if (head.type === 'SHAPE') {
    var r = params.unlabelled[0].item.unquotedParamsMap;

    var _params$unlabelled6 = _slicedToArray(params.unlabelled, 1),
        _params$unlabelled6$ = _params$unlabelled6[0].item.unquotedParamsMap,
        _params$unlabelled6$$ = _params$unlabelled6$.required;

    _params$unlabelled6$$ = _params$unlabelled6$$ === undefined ? { singleParam: {} } : _params$unlabelled6$$;
    var required = _params$unlabelled6$$.singleParam.quotedParamsMap,
        _params$unlabelled6$$2 = _params$unlabelled6$.optional;
    _params$unlabelled6$$2 = _params$unlabelled6$$2 === undefined ? { singleParam: {} } : _params$unlabelled6$$2;
    var optional = _params$unlabelled6$$2.singleParam.quotedParamsMap;

    var items = [];
    if (required) {
      for (var key in required) {
        var r1 = match(required[key], {
          'keyList': function keyList(list) {
            return ['[ '].concat((0, _describe.interpose)(list.map(function (i) {
              return '"' + i + '"';
            }), [', '])).concat(' ]');
          },
          'singleParam': function singleParam(p) {
            return _fragmentParamAlts(null, p, replacer);
          }
        }, function () {
          throw '!e';
        });
        if (r1) {
          items = items.concat([[key + '*: ', r1]]);
        }
      }
    }
    if (optional) {
      for (var _key in optional) {
        var _r = match(optional[_key], {
          'keyList': function keyList(list) {
            return ['[ '].concat((0, _describe.interpose)(list.map(function (i) {
              return '"' + i + '"';
            }), [', '])).concat(' ]');
          },
          'singleParam': function singleParam(p) {
            return _fragmentParamAlts(null, p, replacer);
          }
        }, function () {
          throw '!e';
        });
        if (_r) {
          items = items.concat([[_key + '?: ', _r]]);
        }
      }
    }
    var commaSepartedItems = (0, _describe.interpose)(items, [', ']);
    return result.concat(['{ ']).concat(commaSepartedItems).concat([' }']);
  } else if (head.type === 'AND') {
    // TODO: just a temporary hack that takes the first expression
    // need more design decisions
    return _fragmentParamAlts(label, params.unlabelled[0].item, replacer);
  } else if (head.type === 'MAP_OF') {
    var _params$unlabelled7 = _slicedToArray(params.unlabelled, 1),
        _params$unlabelled7$ = _params$unlabelled7[0].item.unquotedParamsMap,
        keyExprAlts = _params$unlabelled7$.key.singleParam,
        valExprAlts = _params$unlabelled7$.val.singleParam;

    var _items = [].concat(_fragmentParamAlts(null, keyExprAlts, replacer)).concat([', ']).concat(_fragmentParamAlts(null, valExprAlts, replacer));

    return result.concat(['< ']).concat(_items).concat([' >']);
  } else {
    console.error(head);
    throw 'not supported';
  }
}

function _processLabel(_ref5) {
  var str = _ref5.str,
      quoted = _ref5.quoted;

  if (str) {
    return str;
  } else if (quoted) {
    return quoted.value;
  }
}

function _fragmentParamAlts(label, pAlts, replacer) {
  var r = match(pAlts, {
    'label': _processLabel,
    'sExpression': function sExpression(expr) {
      return _strFragments(label, expr, replacer);
    },
    'quotedParamsMap': function quotedParamsMap(o) {
      return _fragmentParamsObj(o, replacer, false);
    },
    'unquotedParamsMap': function unquotedParamsMap(o) {
      return _fragmentParamsObj(o, replacer, false);
    },
    'optionsObj': function optionsObj(o) {
      return stringifyWithFnName(o);
    },
    'recursive': function recursive(_ref6) {
      var expression = _ref6.expression;
      return ['<recursive>: ', (0, _describe.humanReadable)(expression)];
    }
  }, function (e) {
    console.error(e);
    throw '!s';
  });
  return r;
}

function _fragmentParamsObj(pObj, replacer) {
  var r = ['< ', _describe.INDENT_IN, _describe.NEW_LINE];
  var body = [];
  var keyExprAlts = pObj.key,
      valExprAlts = pObj.val;

  var keyR = match(keyExprAlts, {
    'keyList': function keyList(list) {
      return ['[ '].concat((0, _describe.interpose)(list.map(function (i) {
        return '"' + i + '"';
      }), [', '])).concat(' ]');
    },
    'singleParam': function singleParam(p) {
      return _fragmentParamAlts(null, p, replacer);
    }
  }, function () {
    throw '!e';
  });

  var valR = match(valExprAlts, {
    'keyList': function keyList(list) {
      return ['[ '].concat((0, _describe.interpose)(list.map(function (i) {
        return '"' + i + '"';
      }), [', '])).concat(' ]');
    },
    'singleParam': function singleParam(p) {
      return _fragmentParamAlts(null, p, replacer);
    }
  }, function () {
    throw '!e';
  });

  body.push([keyR]);
  body.push([valR]);

  body = (0, _describe.interpose)(body, [', ', _describe.NEW_LINE]);
  r = r.concat(body).concat([_describe.INDENT_OUT, _describe.NEW_LINE, ' >']);
  return r;
}

function _describeCase(c, replacer) {
  var cc = conform(PartialableSExprClause, c);
  if (C.isProblem(cc)) {
    throw '!!';
  }
  var fragments = _strFragments(null, cc, replacer);
  var r = (0, _describe.fragsToStr)(fragments, 0, 0);
  return r;
}

function _handler(alts) {
  var headAlts = alts.head,
      params = alts.params;

  return match(headAlts, {
    'expression': function expression(e) {
      return { head: clauseFromAlts(e), params: params };
    },
    'altNode': function altNode(_ref7) {
      var enclosed = _ref7.enclosed;
      return match(enclosed, {
        'sExpression': _handler
      }, function () {});
    }
  }, function () {
    throw '3';
  });
}

function _expand(currCase, pivot) {
  if (C.isValid(PartialableSExprClause, currCase)) {
    var _currCase = _toArray(currCase),
        head = _currCase[0],
        params = _currCase.slice(1);

    if (head === pivot) {
      var altCases = _makeAlts(head, params);
      return { found: true, cases: altCases };
    } else {
      var _loop = function _loop(i) {
        var _expand3 = _expand(params[i], pivot),
            found = _expand3.found,
            cases = _expand3.cases;

        if (found) {
          return {
            v: {
              found: found,
              cases: cases.map(function (c) {
                return _makeAltCase(c, currCase, i);
              })
            }
          };
        }
      };

      for (var i = 0; i < params.length; i += 1) {
        var _ret = _loop(i);

        if ((typeof _ret === 'undefined' ? 'undefined' : _typeof(_ret)) === "object") return _ret.v;
      }
    }
  }

  if (currCase[0] instanceof AltHeadNode) {
    var _ret2 = function () {
      var _currCase2 = _slicedToArray(currCase, 1),
          _currCase2$ = _currCase2[0],
          enclosed = _currCase2$.enclosed,
          label = _currCase2$.label,
          clause = _currCase2$.clause;

      var _loop2 = function _loop2(i) {
        var _expand4 = _expand(enclosed[i], pivot),
            found = _expand4.found,
            cases = _expand4.cases;

        if (found) {
          return {
            v: {
              v: {
                found: found,
                cases: cases.map(function (c) {
                  return [new AltHeadNode(label, clause, _makeAltCase(c, enclosed, i - 1))];
                })
              }
            }
          };
        }
      };

      for (var i = 0; i < enclosed.length; i += 1) {
        var _ret3 = _loop2(i);

        if ((typeof _ret3 === 'undefined' ? 'undefined' : _typeof(_ret3)) === "object") return _ret3.v;
      }
    }();

    if ((typeof _ret2 === 'undefined' ? 'undefined' : _typeof(_ret2)) === "object") return _ret2.v;
  }

  if (currCase instanceof _sExpression.QuotedParamsMap || currCase instanceof _sExpression.UnquotedParamsMap) {
    var _loop3 = function _loop3(key) {
      if (currCase.hasOwnProperty(key)) {
        var val = currCase[key];

        var _expand5 = _expand(val, pivot),
            _found = _expand5.found,
            _cases2 = _expand5.cases;

        if (_found) {
          return {
            v: {
              found: _found,
              cases: _cases2.map(function (c) {
                return _makeAltCaseMap(c, currCase, key);
              })
            }
          };
        }
      }
    };

    for (var key in currCase) {
      var _ret4 = _loop3(key);

      if ((typeof _ret4 === 'undefined' ? 'undefined' : _typeof(_ret4)) === "object") return _ret4.v;
    }
  }
  return { found: false, cases: [currCase] };
}

function _makeAlts(pivot, params) {
  if (pivot.opts.named) {
    return pivot.exprs.map(function (_ref8, idx) {
      var name = _ref8.name,
          expr = _ref8.expr;
      return [new AltHeadNode(name, pivot, params[idx * 2 + 1])];
    });
  } else {
    return pivot.exprs.map(function (e, idx) {
      return [new AltHeadNode(null, pivot, params[idx])];
    });
  }
}

function _makeAltCase(item, sExpression, posInParam) {
  return sExpression.slice(0, posInParam + 1).concat([item]).concat(sExpression.slice(posInParam + 2));
}

function _makeAltCaseMap(item, map, key) {
  var r = void 0;
  if (map instanceof _sExpression.QuotedParamsMap) {
    r = new _sExpression.QuotedParamsMap();
  } else if (map instanceof _sExpression.UnquotedParamsMap) {
    r = new _sExpression.UnquotedParamsMap();
  }

  oAssign(r, map);
  r[key] = item;
  return r;
}

function _fold(reducer, _ref9, init, replacer, inFclause) {
  var sExpression = _ref9.sExpression,
      quotedParamsMap = _ref9.quotedParamsMap,
      unquotedParamsMap = _ref9.unquotedParamsMap;

  var r = init;

  if (sExpression) {
    var replaced;

    var _ret5 = function () {
      var headAlts = sExpression.head,
          _sExpression$params = sExpression.params;
      _sExpression$params = _sExpression$params === undefined ? {} : _sExpression$params;
      var labelled = _sExpression$params.labelled,
          unlabelled = _sExpression$params.unlabelled;

      var head = clauseFromAlts(headAlts);

      if (replacer) {
        replaced = replacer(head);
        if (replaced) {
          return {
            v: r
          };
        }
      }
      r = reducer(r, head);

      var items = labelled || unlabelled || [];
      r = items.reduce(function (acc, _ref10) {
        var item = _ref10.item;

        if (head.type === 'FCLAUSE') {
          return _fold(reducer, item, acc, replacer, true);
        } else {
          return _fold(reducer, item, acc, replacer);
        }
      }, r);
    }();

    if ((typeof _ret5 === 'undefined' ? 'undefined' : _typeof(_ret5)) === "object") return _ret5.v;
  } else if (quotedParamsMap || unquotedParamsMap) {
    var m = quotedParamsMap || unquotedParamsMap;
    for (var key in m) {
      if (m.hasOwnProperty(key)) {
        if (!(inFclause && unquotedParamsMap && key === 'ret')) {
          var singleParam = m[key].singleParam;

          if (singleParam) {
            r = _fold(reducer, singleParam, r, replacer, inFclause);
          }
        }
      }
    }
  }
  return r;
}

// A "pivot" is an "or" clause
function _findPivots(cSExpr, replacer) {
  return _fold(function (acc, item) {
    if (_isPivot(item) && acc.indexOf(item) < 0) {
      return acc.concat([item]);
    } else {
      return acc;
    }
  }, cSExpr, [], replacer);
}

function _isPivot(expr) {
  return expr.type === 'OR';
}

exports.default = synopsis;

// // //


// var SampleClause = cat(
//   'first', oneOrMore( cat( isStr, isBool ) ),
//   'second', or(
//     'objOpt', isObj,
//     'showNum', cat( isNum, or( isBool, isObj, isFinite ) )
//   ),
//   'third', shape( {
//     required: {
//       'qw': or( isNum, isObj )
//     }
//   } )
//   );

// var SampleFnClause = fclause( {
//   args: SampleClause
// } );

// import { TestClause } from '../core/regex';

// var r = synopsis( TestClause );
// console.log( r );

/***/ },
/* 86 */,
/* 87 */
/***/ function(module, exports, __webpack_require__) {

"use strict";


var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _namespace = __webpack_require__(27);

var _namespace2 = __webpack_require__(31);

var _fnName = __webpack_require__(3);

var _fnName2 = _interopRequireDefault(_fnName);

var _isPred = __webpack_require__(10);

var _isPred2 = _interopRequireDefault(_isPred);

var _isClause = __webpack_require__(5);

var _isClause2 = _interopRequireDefault(_isClause);

var _preds = __webpack_require__(12);

var _describe = __webpack_require__(30);

var _describe2 = _interopRequireDefault(_describe);

var _deref = __webpack_require__(29);

var _deref2 = _interopRequireDefault(_deref);

var _resolve = __webpack_require__(43);

var _syntax = __webpack_require__(85);

var _syntax2 = _interopRequireDefault(_syntax);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var clauseFromAlts = __webpack_require__(6);

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

      return '<li>\n            ' + _clauseRefLink(p + '/' + n)(function (pn) {
        return _stylizeName((0, _deref2.default)(ref), _getAlias(registry, pn) || _unanbiguousName(pn), (0, _namespace2.getMeta)(pn, registry));
      }) + '\n          </li>';
    }).join('') + '\n      </ul>\n    </dd>\n    ';
  }).join('') + '\n  </dl>';
}

function _getAlias(reg, p) {
  var meta = (0, _namespace2.getMeta)(p, reg);
  return meta && meta.name;
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

function _stylizeName(expr, name, meta) {
  if (expr.type === 'FCLAUSE' && name[0] === name[0].toLowerCase() || meta && meta.showAsFunction) {
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
  return '\n    <span \n      role="button"\n      data-toggle="popover"\n      data-trigger="focus hover"\n      data-html="true"\n      data-content="' + escapeHtml(_description(expr, globalReg, path)) + '"\n      data-container="body"\n      data-animation="false"\n      data-delay="500"\n      class="tag tag-' + _labelFor(expr) + '">\n      ' + _typeFor(expr) + '\n    </span>\n  ';
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


function _clauseRefLink(p) {
  return function (pGenFn) {
    return '<a href="#' + p + '" data-path="' + p + '">' + pGenFn(p) + '</a>';
  };
}

function _description(expr, globalReg, currPath) {
  // return ``;
  return '\n    <pre class="clause-description"><code class="clause">' + unescape(_encode((0, _describe2.default)(expr, _refExprFn(globalReg, currPath), 2))) + '</code></pre>\n  ';
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
  var predName = (0, _fnName2.default)(pred);
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
  }).join('') + '\n    </div>\n  ';
  return r;
}

function _genOrClause(globalReg, exprName, path, expr, meta) {
  if (!meta) {
    meta = {};
  }
  var altDefs = expr.exprs.map(function (_ref5, idx) {
    var name = _ref5.name,
        altE = _ref5.expr;

    var comment = meta[name] && meta[name].comment;
    var examples = meta[name] && meta[name].examples;
    if ((0, _preds.isStr)(examples)) {
      examples = [examples];
    }

    return '\n        <fieldset class="list-group-item card-outline-' + _labelFor(expr) + '">\n          <legend class="clause-type">\n            <span class="tag tag-default">\n                Option ' + (idx + 1) + '\n            </span>\n            ' + (name ? '\n                <span class="lead font-italic text-primary">\n                  &ldquo;' + name + '&rdquo;\n                </span>\n            ' : '') + '\n          </legend>\n          <div class="row">\n            <div class="col-md-12">\n            ' + (comment ? '<div>' + comment + '</div>' : '') + '\n            \n            ' + (examples ? '\n              <h6>Examples: </h6>\n                <div class="code-examples">\n                  ' + examples.map(function (e) {
      return '\n                    <pre><code>' + e.trim() + '</code></pre>\n                  ';
    }).join('\n') + '\n                </div>\n            ' : '') + '\n            </div>\n          </div>\n          <div class="row">\n            <div class="col-md-12">\n              ' + genForExpression(globalReg, null, altE, meta && meta[name]) + '\n            </div>\n          </div>\n        </fieldset>\n    ';
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

  var _ref6 = meta || {},
      comment = _ref6.comment,
      examples = _ref6.examples;

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
  if (argsClause) {
    frags.push(['Syntax', '<ul>\n        ' + (0, _syntax2.default)(clause, 20, _refExprFn(globalReg, path)).map(function (s) {
      return '<li>' + unescape(_encode(s)) + '</li>';
    }).join('') + '\n      </ul>']);
  }
  if (examples) {
    frags.push(['Examples  <button class="btn btn-info btn-sm launch-code-examples" data-name="' + exprName + '">\n          Live Eval\n        </button>', '\n      <div class="code-examples" data-name="' + exprName + '">\n        ' + examples.map(function (e) {
      return '\n            <pre><code>' + e.trim() + '</code></pre>\n          ';
    }).join('') + '\n      </div>\n    ']);
  }
  if (exprName && path) {
    frags.push(['Clause Description', '\n    <blockquote class="blockquote">\n      <small>\n        <em class="text-muted">\n          ' + _description(clause, globalReg, path) + '\n        </em>\n      </small>\n    </blockquote>\n  ']);
  }
  if (argsClause) {
    frags.push(['Argument Clause Graph', _wrapWithCollapsible(exprName + '-args-graph', genForExpression(globalReg, null, argsClause, meta && meta.args))]);
  }
  if (retClause) {
    frags.push(['Return Value Clause Graph', _wrapWithCollapsible(exprName + '-ret-graph', genForExpression(globalReg, null, retClause, meta && meta.ret))]);
  }if (fn) {
    frags.push(['Argument-return value relation', '<pre>' + (0, _fnName2.default)(fn) + '</pre>']);
  }
  var r = '\n    <dl class="card-block">\n    ' + frags.map(function (_ref7) {
    var _ref8 = _slicedToArray(_ref7, 2),
        name = _ref8[0],
        src = _ref8[1];

    var title = name ? '<dt>' + name + '</dt>' : '';
    var def = '<dd>' + src + '</dd>';
    return '' + title + def;
  }).join('\n') + '\n    </dl>\n  ';
  return r;
}

function _wrapWithCollapsible(contentId, content) {
  return '<p>\n     <button class="btn btn-sm btn-info" type="button" data-toggle="collapse" data-target="#' + contentId + '" aria-expanded="false" aria-controls="collapseExample">\n      Show Graph \xBB\n    </button>\n  </p>\n  <div class="collapse" id="' + contentId + '">\n    ' + content + '\n  </div>\n';
}

var fns = {
  gen: gen,
  genForExpression: genForExpression,
  genCot: genCot,
  syntax: _syntax2.default
};
module.exports = fns;
module.exports.default = fns;

/***/ }
/******/ ]);
});