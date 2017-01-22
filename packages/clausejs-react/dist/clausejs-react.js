(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("clausejs"), require("react"));
	else if(typeof define === 'function' && define.amd)
		define(["clausejs", "react"], factory);
	else if(typeof exports === 'object')
		exports["C"] = factory(require("clausejs"), require("react"));
	else
		root["C"] = factory(root["C"], root["React"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_112__, __WEBPACK_EXTERNAL_MODULE_113__) {
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
/******/ 	return __webpack_require__(__webpack_require__.s = 117);
/******/ })
/************************************************************************/
/******/ ({

/***/ 112:
/***/ function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_112__;

/***/ },

/***/ 113:
/***/ function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_113__;

/***/ },

/***/ 117:
/***/ function(module, exports, __webpack_require__) {

"use strict";


var _ClauseComponent = __webpack_require__(96);

var _ClauseComponent2 = _interopRequireDefault(_ClauseComponent);

var _fromBaseClass = __webpack_require__(88);

var _fromBaseClass2 = _interopRequireDefault(_fromBaseClass);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = {
  ClauseComponent: _ClauseComponent2.default,
  fromBaseClass: _fromBaseClass2.default
};

/***/ },

/***/ 88:
/***/ function(module, exports, __webpack_require__) {

"use strict";


function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var C = __webpack_require__(112);

function fromBaseClass(baseClass) {
  var ClauseComponent = function (_baseClass) {
    _inherits(ClauseComponent, _baseClass);

    function ClauseComponent() {
      var _arguments = arguments;

      _classCallCheck(this, ClauseComponent);

      var _this = _possibleConstructorReturn(this, (ClauseComponent.__proto__ || Object.getPrototypeOf(ClauseComponent)).call(this));

      var propClauses = _this.constructor.propClauses;

      if (propClauses) {
        (function () {
          var nullablePropClauses = C.or(propClauses, C.isUndefined, C.isNull);

          var currWillUpdateFn = _this.componentWillUpdate;
          _this.componentWillUpdate = function (nextShape) {
            C.enforce(nullablePropClauses, nextShape);
            if (currWillUpdateFn) {
              return currWillUpdateFn.apply(_this, _arguments);
            }
            return undefined;
          };

          var currWillMountFn = _this.componentWillMount;
          _this.componentWillMount = function () {
            C.enforce(nullablePropClauses, _this.shape);
            if (currWillMountFn) {
              return currWillMountFn.apply(_this, _arguments);
            }
            return undefined;
          };
        })();
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


var _fromBaseClass = __webpack_require__(88);

var _fromBaseClass2 = _interopRequireDefault(_fromBaseClass);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var React = __webpack_require__(113);


var ClauseComponent = (0, _fromBaseClass2.default)(React.Component);

module.exports = ClauseComponent;
module.exports.default = ClauseComponent;

/***/ }

/******/ });
});