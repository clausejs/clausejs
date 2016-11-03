var S = require('../src/');
var s = S;
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

  it('undefined case', function() {
    var ObjOrUndefined = S.or(S.isNum, S.isUndefined);
    expect(S.isValid(ObjOrUndefined, undefined)).to.be.true;
  });

  it('combined with cat and zeroOrMore', function() {
    var Spec = s.or(s.cat(s.isNum, s.isStr), s.cat(s.isStr, s.isNum), s.isNum);
    expect(Spec.conform('')).to.be.an.instanceOf(Problem);
    expect(Spec.conform(1)).not.to.be.an.instanceOf(Problem);
    expect(Spec.conform([1, '2'])).not.to.be.an.instanceOf(Problem);
    expect(Spec.conform(['1', 2])).not.to.be.an.instanceOf(Problem);
  });
});
