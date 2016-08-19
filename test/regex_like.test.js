'use strict';
require('mocha-testcheck').install();
var expect = require('chai').expect;
var gen = require('mocha-testcheck').gen;
var check = require('mocha-testcheck').check;

describe.skip('regex-like tests', function() {
  //TODO
  check.it('accepts an int', [gen.int], function(x) {
    expect(typeof x).to.equal('number');
  });
});
