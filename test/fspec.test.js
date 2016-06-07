'use strict';

var s = require('../src');
var expect = require('chai').expect;
var Problem = require('../src/_Problem');

describe('specky', function() {
  describe('fspec', function() {
    xit('should return a function that checks the spec of a given function as its input', function() {
      var FspecSpec = s.fspec({args: [s.isObj], ret: [s.isFn]});
      //sooo meta!
      var specedFspec = FspecSpec(s.fspec);
      expect(function() { specedFspec('hello'); }).to.throw(Error);
    });
  });
});
