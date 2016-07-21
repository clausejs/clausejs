'use strict';

var s = require('../src/');
var expect = require('chai').expect;
var Problem = s.Problem;
var Spec = require('../src/_Spec');
var identity = s.identity;

describe('specky', function() {
  describe('or', function() {
    it('should accept one or more conditions', function() {
      var NumOrStr = s.or(s.isNum, s.isStr);
      expect(s.isValid(NumOrStr, 'hello')).to.be.true;
      expect(s.isValid(NumOrStr, 33)).to.be.true;
      expect(s.isValid(NumOrStr, new Object())).to.be.false;
    });
  });
});
