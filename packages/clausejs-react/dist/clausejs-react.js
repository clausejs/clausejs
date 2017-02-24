(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("clausejs"), require("react"));
	else if(typeof define === 'function' && define.amd)
		define(["clausejs", "react"], factory);
	else if(typeof exports === 'object')
		exports["C"] = factory(require("clausejs"), require("react"));
	else
		root["C"] = factory(root["C"], root["React"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_113__, __WEBPACK_EXTERNAL_MODULE_114__) {
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
/******/ 	return __webpack_require__(__webpack_require__.s = 118);
/******/ })
/************************************************************************/
/******/ ({

/***/ 113:
/***/ function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_113__;

/***/ },

/***/ 114:
/***/ function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_114__;

/***/ },

/***/ 118:
/***/ function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", { value: true });
var ClauseComponent_1 = __webpack_require__(96);
var fromBaseClass_1 = __webpack_require__(88);
module.exports = {
    ClauseComponent: ClauseComponent_1.default,
    fromBaseClass: fromBaseClass_1.default
};

/***/ },

/***/ 88:
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
var C = __webpack_require__(113);
function fromBaseClass(baseClass) {
    var ClauseComponent = function (_super) {
        __extends(ClauseComponent, _super);
        function ClauseComponent() {
            var _this = _super.call(this) || this;
            var propClauses = _this.constructor.propClauses;
            if (propClauses) {
                var nullablePropClauses_1 = C.or(propClauses, C.isUndefined, C.isNull);
                var currWillUpdateFn_1 = _this.componentWillUpdate;
                _this.componentWillUpdate = function (nextShape) {
                    C.enforce(nullablePropClauses_1, nextShape);
                    if (currWillUpdateFn_1) {
                        return currWillUpdateFn_1.apply(_this, arguments);
                    }
                    return undefined;
                };
                var currWillMountFn_1 = _this.componentWillMount;
                _this.componentWillMount = function () {
                    C.enforce(nullablePropClauses_1, _this.shape);
                    if (currWillMountFn_1) {
                        return currWillMountFn_1.apply(_this, arguments);
                    }
                    return undefined;
                };
            }
            return _this;
        }
        return ClauseComponent;
    }(baseClass);
    return ClauseComponent;
}
module.exports = fromBaseClass;
module.exports.default = fromBaseClass;

/***/ },

/***/ 96:
/***/ function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", { value: true });
var React = __webpack_require__(114);
var fromBaseClass_1 = __webpack_require__(88);
var ClauseComponent = fromBaseClass_1.default(React.Component);
module.exports = ClauseComponent;
module.exports.default = ClauseComponent;

/***/ }

/******/ });
});