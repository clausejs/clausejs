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
/******/ 	return __webpack_require__(__webpack_require__.s = 44);
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


function Clause(_a) {
    var type = _a.type,
        exprs = _a.exprs,
        opts = _a.opts,
        fragments = _a.fragments,
        conformFn = _a.conformFn,
        generateFn = _a.generateFn;
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


var _typeof2 = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _typeof = typeof Symbol === "function" && _typeof2(Symbol.iterator) === "symbol" ? function (obj) {
    return typeof obj === "undefined" ? "undefined" : _typeof2(obj);
} : function (obj) {
    return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj === "undefined" ? "undefined" : _typeof2(obj);
};

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
function _constructMessage(_a, lvl) {
    var subproblems = _a.subproblems,
        val = _a.val,
        shortMessage = _a.shortMessage;
    if (Array.isArray(subproblems)) {
        var reasons;
        if (subproblems.length === 0) {
            return shortMessage + "; val: " + stringifyWithFnName(val, null, 2);
        } else {
            reasons = subproblems.map(function (r) {
                return "" + _open(lvl) + _constructMessage(r, lvl + 1) + _close(lvl);
            });
            return shortMessage + ", because\n" + _repeatStr(' ', lvl * 2) + " " + reasons.join(', ');
        }
    } else if ((typeof subproblems === 'undefined' ? 'undefined' : _typeof(subproblems)) === 'object') {
        reasons = [];
        for (var name in subproblems) {
            if (subproblems.hasOwnProperty(name)) {
                reasons.push("-> " + name + ": " + _open(lvl) + " " + _constructMessage(subproblems[name], lvl + 1) + _close(lvl));
            }
        }
        return shortMessage + ", because\n" + _repeatStr(' ', lvl * 2) + " " + reasons.join(', ');
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
            withLabels: arr.map(function (_a) {
                var name = _a[0],
                    type = _a[1],
                    v = _a[2];
                return { name: name, expr: (_b = {}, _b[type] = v, _b) };
                var _b;
            })
        }
    };
}
function _unlabelled() {
    var arr = Array.prototype.slice.call(arguments);
    return {
        expressions: {
            withoutLabels: arr.map(function (_a) {
                var type = _a[0],
                    v = _a[1];
                return _b = {}, _b[type] = v, _b;
                var _b;
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
function noDupelicateLabels(_a) {
    var withLabels = _a.expressions.withLabels;
    if (withLabels) {
        var byFar = [];
        for (var i = 0; i < withLabels.length; i += 1) {
            var lbl = withLabels[i].name;
            if (byFar.indexOf(lbl) >= 0) {
                throw new Error("Duplicate label detected: " + lbl);
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
    return namedFn(type, function _(_a) {
        var _b = _a.expressions,
            withLabels = _b.withLabels,
            withoutLabels = _b.withoutLabels,
            options = _a.options;
        var exprs;
        if (withLabels) {
            exprs = withLabels;
            var coercedExprs = exprs.map(function (p) {
                var alts = p.expr;
                var s = clauseFromAlts(alts);
                return oAssign({}, p, {
                    expr: s,
                    clause: undefined, pred: undefined,
                    clauseRef: undefined, delayedClause: undefined
                });
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
            var opts = oAssign({}, options, {
                named: false
            });
            s = new Clause({
                type: type,
                exprs: coercedExprs,
                opts: opts
            });
            s.conform = function conform(x) {
                return walk(s, x, { conform: true });
            };
            return s;
        } else {
            // empty case
            s = new Clause({
                type: type,
                exprs: [], opts: {}
            });
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
        throw new Error("'Expression must either be a Clause object or a predication function that returns true or false. Given value: " + stringifyWithFnName(expr) + "'");
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
var _a = __webpack_require__(8),
    shape = _a.shape,
    keys = _a.keys,
    mapOf = _a.mapOf,
    cat = _a.cat,
    fclause = _a.fclause;
var nullable = __webpack_require__(54);
var undefinable = __webpack_require__(55);
var maybe = __webpack_require__(49);
var wall = __webpack_require__(46).wall;
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


Object.defineProperty(exports, "__esModule", { value: true });
var sExpression_1 = __webpack_require__(28);
var describe_1 = __webpack_require__(30);
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
    describe: describe_1.default,
    sExpression: sExpression_1.default,
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
                r = n + "()";
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
        fn = namedFn("instanceOf_" + n, fn);
    }
    fn.__predToString = function () {
        return "instanceOf_" + (n || 'anonymous_type') + "_";
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


var _typeof2 = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _typeof = typeof Symbol === "function" && _typeof2(Symbol.iterator) === "symbol" ? function (obj) {
    return typeof obj === "undefined" ? "undefined" : _typeof2(obj);
} : function (obj) {
    return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj === "undefined" ? "undefined" : _typeof2(obj);
};

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


Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(11);
var utils_1 = __webpack_require__(18);
exports.isNamespacePath = utils_1.isNamespacePath;
exports.isClauseRef = utils_1.isClauseRef;
var preds_1 = __webpack_require__(12);
var isExpr = __webpack_require__(65);
var ExprOrPartialRefMapClause =
// or(
//  'expression',
utils_1.delayed(function () {
    //TODO
    return core_1.ExprClause;
});
// );
var GetArgClause = core_1.cat('nsPath', utils_1.isNamespacePath);
var GetNSFnClause = core_1.fclause({
    args: GetArgClause,
    ret: utils_1.isClauseRef
});
exports.GetNSFnClause = GetNSFnClause;
var SetArgClause = core_1.cat('nsPath', utils_1.isNamespacePath, 'expression', ExprOrPartialRefMapClause);
var SetNSFnClause = core_1.fclause({
    args: SetArgClause,
    ret: preds_1.isBool
});
exports.SetNSFnClause = SetNSFnClause;
var NamespaceArgsCLause = core_1.or('register', SetArgClause, 'retrieve', GetArgClause);
var NamespaceFnClause = core_1.fclause({
    args: NamespaceArgsCLause,
    ret: core_1.or(preds_1.isUndefined, utils_1.isClauseRef)
});
exports.NamespaceFnClause = NamespaceFnClause;
var SetMetaFnClause = core_1.fclause({
    args: core_1.cat('source', core_1.or('namespacePath', utils_1.isNamespacePath, 'expression', core_1.ExprClause), 'metaObj', preds_1.isObj, 'registry', core_1.zeroOrOne(preds_1.isObj)),
    ret: preds_1.isUndefined
});
exports.SetMetaFnClause = SetMetaFnClause;
var GetMetaFnClause = core_1.fclause({
    args: core_1.cat('source', core_1.or('namespacePath', utils_1.isNamespacePath, 'expression', core_1.ExprClause), 'registry', core_1.zeroOrOne(preds_1.isObj)),
    ret: core_1.maybe(preds_1.isObj)
});
exports.GetMetaFnClause = GetMetaFnClause;
var ResolveFnClause = core_1.fclause({
    args: core_1.cat('expression', core_1.ExprClause, 'registry', core_1.zeroOrOne(preds_1.isObj)),
    ret: utils_1.isNamespacePath
});
exports.ResolveFnClause = ResolveFnClause;
function isNamespaceFragment(x) {
    return !!/^[^.@%\&\*#]+/.test(x);
}
var NamespaceObjClause = core_1.shape({
    optional: {
        subNamespaces: [isNamespaceFragment, utils_1.delayed(function () {
            return NamespaceObjClause;
        })],
        '.meta': preds_1.isObj,
        '.expr': isExpr
    }
});
exports.NamespaceObjClause = NamespaceObjClause;

/***/ },
/* 28 */
/***/ function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", { value: true });
var fnName = __webpack_require__(3);
var clauseFromAlts = __webpack_require__(6);
var oAssign = __webpack_require__(4);
var _a = __webpack_require__(11),
    wall = _a.wall,
    any = _a.any,
    zeroOrMore = _a.zeroOrMore,
    and = _a.and,
    cat = _a.cat,
    or = _a.or,
    ExprClause = _a.ExprClause,
    mapOf = _a.mapOf,
    maybe = _a.maybe;
var delayed = __webpack_require__(40);
var match = __webpack_require__(19);
var coerceIntoClause = __webpack_require__(9);
var _b = __webpack_require__(12),
    isStr = _b.isStr,
    isPlainObj = _b.isPlainObj,
    instanceOf = _b.instanceOf;
function Recursive(expression) {
    this.isRecursive = true;
    this.expression = expression;
}
exports.Recursive = Recursive;
function QuotedParamsMap(map) {
    oAssign(this, map);
}
exports.QuotedParamsMap = QuotedParamsMap;
function UnquotedParamsMap(map) {
    oAssign(this, map);
}
exports.UnquotedParamsMap = UnquotedParamsMap;
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
exports.genClauses = genClauses;
var _c = genClauses(ExprClause),
    SExpressionClause = _c[0],
    ParamItemClause = _c[1];
exports.SExpressionClause = SExpressionClause;
exports.ParamItemClause = ParamItemClause;
var singleArgParamGenerator = function singleArgParamGenerator(repo, _a) {
    var enclosedClause = _a.opts.enclosedClause;
    return [_createSExpr(repo, enclosedClause)];
};
var multipleArgParamGenerator = function multipleArgParamGenerator(repo, _a) {
    var named = _a.opts.named,
        exprs = _a.exprs;
    if (exprs.length === 0) {
        //empty case
        return [];
    } else if (named) {
        var r = exprs.reduce(function (acc, _a) {
            var name = _a.name,
                expr = _a.expr;
            return acc.concat([new Quoted(name), _createSExpr(repo, expr)]);
        }, []);
        return r;
    } else {
        return exprs.reduce(function (acc, _a) {
            var expr = _a.expr;
            return acc.concat([_createSExpr(repo, expr)]);
        }, []);
    }
};
var sParamsConverters = {
    'PRED': function PRED() {
        return [];
    },
    'WALL': function WALL(repo, _a) {
        var enclosedClause = _a.opts.enclosedClause;
        return [_createSExpr(repo, enclosedClause)];
    },
    'AND': function AND(repo, _a) {
        var conformedExprs = _a.opts.conformedExprs;
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
    'MAP_OF': function MAP_OF(repo, _a) {
        var opts = _a.opts;
        return _handleKeyValExprPair(repo, opts);
    },
    'SHAPE': function SHAPE(repo, _a) {
        var _b = _a.opts.conformedArgs.shapeArgs,
            _c = _b.optionalFields,
            _d = _c === void 0 ? {} : _c,
            opt = _d.opt,
            optional = _d.optional,
            _e = _b.requiredFields,
            _f = _e === void 0 ? {} : _e,
            req = _f.req,
            required = _f.required;
        return oAssign(new UnquotedParamsMap(), req || required ? {
            required: _fieldDefToFrags(repo, req || required)
        } : {}, opt || optional ? {
            optional: _fieldDefToFrags(repo, opt || optional)
        } : {});
    },
    'FCLAUSE': function FCLAUSE(repo, _a) {
        var _b = _a.opts,
            args = _b.args,
            ret = _b.ret,
            fn = _b.fn;
        return oAssign(new UnquotedParamsMap(), args ? { args: _createSExpr(repo, args) } : {}, ret ? { ret: _createSExpr(repo, ret) } : {}, fn ? { fn: [fnName(fn) + "()"] } : {});
    }
};
function _fieldDefToFrags(repo, _a) {
    var fieldDefs = _a.fieldDefs,
        keyList = _a.keyList;
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
                oAssign(r, (_b = {}, _b[key] = val, _b));
            }
        }
        return r;
    } else if (keyList) {
        return keyList;
    } else {
        throw '!w';
    }
    var _b;
}
function _handleKeyValExprPair(repo, _a) {
    var keyExpression = _a.keyExpression,
        valExpression = _a.valExpression;
    return new UnquotedParamsMap({
        'key': _createSExpr(repo, clauseFromAlts(keyExpression)),
        'val': _createSExpr(repo, clauseFromAlts(valExpression))
    });
}
function _params(repo, clause) {
    var converter = sParamsConverters[clause.type];
    if (!converter) {
        console.error(clause);
        throw new Error("Unsupported clause type " + clause.type + ".");
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
        realExpr,
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


Object.defineProperty(exports, "__esModule", { value: true });
var sExpression_1 = __webpack_require__(28);
var humanReadable = __webpack_require__(64);
exports.humanReadable = humanReadable;
var isStr = __webpack_require__(7);
var isProblem = __webpack_require__(0);
var match = __webpack_require__(19);
var clauseFromAlts = __webpack_require__(6);
var fnName = __webpack_require__(3);
var stringifyWithFnName = __webpack_require__(20);
var repeat = __webpack_require__(70);
var NEW_LINE = function NEW_LINE() {};
exports.NEW_LINE = NEW_LINE;
var INDENT_IN = function INDENT_IN() {};
exports.INDENT_IN = INDENT_IN;
var INDENT_OUT = function INDENT_OUT() {};
exports.INDENT_OUT = INDENT_OUT;
function describe(expr, replacer, space) {
    var sexpr = sExpression_1.default(expr);
    var cSexpr = sExpression_1.SExpressionClause.conform(sexpr);
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
    return strFragments(function (_a) {
        var headAlts = _a.head,
            params = _a.params;
        return { head: clauseFromAlts(headAlts), params: params };
    }, cSExpr, replacer);
}
function strFragments(headAltsHandler, cNode, replacer) {
    var _a = headAltsHandler(cNode),
        head = _a.head,
        params = _a.params;
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
        return ["" + fnName(head.opts.predicate)];
    }
    var label = humanReadable(head);
    var commaedParamFrags;
    if (params) {
        var labelled = params.labelled,
            unlabelled = params.unlabelled,
            keyList = params.keyList;
        if (labelled) {
            var paramFrags = labelled.reduce(function (acc, _a) {
                var label = _a.label,
                    item = _a.item;
                return acc.concat([[_processLabel(label), ', ', _fragmentParamAlts(headAltsHandler, item, replacer)]]);
            }, []);
            commaedParamFrags = interpose(paramFrags, [', ', NEW_LINE]);
        } else if (unlabelled) {
            var paramFrags = unlabelled.map(function (_a) {
                var item = _a.item;
                return _fragmentParamAlts(headAltsHandler, item, replacer);
            });
            commaedParamFrags = interpose(paramFrags, [', ', NEW_LINE]);
        } else if (keyList) {
            var paramFrags = keyList;
            commaedParamFrags = interpose(paramFrags, [', ']);
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
exports.interpose = interpose;
function isSpecial(x) {
    return x === NEW_LINE || x === INDENT_IN || x === INDENT_OUT;
}
exports.isSpecial = isSpecial;
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
        'recursive': function recursive(_a) {
            var expression = _a.expression;
            return ['<recursive>: ', humanReadable(expression)];
        }
    }, function () {
        throw '!s';
    });
    return r;
}
function _processLabel(_a) {
    var str = _a.str,
        quoted = _a.quoted;
    if (str) {
        return str;
    } else if (quoted) {
        return "\"" + quoted.value + "\"";
    }
}
function _fragmentParamsObj(headAltsHandler, pObj, replacer, quote) {
    var r = ['{', INDENT_IN, NEW_LINE];
    var body = [];
    for (var label in pObj) {
        if (pObj.hasOwnProperty(label)) {
            var item = [];
            item.push(quote ? "\"" + label + "\": " : "<" + label + ">: ");
            var r1 = match(pObj[label], {
                'keyList': function keyList(list) {
                    return ['[ '].concat(interpose(list.map(function (i) {
                        return "\"" + i + "\"";
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
exports.fragsToStr = fragsToStr;
exports.default = describe;

/***/ },
/* 31 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {

Object.defineProperty(exports, "__esModule", { value: true });
var oAssign = __webpack_require__(4);
var ClauseRef = __webpack_require__(32);
var _a = __webpack_require__(11),
    cat = _a.cat,
    or = _a.or,
    fclause = _a.fclause,
    shape = _a.shape;
var isClause = __webpack_require__(5);
var isPred = __webpack_require__(10);
var isBool = __webpack_require__(35);
var walk = __webpack_require__(17);
var resolveWithRegistry = __webpack_require__(43);
var coerceIntoClause = __webpack_require__(9);
var oPath = __webpack_require__(56);
var _b = __webpack_require__(18),
    isNamespacePath = _b.isNamespacePath,
    isClauseRef = _b.isClauseRef;
var _c = __webpack_require__(27),
    GetNSFnClause = _c.GetNSFnClause,
    SetNSFnClause = _c.SetNSFnClause,
    NamespaceFnClause = _c.NamespaceFnClause,
    SetMetaFnClause = _c.SetMetaFnClause,
    GetMetaFnClause = _c.GetMetaFnClause;
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
function getNamespacePath(_a) {
    var nsPath = _a.nsPath;
    var retVal;
    var nameObj = _get(nsPath);
    retVal = nameObj;
    return retVal;
}
function setNamespacePath(_a) {
    var nsPath = _a.nsPath,
        expression = _a.expression;
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
exports.clearRegistry = clearRegistry;
var setMeta = SetMetaFnClause.instrumentConformed(function setMeta(_a) {
    var _b = _a.source,
        namespacePath = _b.namespacePath,
        expression = _b.expression,
        metaObj = _a.metaObj,
        registry = _a.registry;
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
exports.setMeta = setMeta;
var getMeta = GetMetaFnClause.instrumentConformed(function getMeta(_a) {
    var _b = _a.source,
        namespacePath = _b.namespacePath,
        expression = _b.expression,
        registry = _a.registry;
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
exports.getMeta = getMeta;
function resolve(expr, reg) {
    if (!reg) {
        return resolveWithRegistry(expr, getRegistry());
    } else {
        return resolveWithRegistry(expr, reg);
    }
}
exports.resolve = resolve;
_maybeInitRegistry();
var getRegistry = function getRegistry() {
    return reg;
};
exports.getRegistry = getRegistry;
var namespaceGetOrSet = NamespaceFnClause.instrumentConformed(function namespaceGetOrSet(_a) {
    var register = _a.register,
        retrieve = _a.retrieve;
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
exports.default = namespaceGetOrSet;
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(83)))

/***/ },
/* 32 */
/***/ function(module, exports, __webpack_require__) {

"use strict";


var Clause = __webpack_require__(1);
function ClauseRef(_a) {
    var ref = _a.ref,
        getFn = _a.getFn,
        conformFn = _a.conformFn;
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
function DelayedClause(_a) {
    var getFn = _a.getFn;
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


Object.defineProperty(exports, "__esModule", { value: true });
var resolvedMaps = [];
var namespace_types_1 = __webpack_require__(27);
function resolve(clauseRef, registry) {
    var map = _findFirst(resolvedMaps, function (_a) {
        var registryRef = _a[0],
            m = _a[1];
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
        var p = curr[0];
        if (!groups[p]) {
            groups[p] = [];
        }
        groups[p].push(curr);
    });
    return groups;
}
function _createResolveMap(registry) {
    var r = [];
    var conformedReg = namespace_types_1.NamespaceObjClause.conform(registry);
    _walk(null, null, conformedReg, r);
    return r;
}
function _walk(prefix, currN, creg, r) {
    var currNs = prefix ? prefix + "." + currN : currN;
    var subnamespaces;
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
                    r.push(["" + (prefix ? prefix : ''), "" + currN, creg['.expr']]);
                    break;
                default:
                    break;
            }
        }
    }
}
function _resolveWithMap(map, clauseRef) {
    var path = _findFirst(map, function (_a) {
        var p = _a[0],
            n = _a[1],
            r = _a[2];
        if (r === clauseRef || _tryStripPredClause(r) === _tryStripPredClause(clauseRef)) {
            return p + "/" + n;
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


Object.defineProperty(exports, "__esModule", { value: true });
var oAssign = __webpack_require__(4);
var namespace_1 = __webpack_require__(31);
var ops = __webpack_require__(11);
var utils = __webpack_require__(18);
var predicates = __webpack_require__(12);
var models = {
    Problem: __webpack_require__(2),
    Clause: __webpack_require__(1)
};
var r = oAssign(namespace_1.default, { resolve: namespace_1.resolve }, ops, utils, models, predicates);
r.VERSION = __webpack_require__(45);
module.exports = r;
exports.default = r;

/***/ },
/* 45 */
/***/ function(module, exports, __webpack_require__) {

"use strict";


module.exports = '0.1.1';

/***/ },
/* 46 */
/***/ function(module, exports, __webpack_require__) {

"use strict";


var Clause = __webpack_require__(1);
var coerceIntoClause = __webpack_require__(9);
var _a = __webpack_require__(8),
    cat = _a.cat,
    ExprClause = _a.ExprClause;
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


var or = __webpack_require__(8).or;
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
                    }
                    break;
                case 'maybe_exit':
                    {
                        var c = void 0,
                            acc = new Empty();
                        while (!((c = valStack.pop()) instanceof MaybeEnter)) {
                            acc = _foldLeft(inputType, conform, acc, c);
                        }
                        valStack.push(acc);
                    }
                    break;
                case 'maybe_single_enter':
                    {
                        valStack.push(new MaybeEnter());
                    }
                    break;
                case 'maybe_single_exit':
                    {
                        var top = valStack.pop(),
                            acc = void 0;
                        if (top instanceof MaybeEnter) {
                            acc = new Nothing();
                        } else {
                            acc = top;
                            //get rid of MaybeEnter
                            valStack.pop();
                        }
                        valStack.push(acc);
                    }
                    break;
                case 'enter':
                    {}
                    break;
                case 'exit':
                    {
                        var c = valStack.pop();
                        var acc = void 0;
                        if (conform && c instanceof NamedAltPiece) {
                            var interim = void 0;
                            if (c.fragment instanceof Empty) {
                                interim = {};
                            } else {
                                interim = (_a = {}, _a[c.name] = c.fragment, _a);
                            }
                            acc = new GroupedAltPiece(interim);
                        } else {
                            acc = c;
                        }
                        valStack.push(acc);
                    }
                    break;
                case 'maybe_in':
                    {
                        if (conform && curr.move.name) {
                            valStack.push(new GroupName(curr.move.name));
                        }
                    }
                    break;
                case 'loop':
                    {}
                    break;
                case 'maybe_out':
                    {
                        if (conform && curr.move.name) {
                            var c = valStack.pop();
                            var gn = valStack.pop();
                            valStack.push(_giveName(gn, c));
                        }
                    }
                    break;
                case 'in':
                    {
                        if (conform && curr.move.name) {
                            valStack.push(new GroupName(curr.move.name));
                        }
                    }
                    break;
                case 'out':
                    {
                        if (conform && curr.move.name) {
                            var c = valStack.pop();
                            var gn = valStack.pop();
                            valStack.push(_giveAltName(gn, c));
                        }
                    }
                    break;
                case 'clause':
                    {
                        var conformed = walkFn(curr.clause, curr.guide, walkOpts);
                        valStack.push(new Value(conformed));
                    }
                    break;
                default:
                    console.error(curr);
                    throw 'FUUU';
            }
        }
        var _a;
    });
    if (valStack.length !== 1) {
        console.error('valStack', valStack);
        throw '!';
    }
    r = valStack.pop();
    var retVal;
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
            interim = (_a = {}, _a[c.name] = c.fragment, _a);
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
    var _a;
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


var _typeof2 = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _typeof = typeof Symbol === "function" && _typeof2(Symbol.iterator) === "symbol" ? function (obj) {
    return typeof obj === "undefined" ? "undefined" : _typeof2(obj);
} : function (obj) {
    return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj === "undefined" ? "undefined" : _typeof2(obj);
};

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
        arrayed: false
    };
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


var or = __webpack_require__(8).or;
var isNull = __webpack_require__(23);
function nullable(clause) {
    return or(isNull, clause);
}
module.exports = nullable;

/***/ },
/* 55 */
/***/ function(module, exports, __webpack_require__) {

"use strict";


var or = __webpack_require__(8).or;
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
        return namedFn("not_" + n, negated);
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


var whiteSpaces = [0x0009, 0x000a, 0x000b, 0x000c, 0x000d, 0x0020,
//0x0085, // Next line - Not ES5 whitespace
0x00a0, 0x1680, 0x180e, 0x2000, 0x2001, 0x2002, 0x2003, 0x2004, 0x2005, 0x2006, 0x2007, 0x2008, 0x2009, 0x200a,
//0x200b, // Zero width space - Not ES5 whitespace
0x2028, 0x2029, 0x202f, 0x205f, 0x3000, 0xfeff // Byte Order Mark
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
    function andReconstruct(_a) {
        var conforms = _a.conforms;
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
                    return new Problem(x, clause, problems, "collOf: collection size " + x.length + " exceeds maxCount " + maxCount + ".");
                }
                if (isNum(minCount) && x.length < minCount) {
                    return new Problem(x, clause, problems, "collOf: collection size " + x.length + " is less than minCount " + minCount + ".");
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
    var _a = clause.opts,
        argsClause = _a.args,
        retClause = _a.ret,
        validateFn = _a.fn;
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
            var conformedRetVal;
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
                var p = new Problem({ args: conformedArgs, ret: retVal }, clause, [], "Function " + fnName + " failed valiation on argument-return value relation");
                betterThrow(p);
            }
        }
    }
    function checkArgs(fn, fnName, args) {
        var displayFnName = fnName || '<anonymous>';
        if (argsClause) {
            var instrumentedArgs = walkFn(argsClause, args, { phase: 'trailblaze' });
            if (isProblem(instrumentedArgs)) {
                var p = new Problem(args, clause, [instrumentedArgs], "Arguments for function " + displayFnName + "() is not valid");
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
                var p = new Problem(args, argsClause, [conformedArgs], "Arguments for function " + displayFnName + " is not valid");
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


var clauseFromAlts = __webpack_require__(6);
var isProblem = __webpack_require__(0);
var Problem = __webpack_require__(2);
function mapOfWalker(clause, walkFn) {
    var _a = clause.opts,
        keyExpression = _a.keyExpression,
        valExpression = _a.valExpression;
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
                    return new Problem(x, clause, (_a = {}, _a[key] = keyR, _a), "mapOf: key " + key + " failed validation");
                }
                var valR = walkFn(valClause, x[key], walkOpts);
                if (isProblem(valR)) {
                    return new Problem(x, clause, (_b = {}, _b[key] = valR, _b), "mapOf: value for key " + key + " failed validation");
                }
                guide[key] = {
                    expr: valClause,
                    valGuide: valR
                };
            }
        }
        return guide;
        var _a, _b;
    }
    function mapOfReconstruct(guide, walkOpts) {
        var r = {};
        for (var key in guide) {
            var _a = guide[key],
                expr = _a.expr,
                valGuide = _a.valGuide;
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
        var _a = simulate(nfa, x, walkFn, walkOpts),
            chain = _a.chain,
            matched = _a.matched,
            lastProblem = _a.lastProblem;
        if (matched === true) {
            return { chain: chain };
        } else {
            var subproblems = void 0;
            if (lastProblem) {
                var name = lastProblem.name,
                    position = lastProblem.position,
                    problem = lastProblem.problem;
                subproblems = (_b = {}, _b[name ? "\"" + name + "\"" : "<At position " + position + ">"] = problem, _b);
            } else {
                subproblems = [];
            }
            return new Problem(x, clause, subproblems, 'Clause ' + clause.type + ' did not match value');
        }
        var _b;
    }
    function nfaReconstruct(_a, walkOpts) {
        var chain = _a.chain;
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


var _typeof2 = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _typeof = typeof Symbol === "function" && _typeof2(Symbol.iterator) === "symbol" ? function (obj) {
    return typeof obj === "undefined" ? "undefined" : _typeof2(obj);
} : function (obj) {
    return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj === "undefined" ? "undefined" : _typeof2(obj);
};

var isProblem = __webpack_require__(0);
var isUndefined = __webpack_require__(14);
var oAssign = __webpack_require__(4);
var Problem = __webpack_require__(2);
var clauseFromAlts = __webpack_require__(6);
function shapeWalker(clause, walkFn) {
    var keyConformer;
    var _a = clause.opts.conformedArgs.shapeArgs,
        requiredFields = _a.requiredFields,
        optionalFields = _a.optionalFields;
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
                var _a = problems[i],
                    n = _a[0],
                    p = _a[1];
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
                    var _a = getFieldGuide(x, name, keyValAlts, walkFn, walkOpts),
                        noop = _a.noop,
                        problem = _a.problem,
                        singleMatch = _a.singleMatch,
                        groupMatch = _a.groupMatch;
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
    function shapeReconstruct(_a, walkOpts) {
        var val = _a.val,
            singles = _a.singles,
            groups = _a.groups;
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
        groups.forEach(function (_a) {
            var name = _a.name,
                matchedKeys = _a.matchedKeys;
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
function restoreField_mut(x, _a, walkFn, walkOpts) {
    var key = _a.key,
        clause = _a.clause,
        guide = _a.guide;
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


function wallWalker(wallClause, walkFn) {
    return {
        trailblaze: wallWalk,
        reconstruct: wallWalk
    };
    function wallWalk(x, opts) {
        var clause = wallClause.exprs[0];
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


/***/ }
/******/ ]);
});