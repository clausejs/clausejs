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


Object.defineProperty(exports, "__esModule", { value: true });
var Problem_1 = __webpack_require__(2);
function isProblem(x) {
    return x instanceof Problem_1.default;
}
exports.default = isProblem;

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", { value: true });
var Clause = function () {
    function Clause(_a) {
        var type = _a.type,
            exprs = _a.exprs,
            opts = _a.opts,
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
            throw new Error("Expressions are required when constructing a clause.");
        }
        this.exprs = exprs;
    }
    return Clause;
}();
exports.default = Clause;

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

"use strict";


var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

Object.defineProperty(exports, "__esModule", { value: true });
var PAREN_PAIRS = '❰❮❬❨❪﹙₍₎﹚❫❩❭❯❱';
var stringifyWithFnName_1 = __webpack_require__(19);
var lazyDefine_1 = __webpack_require__(68);
var Problem = function () {
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
        lazyDefine_1.default(this, 'message', function () {
            return _constructMessage(_this, 0);
        });
        this.toString = function () {
            return _this.message;
        };
    }
    ;
    return Problem;
}();
exports.default = Problem;
function _constructMessage(_a, lvl) {
    var subproblems = _a.subproblems,
        val = _a.val,
        shortMessage = _a.shortMessage;
    if (Array.isArray(subproblems)) {
        var reasons;
        if (subproblems.length === 0) {
            return shortMessage + "; val: " + stringifyWithFnName_1.default(val, null, 2);
        } else {
            reasons = subproblems.map(function (r) {
                return "" + _open(lvl) + _constructMessage(r, lvl + 1) + _close(lvl);
            });
            return shortMessage + ", because\n" + _repeatStr(' ', lvl * 2) + " " + reasons.join(', ');
        }
    } else if ((typeof subproblems === "undefined" ? "undefined" : _typeof(subproblems)) === 'object') {
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

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
// from https://github.com/Xotic750/get-function-name-x/blob/master/index.js


Object.defineProperty(exports, "__esModule", { value: true });
var isFn_1 = __webpack_require__(13);
var whiteSpace_1 = __webpack_require__(70);
var _getFnName;
if (function test() {}.name !== 'test') {
    var STRIP_COMMENTS = /((\/\/.*$)|(\/\*[\s\S]*?\*\/))/mg;
    var fToString = Function.prototype.toString;
    var pMatch = String.prototype.match;
    var pReplace = String.prototype.replace;
    var reName = new RegExp('^[' + whiteSpace_1.default + ']*(?:function|class)[' + whiteSpace_1.default + ']*\\*?[' + whiteSpace_1.default + ']+([\\w\\$]+)[' + whiteSpace_1.default + ']*', 'i');
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
    if (!isFn_1.default(fn)) {
        return null;
    }
    if (fn.__predToString) {
        return fn.__predToString();
    }
    return _getFnName ? _getFnName(fn) : fn.name;
}
exports.default = getFunctionName;

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", { value: true });
var Clause_1 = __webpack_require__(1);
var instanceOf_1 = __webpack_require__(21);
var isClause = instanceOf_1.default(Clause_1.default);
exports.default = isClause;

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", { value: true });
var Clause_1 = __webpack_require__(1);
var isClause_1 = __webpack_require__(4);
var isPred_1 = __webpack_require__(11);
var clauseFromAlts_1 = __webpack_require__(6);
var isProblem_1 = __webpack_require__(0);
var isClauseName_1 = __webpack_require__(41);
var namedFn_1 = __webpack_require__(16);
var isClauseRef_1 = __webpack_require__(15);
var isDelayedClause_1 = __webpack_require__(25);
var constants_1 = __webpack_require__(47);
var coerceIntoClause_1 = __webpack_require__(9);
var fclause_1 = __webpack_require__(30);
exports.fclause = fclause_1.default;
var walk_1 = __webpack_require__(17);
var isObj_1 = __webpack_require__(23);
var isStr_1 = __webpack_require__(7);
var oneOf_1 = __webpack_require__(38);
var isPlainObj_1 = __webpack_require__(37);
var clauseClause = coerceIntoClause_1.default(isClause_1.default);
var nameClause = coerceIntoClause_1.default(isClauseName_1.default);
var catOp = genMultiArgOp(constants_1.default.CAT);
var orOp = genMultiArgOp(constants_1.default.OR);
var zeroOrMoreOp = genSingleArgOp(constants_1.default.Z_OR_M);
var oneOrMoreOp = genSingleArgOp(constants_1.default.O_OR_M);
var zeroOrOneOp = genSingleArgOp(constants_1.default.Z_OR_O);
var collOfOp = genSingleArgOp(constants_1.default.COLL_OF);
exports.ClauseClause = coerceIntoClause_1.default(isClause_1.default);
exports.ClauseRefClause = coerceIntoClause_1.default(isClauseRef_1.default);
exports.DelayedClauseClause = coerceIntoClause_1.default(isDelayedClause_1.default);
exports.PredClause = coerceIntoClause_1.default(isPred_1.default);
// helper method for constructing labelled structure
function _labelled() {
    var arr = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        arr[_i] = arguments[_i];
    }
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
    var arr = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        arr[_i] = arguments[_i];
    }
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
exports.ExprClause = orOp(_labelled(['clause', 'clause', exports.ClauseClause], ['pred', 'clause', exports.PredClause]));
exports.NameExprOptionalComment = catOp(_labelled(['name', 'clause', nameClause], ['comment', 'clause', zeroOrOneOp({ expr: { pred: isStr_1.default } })], ['expr', 'clause', exports.ExprClause]));
exports.MultipleArgClause = catOp(_labelled(['expressions', 'clause', orOp(_labelled(['withLabels', 'clause', orOp(_unlabelled(['clause', zeroOrMoreOp({
    expr: { clause: exports.NameExprOptionalComment }
})], ['clause', collOfOp({
    expr: { clause: exports.NameExprOptionalComment }
})]))], ['withoutLabels', 'clause', zeroOrMoreOp({
    expr: { clause: exports.ExprClause }
})]))], ['options', 'clause', zeroOrOneOp({
    expr: { pred: isPlainObj_1.default }
})]));
function andOp(exprs) {
    var andS = new Clause_1.default({
        type: 'AND',
        exprs: [],
        opts: { conformedExprs: exprs },
        conformFn: function andConform(x) {
            return walk_1.default(andS, x, { conform: true });
        },
        generateFn: null
    });
    return andS;
}
var multipleArgNoDupeClause = andOp([{ clause: exports.MultipleArgClause }, { pred: noDupelicateLabels }]);
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
exports.AndFnClause = fclause_1.default({
    args: oneOrMoreOp({ expr: { clause: exports.ExprClause }
    }),
    ret: isClause_1.default
});
var multipleArgOpClause = {
    args: multipleArgNoDupeClause,
    ret: clauseClause
};
var singleArgOpClauseFn = function singleArgOpClauseFn(optClauseAlts) {
    return {
        args: catOp(_labelled(['expr', 'clause', exports.ExprClause], ['opts', 'clause', zeroOrOneOp({ expr: optClauseAlts })])),
        ret: clauseClause
    };
};
function genMultiArgOp(type) {
    return namedFn_1.default(type, function _(_a) {
        var _b = _a.expressions,
            withLabels = _b.withLabels,
            withoutLabels = _b.withoutLabels,
            options = _a.options;
        var exprs;
        if (withLabels) {
            exprs = withLabels;
            var coercedExprs = exprs.map(function (p) {
                var alts = p.expr;
                var s = clauseFromAlts_1.default(alts);
                return Object.assign({}, p, {
                    expr: s,
                    clause: undefined, pred: undefined,
                    clauseRef: undefined, delayedClause: undefined
                });
            });
            var opts = Object.assign({}, options, {
                named: true
            });
            var s = new Clause_1.default({
                type: type,
                exprs: coercedExprs,
                opts: opts,
                conformFn: function conform(x) {
                    return walk_1.default(s, x, { conform: true });
                },
                generateFn: null
            });
            return s;
        } else if (withoutLabels) {
            exprs = withoutLabels;
            coercedExprs = exprs.map(function (p) {
                var s;
                if (p.clause) {
                    s = p.clause;
                    return Object.assign({}, p, { expr: s, clause: undefined });
                } else if (p.pred) {
                    s = coerceIntoClause_1.default(p.pred);
                    return Object.assign({}, p, { expr: s, pred: undefined });
                } else if (p.clauseRef) {
                    s = p.clauseRef;
                    return Object.assign({}, p, { expr: s, clauseRef: undefined });
                } else if (p.delayedClause) {
                    s = p.delayedClause;
                    return Object.assign({}, p, { expr: s, delayedClause: undefined });
                } else {
                    console.error(p);
                    throw '!';
                }
            });
            var opts = Object.assign({}, options, {
                named: false
            });
            s = new Clause_1.default({
                type: type,
                exprs: coercedExprs,
                opts: opts,
                conformFn: function conform(x) {
                    return walk_1.default(s, x, { conform: true });
                },
                generateFn: null
            });
            return s;
        } else {
            // empty case
            s = new Clause_1.default({
                type: type,
                exprs: [],
                opts: {},
                conformFn: function conform(x) {
                    return walk_1.default(s, x, { conform: true });
                },
                generateFn: null
            });
            return s;
        }
    });
}
function genSingleArgOp(type) {
    return namedFn_1.default(type, function _(conformedArgs) {
        var p = conformedArgs.expr;
        var opts = conformedArgs.opts;
        var expr;
        if (p.clause) {
            expr = p.clause;
        } else if (p.pred) {
            expr = coerceIntoClause_1.default(p.pred);
        } else if (p.clauseRef) {
            expr = p.clauseRef;
        } else if (p.delayedClause) {
            expr = p.delayedClause;
        } else {
            console.error(p);
            throw 'internal err';
        }
        var sureClause = coerceIntoClause_1.default(expr);
        var s = new Clause_1.default({
            type: type,
            exprs: [sureClause],
            opts: Object.assign({}, opts, { enclosedClause: sureClause }),
            conformFn: null,
            generateFn: null
        });
        s.conform = function conform(x) {
            return walk_1.default(s, x, { conform: true });
        };
        return s;
    });
}
function isPropName(x) {
    return isStr_1.default(x);
}
var TYPE_SHAPE = 'SHAPE';
var TYPE_MAP_OF = 'MAP_OF';
var FieldDefs = mapOfOp({
    keyExpression: {
        clause: coerceIntoClause_1.default(isStr_1.default)
    },
    valExpression: {
        clause: orOp(_labelled(['valExpressionOnly', 'clause', exports.ExprClause], ['keyValExprPair', 'clause', catOp(_labelled(['keyExpression', 'clause', exports.ExprClause], ['valExpression', 'clause', exports.ExprClause]))]))
    }
});
var KeyOnlyArray = zeroOrMoreOp({
    expr: { pred: isPropName }
});
var KeyArrayOrFieldDefs = orOp(_labelled(['keyList', 'clause', KeyOnlyArray], ['fieldDefs', 'clause', FieldDefs]));
exports.ShapeArgs = shapeOp({
    shapeArgs: {
        optionalFields: {
            opt: {
                fieldDefs: {
                    'requiredFields': {
                        keyValExprPair: {
                            keyExpression: {
                                pred: oneOf_1.default('req', 'required')
                            },
                            valExpression: {
                                clause: KeyArrayOrFieldDefs
                            }
                        }
                    },
                    'optionalFields': {
                        keyValExprPair: {
                            keyExpression: {
                                pred: oneOf_1.default('opt', 'optional')
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
exports.MapOfFnClause = fclause_1.default({
    args: catOp(_labelled(['keyExpression', 'clause', exports.ExprClause], ['valExpression', 'clause', exports.ExprClause])),
    ret: isClause_1.default
});
exports.TestClause = shapeOp({
    shapeArgs: {
        optionalFields: {
            opt: {
                fieldDefs: {
                    'requiredFields': {
                        keyValExprPair: {
                            keyExpression: {
                                pred: oneOf_1.default('req', 'required')
                            },
                            valExpression: {
                                clause: KeyArrayOrFieldDefs
                            }
                        }
                    },
                    'optionalFields': {
                        keyValExprPair: {
                            keyExpression: {
                                pred: oneOf_1.default('opt', 'optional')
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
exports.ShapeFnClause = fclause_1.default({
    args: catOp(_labelled(['shapeArgs', 'clause', exports.ShapeArgs])),
    ret: isClause_1.default
});
function mapOfOp(cargs) {
    if (isProblem_1.default(cargs)) {
        throw cargs;
    }
    var keyExpression = cargs.keyExpression,
        valExpression = cargs.valExpression;
    var s = new Clause_1.default({
        type: TYPE_MAP_OF,
        exprs: [],
        opts: { keyExpression: keyExpression, valExpression: valExpression },
        conformFn: function mapOfConform(x) {
            return walk_1.default(s, x, { conform: true });
        },
        generateFn: null
    });
    return s;
}
function shapeOp(cargs) {
    if (isProblem_1.default(cargs)) {
        throw cargs;
    }
    // const { shapeArgs: { requiredFields, optionalFields } } = cargs;
    var s = new Clause_1.default({
        type: TYPE_SHAPE,
        exprs: [],
        opts: { conformedArgs: cargs },
        conformFn: function shapeConform(x) {
            return walk_1.default(s, x, { conform: true });
        },
        generateFn: null
    });
    return s;
}
exports.shape = exports.ShapeFnClause.instrumentConformed(shapeOp);
exports.keys = exports.shape;
exports.mapOf = exports.MapOfFnClause.instrumentConformed(mapOfOp);
exports.CollOfClause = fclause_1.default(singleArgOpClauseFn({ pred: isObj_1.default }));
exports.collOf = exports.CollOfClause.instrumentConformed(collOfOp);
exports.CatFnClause = fclause_1.default(multipleArgOpClause);
exports.OrFnClause = fclause_1.default(multipleArgOpClause);
exports.ZeroOrMoreFnClause = fclause_1.default(singleArgOpClauseFn({ pred: isObj_1.default }));
exports.OneOrMoreFnClause = fclause_1.default(singleArgOpClauseFn({ pred: isObj_1.default }));
exports.ZeroOrOneFnClause = fclause_1.default(singleArgOpClauseFn({ pred: isObj_1.default }));
exports.and = exports.AndFnClause.instrumentConformed(andOp);
exports.cat = exports.CatFnClause.instrumentConformed(catOp);
exports.or = exports.OrFnClause.instrumentConformed(orOp);
exports.zeroOrMore = exports.ZeroOrMoreFnClause.instrumentConformed(zeroOrMoreOp);
exports.oneOrMore = exports.OneOrMoreFnClause.instrumentConformed(oneOrMoreOp);
exports.zeroOrOne = exports.ZeroOrOneFnClause.instrumentConformed(zeroOrOneOp);
var core = {
    cat: exports.cat, or: exports.or, zeroOrMore: exports.zeroOrMore, oneOrMore: exports.oneOrMore, zeroOrOne: exports.zeroOrOne,
    ExprClause: exports.ExprClause, ClauseClause: exports.ClauseClause, PredClause: exports.PredClause, DelayedClauseClause: exports.DelayedClauseClause, ClauseRefClause: exports.ClauseRefClause,
    CatFnClause: exports.CatFnClause,
    AndFnClause: exports.AndFnClause,
    OrFnClause: exports.OrFnClause,
    ZeroOrMoreFnClause: exports.ZeroOrMoreFnClause, OneOrMoreFnClause: exports.OneOrMoreFnClause, ZeroOrOneFnClause: exports.ZeroOrOneFnClause,
    CollOfClause: exports.CollOfClause,
    collOf: exports.collOf,
    and: exports.and,
    shape: exports.shape,
    keys: exports.shape,
    mapOf: exports.mapOf,
    ShapeFnClause: exports.ShapeFnClause,
    MapOfFnClause: exports.MapOfFnClause
};
core['alt'] = core.or;
core['*'] = core.zeroOrMore;
core['+'] = core.oneOrMore;
core['?'] = core.zeroOrOne;
exports.default = core;
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

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", { value: true });
var coerceIntoClause_1 = __webpack_require__(9);
function clauseFromAlts(alts) {
    if (!alts) {
        console.error(alts);
        throw '!';
    }
    if (alts.clause) {
        return alts.clause;
    } else if (alts.pred) {
        return coerceIntoClause_1.default(alts.pred);
    } else {
        console.error('unsupported:', alts);
        throw 'Not implemented';
    }
}
exports.default = clauseFromAlts;

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", { value: true });
function isString(x) {
    return x !== null && x !== undefined && x.constructor === String;
}
exports.default = isString;

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

"use strict";


function __export(m) {
    for (var p in m) {
        if (!exports.hasOwnProperty(p)) exports[p] = m[p];
    }
}
Object.defineProperty(exports, "__esModule", { value: true });
var regex_1 = __webpack_require__(5);
var regex_2 = __webpack_require__(5);
exports.shape = regex_2.shape;
exports.keys = regex_2.keys;
exports.mapOf = regex_2.mapOf;
exports.fclause = regex_2.fclause;
exports.fspec = regex_2.fclause;
var nullable_1 = __webpack_require__(53);
exports.nullable = nullable_1.default;
var undefinable_1 = __webpack_require__(54);
exports.undefinable = undefinable_1.default;
var maybe_1 = __webpack_require__(48);
exports.maybe = maybe_1.default;
var wall_1 = __webpack_require__(45);
exports.wall = wall_1.default;
exports.clause = wall_1.default;
var equals_1 = __webpack_require__(33);
var any_1 = __webpack_require__(46);
exports.any = any_1.default;
var cstr = function cstr(str) {
    return regex_2.cat.apply(null, Array.prototype.slice.call(str).map(equals_1.default));
};
exports.cstr = cstr;
var other = {
    any: any_1.default,
    fclause: regex_2.fclause,
    wall: wall_1.default, clause: wall_1.default,
    nullable: nullable_1.default, undefinable: undefinable_1.default, maybe: maybe_1.default,
    cstr: cstr
};
__export(__webpack_require__(5));
var r = Object.assign({}, regex_1.default, {
    shape: regex_2.shape, keys: regex_2.keys, mapOf: regex_2.mapOf,
    fspec: regex_2.fclause
}, other);
exports.default = r;

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", { value: true });
var isPred_1 = __webpack_require__(11);
var isClause_1 = __webpack_require__(4);
var isClauseRef_1 = __webpack_require__(15);
var isDelayedClause_1 = __webpack_require__(25);
var Clause_1 = __webpack_require__(1);
var Problem_1 = __webpack_require__(2);
var fnName_1 = __webpack_require__(3);
var stringifyWithFnName_1 = __webpack_require__(19);
var CLAUSE_TYPE_PRED = "PRED";
function coerceIntoClause(expr) {
    if (isClause_1.default(expr) || isClauseRef_1.default(expr) || isDelayedClause_1.default(expr)) {
        return expr;
    } else if (isPred_1.default(expr)) {
        return _wrap(expr);
    } else {
        console.error(expr);
        throw new Error("'Expression must either be a Clause object or a predication function that returns true or false. Given value: " + stringifyWithFnName_1.default(expr) + "'");
    }
}
exports.default = coerceIntoClause;
function _wrap(pred) {
    return new Clause_1.default({
        type: CLAUSE_TYPE_PRED,
        exprs: [pred],
        opts: {
            predicate: pred
        },
        conformFn: predConformer(pred),
        generateFn: null
    });
}
function predConformer(pred) {
    return function conformPred(x) {
        if (pred(x)) {
            return x;
        } else {
            return new Problem_1.default(x, pred, [], "Predicate " + fnName_1.default(pred) + " returns false");
        }
    };
}

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", { value: true });
var sExpression_1 = __webpack_require__(27);
exports.sExpression = sExpression_1.default;
var describe_1 = __webpack_require__(29);
exports.describe = describe_1.default;
var conform_1 = __webpack_require__(24);
exports.conform = conform_1.default;
var isValid_1 = __webpack_require__(67);
exports.isValid = isValid_1.default;
var isNamespacePath_1 = __webpack_require__(66);
exports.isNamespacePath = isNamespacePath_1.default;
var identity_1 = __webpack_require__(40);
exports.identity = identity_1.default;
var isProblem_1 = __webpack_require__(0);
exports.isProblem = isProblem_1.default;
var enforce_1 = __webpack_require__(62);
exports.enforce = enforce_1.default;
var isClause_1 = __webpack_require__(4);
exports.isClause = isClause_1.default;
var isFclause_1 = __webpack_require__(65);
exports.isFclause = isFclause_1.default;
var isClauseRef_1 = __webpack_require__(15);
exports.isClauseRef = isClauseRef_1.default;
var deref_1 = __webpack_require__(28);
exports.deref = deref_1.default;
var isClauseName_1 = __webpack_require__(41);
exports.isClauseName = isClauseName_1.default;
var match_1 = __webpack_require__(18);
exports.match = match_1.default;
var delayed_1 = __webpack_require__(39);
exports.delayed = delayed_1.default;

/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", { value: true });
var isFn_1 = __webpack_require__(13);
function isPred(x) {
    return isFn_1.default(x);
}
exports.default = isPred;

/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", { value: true });
var isNum_1 = __webpack_require__(36);
exports.isNum = isNum_1.default;
exports.isNumber = isNum_1.default;
var isNatInt_1 = __webpack_require__(57);
exports.isNatInt = isNatInt_1.default;
exports.isNaturalNumber = isNatInt_1.default;
var isInt_1 = __webpack_require__(35);
exports.isInt = isInt_1.default;
exports.isInteger = isInt_1.default;
var isBool_1 = __webpack_require__(34);
exports.isBool = isBool_1.default;
exports.isBoolean = isBool_1.default;
var isFn_1 = __webpack_require__(13);
exports.isFn = isFn_1.default;
exports.isFunction = isFn_1.default;
var isObj_1 = __webpack_require__(23);
exports.isObj = isObj_1.default;
exports.isObject = isObj_1.default;
var isPlainObj_1 = __webpack_require__(37);
exports.isPlainObj = isPlainObj_1.default;
exports.isPlainObject = isPlainObj_1.default;
var equals_1 = __webpack_require__(33);
exports.equals = equals_1.default;
exports.equal = equals_1.default;
exports.equalsTo = equals_1.default;
exports.eq = equals_1.default;
var oneOf_1 = __webpack_require__(38);
exports.oneOf = oneOf_1.default;
var isStr_1 = __webpack_require__(7);
exports.isStr = isStr_1.default;
exports.isString = isStr_1.default;
var isDate_1 = __webpack_require__(56);
exports.isDate = isDate_1.default;
var not_1 = __webpack_require__(59);
exports.not = not_1.default;
var instanceOf_1 = __webpack_require__(21);
exports.instanceOf = instanceOf_1.default;
var isUuid_1 = __webpack_require__(58);
exports.isUuid = isUuid_1.default;
exports.isUUID = isUuid_1.default;
var isNull_1 = __webpack_require__(22);
exports.isNull = isNull_1.default;
var isUndefined_1 = __webpack_require__(14);
exports.isUndefined = isUndefined_1.default;
var notEmpty_1 = __webpack_require__(60);
exports.notEmpty = notEmpty_1.default;
var isArray = Array.isArray;
exports.isArray = isArray;
exports.isArr = isArray;

/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", { value: true });
function isFunction(x) {
    var getType = {};
    // (x || false) guarantees returning of boolean type
    return (x || false) && ['[object Function]', '[object GeneratorFunction]'].indexOf(getType.toString.call(x)) >= 0;
}
exports.default = isFunction;

/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", { value: true });
function isUndefined(x) {
    return x === undefined;
}
exports.default = isUndefined;
;

/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", { value: true });
var ClauseRef_1 = __webpack_require__(31);
// TODO
function isClauseRef(x) {
    return x instanceof ClauseRef_1.default;
}
exports.default = isClauseRef;

/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", { value: true });
function getNamedFn(fnName, fn, suffix) {
    if (fnName) {
        var inner = 'return function ' + fnName + (suffix || '') + '(){ return action.apply(this, arguments); };';
        return new Function('action', inner)(fn);
    } else {
        return fn;
    }
}
exports.default = getNamedFn;

/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", { value: true });
var anyWalker_1 = __webpack_require__(72);
var predWalker_1 = __webpack_require__(79);
var wallWalker_1 = __webpack_require__(81);
var fclauseWalker_1 = __webpack_require__(76);
var shapeWalker_1 = __webpack_require__(80);
var andWalker_1 = __webpack_require__(71);
var collOfWalker_1 = __webpack_require__(74);
var mapOfWalker_1 = __webpack_require__(77);
var clauseRefWalker_1 = __webpack_require__(73);
var delayedClauseWalker_1 = __webpack_require__(75);
var nfaWalker_1 = __webpack_require__(78);
var coerceIntoClause_1 = __webpack_require__(9);
var isProblem_1 = __webpack_require__(0);
function walk(clause, x, opts) {
    var phase = opts.phase;
    var walker = _getWalker(clause);
    if (!phase) {
        // 2-pass algorithm:
        // in Pass 1 we just need to know if x validates to clause, and if so, how
        var intermediate = walker.trailblaze(x, Object.assign({ phase: 'trailblaze' }, opts));
        if (isProblem_1.default(intermediate)) {
            return intermediate;
        } else {
            // in Pass 2 we return conformed and/or instrumented results
            return walker.reconstruct(intermediate, Object.assign({ phase: 'reconstruct' }, opts));
        }
    } else if (walker[phase]) {
        return walker[phase](x, opts);
    } else {
        throw '!';
    }
}
exports.default = walk;
var walkerMap = {
    'OR': nfaWalker_1.default,
    'CAT': nfaWalker_1.default,
    'COLL_OF': collOfWalker_1.default,
    'ANY': anyWalker_1.default,
    'Z_OR_M': nfaWalker_1.default,
    'O_OR_M': nfaWalker_1.default,
    'Z_OR_O': nfaWalker_1.default,
    'PRED': predWalker_1.default,
    'WALL': wallWalker_1.default,
    'SHAPE': shapeWalker_1.default,
    'AND': andWalker_1.default,
    'CLAUSE_REF': clauseRefWalker_1.default,
    'DELAYED': delayedClauseWalker_1.default,
    'FCLAUSE': fclauseWalker_1.default,
    'MAP_OF': mapOfWalker_1.default
};
function _getWalker(expr) {
    var clause = coerceIntoClause_1.default(expr);
    var walker = walkerMap[clause.type];
    if (!walker) {
        throw 'unsupported type ' + clause.type;
    }
    var r = walker(clause, walk);
    return r;
}

/***/ },
/* 18 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/**
 * convenient method used in conjunction with "and" and "or" conformation to handle labelled cases
 *
 */


Object.defineProperty(exports, "__esModule", { value: true });
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
exports.default = match;

/***/ },
/* 19 */
/***/ function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", { value: true });
var isFn_1 = __webpack_require__(13);
var fnName_1 = __webpack_require__(3);
function stringifyWithFnName(subject, currTransform, indent) {
    var newArgs = Array.prototype.slice.call(arguments);
    newArgs[1] = function (key, val) {
        var r;
        if (isFn_1.default(val)) {
            // implicitly `toString` it
            var n = fnName_1.default(val);
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
exports.default = stringifyWithFnName;

/***/ },
/* 20 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {

Object.defineProperty(exports, "__esModule", { value: true });
var ClauseRef_1 = __webpack_require__(31);
var core_1 = __webpack_require__(8);
var isClause_1 = __webpack_require__(4);
var isPred_1 = __webpack_require__(11);
var isBool_1 = __webpack_require__(34);
var walk_1 = __webpack_require__(17);
var resolve_1 = __webpack_require__(42);
var coerceIntoClause_1 = __webpack_require__(9);
var oPath = __webpack_require__(55);
var utils_1 = __webpack_require__(10);
var namespace_types_1 = __webpack_require__(26);
var reg;
var _get = core_1.fclause({
    args: core_1.cat(utils_1.isNamespacePath),
    ret: utils_1.isClauseRef
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
            return Object.assign(nObj['.expr'], nObj['.meta']);
        } else {
            return undefined;
        }
    }
    var sr = new ClauseRef_1.default({ ref: ref, getFn: getFn, conformFn: null });
    sr.conform = function clauseRefConform(x) {
        var ss = getFn();
        return walk_1.default(ss, x, { conform: true });
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
var NameObjClause = core_1.shape({
    req: { '.expr': core_1.or(isClause_1.default, isPred_1.default) }
});
var _set = core_1.fclause({
    args: core_1.cat(utils_1.isNamespacePath, NameObjClause),
    ret: isBool_1.default
}).instrument(function _set(n, nObj) {
    _maybeInitRegistry();
    var existing = oPath.get(reg, _slashToDot(n));
    oPath.set(reg, _slashToDot(n), Object.assign({}, existing, nObj));
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
exports.setMeta = namespace_types_1.SetMetaFnClause.instrumentConformed(function setMeta(_a) {
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
        oPath.set(registry, _slashToDot(namespacePath), Object.assign({}, nObj, { '.meta': Object.assign({}, currMeta, metaObj) }));
    } else if (expression) {
        var clause = coerceIntoClause_1.default(expression);
        clause.meta = Object.assign(clause.meta, metaObj);
    }
});
exports.getMeta = namespace_types_1.GetMetaFnClause.instrumentConformed(function getMeta(_a) {
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
        var clause = coerceIntoClause_1.default(expression);
        return clause.meta;
    }
});
function resolve(expr, reg) {
    if (!reg) {
        return resolve_1.default(expr, exports.getRegistry());
    } else {
        return resolve_1.default(expr, reg);
    }
}
exports.resolve = resolve;
_maybeInitRegistry();
exports.getRegistry = function () {
    return reg;
};
var namespaceGetOrSet = namespace_types_1.NamespaceFnClause.instrumentConformed(function namespaceGetOrSet(_a) {
    var register = _a.register,
        retrieve = _a.retrieve;
    if (register) {
        return setNamespacePath(register);
    } else if (retrieve) {
        return getNamespacePath(retrieve);
    }
});
exports.get = namespace_types_1.GetNSFnClause.instrumentConformed(getNamespacePath);
exports.set = namespace_types_1.SetNSFnClause.instrumentConformed(setNamespacePath);
namespaceGetOrSet.get = exports.get;
namespaceGetOrSet.set = exports.set;
namespaceGetOrSet.clearRegistry = clearRegistry;
namespaceGetOrSet.getRegistry = exports.getRegistry;
namespaceGetOrSet.setMeta = exports.setMeta;
exports.default = namespaceGetOrSet;
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(82)))

/***/ },
/* 21 */
/***/ function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", { value: true });
var fnName_1 = __webpack_require__(3);
var namedFn_1 = __webpack_require__(16);
function instanceOf(t) {
    var n = fnName_1.default(t);
    var _f;
    _f = function instanceOfX(x) {
        return x instanceof t;
    };
    if (n) {
        _f = namedFn_1.default("instanceOf_" + n, _f);
    }
    return _f;
}
exports.default = instanceOf;

/***/ },
/* 22 */
/***/ function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", { value: true });
function isNull(x) {
    return x === null;
}
exports.default = isNull;

/***/ },
/* 23 */
/***/ function(module, exports, __webpack_require__) {

"use strict";


var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

Object.defineProperty(exports, "__esModule", { value: true });
function isObject(x) {
    return (typeof x === "undefined" ? "undefined" : _typeof(x)) === 'object' && x !== null;
}
exports.default = isObject;

/***/ },
/* 24 */
/***/ function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", { value: true });
var isClause_1 = __webpack_require__(4);
function conform(clause, x, options) {
    if (clause && isClause_1.default(clause)) {
        var r = clause.conform(x);
        return r;
    } else {
        throw new Error('Expression needs to be of type Clause. expression: \n' + clause + '\n offending value: ' + x);
    }
}
exports.default = conform;

/***/ },
/* 25 */
/***/ function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", { value: true });
var DelayedClause_1 = __webpack_require__(32);
var instanceOf_1 = __webpack_require__(21);
// TODO
var isDelayedClause = instanceOf_1.default(DelayedClause_1.default);
exports.default = isDelayedClause;

/***/ },
/* 26 */
/***/ function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(8);
var utils_1 = __webpack_require__(10);
exports.isClauseRef = utils_1.isClauseRef;
var utils_2 = __webpack_require__(10);
exports.isNamespacePath = utils_2.isNamespacePath;
var preds_1 = __webpack_require__(12);
var isExpr_1 = __webpack_require__(64);
var ExprOrPartialRefMapClause =
// or(
//  'expression',
utils_1.delayed(function () {
    //TODO
    return core_1.ExprClause;
});
// );
exports.GetArgClause = core_1.cat('nsPath', utils_1.isNamespacePath);
exports.GetNSFnClause = core_1.fclause({
    args: exports.GetArgClause,
    ret: utils_1.isClauseRef
});
exports.SetArgClause = core_1.cat('nsPath', utils_1.isNamespacePath, 'expression', ExprOrPartialRefMapClause);
exports.SetNSFnClause = core_1.fclause({
    args: exports.SetArgClause,
    ret: preds_1.isBool
});
exports.NamespaceArgsCLause = core_1.or('register', exports.SetArgClause, 'retrieve', exports.GetArgClause);
exports.NamespaceFnClause = core_1.fclause({
    args: exports.NamespaceArgsCLause,
    ret: core_1.or(preds_1.isUndefined, utils_1.isClauseRef)
});
exports.SetMetaFnClause = core_1.fclause({
    args: core_1.cat('source', core_1.or('namespacePath', utils_1.isNamespacePath, 'expression', core_1.ExprClause), 'metaObj', preds_1.isObj, 'registry', core_1.zeroOrOne(preds_1.isObj)),
    ret: preds_1.isUndefined
});
exports.GetMetaFnClause = core_1.fclause({
    args: core_1.cat('source', core_1.or('namespacePath', utils_1.isNamespacePath, 'expression', core_1.ExprClause), 'registry', core_1.zeroOrOne(preds_1.isObj)),
    ret: core_1.maybe(preds_1.isObj)
});
exports.ResolveFnClause = core_1.fclause({
    args: core_1.cat('expression', core_1.ExprClause, 'registry', core_1.zeroOrOne(preds_1.isObj)),
    ret: utils_1.isNamespacePath
});
function isNamespaceFragment(x) {
    return !!/^[^.@%\&\*#]+/.test(x);
}
exports.isNamespaceFragment = isNamespaceFragment;
exports.NamespaceObjClause = core_1.shape({
    optional: {
        subNamespaces: [isNamespaceFragment, utils_1.delayed(function () {
            return exports.NamespaceObjClause;
        })],
        '.meta': preds_1.isObj,
        '.expr': isExpr_1.default
    }
});

/***/ },
/* 27 */
/***/ function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", { value: true });
var fnName_1 = __webpack_require__(3);
var clauseFromAlts_1 = __webpack_require__(6);
var core_1 = __webpack_require__(8);
var delayed_1 = __webpack_require__(39);
var match_1 = __webpack_require__(18);
var coerceIntoClause_1 = __webpack_require__(9);
var preds_1 = __webpack_require__(12);
var Recursive = function () {
    function Recursive(expression) {
        this.isRecursive = true;
        this.expression = expression;
    }
    ;
    return Recursive;
}();
exports.Recursive = Recursive;
function QuotedParamsMap(map) {
    Object.assign(this, map);
}
exports.QuotedParamsMap = QuotedParamsMap;
function UnquotedParamsMap(map) {
    Object.assign(this, map);
}
exports.UnquotedParamsMap = UnquotedParamsMap;
function Quoted(val) {
    this.value = val;
}
var ParamLabelClause = core_1.or('str', preds_1.isStr, 'quoted', preds_1.instanceOf(Quoted));
function genClauses(headClause) {
    var paramItemC = core_1.or('sExpression', delayed_1.default(function () {
        return sExprC;
    }), 'quotedParamsMap', delayed_1.default(function () {
        return QuotedParamsMapC;
    }), 'unquotedParamsMap', delayed_1.default(function () {
        return UnquotedParamsMapC;
    }), 'optionsObj', preds_1.isPlainObj, 'recursive', preds_1.instanceOf(Recursive));
    var sExprC = core_1.wall(core_1.cat('head', headClause, 'params', core_1.or('labelled', core_1.zeroOrMore(core_1.cat('label', ParamLabelClause, 'item', delayed_1.default(function () {
        return paramItemC;
    }))), 'unlabelled', core_1.zeroOrMore(core_1.cat('item', delayed_1.default(function () {
        return paramItemC;
    }))))));
    var ParamsMapC = core_1.mapOf(core_1.any, core_1.maybe(core_1.or('keyList', core_1.zeroOrMore(delayed_1.default(function () {
        return ParamLabelClause;
    })), 'singleParam', delayed_1.default(function () {
        return paramItemC;
    }))));
    var QuotedParamsMapC = core_1.and(preds_1.instanceOf(QuotedParamsMap), delayed_1.default(function () {
        return ParamsMapC;
    }));
    var UnquotedParamsMapC = core_1.and(preds_1.instanceOf(UnquotedParamsMap), delayed_1.default(function () {
        return ParamsMapC;
    }));
    return [sExprC, paramItemC];
}
exports.genClauses = genClauses;
exports.SExpressionClause = (_a = genClauses(core_1.ExprClause), _a[0]), exports.ParamItemClause = _a[1];
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
        return conformedExprs.map(clauseFromAlts_1.default).map(function (c) {
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
            _e = _d.opt,
            opt = _e === void 0 ? null : _e,
            _f = _d.optional,
            optional = _f === void 0 ? null : _f,
            _g = _b.requiredFields,
            _h = _g === void 0 ? {} : _g,
            _j = _h.req,
            req = _j === void 0 ? null : _j,
            _k = _h.required,
            required = _k === void 0 ? null : _k;
        return Object.assign(new UnquotedParamsMap(), req || required ? {
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
        return Object.assign(new UnquotedParamsMap(), args ? { args: _createSExpr(repo, args) } : {}, ret ? { ret: _createSExpr(repo, ret) } : {}, fn ? { fn: [fnName_1.default(fn) + "()"] } : {});
    }
};
function _fieldDefToFrags(repo, _a) {
    var fieldDefs = _a.fieldDefs,
        keyList = _a.keyList;
    if (fieldDefs) {
        var r = new QuotedParamsMap();
        for (var key in fieldDefs) {
            if (fieldDefs.hasOwnProperty(key)) {
                var val = match_1.default(fieldDefs[key], {
                    'keyValExprPair': function keyValExprPair(pair) {
                        return _handleKeyValExprPair(repo, pair);
                    },
                    'valExpressionOnly': function valExpressionOnly(expr) {
                        return _createSExpr(repo, clauseFromAlts_1.default(expr));
                    }
                }, function () {
                    throw '!g';
                });
                Object.assign(r, (_b = {}, _b[key] = val, _b));
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
        'key': _createSExpr(repo, clauseFromAlts_1.default(keyExpression)),
        'val': _createSExpr(repo, clauseFromAlts_1.default(valExpression))
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
    var coercedExpr = coerceIntoClause_1.default(expr),
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
var _a;

/***/ },
/* 28 */
/***/ function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", { value: true });
function deref(clause) {
    var result = clause;
    while (result.get) {
        result = result.get();
    }
    return result;
}
exports.default = deref;
;

/***/ },
/* 29 */
/***/ function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", { value: true });
var sExpression_1 = __webpack_require__(27);
var humanReadable_1 = __webpack_require__(63);
exports.humanReadable = humanReadable_1.default;
var isStr_1 = __webpack_require__(7);
var isProblem_1 = __webpack_require__(0);
var match_1 = __webpack_require__(18);
var clauseFromAlts_1 = __webpack_require__(6);
var fnName_1 = __webpack_require__(3);
var stringifyWithFnName_1 = __webpack_require__(19);
var repeat_1 = __webpack_require__(69);
exports.NEW_LINE = function () {};
exports.INDENT_IN = function () {};
exports.INDENT_OUT = function () {};
function describe(expr, replacer, space) {
    var sexpr = sExpression_1.default(expr);
    var cSexpr = sExpression_1.SExpressionClause.conform(sexpr);
    if (isProblem_1.default(cSexpr)) {
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
        return { head: clauseFromAlts_1.default(headAlts), params: params };
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
        return ["" + fnName_1.default(head.opts.predicate)];
    }
    var label = humanReadable_1.default(head);
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
            commaedParamFrags = interpose(paramFrags, [', ', exports.NEW_LINE]);
        } else if (unlabelled) {
            var paramFrags = unlabelled.map(function (_a) {
                var item = _a.item;
                return _fragmentParamAlts(headAltsHandler, item, replacer);
            });
            commaedParamFrags = interpose(paramFrags, [', ', exports.NEW_LINE]);
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
    return [label, '('].concat(commaedParamFrags.length > 1 ? [exports.INDENT_IN, exports.NEW_LINE] : [commaedParamFrags.length === 0 ? '' : ' ']).concat(commaedParamFrags).concat(commaedParamFrags.length > 1 ? [exports.INDENT_OUT, exports.NEW_LINE] : [commaedParamFrags.length === 0 ? '' : ' ']).concat([')']);
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
    return x === exports.NEW_LINE || x === exports.INDENT_IN || x === exports.INDENT_OUT;
}
exports.isSpecial = isSpecial;
function _fragmentParamAlts(headAltsHandler, pAlts, replacer) {
    var r = match_1.default(pAlts, {
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
            return stringifyWithFnName_1.default(o);
        },
        'recursive': function recursive(_a) {
            var expression = _a.expression;
            return ['<recursive>: ', humanReadable_1.default(expression)];
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
    var r = ['{', exports.INDENT_IN, exports.NEW_LINE];
    var body = [];
    for (var label in pObj) {
        if (pObj.hasOwnProperty(label)) {
            var item = [];
            item.push(quote ? "\"" + label + "\": " : "<" + label + ">: ");
            var r1 = match_1.default(pObj[label], {
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
    body = interpose(body, [', ', exports.NEW_LINE]);
    r = r.concat(body).concat([exports.INDENT_OUT, exports.NEW_LINE, '}']);
    return r;
}
function fragsToStr(frags, level, space) {
    var newLevel = level;
    var justNewLine = false;
    return frags.reduce(function (acc, f) {
        if (justNewLine) {
            justNewLine = false;
            acc = acc.concat(repeat_1.default(space * newLevel, ' ').join(''));
        }
        if (isStr_1.default(f)) {
            return acc.concat(f);
        } else if (Array.isArray(f)) {
            return acc.concat(fragsToStr(f, newLevel, space));
        } else if (f === exports.NEW_LINE) {
            if (space > 0) {
                justNewLine = true;
                return acc.concat('\n');
            }
        } else if (f === exports.INDENT_IN) {
            newLevel += 1;
        } else if (f === exports.INDENT_OUT) {
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
/* 30 */
/***/ function(module, exports, __webpack_require__) {

"use strict";


var __extends = undefined && undefined.__extends || function () {
    var extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function (d, b) {
        d.__proto__ = b;
    } || function (d, b) {
        for (var p in b) {
            if (b.hasOwnProperty(p)) d[p] = b[p];
        }
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() {
            this.constructor = d;
        }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
}();
Object.defineProperty(exports, "__esModule", { value: true });
var Clause_1 = __webpack_require__(1);
var walk_1 = __webpack_require__(17);
var FClause = function (_super) {
    __extends(FClause, _super);
    function FClause(fnClause) {
        var _this = this;
        var args = fnClause.args,
            ret = fnClause.ret,
            fn = fnClause.fn;
        _this = _super.call(this, {
            type: 'FCLAUSE',
            exprs: [],
            opts: fnClause,
            conformFn: null,
            generateFn: null
        }) || this;
        _this.instrumentConformed = function instrumentConformed(fn) {
            return walk_1.default(this, fn, { conform: true, instrument: true });
        };
        _this.instrument = function instrument(fn) {
            return walk_1.default(this, fn, { conform: false, instrument: true });
        };
        return _this;
    }
    ;
    return FClause;
}(Clause_1.default);
function fclause(fnClause) {
    return new FClause(fnClause);
}
exports.default = fclause;

/***/ },
/* 31 */
/***/ function(module, exports, __webpack_require__) {

"use strict";


var __extends = undefined && undefined.__extends || function () {
    var extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function (d, b) {
        d.__proto__ = b;
    } || function (d, b) {
        for (var p in b) {
            if (b.hasOwnProperty(p)) d[p] = b[p];
        }
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() {
            this.constructor = d;
        }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
}();
Object.defineProperty(exports, "__esModule", { value: true });
var Clause_1 = __webpack_require__(1);
var ClauseRef = function (_super) {
    __extends(ClauseRef, _super);
    function ClauseRef(_a) {
        var ref = _a.ref,
            getFn = _a.getFn,
            conformFn = _a.conformFn;
        var _this = _super.call(this, {
            type: "CLAUSE_REF",
            exprs: [],
            opts: {},
            conformFn: conformFn,
            generateFn: null
        }) || this;
        _this.type = "CLAUSE_REF";
        _this.get = getFn;
        _this.conform = conformFn;
        _this.ref = ref;
        return _this;
    }
    ;
    return ClauseRef;
}(Clause_1.default);
exports.default = ClauseRef;

/***/ },
/* 32 */
/***/ function(module, exports, __webpack_require__) {

"use strict";


var __extends = undefined && undefined.__extends || function () {
    var extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function (d, b) {
        d.__proto__ = b;
    } || function (d, b) {
        for (var p in b) {
            if (b.hasOwnProperty(p)) d[p] = b[p];
        }
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() {
            this.constructor = d;
        }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
}();
Object.defineProperty(exports, "__esModule", { value: true });
var Clause_1 = __webpack_require__(1);
var DelayedClause = function (_super) {
    __extends(DelayedClause, _super);
    function DelayedClause(_a) {
        var getFn = _a.getFn;
        var _this = _super.call(this, {
            type: "DELAYED",
            conformFn: function conformFn(x) {
                var Clause = this.get();
                return Clause.conform(x);
            },
            // TODO: exprs is superfluous. Fix inheritance hierarchy.
            exprs: [],
            opts: {},
            generateFn: null
        }) || this;
        _this.get = getFn;
        return _this;
    }
    return DelayedClause;
}(Clause_1.default);
exports.default = DelayedClause;

/***/ },
/* 33 */
/***/ function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", { value: true });
function equals(test) {
    return function equalsVal(x) {
        return x === test;
    };
}
exports.default = equals;
;

/***/ },
/* 34 */
/***/ function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", { value: true });
function isBool(x) {
    return typeof x === 'boolean';
}
exports.default = isBool;

/***/ },
/* 35 */
/***/ function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", { value: true });
function isInt(x) {
    if (typeof x !== 'number') {
        return false;
    } else {
        return Math.floor(x) === x && x !== Infinity;
    }
}
exports.default = isInt;

/***/ },
/* 36 */
/***/ function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", { value: true });
function isNum(x) {
    return typeof x === 'number';
}
exports.default = isNum;

/***/ },
/* 37 */
/***/ function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", { value: true });
var isObj_1 = __webpack_require__(23);
function isPlainObject(x) {
    // Basic check for Type object that's not null
    if (isObj_1.default(x)) {
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
exports.default = isPlainObject;

/***/ },
/* 38 */
/***/ function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", { value: true });
function oneOf() {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
    }
    var items;
    if (args.length === 1 && Array.isArray(args[0])) {
        items = args[0];
    } else if (args.length > 0) {
        items = Array.prototype.slice.call(args);
    } else {
        throw new Error('Items list is required.');
    }
    var fn;
    fn = function () {
        var _f = function oneOf(x) {
            return items.indexOf(x) >= 0;
        };
        _f.__predToString = function () {
            return Array.from('oneOf(').concat([items.map(JSON.stringify).join(', ')]).concat(')');
        };
        return _f;
    }();
    return fn;
}
exports.default = oneOf;

/***/ },
/* 39 */
/***/ function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", { value: true });
var DelayedClause_1 = __webpack_require__(32);
function delayed(getFn) {
    return new DelayedClause_1.default({ getFn: getFn });
}
exports.default = delayed;

/***/ },
/* 40 */
/***/ function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", { value: true });
function identity(x) {
    return x;
}
exports.default = identity;

/***/ },
/* 41 */
/***/ function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", { value: true });
var isStr_1 = __webpack_require__(7);
//TODO
function isClauseName(x) {
    return isStr_1.default(x);
}
exports.default = isClauseName;

/***/ },
/* 42 */
/***/ function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", { value: true });
var resolvedMaps = [];
var namespace_types_1 = __webpack_require__(26);
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
exports.default = resolve;
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
exports.getDefList = getDefList;
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
                case "subNamespaces":
                    subnamespaces = creg[key];
                    for (var sns in subnamespaces) {
                        if (subnamespaces.hasOwnProperty(sns)) {
                            _walk(currNs, sns, subnamespaces[sns], r);
                        }
                    }
                    break;
                case ".expr":
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

/***/ },
/* 43 */
/***/ function(module, exports, __webpack_require__) {

"use strict";


function __export(m) {
    for (var p in m) {
        if (!exports.hasOwnProperty(p)) exports[p] = m[p];
    }
}
Object.defineProperty(exports, "__esModule", { value: true });
var package_version_1 = __webpack_require__(44);
exports.VERSION = package_version_1.default;
var Problem_1 = __webpack_require__(2);
exports.Problem = Problem_1.default;
var Clause_1 = __webpack_require__(1);
exports.Clause = Clause_1.default;
var namespace_1 = __webpack_require__(20);
exports.resolve = namespace_1.resolve;
__export(__webpack_require__(20));
var core_1 = __webpack_require__(8);
__export(__webpack_require__(8));
var utils = __webpack_require__(10);
__export(__webpack_require__(10));
var predicates = __webpack_require__(12);
__export(__webpack_require__(12));
var models = {
    Problem: Problem_1.default, Clause: Clause_1.default
};
var r = Object.assign(namespace_1.default, { resolve: namespace_1.resolve }, core_1.default, utils, models, predicates);
r.VERSION = package_version_1.default;
exports.default = r;

/***/ },
/* 44 */
/***/ function(module, exports, __webpack_require__) {

"use strict";


module.exports = '0.1.1';

/***/ },
/* 45 */
/***/ function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", { value: true });
var Clause_1 = __webpack_require__(1);
var coerceIntoClause_1 = __webpack_require__(9);
var regex_1 = __webpack_require__(5);
var fclause_1 = __webpack_require__(30);
var walk_1 = __webpack_require__(17);
exports.WallFnClause = fclause_1.default({
    args: regex_1.cat(regex_1.ExprClause),
    ret: regex_1.ExprClause
});
function wallOp(expr) {
    var clause = coerceIntoClause_1.default(expr);
    var wallS = new Clause_1.default({
        type: 'WALL',
        exprs: [clause],
        opts: { enclosedClause: clause },
        conformFn: null,
        generateFn: null
    });
    wallS.conform = function andConform(x) {
        return walk_1.default(wallS, x, { conform: true });
    };
    return wallS;
}
var wall = exports.WallFnClause.instrument(wallOp);
exports.default = wall;

/***/ },
/* 46 */
/***/ function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", { value: true });
var Clause_1 = __webpack_require__(1);
var identity_1 = __webpack_require__(40);
var CLAUSE_TYPE_ANY = 'ANY';
function any() {
    return new Clause_1.default({
        type: CLAUSE_TYPE_ANY,
        exprs: [],
        opts: {},
        conformFn: identity_1.default,
        generateFn: null
    });
}
exports.default = any;

/***/ },
/* 47 */
/***/ function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    CAT: 'CAT',
    OR: 'OR',
    Z_OR_M: 'Z_OR_M',
    Z_OR_O: 'Z_OR_O',
    O_OR_M: 'O_OR_M',
    PRED: 'PRED',
    COLL_OF: 'COLL_OF'
};

/***/ },
/* 48 */
/***/ function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", { value: true });
var regex_1 = __webpack_require__(5);
var isNull_1 = __webpack_require__(22);
var isUndefined_1 = __webpack_require__(14);
function maybe(clause) {
    return regex_1.or(isNull_1.default, isUndefined_1.default, clause);
}
exports.default = maybe;

/***/ },
/* 49 */
/***/ function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", { value: true });
var Clause_1 = __webpack_require__(1);
var deref_1 = __webpack_require__(28);
var fragment_1 = __webpack_require__(50);
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
    clause = deref_1.default(clause);
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
    evalFunctions[fragName] = evalChildThen(fragment_1.default[fragName]);
});
['OR', 'CAT'].forEach(function (fragName) {
    evalFunctions[fragName] = evalChildrenThen(fragment_1.default[fragName]);
});
evalFunctions.PRED = function (x) {
    return fragment_1.default['PRED'](x);
};
function wrapRoot(expr) {
    return new Clause_1.default({
        type: 'ROOT',
        exprs: [expr],
        conformFn: null,
        generateFn: null,
        opts: {}
    });
}
function compile(expr) {
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
}
exports.default = compile;
;

/***/ },
/* 50 */
/***/ function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", { value: true });
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
exports.default = build;

/***/ },
/* 51 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/*eslint func-names: 0*/


Object.defineProperty(exports, "__esModule", { value: true });
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
                        var top_1 = valStack.pop(),
                            acc = void 0;
                        if (top_1 instanceof MaybeEnter) {
                            acc = new Nothing();
                        } else {
                            acc = top_1;
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
exports.default = getMatch;
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
        var gp = new GroupedPiece(Object.assign({}, interim, rightPart));
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

/***/ },
/* 52 */
/***/ function(module, exports, __webpack_require__) {

"use strict";


var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

Object.defineProperty(exports, "__esModule", { value: true });
var isProblem_1 = __webpack_require__(0);
var isStr_1 = __webpack_require__(7);
function simulate(nfa, rawInput, walkFn, walkOpts) {
    var r = {
        matched: false,
        chain: null
    };
    var inputType = typeof rawInput === "undefined" ? "undefined" : _typeof(rawInput);
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
                    var name_1 = m.name,
                        problem = m.problem,
                        position = m.position;
                    r.lastProblem = { name: name_1, problem: problem, position: position };
                } else {
                    frontier.push(m);
                }
            }
        }
    }
    return r;
}
exports.default = simulate;
function _getNextMove(nfa, nextState, current, walkFn, walkOpts) {
    var input = current.input,
        currentOffset = current.offset,
        groupCount = current.groupCount,
        arrayed = current.arrayed;
    var observed = input[currentOffset];
    var transition = nfa.transitions[current.state][nextState];
    if (transition.group === 'in') {
        if (groupCount === 0) {
            if (Array.isArray(input[0]) || isStr_1.default(input[0])) {
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
            if (!isProblem_1.default(validateResult)) {
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

/***/ },
/* 53 */
/***/ function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", { value: true });
var regex_1 = __webpack_require__(5);
var isNull_1 = __webpack_require__(22);
function nullable(clause) {
    return regex_1.or(isNull_1.default, clause);
}
exports.default = nullable;

/***/ },
/* 54 */
/***/ function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", { value: true });
var regex_1 = __webpack_require__(5);
var isUndefined_1 = __webpack_require__(14);
function undefinable(clause) {
    return regex_1.or(isUndefined_1.default, clause);
}
exports.default = undefinable;

/***/ },
/* 55 */
/***/ function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", { value: true });
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
exports.get = get;
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
exports.set = set;
function getKey(key) {
    var intKey = parseInt(key);
    if (intKey.toString() === key) {
        return intKey;
    }
    return key;
}

/***/ },
/* 56 */
/***/ function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", { value: true });
function isDate(date) {
    return date && date instanceof Date && !isNaN(date.valueOf());
}
exports.default = isDate;
;

/***/ },
/* 57 */
/***/ function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", { value: true });
var isInt_1 = __webpack_require__(35);
function isNatInt(x) {
    return isInt_1.default(x) && x >= 0.0;
}
exports.default = isNatInt;

/***/ },
/* 58 */
/***/ function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", { value: true });
function isUuid(x) {
    return !!/^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(x);
}
exports.default = isUuid;

/***/ },
/* 59 */
/***/ function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", { value: true });
var fnName_1 = __webpack_require__(3);
var namedFn_1 = __webpack_require__(16);
function not(pred) {
    var n = fnName_1.default(pred);
    var negated = function negated(x) {
        return !pred(x);
    };
    if (n) {
        return namedFn_1.default("not_" + n, negated);
    } else {
        return negated;
    }
}
exports.default = not;

/***/ },
/* 60 */
/***/ function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", { value: true });
function notEmpty(x) {
    if (!x) {
        return false;
    } else if (x.length === 0) {
        return false;
    } else {
        return true;
    }
}
exports.default = notEmpty;

/***/ },
/* 61 */
/***/ function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", { value: true });
function betterThrow(problem) {
    // console.log( '----------------------' );
    // console.error( problem.message, problem );
    // console.log( '----------------------' );
    throw problem;
}
exports.default = betterThrow;

/***/ },
/* 62 */
/***/ function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", { value: true });
var isProblem_1 = __webpack_require__(0);
// TODO : replace with checkProblem
var conform_1 = __webpack_require__(24);
function enforce(clause, x) {
    var r = conform_1.default(clause, x);
    if (isProblem_1.default(r)) {
        throw r;
    }
    return undefined;
}
exports.default = enforce;
;

/***/ },
/* 63 */
/***/ function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", { value: true });
var isStr_1 = __webpack_require__(7);
var dict = {
    Z_OR_M: 'zeroOrMore',
    O_OR_M: 'oneOrMore',
    Z_OR_O: 'zeroOrOne',
    COLL_OF: 'collOf',
    MAP_OF: 'mapOf'
};
function humanReadable(expr) {
    if (isStr_1.default(expr)) {
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
exports.default = humanReadable;

/***/ },
/* 64 */
/***/ function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", { value: true });
var isPred_1 = __webpack_require__(11);
var isClause_1 = __webpack_require__(4);
var isClauseRef_1 = __webpack_require__(15);
var isDelayedClause_1 = __webpack_require__(25);
function isExpr(x) {
    return isPred_1.default(x) || isClause_1.default(x) || isClauseRef_1.default(x) || isDelayedClause_1.default(x);
}
exports.default = isExpr;

/***/ },
/* 65 */
/***/ function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", { value: true });
var isClause_1 = __webpack_require__(4);
function isFclause(x) {
    return isClause_1.default(x) && x.type === 'FCLAUSE';
}
exports.default = isFclause;

/***/ },
/* 66 */
/***/ function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", { value: true });
var isStr_1 = __webpack_require__(7);
function isNamespacePath(x) {
    return isStr_1.default(x) && /^\/?[a-zA-Z0-9\-_\.]*\/([a-zA-Z0-9\-_]+)$/.test(x);
}
exports.default = isNamespacePath;

/***/ },
/* 67 */
/***/ function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", { value: true });
var isProblem_1 = __webpack_require__(0);
var isPred_1 = __webpack_require__(11);
var isClause_1 = __webpack_require__(4);
var conform_1 = __webpack_require__(24);
function isValid(expr, x) {
    if (!expr) {
        throw new Error('Clause is required');
    } else if (isClause_1.default(expr)) {
        return !isProblem_1.default(conform_1.default(expr, x));
    } else if (isPred_1.default(expr)) {
        return expr(x);
    } else {
        return true;
    }
}
exports.default = isValid;

/***/ },
/* 68 */
/***/ function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", { value: true });
function lazyDefine(obj, prop, fn) {
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
}
exports.default = lazyDefine;

/***/ },
/* 69 */
/***/ function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", { value: true });
function repeat(n, x) {
    var arr = [],
        i;
    for (i = 0; i < n; i++) {
        arr.push(x);
    }
    return arr;
}
exports.default = repeat;

