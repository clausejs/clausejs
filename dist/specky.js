(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define("S", [], factory);
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
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var oAssign = __webpack_require__(1);
	var namespaceFn = __webpack_require__(2);

	var ops = __webpack_require__(5);
	var utils = __webpack_require__(51);

	var predicates = __webpack_require__(41);

	var models = {
	  Problem: __webpack_require__(20),
	  Spec: __webpack_require__(7)
	};

	var r = oAssign(namespaceFn, ops, utils, models, predicates);

	module.exports = r;

/***/ },
/* 1 */
/***/ function(module, exports) {

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
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global) {'use strict';

	var oPath = __webpack_require__(3);

	var SpecRef = __webpack_require__(4);

	var _require = __webpack_require__(5);

	var cat = _require.cat;
	var or = _require.or;
	var fspec = _require.fspec;
	var ExprSpec = _require.ExprSpec;

	var _require2 = __webpack_require__(39);

	var props = _require2.props;

	var isSpec = __webpack_require__(9);
	var isPred = __webpack_require__(10);
	var isStr = __webpack_require__(12);
	var isExpr = __webpack_require__(46);
	var isUndefined = __webpack_require__(27);
	var walk = __webpack_require__(23);
	var delayed = __webpack_require__(50);

	var reg;

	function isNamespaceName(x) {
	  return isStr(x); // TODO
	}

	var _get = fspec({
	  args: cat(isNamespaceName),
	  ret: isSpecRef
	}).instrument(_getUnchecked);

	function _getUnchecked(ref) {
	  var getFn = function getFn(prefix) {
	    var path = reg;
	    if (prefix) {
	      path = prefix + reg;
	    } else {
	      path = reg;
	    }
	    var nObj = oPath.get(path, ref);
	    if (nObj) {
	      return nObj.expr;
	    } else {
	      return undefined;
	    }
	  };

	  var sr = new SpecRef({ ref: ref, getFn: getFn, null: null });
	  sr.conform = function specRefConform(x) {
	    return walk(ss, x, { conform: true });
	  };
	  return sr;
	}

	var ExprOrPartialRefMapSpec = or('expr', delayed(function () {
	  return ExprSpec;
	}) //TODO
	);

	var PartialRefMapSpec = props({
	  req: {
	    'refDefs': [isNamespaceName, ExprOrPartialRefMapSpec]
	  }
	});

	var NamespaceFnSpec = fspec({
	  args: or('def', cat('name', isNamespaceName, 'val', ExprOrPartialRefMapSpec), 'get', cat('name', isNamespaceName)),
	  ret: or(isSpecRef, isExpr)
	});

	function speckyNamespace(cargs) {
	  var retVal;

	  if (cargs['def']) {
	    var name = cargs.def.name;
	    var val = cargs.def.val;
	    retVal = _processVal(name, val);
	  } else if (cargs['get']) {
	    var name = cargs['get']['name'];
	    var nameObj = _get(name);
	    retVal = nameObj;
	  }

	  return retVal;
	};

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

	function isSpecRef(x) {
	  return x instanceof SpecRef;
	}

	var NameObjSpec = props({
	  req: { 'expr': or(isSpec, isPred) }
	});

	var _set = fspec({
	  args: cat(isNamespaceName, NameObjSpec),
	  ret: isUndefined
	}).instrument(function _set(n, nObj) {
	  _maybeInitRegistry();
	  oPath.set(reg, n, nObj);
	});

	var K = '___SPECKY_REGISTRY';

	function _maybeInitRegistry() {
	  if (!reg) {
	    reg = global[K] = {};
	  }
	  return reg;
	}

	_maybeInitRegistry();

	module.exports = NamespaceFnSpec.instrumentConformed(speckyNamespace);
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 3 */
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
/* 4 */
/***/ function(module, exports) {

	'use strict';

	function SpecRef(_ref) {
	  var ref = _ref.ref;
	  var getFn = _ref.getFn;
	  var conformFn = _ref.conformFn;

	  this.type = 'SpecRef';
	  this.get = getFn;
	  this.conform = conformFn;
	  this.ref = ref;
	}

	module.exports = SpecRef;

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var oAssign = __webpack_require__(1);
	var core = __webpack_require__(6);

	var _require = __webpack_require__(39);

	var props = _require.props;
	var keys = _require.keys;


	var other = {
	  and: __webpack_require__(40),
	  any: __webpack_require__(48),
	  fspec: __webpack_require__(22)
	};

	var r = oAssign({}, core, { props: props, keys: keys }, other);

	module.exports = r;

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var oAssign = __webpack_require__(1);

	var Spec = __webpack_require__(7);
	var isSpec = __webpack_require__(9);
	var isPred = __webpack_require__(10);
	var isStr = __webpack_require__(12);
	var isSpecName = __webpack_require__(13);
	var namedFn = __webpack_require__(14);
	var isSpecRef = __webpack_require__(15);
	var isDelayedSpec = __webpack_require__(16);
	var c = __webpack_require__(18);
	var coerceIntoSpec = __webpack_require__(19);
	var fspec = __webpack_require__(22);
	var walk = __webpack_require__(23);
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
	    named: [{ name: 'expr', expr: {
	        spec: ExprSpec
	      } }]
	  }),
	  ret: specSpec
	};

	function genMultiArgOp(type) {
	  return namedFn(type, function (conformedArgs) {
	    var exprs;
	    if (conformedArgs.named) {
	      exprs = conformedArgs.named;

	      var coercedExprs = exprs.map(function (p) {
	        var expr = p.expr;
	        if (expr.spec) {
	          var s = expr.spec;
	          return oAssign({}, p, { expr: s, spec: undefined });
	        } else if (expr.pred) {
	          var s = coerceIntoSpec(expr.pred);
	          return oAssign({}, p, { expr: s, pred: undefined });
	        } else if (expr.specRef) {
	          var s = expr.specRef;
	          return oAssign({}, p, { expr: s, specRef: undefined });
	        } else if (expr.delayedSpec) {
	          var s = expr.delayedSpec;
	          return oAssign({}, p, { expr: s, delayedSpec: undefined });
	        } else {
	          console.error(p);
	          throw 'Not implemented';
	        }
	      });

	      var s = new Spec(type, coercedExprs, null, null);

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

	      var s = new Spec(type, coercedExprs, null, null);

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

	    var s = new Spec(type, [coerceIntoSpec(expr)], null, null);

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

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var isArray = __webpack_require__(8);
	var oAssign = __webpack_require__(1);

	function Spec(type, exprs, conformFn, generateFn) {

	  if (arguments.length !== 4) {
	    throw new Error('Wrong number of arguments (' + arguments.length + ') passed to Spec constructor');
	  }

	  if (!isArray(exprs)) {
	    throw new Error('Expect an array of specs');
	  }

	  this.type = type;

	  if (conformFn) {
	    this.conform = conformFn;
	  }

	  if (generateFn) {
	    this.generate = generateFn;
	  }

	  this.exprs = exprs;
	};

	module.exports = Spec;

/***/ },
/* 8 */
/***/ function(module, exports) {

	var toString = {}.toString;

	module.exports = Array.isArray || function (arr) {
	  return toString.call(arr) == '[object Array]';
	};


/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var Spec = __webpack_require__(7);

	function isSpec(x) {
	  if (!x) {
	    return false;
	  } else {
	    return x instanceof Spec;
	  }
	}

	module.exports = isSpec;

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var isFn = __webpack_require__(11);
	var Spec = __webpack_require__(7);

	function isPred(x) {
	  return isFn(x);
	}

	module.exports = isPred;

/***/ },
/* 11 */
/***/ function(module, exports) {

	'use strict';

	function isFunction(x) {
	  var getType = {};
	  // (x || false) guarantees returning of boolean type
	  return (x || false) && getType.toString.call(x) === '[object Function]';
	};

	module.exports = isFunction;

/***/ },
/* 12 */
/***/ function(module, exports) {

	"use strict";

	function isStr(x) {
	  return x !== null && x !== undefined && x.constructor === String;
	}

	module.exports = isStr;

/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var isStr = __webpack_require__(12);

	//TODO
	module.exports = function isSpecName(x) {
	  return isStr(x);
	};

/***/ },
/* 14 */
/***/ function(module, exports) {

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
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var SpecRef = __webpack_require__(4);

	//TODO
	module.exports = function isSpecRef(x) {
	  return x instanceof SpecRef;
	};

/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var DelayedSpec = __webpack_require__(17);

	//TODO
	module.exports = function isSpecRef(x) {
	  return x instanceof DelayedSpec;
	};

/***/ },
/* 17 */
/***/ function(module, exports) {

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
/* 18 */
/***/ function(module, exports) {

	'use strict';

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
/* 19 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var isPred = __webpack_require__(10);
	var isSpec = __webpack_require__(9);
	var isSpecRef = __webpack_require__(15);
	var isDelayedSpec = __webpack_require__(16);
	var Spec = __webpack_require__(7);
	var Problem = __webpack_require__(20);
	var namedFn = __webpack_require__(14);
	var fnName = __webpack_require__(21);

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
	  return new Spec(SPEC_TYPE, [pred], predConformer(pred), null);
	}

	function predConformer(pred) {
	  return function conformPred(x) {
	    if (pred(x)) {
	      return x;
	    } else {
	      return new Problem(x, pred, [], 'Predicate ' + fnName(pred) + ' returns false on value ' + JSON.stringify(x));
	    }
	  };
	}

	module.exports = coerceIntoSpec;

/***/ },
/* 20 */
/***/ function(module, exports) {

	'use strict';

	function Problem(val, failsPredicate, subproblems, msg) {
	  this.isProblem = true;

	  if (arguments.length !== 4) {
	    throw 'Problem arg len err';
	  }

	  this.val = val;
	  this.name = 'Problem';
	  this.failsPredicate = failsPredicate;
	  this.problemMessage = msg;
	  this.stack = new Error().stack;
	  this.message = msg;
	  this.subproblems = subproblems;
	};

	Problem.prototype = new Error();

	module.exports = Problem;

/***/ },
/* 21 */
/***/ function(module, exports) {

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
/* 22 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var Spec = __webpack_require__(7);
	var walk = __webpack_require__(23);

	function fspec(fnSpec) {
	  var spec = new Spec('FSPEC', [fnSpec], null, null);
	  spec.instrumentConformed = function instrumentConformed(fn) {
	    return walk(spec, fn, { conform: true, instrument: true });
	  };
	  spec.instrument = function instrument(fn) {
	    return walk(spec, fn, { conform: false, instrument: true });
	  };

	  return spec;
	};

	module.exports = fspec;

/***/ },
/* 23 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var nfaWalker = __webpack_require__(24);
	var predWalker = __webpack_require__(30);
	var fspecWalker = __webpack_require__(31);
	var propsWalker = __webpack_require__(33);
	var andWalker = __webpack_require__(35);
	var collOfWalker = __webpack_require__(36);
	var specRefWalker = __webpack_require__(37);
	var delayedSpecWalker = __webpack_require__(38);
	var coerceIntoSpec = __webpack_require__(19);

	function walk(spec, x, opts) {
	  var walker = _getWalker(spec);

	  return walker(x, opts);
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

	  return walker(spec, walk);
	}

	module.exports = walk;

/***/ },
/* 24 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var simulate = __webpack_require__(25);
	var compile = __webpack_require__(28);
	var Problem = __webpack_require__(20);

	function nfaWalker(spec, walkFn) {
	  var nfa;

	  return function nfaWalk(x, opts) {
	    var conform = opts.conform;
	    var instrument = opts.instrument;

	    if (!nfa) {
	      nfa = compile(spec); //lazy
	    }

	    var _simulate = simulate(nfa, x, walkFn, opts);

	    var result = _simulate.result;
	    var matched = _simulate.matched;
	    var lastProblem = _simulate.lastProblem;

	    if (matched === true) {
	      return result;
	    } else {
	      var subproblems = [];
	      if (lastProblem) {
	        subproblems.push(lastProblem);
	      }
	      if (conform || instrument) {
	        return new Problem(x, spec, [], 'Spec ' + spec.type + ' did not match val: ' + JSON.stringify(x));
	      } else {
	        console.error(opts);
	        throw 'no impl case';
	      }
	    }
	  };
	}

	module.exports = nfaWalker;

/***/ },
/* 25 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var Problem = __webpack_require__(20);
	var isProblem = __webpack_require__(26);
	var isArray = __webpack_require__(8);
	var oAssign = __webpack_require__(1);
	var isUndefined = __webpack_require__(27);

	function simulate(nfa, rawInput, walkFn, walkOpts) {
	  var conform = walkOpts.conform;
	  var instrument = walkOpts.instrument;

	  var input;

	  var r = {
	    matched: false,
	    result: null
	  };

	  var initial = { state: 0, offset: 0, leftOff: 0, input: [rawInput], groupCount: 0, arrayed: false };
	  var frontier = [initial];
	  while (frontier.length > 0) {
	    var current = frontier.shift();
	    var currentOffset = current.offset;
	    var leftOff = current.leftOff;
	    var input = current.input;
	    var groupCount = current.groupCount;
	    var arrayed = current.arrayed;

	    if (current.state === nfa.finalState && currentOffset === input.length) {
	      r.matched = true;
	      r.result = _getMatch(nfa, rawInput, current, walkOpts);
	      return r;
	    }
	    for (var nextStateStr in nfa.transitions[current.state]) {
	      var nextState = parseInt(nextStateStr);
	      var observed = input[currentOffset];
	      var transition = nfa.transitions[current.state][nextState];

	      if (transition.group === 'in') {
	        if (groupCount === 0) {
	          if (isArray(input[0])) {
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

	      var conformed, next;
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
	            prev: current,
	            isEpsilon: true
	          };

	          frontier.push(next);
	        } else {
	          if (conform || instrument) {
	            conformed = walkFn(transition, observed, walkOpts);
	            if (!isProblem(conformed)) {
	              if (currentOffset < input.length) {
	                move = { dir: 'pred' };
	                next = {
	                  input: input, groupCount: groupCount, arrayed: arrayed, leftOff: leftOff,
	                  state: nextState,
	                  offset: nextOffset,
	                  move: move,
	                  prev: current,
	                  isEpsilon: false,
	                  observed: observed,
	                  conformed: conformed
	                };
	                frontier.push(next);
	              }
	            } else {
	              r.lastProblem = conformed;
	            }
	          }
	        }
	      }
	    }
	  }

	  return r;
	};

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

	function _getMatch(nfa, input, finalState, walkOpts) {
	  var conform = walkOpts.conform;
	  var instrument = walkOpts.instrument;

	  var chain = _stateChain(nfa, finalState);
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
	            valStack.push(curr.conformed);
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
	              acc = c;
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
	    console.error(valStack);
	    throw 'FUUU2';
	  }
	  var r = valStack.pop();
	  return r;
	}

	function _last(arr) {
	  return arr[arr.length - 1];
	}

	function _foldIn(acc, val) {
	  var r;
	  if (acc === null) {
	    r = [val];
	  } else if (!isArray(acc)) {
	    r = [val, acc];
	  } else {
	    r = [val].concat(acc);
	  }
	  return r;
	}

	function _setToValue(object, path, value) {
	  var o = object;
	  for (var i = 0; i < path.length - 1; i++) {
	    var n = path[i];
	    if (n in o) {
	      o = o[n];
	    } else {
	      o[n] = {};
	      o = o[n];
	    }
	  }
	  o[path[path.length - 1]] = value;
	}

	function _getValue(object, path) {
	  var o = object;
	  var a = [].concat(path);
	  while (a.length) {
	    var n = a.shift();
	    if (n in o) {
	      o = o[n];
	    } else {
	      return;
	    }
	  }
	  return o;
	}

	function _stateChain(nfa, finalState) {
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
	        o.observed = curr.observed;
	        o.conformed = curr.conformed;
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
/* 26 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var Problem = __webpack_require__(20);

	function isProblem(x) {
	  return x instanceof Problem;
	};

	module.exports = isProblem;

/***/ },
/* 27 */
/***/ function(module, exports) {

	"use strict";

	module.exports = function (x) {
	  return x === undefined;
	};

/***/ },
/* 28 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var fragment = __webpack_require__(29);
	var Spec = __webpack_require__(7);

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
	    };
	  };
	  return states;
	};

	var evalFunctions = {};

	function evalSpec(spec) {
	  var evalFn;

	  if (spec.type === null) {
	    throw "Spec has no type: " + spec;
	  } else if (!(spec.type in evalFunctions)) {
	    evalFn = evalFunctions.PRED;
	  } else {
	    evalFn = evalFunctions[spec.type];
	  }
	  var r = evalFn(spec);
	  return r;
	};

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
	  return new Spec('ROOT', [expr], null, null);
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
	    };
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
/* 29 */
/***/ function(module, exports) {

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
	};

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
	    var originalTails = f.tails;
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
	    var originalTails = f.tails;
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
/* 30 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var fnName = __webpack_require__(21);
	var Problem = __webpack_require__(20);

	function predWalker(spec, walkFn) {
	  return function predWalk(x, opts) {
	    var conform = { opts: opts };
	    if (conform) {
	      var predFn = spec.exprs[0];
	      if (predFn(x)) {
	        return x;
	      } else {
	        return new Problem(x, spec, [], 'Predicate ' + fnName(predFn) + ' returns false on value ' + JSON.stringify(x));
	      }
	    } else {
	      throw 'no impl';
	    }
	  };
	}

	module.exports = predWalker;

/***/ },
/* 31 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var isProblem = __webpack_require__(26);
	var Problem = __webpack_require__(20);
	var functionName = __webpack_require__(21);
	var namedFn = __webpack_require__(14);
	var betterThrow = __webpack_require__(32);

	function fspecWalker(spec, walkFn) {
	  var _spec$exprs$ = spec.exprs[0];
	  var argsSpec = _spec$exprs$.args;
	  var retSpec = _spec$exprs$.ret;


	  return function walkFspec(fn, walkOpts) {
	    if (fn) {
	      var conform = walkOpts.conform;
	      var instrument = walkOpts.instrument;


	      if (conform && instrument) {
	        return instrumentConformed(fn, walkOpts);
	      } else if (instrument) {
	        return _instrument(fn, walkOpts);
	      } else {
	        return fn;
	      }
	    } else {
	      return new Problem(fn, spec, [], 'function is not specified');
	    }
	  };

	  function _instrument(fn, walkOpts) {
	    var fnName = functionName(fn);
	    var instrumentedFn = getInstrumentedFn(fnName, fn, walkOpts);
	    var namedSpecedFn = namedFn(fnName, instrumentedFn, '__instrumented');
	    return namedSpecedFn;
	  }

	  function instrumentConformed(fn, walkOpts) {
	    var fnName = functionName(fn);
	    var argConformedFn = getArgConformedFn(fnName, fn, walkOpts);
	    var namedArgConformedFn = namedFn(fnName, argConformedFn, '__conformed');

	    return namedArgConformedFn;
	  }

	  function getInstrumentedFn(fnName, fn, walkOpts) {
	    return function () {
	      var args = Array.from(arguments);
	      var instrumentedArgs = checkArgs(fn, fnName, args, walkOpts);
	      var retVal = fn.apply(this, instrumentedArgs);
	      var instrumentedRetVal = checkRet(fn, fnName, retVal, walkOpts);
	      return instrumentedRetVal;
	    };
	  }

	  function checkArgs(fn, fnName, args, walkOpts) {
	    if (argsSpec) {
	      var instrumentedArgs = walkFn(argsSpec, args, walkOpts);
	      if (isProblem(instrumentedArgs)) {
	        var p = new Problem(args, argsSpec, [instrumentedArgs], 'Args ' + JSON.stringify(args) + ' for function ' + fnName + ' failed validation');
	        betterThrow(p);
	      } else {
	        return instrumentedArgs;
	      }
	    } else {
	      return args;
	    }
	  }

	  function checkRet(fn, fnName, retVal, walkOpts) {
	    if (retSpec) {
	      var instrumentedRetVal = walkFn(retSpec, retVal, walkOpts);
	      if (isProblem(instrumentedRetVal)) {
	        var p = new Problem(retVal, retSpec, [instrumentedRetVal], 'Return value ' + retVal + ' for function ' + fnName + ' is not valid.');
	        betterThrow(p);
	      } else {
	        return instrumentedRetVal;
	      }
	    } else {
	      return retVal;
	    }
	  }

	  function getArgConformedFn(fnName, fn, walkOpts) {
	    return function () {
	      var args = Array.from(arguments);

	      var conformedArgs = walkFn(argsSpec, args, walkOpts);
	      if (isProblem(conformedArgs)) {
	        var p = new Problem(args, argsSpec, [conformedArgs], 'Args ' + JSON.stringify(args) + ' for function ' + fnName + ' is not valid');
	        betterThrow(p);
	      }

	      var retVal = fn(conformedArgs);
	      checkRet(fn, fnName, retVal, walkOpts);
	      return retVal;
	    };
	  }
	}

	module.exports = fspecWalker;

/***/ },
/* 32 */
/***/ function(module, exports) {

	"use strict";

	function betterThrow(problem) {
	  // console.error(problem.message, problem);
	  throw problem;
	}

	module.exports = betterThrow;

/***/ },
/* 33 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

	var isProblem = __webpack_require__(26);
	var isUndefined = __webpack_require__(27);
	var oAssign = __webpack_require__(1);
	var isObj = __webpack_require__(34);
	var Problem = __webpack_require__(20);
	var coerceIntoSpec = __webpack_require__(19);

	function propsWalker(spec, walkFn) {
	  var keyConformer;
	  var _spec$exprs$0$propArg = spec.exprs[0].propArgs;
	  var req = _spec$exprs$0$propArg.req;
	  var opt = _spec$exprs$0$propArg.opt;

	  var reqSpecs = req,
	      optSpecs = opt;

	  return function propsWalk(x, walkOpts) {
	    var conform = walkOpts.conform;

	    var fieldDefs;
	    if (reqSpecs) {
	      fieldDefs = reqSpecs.fieldDefs;
	    }
	    if (!keyConformer) {
	      keyConformer = _genKeyConformer(reqSpecs, optSpecs, walkFn, walkOpts); //lazy
	    }
	    var conformed = keyConformer(x);

	    if (isProblem(conformed)) {
	      return conformed;
	    }
	    var problems = [];

	    if (fieldDefs) {
	      if (conform) {
	        conformed = oAssign({}, x);
	      } else {
	        conform = x;
	      }
	      for (var name in fieldDefs.fields) {
	        if (fieldDefs.fields.hasOwnProperty(name)) {
	          var defs = fieldDefs.fields[name];

	          var _parseFieldDef = parseFieldDef(x, name, defs, walkFn, walkOpts);

	          var result = _parseFieldDef.result;
	          var keysToDel = _parseFieldDef.keysToDel;

	          if (isProblem(result)) {
	            return result;
	          } else {
	            if (conform) {
	              _deleteKeys(conformed, keysToDel);
	              if (!isUndefined(result)) {
	                conformed[name] = result;
	              }
	            }
	          }
	        }
	      }
	    }

	    var optFieldDefs;
	    if (optSpecs) {
	      optFieldDefs = optSpecs.fieldDefs;
	    }
	    if (optFieldDefs) {
	      for (var name in optFieldDefs.fields) {
	        if (optFieldDefs.fields.hasOwnProperty(name)) {
	          var defs = optFieldDefs.fields[name];

	          var _parseFieldDef2 = parseFieldDef(x, name, defs, walkFn, walkOpts);

	          var result = _parseFieldDef2.result;
	          var keysToDel = _parseFieldDef2.keysToDel;

	          if (isProblem(result)) {
	            //TODO: break immediately if don't need full report
	            problems.push([name, result]);
	          } else {
	            if (conform) {
	              _deleteKeys(conformed, keysToDel);
	              if (!isUndefined(result)) {
	                conformed[name] = result;
	              }
	            }
	          }
	        }
	      }
	    }

	    if (problems.length > 0) {
	      var problemMap = {};
	      var failedNames = [];
	      for (var i = 0; i < problems.length; i++) {
	        var _problems$i = _slicedToArray(problems[i], 2);

	        var n = _problems$i[0];
	        var p = _problems$i[1];

	        failedNames.push(n);
	        problemMap[n] = p;
	      }
	      var newP = new Problem(x, spec, problemMap, 'Some properties failed validation: ' + failedNames.join(', '));
	      return newP;
	    } else {
	      return conformed;
	    }
	  };
	}

	function _genKeyConformer(reqSpecs, optSpec, walkFn, walkOpts) {
	  return function tryConformKeys(x) {
	    if (reqSpecs) {
	      var reqProblems = [];
	      var found;
	      var fieldDefs = reqSpecs.fieldDefs;
	      var keyList = reqSpecs.keyList;

	      var reqNames;

	      if (fieldDefs) {
	        reqNames = [];
	        for (var name in fieldDefs.fields) {
	          if (fieldDefs.fields.hasOwnProperty(name)) {
	            reqNames.push(name);
	          }
	        }
	      } else if (keyList) {
	        reqNames = keyList.concat([]);
	      } else {
	        throw 'unsupported';
	      }

	      for (var i = 0; i < reqNames.length; i++) {
	        var name = reqNames[i];
	        found = undefined;
	        if (fieldDefs && fieldDefs.fields[name].keyValExprPair) {
	          //key spec
	          found = false;
	          for (var kk in x) {
	            if (x.hasOwnProperty(kk)) {
	              var rr = _conformNamedOrExpr(kk, fieldDefs.fields[name].keyValExprPair.keySpec, walkFn, walkOpts);
	              if (!isProblem(rr)) {
	                //found a match
	                found = true;
	                break;
	              }
	            }
	          }
	        } else {
	          //plain string key
	          if (x[name] === undefined) {
	            reqProblems.push(name);
	          }
	        }
	      }
	      if (reqProblems.length > 0 || found === false) {
	        return new Problem(x, reqSpecs, [], 'req: keys required: ' + reqProblems.join(', '));
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

	function parseFieldDef(x, name, defs, walkFn, walkOpts) {
	  var valExprOnly = defs.valExprOnly;
	  var keyValExprPair = defs.keyValExprPair;

	  var r;
	  var keysToDel = [];
	  if (keyValExprPair) {
	    var keySpec = keyValExprPair.keySpec;
	    var valSpec = keyValExprPair.valSpec;

	    r = undefined;
	    for (var k in x) {
	      var rr = _conformNamedOrExpr(k, keySpec, walkFn, walkOpts);
	      if (x === x[rr]) {
	        continue;
	      }
	      if (!isProblem(rr)) {
	        keysToDel.push(rr);
	        var rrr = _conformNamedOrExpr(x[rr], valSpec, walkFn, walkOpts);
	        if (isProblem(rrr)) {
	          return { result: rrr, keysToDel: keysToDel };
	        } else {
	          if (r === undefined) {
	            r = {};
	          }
	          r[k] = rrr;
	        }
	      }
	    }
	  } else if (valExprOnly) {
	    var valSpec = valExprOnly;
	    r = x[name];
	    if (!isUndefined(r) && x[name] !== x) {
	      r = _conformNamedOrExpr(r, valSpec, walkFn, walkOpts);
	    }
	  }
	  return { result: r, keysToDel: keysToDel };
	}

	function _conformNamedOrExpr(x, nameOrExpr, walkFn, walkOpts) {
	  if (nameOrExpr.spec) {
	    var spec = nameOrExpr.spec;
	    return walkFn(spec, x, walkOpts);
	  } else if (nameOrExpr.pred) {
	    var expr = coerceIntoSpec(nameOrExpr.pred);
	    return walkFn(expr, x, walkOpts);
	  } else {
	    console.error(nameOrExpr);
	    throw 'no impl';
	  }
	}

	module.exports = propsWalker;

/***/ },
/* 34 */
/***/ function(module, exports) {

	"use strict";

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

	function isObject(x) {
	  return (typeof x === "undefined" ? "undefined" : _typeof(x)) === "object" && x !== null;
	};

	module.exports = isObject;

/***/ },
/* 35 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var coerceIntoSpec = __webpack_require__(19);
	var Problem = __webpack_require__(20);
	var isProblem = __webpack_require__(26);

	function andWalker(spec, walkFn) {
	  var exprs = spec.exprs;

	  return function andWalk(data, walkOpts) {
	    var results = exprs.map(function (e) {
	      e = coerceIntoSpec(e);
	      return walkFn(e, data, walkOpts);
	    });

	    var conform = walkOpts.conform;
	    var instrument = walkOpts.instrument;


	    if (conform || instrument) {
	      var problems = results.filter(isProblem);

	      if (problems.length === 0) {
	        return data;
	      } else {
	        return new Problem(data, exprs, problems, 'One or more expressions failed AND test');
	      }
	    } else {
	      throw 'no impl';
	    }
	  };
	}

	module.exports = andWalker;

/***/ },
/* 36 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var coerceIntoSpec = __webpack_require__(19);
	var Problem = __webpack_require__(20);
	var isProblem = __webpack_require__(26);
	var isArray = __webpack_require__(8);

	function collOfWalker(spec, walkFn) {
	  var expr = spec.exprs[0];

	  return function collOfWalk(x, walkOpts) {
	    if (isArray(x)) {
	      var results = x.map(function (y) {
	        return walkFn(expr, y, walkOpts);
	      });

	      var conform = walkOpts.conform;
	      var instrument = walkOpts.instrument;


	      if (conform || instrument) {
	        var problems = results.filter(isProblem);

	        if (problems.length === 0) {
	          return results;
	        } else {
	          return new Problem(x, spec, problems, 'One or more elements failed collOf test');
	        }
	      } else {
	        throw 'no impl';
	      }
	    } else {
	      return new Problem(x, spec, [], 'collOf expects an array');
	    }
	  };
	}

	module.exports = collOfWalker;

/***/ },
/* 37 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var coerceIntoSpec = __webpack_require__(19);

	function specRefWalker(specRef, walkFn) {
	  return function walkSpecRef(x, walkOpts) {
	    var s = specRef.get();
	    if (s) {
	      var ss = coerceIntoSpec(s);
	      return walkFn(ss, x, walkOpts);
	    }
	  };
	}

	module.exports = specRefWalker;

/***/ },
/* 38 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var coerceIntoSpec = __webpack_require__(19);

	function delayedSpecWalker(delayedSpec, walkFn) {
	  return function walkDelayedSpec(x, walkOpts) {
	    var s = delayedSpec.get();
	    if (s) {
	      var ss = coerceIntoSpec(s);
	      return walkFn(ss, x, walkOpts);
	    }
	  };
	}

	module.exports = delayedSpecWalker;

/***/ },
/* 39 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var Spec = __webpack_require__(7);
	var isSpec = __webpack_require__(9);
	var isStr = __webpack_require__(12);
	var isFn = __webpack_require__(11);
	var coerceIntoSpec = __webpack_require__(19);

	var _require = __webpack_require__(6);

	var cat = _require.cat;
	var or = _require.or;
	var zeroOrMore = _require.zeroOrMore;
	var zeroOrOne = _require.zeroOrOne;
	var ExprSpec = _require.ExprSpec;

	var walk = __webpack_require__(23);
	var fspec = __webpack_require__(22);

	function isPropName(x) {
	  return isStr(x);
	}

	var TYPE_PROPS = 'PROPS';

	var FieldDefs = propsOp({
	  propArgs: {
	    opt: {
	      fieldDefs: {
	        fields: {
	          'fields': {
	            keyValExprPair: {
	              keySpec: {
	                spec: coerceIntoSpec(isStr)
	              },
	              valSpec: {
	                spec: or('valExprOnly', ExprSpec, 'keyValExprPair', cat('keySpec', ExprSpec, 'valSpec', ExprSpec))
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
	    opt: {
	      fieldDefs: {
	        fields: {
	          'req': { valExprOnly: { spec: KeyArrayOrFieldDefs } },
	          'opt': { valExprOnly: { spec: KeyArrayOrFieldDefs } }
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
	  var s = new Spec(TYPE_PROPS, [cargs], null, null);
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

/***/ },
/* 40 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _require = __webpack_require__(41);

	var isBool = _require.isBool;
	var isFn = _require.isFn;

	var isExpr = __webpack_require__(46);
	var isSpec = __webpack_require__(9);
	var isProblem = __webpack_require__(26);
	var coerceIntoSpec = __webpack_require__(19);
	var exprSpec = coerceIntoSpec(isExpr);
	var Spec = __webpack_require__(7);
	var Problem = __webpack_require__(20);

	var _require2 = __webpack_require__(6);

	var oneOrMore = _require2.oneOrMore;
	var zeroOrOne = _require2.zeroOrOne;
	var or = _require2.or;
	var cat = _require2.cat;

	var fspec = __webpack_require__(22);
	var conformWalker = __webpack_require__(47);

	var AndSpec = fspec({
	  args: cat('exprs', oneOrMore(isExpr), 'walker', zeroOrOne(isFn)),
	  ret: isSpec
	});

	function andOp(conformedArgs) {
	  var exprs = conformedArgs.exprs;


	  var andS = new Spec('AND', exprs, null, null);
	  andS.conform = function andWalk(x, opts) {
	    walk(andS, x, opts);
	  };
	  return andS;
	}

	module.exports = AndSpec.instrumentConformed(andOp);

/***/ },
/* 41 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	module.exports = {
	  isBool: __webpack_require__(42),
	  isBoolean: __webpack_require__(42),
	  isNull: __webpack_require__(43),
	  isFn: __webpack_require__(11),
	  isFunction: __webpack_require__(11),
	  isNum: __webpack_require__(44),
	  isObj: __webpack_require__(34),
	  isObject: __webpack_require__(34),
	  isStr: __webpack_require__(12),
	  isString: __webpack_require__(12),
	  isUndefined: __webpack_require__(27),
	  notEmpty: __webpack_require__(45)
	};

/***/ },
/* 42 */
/***/ function(module, exports) {

	'use strict';

	function isBool(x) {
	  return typeof x === 'boolean';
	}

	module.exports = isBool;

/***/ },
/* 43 */
/***/ function(module, exports) {

	"use strict";

	function isNull(x) {
	  return x === null;
	};

	module.exports = isNull;

/***/ },
/* 44 */
/***/ function(module, exports) {

	'use strict';

	function isNum(x) {
	  return typeof x === 'number';
	};

	module.exports = isNum;

/***/ },
/* 45 */
/***/ function(module, exports) {

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
/* 46 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var isPred = __webpack_require__(10);
	var isSpec = __webpack_require__(9);

	function isExpr(x) {
	  return isPred(x) || isSpec(x);
	}

	module.exports = isExpr;

/***/ },
/* 47 */
/***/ function(module, exports) {

	"use strict";

	function conformWalker(spec, x) {
	  return spec.conform(x);
	}

	module.exports = conformWalker;

/***/ },
/* 48 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var Spec = __webpack_require__(7);
	var identity = __webpack_require__(49);
	var SPEC_TYPE_ANY = 'ANY';

	function any() {
	  return new Spec(SPEC_TYPE_ANY, [], identity, null);
	};

	module.exports = any;

/***/ },
/* 49 */
/***/ function(module, exports) {

	"use strict";

	function identity(x) {
	  return x;
	}

	module.exports = identity;

/***/ },
/* 50 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var DelayedSpec = __webpack_require__(17);

	function delayed(getFn) {
	  return new DelayedSpec({ getFn: getFn });
	}

	module.exports = delayed;

/***/ },
/* 51 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	module.exports = {
	  conform: __webpack_require__(52),
	  isValid: __webpack_require__(53),
	  identity: __webpack_require__(49),
	  isProblem: __webpack_require__(26),
	  delayed: __webpack_require__(50)
	};

/***/ },
/* 52 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var isSpec = __webpack_require__(9);

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
/* 53 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var Problem = __webpack_require__(20);
	var isProblem = __webpack_require__(26);
	var isPred = __webpack_require__(10);
	var isSpec = __webpack_require__(9);
	var conform = __webpack_require__(52);

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
	};

	module.exports = isValid;

/***/ }
/******/ ])
});
;