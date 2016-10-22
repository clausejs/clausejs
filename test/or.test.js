var S = require('../src/');
var expect = require('chai').expect;
var Problem = S.Problem;
var Spec = require('../src/models/Spec');
var identity = S.identity;

describe('or', function() {
  it('should accept one or more conditions', function() {
    var NumOrStr = S.or(S.isNum, S.isStr, S.isBool);
    expect(S.isValid(NumOrStr, 'hello')).to.be.true;
    expect(S.isValid(NumOrStr, 33)).to.be.true;
    expect(S.isValid(NumOrStr, new Object())).to.be.false;
  });
});