/***/ },
/* 70 */
/***/ function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", { value: true });
var whiteSpaces = [0x0009, 0x000a, 0x000b, 0x000c, 0x000d, 0x0020,
//0x0085, // Next line - Not ES5 whitespace
0x00a0, 0x1680, 0x180e, 0x2000, 0x2001, 0x2002, 0x2003, 0x2004, 0x2005, 0x2006, 0x2007, 0x2008, 0x2009, 0x200a,
//0x200b, // Zero width space - Not ES5 whitespace
0x2028, 0x2029, 0x202f, 0x205f, 0x3000, 0xfeff // Byte Order Mark
];
exports.default = whiteSpaces.reduce(function (acc, item) {
    return acc + String.fromCharCode(item);
}, '');

/***/ },
/* 71 */
/***/ function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", { value: true });
var Problem_1 = __webpack_require__(2);
var isProblem_1 = __webpack_require__(0);
var clauseFromAlts_1 = __webpack_require__(6);
function andWalker(clause, walkFn) {
    var exprs = clause.opts.conformedExprs.map(clauseFromAlts_1.default);
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
            if (isProblem_1.default(r)) {
                problems.push(r);
                break;
            } else {
                var conformedR = walkFn(exprs[i], r, Object.assign({}, walkOpts, { phase: 'reconstruct' }));
                conforms.push(conformedR);
            }
        }
        if (problems.length === 0) {
            return { conforms: conforms };
        } else {
            return new Problem_1.default(data, exprs, problems, 'One or more expressions failed AND test');
        }
    }
    function andReconstruct(_a) {
        var conforms = _a.conforms;
        //TODO: implement propagated conform. Perhaps as an option propagateConform
        // or as a separate clause construct such as "propagate"
        return conforms[exprs.length - 1];
    }
}
exports.default = andWalker;

