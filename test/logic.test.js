'use strict';
require('mocha-testcheck').install();
var expect = require('chai').expect;
var gen = require('mocha-testcheck').gen;
var check = require('mocha-testcheck').check;

describe('specky', function() {
  describe('regex tests', function() {
    check.xit('accepts an int', [gen.int], function (x) {
      expect(typeof x).to.equal('number');
    });
  });
});
