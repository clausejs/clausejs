'use strict';

var _docgen = require('../../src/docgen');

var _docgen2 = _interopRequireDefault(_docgen);

require('../../src/specs');

var _namespace = require('../../src/namespace');

var _jquery = require('jquery');

var _jquery2 = _interopRequireDefault(_jquery);

var _showdown = require('showdown');

var _showdown2 = _interopRequireDefault(_showdown);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

require('../../src/specs/index.annotation.js');
// import '../../author_experiments/ben.tmp';


var finalDocStr = _docgen2.default.gen((0, _namespace.getRegistry)());
var finalCotStr = _docgen2.default.genCot((0, _namespace.getRegistry)());

(0, _jquery2.default)(function () {
  document.getElementById('api').innerHTML = finalDocStr;
  document.getElementById('cot').innerHTML = finalCotStr;

  var markdownElems = document.getElementsByClassName('markdown-article');

  markdownElems.forEach(function (elem) {
    console.log(elem.attributes);
  });
});
//# sourceMappingURL=content.js.map