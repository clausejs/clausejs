(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("React"), require("S"));
	else if(typeof define === 'function' && define.amd)
		define("S", ["React", "S"], factory);
	else if(typeof exports === 'object')
		exports["S"] = factory(require("React"), require("S"));
	else
		root["S"] = factory(root["React"], root["S"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_62__, __WEBPACK_EXTERNAL_MODULE_63__) {
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

/******/ 	// identity function for calling harmory imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };

/******/ 	// define getter function for harmory exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		Object.defineProperty(exports, name, {
/******/ 			configurable: false,
/******/ 			enumerable: true,
/******/ 			get: getter
/******/ 		});
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
/******/ 	return __webpack_require__(__webpack_require__.s = 65);
/******/ })
/************************************************************************/
/******/ ({

/***/ 32:
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(62);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var S = __webpack_require__(63);


function enforce(spec, x) {
  var r = spec.conform(x);
  if (S.isProblem(r)) {
    throw r;
  }
}

var SpeckyComponent = function (_React$Component) {
  _inherits(SpeckyComponent, _React$Component);

  function SpeckyComponent() {
    var _arguments = arguments;

    _classCallCheck(this, SpeckyComponent);

    var _this = _possibleConstructorReturn(this, _React$Component.call(this));

    var propSpecs = _this.constructor.propSpecs;

    if (propSpecs) {
      (function () {
        var nullablePropSpecs = S.or(propSpecs, S.isUndefined, S.isNull);

        var currWillUpdateFn = _this.componentWillUpdate;
        _this.componentWillUpdate = function (nextProps) {
          enforce(nullablePropSpecs, nextProps);
          if (currWillUpdateFn) {
            return currWillUpdateFn.apply(_this, _arguments);
          }
          return undefined;
        };

        var currWillMountFn = _this.componentWillMount;
        _this.componentWillMount = function () {
          enforce(nullablePropSpecs, _this.props);
          if (currWillMountFn) {
            return currWillMountFn.apply(_this, _arguments);
          }
          return undefined;
        };
      })();
    }
    return _this;
  }

  return SpeckyComponent;
}(__WEBPACK_IMPORTED_MODULE_0_react___default.a.Component);

/* harmony default export */ exports["default"] = SpeckyComponent;

/***/ },

/***/ 62:
/***/ function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_62__;

/***/ },

/***/ 63:
/***/ function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_63__;

/***/ },

/***/ 65:
/***/ function(module, exports, __webpack_require__) {

var SpeckyComponent = __webpack_require__(32);

module.exports = {
  SpeckyComponent: SpeckyComponent
};

/***/ }

/******/ })
});
;