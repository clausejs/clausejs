var S = require('../src/');
var expect = require('chai').expect;
var Problem = S.Problem;

describe.only('cat', function() {
  var fn = function() {};
  var conformist = [ fn, {}, fn, {a: 1} ];
  var nonconformist = [ {}, fn, {}, fn];
  var extendedCase = conformist.concat([{extra: 'elements'}, 2]);
  var emptyCase = [];
  var lesserCase = conformist.slice(0, -1);
  var NamedSpec = S.cat('z', S.isFn, 'b', S.isObj, 'c', S.isFn, 'a', S.isObj);
  var UnnamedSpec = S.cat(S.isFn, S.isObj,S.isFn, S.isObj);

  describe('conform', function() {
    it('named', function() {
      var conformed = NamedSpec.conform(conformist);
      expect(conformed).to.deep.equal({ z: fn, b: {}, c: fn, a: { a: 1 } });
      var nonconformed = NamedSpec.conform(nonconformist);
      expect(nonconformed instanceof Problem).to.be.true;
    });

    it('unnamed', function() {
      var conformed = UnnamedSpec.conform(conformist);
      expect(conformed).to.deep.equal(conformist);
      var nonconformed = UnnamedSpec.conform(nonconformist);
      expect(nonconformed instanceof Problem).to.be.true;
    });
  });

  describe('validity', function() {
    [[NamedSpec, 'named'], [UnnamedSpec, 'unnamed']].forEach(function(p) {
      var Spec = p[0]; name = p[1];
      it(name, function() {
        //invalid case: more elems than specs
        expect(S.isValid(Spec, extendedCase)).to.be.false;

        //empty case
        expect(S.isValid(Spec, emptyCase)).to.be.false;

        //invalid case: less elem than spec
        expect(S.isValid(Spec, lesserCase)).to.be.false;
      });
    });
  });
});