/***/ },
/* 72 */
/***/ function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", { value: true });
function anyWalker() {
    return {
        trailblaze: walkThroughAny,
        reconstruct: walkThroughAny
    };
}
exports.default = anyWalker;
function walkThroughAny(x) {
    return x;
}

/***/ },
/* 73 */
/***/ function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", { value: true });
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
exports.default = clauseRefWalker;

/***/ },
/* 74 */
/***/ function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", { value: true });
var Problem_1 = __webpack_require__(2);
var isProblem_1 = __webpack_require__(0);
var isNum_1 = __webpack_require__(36);
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
            return new Problem_1.default(x, clause, [], 'collOf expects an array');
        } else {
            if (opts) {
                var maxCount = opts.maxCount,
                    minCount = opts.minCount;
                if (isNum_1.default(maxCount) && x.length > maxCount) {
                    return new Problem_1.default(x, clause, problems, "collOf: collection size " + x.length + " exceeds maxCount " + maxCount + ".");
                }
                if (isNum_1.default(minCount) && x.length < minCount) {
                    return new Problem_1.default(x, clause, problems, "collOf: collection size " + x.length + " is less than minCount " + minCount + ".");
                }
            }
            for (var i = 0; i < x.length; i += 1) {
                var guide = walkFn(expr, x[i], walkOpts);
                if (isProblem_1.default(guide)) {
                    problems.push(guide);
                    //TODO
                    break;
                } else {
                    guides.push(guide);
                }
            }
            if (problems.length > 0) {
                return new Problem_1.default(x, clause, problems, 'One or more elements failed collOf test');
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
exports.default = collOfWalker;

/***/ },
/* 75 */
/***/ function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", { value: true });
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
exports.default = delayedClauseWalker;

/***/ },
/* 76 */
/***/ function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", { value: true });
var isProblem_1 = __webpack_require__(0);
var Problem_1 = __webpack_require__(2);
var fnName_1 = __webpack_require__(3);
var namedFn_1 = __webpack_require__(16);
var betterThrow_1 = __webpack_require__(61);
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
        var fnName = fnName_1.default(fn);
        var instrumentedFn = getInstrumentedFn(fnName, fn);
        var namedClauseedFn = namedFn_1.default(fnName, instrumentedFn, '__instrumented');
        return namedClauseedFn;
    }
    function instrumentConformed(fn, walkOpts) {
        var fnName = fnName_1.default(fn);
        var argConformedFn = getArgConformedInstrumentedFn(fnName, fn);
        var namedArgConformedFn = namedFn_1.default(fnName, argConformedFn, '__conformed');
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
                var p = new Problem_1.default({ args: conformedArgs, ret: retVal }, clause, [], "Function " + fnName + " failed valiation on argument-return value relation");
                betterThrow_1.default(p);
            }
        }
    }
    function checkArgs(fn, fnName, args) {
        var displayFnName = fnName || '<anonymous>';
        if (argsClause) {
            var instrumentedArgs = walkFn(argsClause, args, { phase: 'trailblaze' });
            if (isProblem_1.default(instrumentedArgs)) {
                var p = new Problem_1.default(args, clause, [instrumentedArgs], "Arguments for function " + displayFnName + "() is not valid");
                betterThrow_1.default(p);
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
            if (isProblem_1.default(instrumentedRetVal)) {
                var p = new Problem_1.default(retVal, clause, [instrumentedRetVal], 'Return value for function ' + displayFnName + '() is not valid');
                betterThrow_1.default(p);
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
            if (isProblem_1.default(conformedArgs)) {
                var p = new Problem_1.default(args, argsClause, [conformedArgs], "Arguments for function " + displayFnName + " is not valid");
                betterThrow_1.default(p);
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
exports.default = fclauseWalker;

/***/ },
/* 77 */
/***/ function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", { value: true });
var clauseFromAlts_1 = __webpack_require__(6);
var isProblem_1 = __webpack_require__(0);
var Problem_1 = __webpack_require__(2);
function mapOfWalker(clause, walkFn) {
    var _a = clause.opts,
        keyExpression = _a.keyExpression,
        valExpression = _a.valExpression;
    var keyClause = keyExpression && clauseFromAlts_1.default(keyExpression);
    var valClause = valExpression && clauseFromAlts_1.default(valExpression);
    return {
        trailblaze: mapOfTrailblaze,
        reconstruct: mapOfReconstruct
    };
    function mapOfTrailblaze(x, walkOpts) {
        var guide = {};
        for (var key in x) {
            if (x.hasOwnProperty(key)) {
                var keyR = walkFn(keyClause, key, walkOpts);
                if (isProblem_1.default(keyR)) {
                    return new Problem_1.default(x, clause, (_a = {}, _a[key] = keyR, _a), "mapOf: key " + key + " failed validation");
                }
                var valR = walkFn(valClause, x[key], walkOpts);
                if (isProblem_1.default(valR)) {
                    return new Problem_1.default(x, clause, (_b = {}, _b[key] = valR, _b), "mapOf: value for key " + key + " failed validation");
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
exports.default = mapOfWalker;

/***/ },
/* 78 */
/***/ function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", { value: true });
var simulate_1 = __webpack_require__(52);
var getMatch_1 = __webpack_require__(51);
var compile_1 = __webpack_require__(49);
var Problem_1 = __webpack_require__(2);
function nfaWalker(clause, walkFn) {
    var nfa;
    return {
        trailblaze: nfaTrailblaze,
        reconstruct: nfaReconstruct
    };
    function nfaTrailblaze(x, walkOpts) {
        if (!nfa) {
            //lazy
            nfa = compile_1.default(clause);
        }
        var _a = simulate_1.default(nfa, x, walkFn, walkOpts),
            chain = _a.chain,
            matched = _a.matched,
            lastProblem = _a.lastProblem;
        if (matched === true) {
            return { chain: chain };
        } else {
            var subproblems = void 0;
            if (lastProblem) {
                var name_1 = lastProblem.name,
                    position = lastProblem.position,
                    problem = lastProblem.problem;
                subproblems = (_b = {}, _b[name_1 ? "\"" + name_1 + "\"" : "<At position " + position + ">"] = problem, _b);
            } else {
                subproblems = [];
            }
            return new Problem_1.default(x, clause, subproblems, 'Clause ' + clause.type + ' did not match value');
        }
        var _b;
    }
    function nfaReconstruct(_a, walkOpts) {
        var chain = _a.chain;
        var result = getMatch_1.default(chain, walkFn, walkOpts);
        return result;
    }
}
exports.default = nfaWalker;

/***/ },
/* 79 */
/***/ function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", { value: true });
var fnName_1 = __webpack_require__(3);
var Problem_1 = __webpack_require__(2);
function predWalker(clause) {
    return {
        trailblaze: predTraiblaze,
        reconstruct: predReconstruct
    };
    function predTraiblaze(x) {
        var predFn = clause.exprs[0];
        if (!predFn(x)) {
            return new Problem_1.default(x, clause, [], 'Predicate ' + fnName_1.default(predFn) + '() returns false');
        } else {
            return x;
        }
    }
    function predReconstruct(x) {
        return x;
    }
}
exports.default = predWalker;

/***/ },
/* 80 */
/***/ function(module, exports, __webpack_require__) {

"use strict";


var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

Object.defineProperty(exports, "__esModule", { value: true });
var isProblem_1 = __webpack_require__(0);
var isUndefined_1 = __webpack_require__(14);
var Problem_1 = __webpack_require__(2);
var clauseFromAlts_1 = __webpack_require__(6);
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
        if (['object', 'function'].indexOf(typeof x === "undefined" ? "undefined" : _typeof(x)) < 0) {
            return new Problem_1.default(x, clause, [], 'Value is not an object');
        }
        if (!keyConformer) {
            // lazy
            keyConformer = _genKeyConformer(reqClauses, optClauses, walkFn, walkOpts);
        }
        var keyConformedR = keyConformer(x);
        if (isProblem_1.default(keyConformedR)) {
            return keyConformedR;
        }
        var problems = [];
        var guide = { val: x, groups: [], singles: [] };
        var reqFieldDefs;
        if (reqClauses) {
            reqFieldDefs = reqClauses.fieldDefs;
        }
        if (reqFieldDefs) {
            processFieldDefs_mut(reqFieldDefs, false);
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
            var newP = new Problem_1.default(x, clause, problemMap, 'At least one property failed validation: ' + failedNames.join(', '));
            return newP;
        } else {
            return guide;
        }
        function processFieldDefs_mut(fieldDefs, optional) {
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
            conformed = Object.assign({}, val);
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
exports.default = shapeWalker;
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
                            if (!isProblem_1.default(rr)) {
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
                        if (isProblem_1.default(rrr)) {
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
                return new Problem_1.default(x, reqClauses, [], 'req: keys required: ' + missingKeys.join(', '));
            }
        }
        return x;
    };
}
function _deleteKeys(subject, keys) {
    for (var i = 0; i < keys.length; i++) {
        delete subject[keys[i]];
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
                if (!isProblem_1.default(keyResult)) {
                    // single string char case, where name = 0 and x = ''
                    if (x === x[k]) {
                        continue keysExamine;
                    }
                    var valGuide = _conformNamedOrExpr(x[k], valExpression, walkFn, walkOpts);
                    if (isProblem_1.default(valGuide)) {
                        //TODO: improve
                        return { problem: valGuide };
                    } else {
                        matchedKeys.push({ key: k, clause: clauseFromAlts_1.default(valExpression), guide: valGuide });
                    }
                }
            }
        }
        return { groupMatch: { name: name, matchedKeys: matchedKeys } };
    } else if (valExpressionOnly) {
        var v = x[name];
        // single string char case, name = 0
        if (!isUndefined_1.default(v) && x[name] !== x) {
            var g = _conformNamedOrExpr(v, valExpressionOnly, walkFn, walkOpts);
            if (isProblem_1.default(g)) {
                return { problem: g };
            } else {
                return { singleMatch: { key: name, clause: clauseFromAlts_1.default(valExpressionOnly), guide: g } };
            }
        } else {
            return { noop: true };
        }
    } else {
        throw '!!';
    }
}
function _conformNamedOrExpr(x, alts, walkFn, walkOpts) {
    var s = clauseFromAlts_1.default(alts);
    var r = walkFn(s, x, walkOpts);
    return r;
}

/***/ },
/* 81 */
/***/ function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", { value: true });
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
exports.default = wallWalker;

/***/ },
/* 82 */
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
/* 83 */,
/* 84 */
/***/ function(module, exports, __webpack_require__) {

"use strict";


var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(8);
var preds_1 = __webpack_require__(12);
var utils_1 = __webpack_require__(10);
var _1 = __webpack_require__(43);
var clauseFromAlts_1 = __webpack_require__(6);
var fnName_1 = __webpack_require__(3);
var stringifyWithFnName_1 = __webpack_require__(19);
var sExpression_1 = __webpack_require__(27);
var describe_1 = __webpack_require__(29);
var match_1 = __webpack_require__(18);
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
var _a = sExpression_1.genClauses(core_1.or('expression', core_1.ExprClause, 'altNode', core_1.and(preds_1.instanceOf(AltHeadNode), _1.default.shape({
    required: {
        clause: _isPivot,
        enclosed: utils_1.delayed(function () {
            return PartialableParamItemClause;
        })
    }
})))),
    PartialableSExprClause = _a[0],
    PartialableParamItemClause = _a[1];
var synopsis = core_1.fclause({
    args: core_1.cat(core_1.ExprClause, core_1.zeroOrOne(preds_1.isInt), core_1.zeroOrOne(core_1.maybe(preds_1.isFn)))
}).instrument(function synopsis(clause, limit, replacer) {
    if (limit === void 0) {
        limit = 20;
    }
    var sExpr = sExpression_1.default(clause);
    var cSExpr = utils_1.conform(sExpression_1.ParamItemClause, sExpr);
    var pivots = _findPivots(cSExpr, replacer);
    var expanded = pivots.reduce(function (cases, pivot) {
        var r = cases.reduce(function (acc, currCase) {
            if (acc.length > limit) {
                return acc;
            } else {
                var cases_1 = _expand(currCase, pivot).cases;
                return acc.concat(cases_1);
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
    var _a = _handler(cNode),
        head = _a.head,
        params = _a.params;
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
        return ["" + fnName_1.default(head.opts.predicate)];
    }
    var nodeLabel = describe_1.humanReadable(head);
    var commaedParamFrags;
    if (head.type === 'FCLAUSE') {
        var _b = params.unlabelled[0].item.unquotedParamsMap,
            _c = _b.args,
            _d = (_c === void 0 ? {} : _c).singleParam,
            args = _d === void 0 ? null : _d,
            _e = _b.ret,
            _f = (_e === void 0 ? {} : _e).singleParam,
            ret = _f === void 0 ? null : _f;
        return [].concat(args ? _fragmentParamAlts(null, args, replacer) : []).concat([' → ']).concat(ret ? _fragmentParamAlts(null, ret, replacer) : ['any']);
    } else if (head.type === 'CAT') {
        var labelled = params.labelled,
            unlabelled = params.unlabelled;
        var commaedParamFrags_1 = [];
        if (labelled) {
            var paramFrags = labelled.reduce(function (acc, _a) {
                var label = _a.label,
                    item = _a.item;
                var lblStr = _processLabel(label);
                return acc.concat([[_fragmentParamAlts(lblStr, item, replacer)]]);
            }, []);
            commaedParamFrags_1 = describe_1.interpose(paramFrags, [', ', describe_1.NEW_LINE]);
        } else if (unlabelled) {
            var paramFrags = unlabelled.map(function (_a) {
                var item = _a.item;
                return _fragmentParamAlts(null, item, replacer);
            });
            commaedParamFrags_1 = describe_1.interpose(paramFrags, [', ', describe_1.NEW_LINE]);
        }
        return result.concat(['( ']).concat(commaedParamFrags_1).concat([' )']);
    } else if (head.type === 'OR') {
        var labelled = params.labelled,
            unlabelled = params.unlabelled;
        var commaedParamFrags_2 = [];
        if (labelled) {
            var paramFrags = labelled.reduce(function (acc, _a) {
                var item = _a.item;
                return acc.concat([[_fragmentParamAlts(null, item, replacer)]]);
            }, []);
            commaedParamFrags_2 = describe_1.interpose(paramFrags, [' | ', describe_1.NEW_LINE]);
        } else if (unlabelled) {
            var paramFrags = unlabelled.map(function (_a) {
                var item = _a.item;
                return _fragmentParamAlts(null, item, replacer);
            });
            commaedParamFrags_2 = describe_1.interpose(paramFrags, [' | ', describe_1.NEW_LINE]);
        }
        return result.concat(['{ ']).concat(commaedParamFrags_2).concat([' }']);
    } else if (head.type === 'Z_OR_M') {
        var item = params.unlabelled[0].item;
        var processed = _fragmentParamAlts(null, item, replacer);
        return ['( '].concat(result).concat([processed, ' )*']);
    } else if (head.type === 'O_OR_M') {
        var item = params.unlabelled[0].item;
        var processed = _fragmentParamAlts(null, item, replacer);
        return ['( '].concat(result).concat([processed, ' )+']);
    } else if (head.type === 'Z_OR_O') {
        var item = params.unlabelled[0].item;
        var processed = _fragmentParamAlts(null, item, replacer);
        return ['( '].concat(result).concat([processed, ' )?']);
    } else if (head.type === 'COLL_OF') {
        var item = params.unlabelled[0].item;
        var processed = _fragmentParamAlts(null, item, replacer);
        return ['[ '].concat(result).concat([processed, ' ]*']);
    } else if (head.type === 'ANY') {
        return result.concat(['any']);
    } else if (head.type === 'SHAPE') {
        var r = params.unlabelled[0].item.unquotedParamsMap;
        var _g = params.unlabelled[0].item.unquotedParamsMap,
            _h = _g.required,
            _j = (_h === void 0 ? { singleParam: {} } : _h).singleParam.quotedParamsMap,
            required = _j === void 0 ? null : _j,
            _k = _g.optional,
            _l = (_k === void 0 ? { singleParam: {} } : _k).singleParam.quotedParamsMap,
            optional = _l === void 0 ? null : _l;
        var items = [];
        if (required) {
            for (var key in required) {
                var r1 = match_1.default(required[key], {
                    'keyList': function keyList(list) {
                        return ['[ '].concat(describe_1.interpose(list.map(function (i) {
                            return "\"" + i + "\"";
                        }), [', '])).concat(' ]');
                    },
                    'singleParam': function singleParam(p) {
                        return _fragmentParamAlts(null, p, replacer);
                    }
                }, function () {
                    throw '!e';
                });
                if (r1) {
                    items = items.concat([[key + "*: ", r1]]);
                }
            }
        }
        if (optional) {
            for (var key in optional) {
                var r1 = match_1.default(optional[key], {
                    'keyList': function keyList(list) {
                        return ['[ '].concat(describe_1.interpose(list.map(function (i) {
                            return "\"" + i + "\"";
                        }), [', '])).concat(' ]');
                    },
                    'singleParam': function singleParam(p) {
                        return _fragmentParamAlts(null, p, replacer);
                    }
                }, function () {
                    throw '!e';
                });
                if (r1) {
                    items = items.concat([[key + "?: ", r1]]);
                }
            }
        }
        var commaSepartedItems = describe_1.interpose(items, [', ']);
        return result.concat(['{ ']).concat(commaSepartedItems).concat([' }']);
    } else if (head.type === 'AND') {
        // TODO: just a temporary hack that takes the first expression
        // need more design decisions
        return _fragmentParamAlts(label, params.unlabelled[0].item, replacer);
    } else if (head.type === 'MAP_OF') {
        var _m = params.unlabelled[0].item.unquotedParamsMap,
            keyExprAlts = _m.key.singleParam,
            valExprAlts = _m.val.singleParam;
        var items = [].concat(_fragmentParamAlts(null, keyExprAlts, replacer)).concat([', ']).concat(_fragmentParamAlts(null, valExprAlts, replacer));
        return result.concat(['< ']).concat(items).concat([' >']);
    } else {
        console.error(head);
        throw 'not supported';
    }
}
function _processLabel(_a) {
    var str = _a.str,
        quoted = _a.quoted;
    if (str) {
        return str;
    } else if (quoted) {
        return quoted.value;
    }
}
function _fragmentParamAlts(label, pAlts, replacer) {
    var r = match_1.default(pAlts, {
        'label': _processLabel,
        'sExpression': function sExpression(expr) {
            return _strFragments(label, expr, replacer);
        },
        'quotedParamsMap': function quotedParamsMap(o) {
            return _fragmentParamsObj(o, replacer);
        },
        'unquotedParamsMap': function unquotedParamsMap(o) {
            return _fragmentParamsObj(o, replacer);
        },
        'optionsObj': function optionsObj(o) {
            return stringifyWithFnName_1.default(o);
        },
        'recursive': function recursive(_a) {
            var expression = _a.expression;
            return ['<recursive>: ', describe_1.humanReadable(expression)];
        }
    }, function (e) {
        console.error(e);
        throw '!s';
    });
    return r;
}
function _fragmentParamsObj(pObj, replacer) {
    var r = ['< ', describe_1.INDENT_IN, describe_1.NEW_LINE];
    var body = [];
    var keyExprAlts = pObj.key,
        valExprAlts = pObj.val;
    var keyR = match_1.default(keyExprAlts, {
        'keyList': function keyList(list) {
            return ['[ '].concat(describe_1.interpose(list.map(function (i) {
                return "\"" + i + "\"";
            }), [', '])).concat(' ]');
        },
        'singleParam': function singleParam(p) {
            return _fragmentParamAlts(null, p, replacer);
        }
    }, function () {
        throw '!e';
    });
    var valR = match_1.default(valExprAlts, {
        'keyList': function keyList(list) {
            return ['[ '].concat(describe_1.interpose(list.map(function (i) {
                return "\"" + i + "\"";
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
    body = describe_1.interpose(body, [', ', describe_1.NEW_LINE]);
    r = r.concat(body).concat([describe_1.INDENT_OUT, describe_1.NEW_LINE, ' >']);
    return r;
}
function _describeCase(c, replacer) {
    var cc = utils_1.conform(PartialableSExprClause, c);
    if (_1.default.isProblem(cc)) {
        throw '!!';
    }
    var fragments = _strFragments(null, cc, replacer);
    var r = describe_1.fragsToStr(fragments, 0, 0);
    return r;
}
function _handler(alts) {
    var headAlts = alts.head,
        params = alts.params;
    return match_1.default(headAlts, {
        'expression': function expression(e) {
            return { head: clauseFromAlts_1.default(e), params: params };
        },
        'altNode': function altNode(_a) {
            var enclosed = _a.enclosed;
            return match_1.default(enclosed, {
                'sExpression': _handler
            }, function () {});
        }
    }, function () {
        throw '3';
    });
}
function _expand(currCase, pivot) {
    if (_1.default.conform(PartialableSExprClause, currCase).sExpression) {
        var head = currCase[0],
            params = currCase.slice(1);
        if (head === pivot) {
            var altCases = _makeAlts(head, params);
            return { found: true, cases: altCases };
        } else {
            var _loop_1 = function _loop_1(i) {
                var _a = _expand(params[i], pivot),
                    found = _a.found,
                    cases = _a.cases;
                if (found) {
                    return { value: {
                            found: found,
                            cases: cases.map(function (c) {
                                return _makeAltCase(c, currCase, i);
                            })
                        } };
                }
            };
            for (var i = 0; i < params.length; i += 1) {
                var state_1 = _loop_1(i);
                if ((typeof state_1 === "undefined" ? "undefined" : _typeof(state_1)) === "object") return state_1.value;
            }
        }
    }
    if (currCase[0] instanceof AltHeadNode) {
        var _a = currCase[0],
            enclosed_1 = _a.enclosed,
            label_1 = _a.label,
            clause_1 = _a.clause;
        var _loop_2 = function _loop_2(i) {
            var _a = _expand(enclosed_1[i], pivot),
                found = _a.found,
                cases = _a.cases;
            if (found) {
                return { value: {
                        found: found,
                        cases: cases.map(function (c) {
                            return [new AltHeadNode(label_1, clause_1, _makeAltCase(c, enclosed_1, i - 1))];
                        })
                    } };
            }
        };
        for (var i = 0; i < enclosed_1.length; i += 1) {
            var state_2 = _loop_2(i);
            if ((typeof state_2 === "undefined" ? "undefined" : _typeof(state_2)) === "object") return state_2.value;
        }
    }
    if (currCase instanceof sExpression_1.QuotedParamsMap || currCase instanceof sExpression_1.UnquotedParamsMap) {
        var _loop_3 = function _loop_3(key) {
            if (currCase.hasOwnProperty(key)) {
                var val = currCase[key];
                var _a = _expand(val, pivot),
                    found = _a.found,
                    cases = _a.cases;
                if (found) {
                    return { value: {
                            found: found,
                            cases: cases.map(function (c) {
                                return _makeAltCaseMap(c, currCase, key);
                            })
                        } };
                }
            }
        };
        for (var key in currCase) {
            var state_3 = _loop_3(key);
            if ((typeof state_3 === "undefined" ? "undefined" : _typeof(state_3)) === "object") return state_3.value;
        }
    }
    return { found: false, cases: [currCase] };
}
function _makeAlts(pivot, params) {
    if (pivot.opts.named) {
        return pivot.exprs.map(function (_a, idx) {
            var name = _a.name,
                expr = _a.expr;
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
    var r;
    if (map instanceof sExpression_1.QuotedParamsMap) {
        r = new sExpression_1.QuotedParamsMap();
    } else if (map instanceof sExpression_1.UnquotedParamsMap) {
        r = new sExpression_1.UnquotedParamsMap();
    }
    Object.assign(r, map);
    r[key] = item;
    return r;
}
function _fold(reducer, _a, init, replacer, inFclause) {
    var sExpression = _a.sExpression,
        quotedParamsMap = _a.quotedParamsMap,
        unquotedParamsMap = _a.unquotedParamsMap;
    var r = init;
    if (sExpression) {
        var headAlts = sExpression.head,
            _b = sExpression.params,
            _c = _b === void 0 ? {} : _b,
            _d = _c.labelled,
            labelled = _d === void 0 ? null : _d,
            _e = _c.unlabelled,
            unlabelled = _e === void 0 ? null : _e;
        var head_1 = clauseFromAlts_1.default(headAlts);
        var replaced;
        if (replacer) {
            replaced = replacer(head_1);
            if (replaced) {
                return r;
            }
        }
        r = reducer(r, head_1);
        var items = labelled || unlabelled || [];
        r = items.reduce(function (acc, _a) {
            var item = _a.item;
            if (head_1.type === 'FCLAUSE') {
                return _fold(reducer, item, acc, replacer, true);
            } else {
                return _fold(reducer, item, acc, replacer);
            }
        }, r);
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
/* 85 */,
/* 86 */,
/* 87 */
/***/ function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", { value: true });
var namespace_types_1 = __webpack_require__(26);
var namespace_1 = __webpack_require__(20);
var fnName_1 = __webpack_require__(3);
var isPred_1 = __webpack_require__(11);
var isClause_1 = __webpack_require__(4);
var preds_1 = __webpack_require__(12);
var describe_1 = __webpack_require__(29);
var deref_1 = __webpack_require__(28);
var resolve_1 = __webpack_require__(42);
var syntax_1 = __webpack_require__(84);
exports.syntax = syntax_1.default;
var clauseFromAlts_1 = __webpack_require__(6);
function gen(registry) {
    var conformedReg = namespace_types_1.NamespaceObjClause.conform(registry);
    var docstr = _walk(registry, null, null, conformedReg);
    return docstr;
}
exports.gen = gen;
function genCot(registry) {
    var r = resolve_1.getDefList(registry);
    var groups = Object.keys(r);
    return "<dl>\n    " + groups.map(function (p) {
        return "\n    <dt>\n      " + p + "\n    </dt>\n    <dd>\n      <ul>\n      " + r[p].map(function (_a) {
            var p = _a[0],
                n = _a[1],
                ref = _a[2];
            return "<li>\n            " + _clauseRefLink(p + "/" + n)(function (pn) {
                return _stylizeName(deref_1.default(ref), _getAlias(registry, pn) || _unanbiguousName(pn), namespace_1.getMeta(pn, registry));
            }) + "\n          </li>";
        }).join('') + "\n      </ul>\n    </dd>\n    ";
    }).join('') + "\n  </dl>";
}
exports.genCot = genCot;
function _getAlias(reg, p) {
    var meta = namespace_1.getMeta(p, reg);
    return meta && meta.name;
}
function _walk(globalReg, prefix, currentFrag, creg) {
    var currentNs = prefix ? prefix + "." + currentFrag : currentFrag;
    var r = '';
    var subresults = [];
    var nsComment, exprResult, subNamespaces;
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
                    nsComment = "<p><i>" + creg[key] + "</i></p>";
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
        r += "<h3>" + currentNs + "/</h3><hr />";
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
        throw new Error("Expression " + exprName + " does not exist in the registry");
    }
    var docstr;
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
        return name + "()";
    } else {
        return name;
    }
}
function _type(expr) {
    if (isClause_1.default(expr)) {
        return typeTable[expr.type] || expr.type.toLowerCase();
    } else if (isPred_1.default(expr)) {
        return 'predicate';
    }
}
function genForExpression(globalReg, exprName, expr, meta) {
    var docstr;
    var path = resolve_1.default(expr, globalReg);
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
    } else if (isPred_1.default(expr) || expr.type === 'PRED') {
        docstr = _genPredClause(globalReg, exprName, expr, meta);
    } else if (isPred_1.default(expr) || expr.type === 'ANY') {
        docstr = _genAnyClause();
    } else if (expr.type === 'AND') {
        docstr = _genAndClause(globalReg, exprName, path, expr, meta);
    } else {
        docstr = _genUnknownClause(globalReg, exprName, path, expr, meta);
    }
    var name = meta && meta['name'] || exprName;
    var header = exprName && path ? "\n      <h6>" + _stylizeName(expr, name) + "</h6>&nbsp;\n        <span class=\"tag tag-primary\">\n          " + _type(expr) + "\n        </span>\n      " : null;
    return "\n    " + (exprName && path ? "<a name=\"" + path + "\"></a>" : '') + "\n    " + _wrapCard({
        header: header,
        legend: !path ? _tagFor(expr, globalReg, path) : '<span class="tag tag-info">[clause]</span>',
        borderlabel: _labelFor(expr)
    })(docstr);
}
exports.genForExpression = genForExpression;
function _wrapCard(_a) {
    var header = _a.header,
        legend = _a.legend,
        borderlabel = _a.borderlabel;
    if (header) {
        return function (body) {
            return "\n        <div class=\"card\">\n          <div class=\"card-header inline-headers\">\n            " + header + "\n          </div>\n        " + body + "\n        </div>\n      ";
        };
    } else if (legend) {
        return function (body) {
            return "\n    <fieldset class=\"card card-outline-" + (borderlabel || 'default') + "\">\n    <legend class=\"clause-type\">\n      " + legend + "\n    </legend>\n    " + body + "\n    </fieldset>\n    ";
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
    return "\n    <span\n      role=\"button\"\n      data-toggle=\"popover\"\n      data-trigger=\"focus hover\"\n      data-html=\"true\"\n      data-content=\"" + escapeHtml(_description(expr, globalReg, path)) + "\"\n      data-container=\"body\"\n      data-animation=\"false\"\n      data-delay=\"500\"\n      class=\"tag tag-" + _labelFor(expr) + "\">\n      " + _typeFor(expr) + "\n    </span>\n  ";
}
function _rawTypeFor(expr) {
    var lowerT;
    var derefedExpr = deref_1.default(expr);
    if (isPred_1.default(derefedExpr)) {
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
            return "<span class=\"tag tag-info\">[" + lowerT + "]</span>";
    }
}
function _labelFor(expr) {
    var lowerT = _rawTypeFor(expr);
    switch (lowerT) {
        case 'pred':
            return 'primary';
        case 'fclause':
            return 'info';
        case 'cat':
        case 'or':
            return 'info';
        default:
            return 'info';
    }
}
function _genAnyClause() {
    return "\n    <div class=\"card-block\">Any value.</div>\n  ";
}
function _genClauseRef(globalReg, exprName, path, expr, meta) {
    var p = path || expr.ref;
    return "\n    <div class=\"card-block\">\n      A value of type\n      " + _clauseRefLink(p)(function (p) {
        return p;
    }) + "\n    </div>\n  ";
}
function _genAndClause(globalReg, exprName, path, expr, meta) {
    var example = meta && meta.example;
    var altDefs = expr.opts.conformedExprs.map(function (altE, idx) {
        return "\n        <fieldset class=\"list-group-item card-outline-" + _labelFor(expr) + "\">\n          <legend class=\"clause-type\">\n            <span class=\"tag tag-default\">Condition " + (idx + 1) + " </span>\n          </legend>\n          <div class=\"row\">\n            <div class=\"col-md-12\">\n              " + genForExpression(globalReg, null, clauseFromAlts_1.default(altE), null) + "\n            </div>\n          </div>\n        </fieldset>\n    ";
    });
    var r = "\n    <div class=\"card-block\">\n      <p class=\"card-title\">\n        Should satisfy <em>all</em> of the following expression:\n      </p>\n    </div>\n    <div class=\"list-group list-group-flush list-for-cat\">\n      " + altDefs.join(' ') + "\n    </div>\n  ";
    return r;
}
function _genCatClause(globalReg, exprName, path, expr, meta) {
    var example = meta && meta.example;
    var altDefs = expr.exprs.map(function (_a, idx) {
        var name = _a.name,
            altE = _a.expr;
        var comment = meta && meta[name] && meta[name].comment;
        return "\n        <fieldset class=\"list-group-item card card-outline-" + _labelFor(expr) + "\">\n          <legend class=\"clause-type\">\n          " + (name ? "\n            <span class=\"tag tag-default\">Part " + (idx + 1) + "</span>\n            <span class=\"lead font-italic text-primary\">\n              &ldquo;" + name + "&rdquo;</span>\n          " : "<span class=\"tag tag-default\">Part " + (idx + 1) + "</span>") + "\n          </legend>\n          <div class=\"row\">\n            <div class=\"col-md-12\">\n              " + (comment ? "<span>" + comment + "</span>" : '') + "\n            </div>\n          </div>\n          <div class=\"row\">\n            <div class=\"col-md-12\">\n              " + genForExpression(globalReg, null, altE, meta && meta[name]) + "\n            </div>\n          </div>\n        </fieldset>\n    ";
    });
    var r = "\n    <div class=\"card-block\">\n      <p class=\"card-title\">\n        Should be <em>an ordered list</em> of the following:\n      </p>\n    </div>\n    <div class=\"list-group list-group-flush list-for-cat\">\n      " + altDefs.join(' ') + "\n    </div>\n  ";
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
        return "<a href=\"#" + p + "\" data-path=\"" + p + "\">" + pGenFn(p) + "</a>";
    };
}
function _description(expr, globalReg, currPath) {
    // return ``;
    return "\n    <pre class=\"clause-description\"><code class=\"clause\">" + decodeURIComponent(_encode(describe_1.default(expr, _refExprFn(globalReg, currPath), 2))) + "</code></pre>\n  ";
}
function _encode(str) {
    return str.split('<').join('&lt;').split('>').join('&gt;');
}
function _refExprFn(reg, currPath) {
    return function (expr) {
        var path = resolve_1.default(expr, reg);
        if (path && path !== currPath) {
            var r = _clauseRefLink(path)(_unanbiguousName);
            r = encodeURIComponent(r);
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
    var r = "\n    <div class=\"card-block\">\n      " + _predSourcePopover('A value that satisfies ', pred) + "\n    </div>\n  ";
    return r;
}
function _predSourcePopover(prefix, pred) {
    var predName = fnName_1.default(pred);
    return "\n    <em>\n      " + prefix + "\n      <span\n        data-toggle=\"popover\"\n        data-trigger=\"hover click\"\n        data-html=\"true\"\n        role=\"button\"\n        data-placement=\"top\"\n        data-content=\"<pre>" + pred.toString() + "</pre>\"\n        data-container=\"body\"\n        data-animation=\"false\"\n        data-delay=\"500\">\n        " + predName + "()\n      </span>\n    </em>\n  ";
}
function _genUnknownClause(globalReg, exprName, path, expr, meta) {
    var r = "\n    <div class=\"card-block\">\n      " + expr.exprs.map(function (exprAlts) {
        var name = exprAlts.name,
            expr = exprAlts.expr;
        if (expr) {
            return genForExpression(globalReg, name, expr, meta && meta[name]);
        } else {
            return genForExpression(globalReg, null, exprAlts, null);
        }
    }).join('') + "\n    </div>\n  ";
    return r;
}
function _genOrClause(globalReg, exprName, path, expr, meta) {
    if (!meta) {
        meta = {};
    }
    var altDefs = expr.exprs.map(function (_a, idx) {
        var name = _a.name,
            altE = _a.expr;
        var comment = meta[name] && meta[name].comment;
        var examples = meta[name] && meta[name].examples;
        if (preds_1.isStr(examples)) {
            examples = [examples];
        }
        return "\n        <fieldset class=\"list-group-item card-outline-" + _labelFor(expr) + "\">\n          <legend class=\"clause-type\">\n            <span class=\"tag tag-default\">\n                Option " + (idx + 1) + "\n            </span>\n            " + (name ? "\n                <span class=\"lead font-italic text-primary\">\n                  &ldquo;" + name + "&rdquo;\n                </span>\n            " : '') + "\n          </legend>\n          <div class=\"row\">\n            <div class=\"col-md-12\">\n            " + (comment ? "<div>" + comment + "</div>" : '') + "\n\n            " + (examples ? "\n              <h6>Examples: </h6>\n                <div class=\"code-examples\">\n                  " + examples.map(function (e) {
            return "\n                    <pre><code>" + e.trim() + "</code></pre>\n                  ";
        }).join('\n') + "\n                </div>\n            " : '') + "\n            </div>\n          </div>\n          <div class=\"row\">\n            <div class=\"col-md-12\">\n              " + genForExpression(globalReg, null, altE, meta && meta[name]) + "\n            </div>\n          </div>\n        </fieldset>\n    ";
    });
    var r = "\n    <div class=\"card-block\">\n      <p class=\"card-title\">\n      " + (exprName ? '' : "\n      ") + "\n        Should be <em>one of</em> the following:\n      </p>\n    </div>\n    <div class=\"list-group list-group-flush list-for-or\">\n      " + altDefs.join('') + "\n    </div>\n  ";
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
function _genFclause(globalReg, exprName, clause, path, meta) {
    if (meta === void 0) {
        meta = {};
    }
    var frags = [];
    var _a = meta || {},
        _b = _a.comment,
        comment = _b === void 0 ? null : _b,
        _c = _a.examples,
        examples = _c === void 0 ? null : _c;
    if (preds_1.isStr(examples)) {
        examples = [examples];
    }
    var _d = clause.opts,
        argsClause = _d.args,
        retClause = _d.ret,
        fn = _d.fn;
    if (comment) {
        frags.push([null, comment]);
    }
    if (argsClause) {
        frags.push(['Syntax', "<ul>\n        " + syntax_1.default(clause, 20, _refExprFn(globalReg, path)).map(function (s) {
            return "<li>" + decodeURIComponent(_encode(s)) + "</li>";
        }).join('') + "\n      </ul>"]);
    }
    if (examples) {
        frags.push(["Examples  <button class=\"btn btn-info btn-sm launch-code-examples\" data-name=\"" + exprName + "\">\n          Live Eval\n        </button>", "\n      <div class=\"code-examples\" data-name=\"" + exprName + "\">\n        " + examples.map(function (e) {
            return "\n            <pre><code>" + e.trim() + "</code></pre>\n          ";
        }).join('') + "\n      </div>\n    "]);
    }
    if (exprName && path) {
        frags.push(['Clause Description', "\n    <blockquote class=\"blockquote\">\n      <small>\n        <em class=\"text-muted\">\n          " + _description(clause, globalReg, path) + "\n        </em>\n      </small>\n    </blockquote>\n  "]);
    }
    if (argsClause) {
        frags.push(['Argument Clause Graph', _wrapWithCollapsible(exprName + "-args-graph", genForExpression(globalReg, null, argsClause, meta && meta.args))]);
    }
    if (retClause) {
        frags.push(['Return Value Clause Graph', _wrapWithCollapsible(exprName + "-ret-graph", genForExpression(globalReg, null, retClause, meta && meta.ret))]);
    }
    if (fn) {
        frags.push(['Argument-return value relation', "<pre>" + fnName_1.default(fn) + "</pre>"]);
    }
    var r = "\n    <dl class=\"card-block\">\n    " + frags.map(function (_a) {
        var name = _a[0],
            src = _a[1];
        var title = name ? "<dt>" + name + "</dt>" : '';
        var def = "<dd>" + src + "</dd>";
        return "" + title + def;
    }).join('\n') + "\n    </dl>\n  ";
    return r;
}
function _wrapWithCollapsible(contentId, content) {
    return "<p>\n     <button class=\"btn btn-sm btn-info\" type=\"button\" data-toggle=\"collapse\" data-target=\"#" + contentId + "\" aria-expanded=\"false\" aria-controls=\"collapseExample\">\n      Show Graph \xBB\n    </button>\n  </p>\n  <div class=\"collapse\" id=\"" + contentId + "\">\n    " + content + "\n  </div>\n";
}

/***/ }
/******/ ]);
});