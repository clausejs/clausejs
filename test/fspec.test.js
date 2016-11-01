var expect = require('chai').expect;
var S = require('../src/');
var s = S;
var Problem = S.Problem;
var Spec = require('../src/models/Spec');
var isSpec = require('../src/utils/isSpec');
var identity = S.identity;

describe('fspec', function() {
  it('should return a function that checks the spec of a given function as its input', function() {
    var FspecSpec = S.fspec({
      args: S.cat(isSpec),
      ret: S.isSpec,
    });

    var specedFspec = FspecSpec.instrument(S.fspec); //meta-ly apply checking to self
    expect(S.isFn(specedFspec)).to.be.true;

    expect(function() { specedFspec('spec should not be a string'); }).to.throw(Problem);
    expect(function() { specedFspec({spec: 'should not be simple obj either'}) }).to.throw();

    expect(function() { specedFspec(new Spec('cat', [S.isBool], identity, null), {extra: 'param'}); }).to.throw(Problem);
    expect(function() { specedFspec(); }).to.throw(Problem);
});

  it('test on sheep counting fn', function() {
    var sheepCounterSpec = S.fspec({
      args: S.cat(S.isNum),
      ret: S.isStr,
    });

    var sheepCounter = sheepCounterSpec.instrument(function(c) {
      return c + ' sheep and counting.';
    });

    expect(sheepCounter(200)).to.be.a('string');
    expect(function() { sheepCounter('hello'); }).to.throw(Problem);
  });

  it('higher order functions', () => {
    var AdderFnSpec = s.fspec({
      args: s.cat('x', s.isNum),
      ret: s.fspec({
        args: s.cat('y', s.isNum),
        ret: s.isNum
      }),
    });

    var adderFn = AdderFnSpec.instrument((x) => (y) => x + y);
    var brokenAdderFn = AdderFnSpec.instrument(() => (y) => 'z');
    expect(adderFn(1)(2)).to.equal(3);
    expect(() => adderFn('a')(2)).to.throw(Problem);
    expect(() => adderFn(1)('z')).to.throw(Problem);
    expect(() => brokenAdderFn(1)(2)).to.throw(Problem);
  });
});
