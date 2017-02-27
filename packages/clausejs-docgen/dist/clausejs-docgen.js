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
/******/ 	return __webpack_require__(__webpack_require__.s = 24);
/******/ })
/************************************************************************/
/******/ ({

/***/ 24:
/***/ function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", { value: true });
var namespace_types_1 = __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"../clauses/namespace.types\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()));
var namespace_1 = __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"../namespace\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()));
var fnName_1 = __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"../utils/fnName\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()));
var isPred_1 = __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"../utils/isPred\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()));
var isClause_1 = __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"../utils/isClause\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()));
var preds_1 = __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"../preds\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()));
var describe_1 = __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"../utils/describe\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()));
var deref_1 = __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"../utils/deref\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()));
var resolve_1 = __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"../namespace/resolve\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()));
var syntax_1 = __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"./syntax\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()));
var clauseFromAlts_1 = __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"../utils/clauseFromAlts\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()));
function gen(registry) {
    var conformedReg = namespace_types_1.NamespaceObjClause.conform(registry);
    var docstr = _walk(registry, null, null, conformedReg);
    return docstr;
}
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
    return "\n    <pre class=\"clause-description\"><code class=\"clause\">" + unescape(_encode(describe_1.default(expr, _refExprFn(globalReg, currPath), 2))) + "</code></pre>\n  ";
}
function _encode(str) {
    return str.split('<').join('&lt;').split('>').join('&gt;');
}
function _refExprFn(reg, currPath) {
    return function (expr) {
        var path = resolve_1.default(expr, reg);
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
        comment = _a.comment,
        examples = _a.examples;
    if (preds_1.isStr(examples)) {
        examples = [examples];
    }
    var _b = clause.opts,
        argsClause = _b.args,
        retClause = _b.ret,
        fn = _b.fn;
    if (comment) {
        frags.push([null, comment]);
    }
    if (argsClause) {
        frags.push(['Syntax', "<ul>\n        " + syntax_1.default(clause, 20, _refExprFn(globalReg, path)).map(function (s) {
            return "<li>" + unescape(_encode(s)) + "</li>";
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
var fns = {
    gen: gen,
    genForExpression: genForExpression,
    genCot: genCot,
    syntax: syntax_1.default
};
module.exports = fns;
module.exports.default = fns;

/***/ }

/******/ });
});