'use strict';

var s = require('../src');
var expect = require('chai').expect;
var Problem = require('../src/_Problem');

describe('specky', function() {
  describe('cat', function() {
    it('should cat specs together', function() {
      var comformist = [ function() {}, {}, function() {}, {} ];
      var nonfomformist = [ {}, function() {}, {}, function() {}];
      var cattedSpec = s.cat(s.isFn, s.isObj, s.isFn, s.isObj);
      expect(s.isValid(cattedSpec, comformist)).to.be.true;
      expect(s.isValid(cattedSpec, nonfomformist)).to.be.false;
      //more elems than specs
      expect(s.isValid(cattedSpec, comformist.concat([{extra: 'elements'}, 2]))).to.be.false;
      //less elem than spec
      expect(s.isValid(cattedSpec, comformist.slice(0, -1))).to.be.false;
    });
  });
});
