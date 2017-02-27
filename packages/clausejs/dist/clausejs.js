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
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports) {

module.exports = '0.1.1';


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

"use strict";


function __export(m) {
    for (var p in m) {
        if (!exports.hasOwnProperty(p)) exports[p] = m[p];
    }
}
Object.defineProperty(exports, "__esModule", { value: true });
var package_version_1 = __webpack_require__(0);
exports.VERSION = package_version_1.default;
var Problem_1 = __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"./models/Problem\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()));
exports.Problem = Problem_1.default;
var Clause_1 = __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"./models/Clause\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()));
exports.Clause = Clause_1.default;
var namespace_1 = __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"./namespace\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()));
exports.resolve = namespace_1.resolve;
__export(__webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"./namespace\""); e.code = 'MODULE_NOT_FOUND'; throw e; }())));
var core_1 = __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"./core\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()));
__export(__webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"./core\""); e.code = 'MODULE_NOT_FOUND'; throw e; }())));
var utils = __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"./utils\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()));
__export(__webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"./utils\""); e.code = 'MODULE_NOT_FOUND'; throw e; }())));
var predicates = __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"./preds\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()));
__export(__webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"./preds\""); e.code = 'MODULE_NOT_FOUND'; throw e; }())));
var models = {
    Problem: Problem_1.default, Clause: Clause_1.default
};
var r = Object.assign(namespace_1.default, { resolve: namespace_1.resolve }, core_1.default, utils, models, predicates);
r.VERSION = package_version_1.default;
exports.default = r;

/***/ }
/******/ ]);
});